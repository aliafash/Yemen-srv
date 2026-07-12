import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  TrendingUp,
  History,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  Briefcase,
  DollarSign
} from "lucide-react";
import { db } from "../lib/db";
import { ProviderWallet, Transaction, Provider } from "../types";

interface ProviderWalletsScreenProps {
  onRefreshData?: () => void;
}

export const ProviderWalletsScreen: React.FC<ProviderWalletsScreenProps> = ({ onRefreshData }) => {
  const [wallets, setWallets] = useState<ProviderWallet[]>(() => db.getProviderWallets());
  const [transactions, setTransactions] = useState<Transaction[]>(() => db.getTransactions());
  const [providers] = useState<Provider[]>(() => db.getProviders());
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
  
  // Selected wallet for transaction history or balance adjustment
  const [selectedWallet, setSelectedWallet] = useState<ProviderWallet | null>(null);
  const [isAdjustingBalance, setIsAdjustingBalance] = useState(false);
  const [isViewingHistory, setIsViewingHistory] = useState(false);

  // Form states for adjusting balance
  const [adjustmentType, setAdjustmentType] = useState<"deposit" | "withdraw" | "payout">("payout");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentDescription, setAdjustmentDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshWalletData = () => {
    setWallets(db.getProviderWallets());
    setTransactions(db.getTransactions());
    if (onRefreshData) onRefreshData();
  };

  useEffect(() => {
    // If some providers don't have wallets yet, we can dynamically build them or list them
    const currentWallets = db.getProviderWallets();
    const missingProviders = providers.filter(p => !currentWallets.some(w => w.providerId === p.id));
    
    if (missingProviders.length > 0) {
      const newWallets: ProviderWallet[] = missingProviders.map(p => ({
        providerId: p.id,
        providerName: p.name,
        phoneNumber: p.phone,
        currentBalance: 0,
        totalEarnings: p.totalEarnings || 0,
        totalWithdrawals: 0,
        status: "active"
      }));
      db.saveProviderWallets([...currentWallets, ...newWallets]);
      setWallets(db.getProviderWallets());
    }
  }, [providers]);

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedWallet) return;

    const amount = parseFloat(adjustmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("⚠️ يرجى إدخال مبلغ صحيح أكبر من الصفر.");
      return;
    }

    if (!adjustmentDescription.trim()) {
      setError("⚠️ يرجى تدوين سبب أو تفاصيل هذه العملية المالية.");
      return;
    }

    // Load fresh copy of wallets & transactions
    const currentWallets = db.getProviderWallets();
    const currentTransactions = db.getTransactions();

    const walletIndex = currentWallets.findIndex(w => w.providerId === selectedWallet.providerId);
    if (walletIndex === -1) {
      setError("❌ لم يتم العثور على محفظة هذا الفني.");
      return;
    }

    const targetWallet = currentWallets[walletIndex];

    if ((adjustmentType === "withdraw" || adjustmentType === "payout") && targetWallet.currentBalance < amount) {
      setError("❌ رصيد المحفظة الحالي غير كافٍ لإجراء هذه العملية.");
      return;
    }

    // Apply adjustments
    let balanceChange = amount;
    if (adjustmentType === "withdraw" || adjustmentType === "payout") {
      balanceChange = -amount;
    }

    const nextBalance = targetWallet.currentBalance + balanceChange;
    const nextTotalWithdrawals = targetWallet.totalWithdrawals + (adjustmentType === "payout" ? amount : 0);
    const nextTotalEarnings = targetWallet.totalEarnings + (adjustmentType === "deposit" ? amount : 0);

    const updatedWallet: ProviderWallet = {
      ...targetWallet,
      currentBalance: nextBalance,
      totalEarnings: nextTotalEarnings,
      totalWithdrawals: nextTotalWithdrawals
    };

    const updatedWallets = [...currentWallets];
    updatedWallets[walletIndex] = updatedWallet;

    // Create the transaction object
    const newTx: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      providerId: targetWallet.providerId,
      type: adjustmentType,
      amount: amount,
      dateTime: Date.now(),
      status: "completed",
      description: adjustmentDescription,
      bookingId: ""
    };

    // Save changes to database
    db.saveProviderWallets(updatedWallets);
    db.saveTransactions([newTx, ...currentTransactions]);

    // Log to security audit trail
    db.addAuditLog(
      "PROVIDER_WALLET_ADJUSTED",
      "WAM_ADMIN",
      `تم تعديل رصيد محفظة الفني ${targetWallet.providerName} (${adjustmentType}) بقيمة ${amount} ريال. السبب: ${adjustmentDescription}`
    );

    // Update locally accepted provider views
    const provs = db.getProviders();
    const provIdx = provs.findIndex(p => p.id === targetWallet.providerId);
    if (provIdx !== -1) {
      provs[provIdx].totalEarnings = nextTotalEarnings;
      db.saveProviders(provs);
    }

    // Reset forms
    setAdjustmentAmount("");
    setAdjustmentDescription("");
    setIsAdjustingBalance(false);
    setSelectedWallet(updatedWallet);
    refreshWalletData();
    setSuccess("✅ تم معالجة وتثبيت المعاملة المالية وتحديث الأرصدة بنجاح!");
    setTimeout(() => setSuccess(""), 4000);
  };

  const toggleWalletFreeze = (wallet: ProviderWallet) => {
    const nextStatus = wallet.status === "active" ? "suspended" : "active";
    const currentWallets = db.getProviderWallets();
    const updated = currentWallets.map(w => 
      w.providerId === wallet.providerId ? { ...w, status: nextStatus as "active" | "suspended" } : w
    );
    db.saveProviderWallets(updated);
    db.addAuditLog(
      "PROVIDER_WALLET_STATUS_TOGGLED",
      "WAM_ADMIN",
      `تم تغيير حالة محفظة الفني ${wallet.providerName} إلى: ${nextStatus === "active" ? "نشطة" : "معلقة/مجمدة"}`
    );
    refreshWalletData();
    setSuccess(`✅ تم ${nextStatus === "active" ? "تنشيط" : "تجميد"} محفظة الفني بنجاح!`);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Filter calculations
  const filteredWallets = wallets.filter(w => {
    const matchesSearch = w.providerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.phoneNumber.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalBalances = wallets.reduce((acc, w) => acc + w.currentBalance, 0);
  const totalEarningsAll = wallets.reduce((acc, w) => acc + w.totalEarnings, 0);
  const totalWithdrawalsAll = wallets.reduce((acc, w) => acc + w.totalWithdrawals, 0);

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* SUCCESS & ERROR TOASTS */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center justify-between"
        >
          <span>{success}</span>
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        </motion.div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Balances */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">إجمالي أرصدة محافظ الفنيين الحالية</span>
            <span className="text-xl font-black text-white font-mono">{totalBalances.toLocaleString()} <span className="text-xs text-slate-500 font-sans">ريال</span></span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Earnings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">إجمالي أرباح الفنيين المحققة</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{totalEarningsAll.toLocaleString()} <span className="text-xs text-slate-500 font-sans">ريال</span></span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Processed Cashouts */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">إجمالي السحوبات والمسيلّات المؤكدة</span>
            <span className="text-xl font-black text-blue-400 font-mono">{totalWithdrawalsAll.toLocaleString()} <span className="text-xs text-slate-500 font-sans">ريال</span></span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الفني، أو برقم هاتف المحفظة..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl px-10 py-2.5 text-xs text-white focus:outline-none"
          />
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-500" />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex-1 md:flex-none text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
              statusFilter === "all" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            الكل ({wallets.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`flex-1 md:flex-none text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
              statusFilter === "active" ? "bg-emerald-600 text-white border-emerald-600" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            النشطة ({wallets.filter(w => w.status === "active").length})
          </button>
          <button
            onClick={() => setStatusFilter("suspended")}
            className={`flex-1 md:flex-none text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
              statusFilter === "suspended" ? "bg-red-600 text-white border-red-600" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            المجمدة ({wallets.filter(w => w.status === "suspended").length})
          </button>
        </div>
      </div>

      {/* WALLETS LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold">
                <th className="px-6 py-4">اسم الفني ومزود الخدمة</th>
                <th className="px-6 py-4">الهاتف</th>
                <th className="px-6 py-4 text-left">الرصيد المتاح</th>
                <th className="px-6 py-4 text-left">إجمالي الأرباح</th>
                <th className="px-6 py-4 text-left">إجمالي المسيلّ</th>
                <th className="px-6 py-4">حالة المحفظة</th>
                <th className="px-6 py-4 text-center">التحكم المالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWallets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Wallet className="w-8 h-8 text-slate-700" />
                      <span>لا يوجد محافظ مطابقة لمعايير البحث الحالية.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWallets.map((wallet) => (
                  <tr key={wallet.providerId} className="hover:bg-slate-950/30 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-amber-500 font-bold">
                          {wallet.providerName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{wallet.providerName}</span>
                          <span className="text-[9px] text-slate-500">معرّف: {wallet.providerId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">{wallet.phoneNumber}</td>
                    <td className="px-6 py-4 text-left font-mono font-bold text-amber-400">{wallet.currentBalance.toLocaleString()} ريال</td>
                    <td className="px-6 py-4 text-left font-mono text-emerald-400">{wallet.totalEarnings.toLocaleString()} ريال</td>
                    <td className="px-6 py-4 text-left font-mono text-blue-400">{wallet.totalWithdrawals.toLocaleString()} ريال</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                        wallet.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400 animate-pulse"
                      }`}>
                        {wallet.status === "active" ? "نشطة وجاهزة" : "مجمدة ومعلقة"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Adjust balance button */}
                        <button
                          onClick={() => {
                            setSelectedWallet(wallet);
                            setIsAdjustingBalance(true);
                          }}
                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 text-[10px] font-bold rounded-xl transition-all"
                          title="إيداع / سحب / تسوية"
                        >
                          معاملة مالية
                        </button>

                        {/* View history */}
                        <button
                          onClick={() => {
                            setSelectedWallet(wallet);
                            setIsViewingHistory(true);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                          title="سجل العمليات السابقة"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>

                        {/* Lock / Unlock */}
                        <button
                          onClick={() => toggleWalletFreeze(wallet)}
                          className={`p-1.5 rounded-xl transition-colors ${
                            wallet.status === "active" ? "bg-rose-950 text-rose-400 hover:bg-rose-900" : "bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                          }`}
                          title={wallet.status === "active" ? "تجميد المحفظة" : "تنشيط المحفظة"}
                        >
                          {wallet.status === "active" ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUST BALANCE MODAL */}
      <AnimatePresence>
        {isAdjustingBalance && selectedWallet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdjustingBalance(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-right overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4 flex-row-reverse">
                <div className="flex items-center gap-2 flex-row-reverse text-amber-500">
                  <Wallet className="w-5 h-5 shrink-0" />
                  <h3 className="text-sm font-bold text-white">إجراء معاملة مالية يدوية</h3>
                </div>
                <button
                  onClick={() => setIsAdjustingBalance(false)}
                  className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl mb-4 text-xs font-semibold text-slate-300 border border-slate-800/60 leading-relaxed">
                <span className="block text-slate-500 text-[10px]">الفني المستهدف:</span>
                <span className="text-white font-bold block">{selectedWallet.providerName}</span>
                <div className="flex justify-between mt-2 pt-2 border-t border-slate-900 flex-row-reverse">
                  <span>الرصيد الحالي بالمحفظة:</span>
                  <span className="text-amber-400 font-mono font-black">{selectedWallet.currentBalance.toLocaleString()} ريال</span>
                </div>
              </div>

              <form onSubmit={handleAdjustBalance} className="space-y-4">
                {/* Transaction Type Selection */}
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1.5">نوع المعاملة المالية:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setAdjustmentType("payout")}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        adjustmentType === "payout" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      تسليم أرباح (سحب)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustmentType("withdraw")}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        adjustmentType === "withdraw" ? "bg-rose-950/80 text-rose-400 border-rose-800/40" : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      خصم / غرامة
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustmentType("deposit")}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        adjustmentType === "deposit" ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/40" : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      إيداع / بونص
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1">قيمة المعاملة (ريال يمني):</label>
                  <input
                    type="number"
                    value={adjustmentAmount}
                    onChange={(e) => setAdjustmentAmount(e.target.value)}
                    placeholder="مثال: 5000"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none text-left font-mono"
                  />
                </div>

                {/* Reason description */}
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1">سبب المعاملة وتفاصيل السند الوارد:</label>
                  <textarea
                    rows={3}
                    value={adjustmentDescription}
                    onChange={(e) => setAdjustmentDescription(e.target.value)}
                    placeholder="اكتب تفاصيل العملية، رقم الحوالة، أو سبب الخصم/البونص..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none leading-relaxed"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-rose-950/30 border border-rose-500/20 text-rose-400 text-xs rounded-xl leading-relaxed">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdjustingBalance(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition-all"
                  >
                    تأكيد المعاملة المالية
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRANSACTION HISTORY MODAL */}
      <AnimatePresence>
        {isViewingHistory && selectedWallet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewingHistory(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-right overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center mb-4 shrink-0 flex-row-reverse">
                <div className="flex items-center gap-2 flex-row-reverse text-amber-500">
                  <History className="w-5 h-5 shrink-0" />
                  <h3 className="text-sm font-bold text-white">سجل الحركات المالية والمحفظة</h3>
                </div>
                <button
                  onClick={() => setIsViewingHistory(false)}
                  className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl mb-4 text-xs font-semibold text-slate-300 border border-slate-800/60 leading-relaxed shrink-0 flex justify-between items-center flex-row-reverse">
                <div>
                  <span className="block text-slate-500 text-[9px]">الفني المستعلم:</span>
                  <span className="text-white font-bold">{selectedWallet.providerName}</span>
                </div>
                <div className="text-left">
                  <span className="block text-slate-500 text-[9px]">الرصيد المتاح حالياً:</span>
                  <span className="text-amber-400 font-mono font-black">{selectedWallet.currentBalance.toLocaleString()} ريال</span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="overflow-y-auto space-y-3 flex-1 pr-1 pl-1">
                {transactions.filter(tx => tx.providerId === selectedWallet.providerId).length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    <Clock className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    <span>لا توجد أي معاملات مالية مسجلة سابقاً لهذه المحفظة.</span>
                  </div>
                ) : (
                  transactions
                    .filter(tx => tx.providerId === selectedWallet.providerId)
                    .map((tx) => {
                      const isAddition = tx.type === "deposit" || tx.type === "refund";
                      return (
                        <div
                          key={tx.id}
                          className="bg-slate-950 border border-slate-800/60 p-3 rounded-2xl flex items-center justify-between flex-row-reverse hover:border-slate-800 transition-all"
                        >
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isAddition ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                            }`}>
                              {isAddition ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white block leading-tight">{tx.description}</span>
                              <span className="text-[9px] text-slate-500 font-mono">
                                {new Date(tx.dateTime).toLocaleString("ar-YE")} • المعرّف: {tx.id}
                              </span>
                            </div>
                          </div>

                          <div className="text-left font-mono">
                            <span className={`text-xs font-extrabold ${isAddition ? "text-emerald-400" : "text-rose-400"}`}>
                              {isAddition ? "+" : "-"}{tx.amount.toLocaleString()} ريال
                            </span>
                            <span className="block text-[8px] text-slate-500 font-sans">عملية {tx.type === "payout" ? "تسليم مستحقات" : tx.type === "deposit" ? "إيداع مكافأة" : "خصم مالي"}</span>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsViewingHistory(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-colors"
                >
                  إغلاق السجل
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  ToggleLeft,
  ToggleRight,
  Percent,
  Coins,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Info
} from "lucide-react";
import { db } from "../lib/db";
import { PaymentSettings, WalletAccount } from "../types";

interface PaymentTabProps {
  onRefreshData?: () => void;
}

export const PaymentTab: React.FC<PaymentTabProps> = ({ onRefreshData }) => {
  const [settings, setSettings] = useState<PaymentSettings>(() => db.getPaymentSettings());
  const [isEditingAccount, setIsEditingAccount] = useState<string | null>(null);
  
  // State for adding a new wallet account
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newAccountOwner, setNewAccountOwner] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateSettings = (updated: Partial<PaymentSettings>) => {
    const next = { ...settings, ...updated };
    setSettings(next);
    db.savePaymentSettings(next);
    db.addAuditLog(
      "PAYMENT_SETTINGS_UPDATED",
      "WAM_ADMIN",
      `تم تحديث إعدادات الدفع: ${Object.keys(updated).join(", ")}`
    );
    if (onRefreshData) onRefreshData();
    showToast("✅ تم حفظ التغييرات بنجاح!");
  };

  const showToast = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 4000);
  };

  const toggleWalletStatus = (accountId: string) => {
    const updatedAccounts = settings.walletAccounts.map((acc) =>
      acc.id === accountId ? { ...acc, isEnabled: !acc.isEnabled } : acc
    );
    updateSettings({ walletAccounts: updatedAccounts });
  };

  const handleUpdateAccount = (id: string, number: string, name: string) => {
    if (!number.trim() || !name.trim()) {
      setError("⚠️ يرجى تعبئة جميع حقول المحفظة.");
      return;
    }
    const updatedAccounts = settings.walletAccounts.map((acc) =>
      acc.id === id ? { ...acc, accountNumber: number, accountName: name } : acc
    );
    updateSettings({ walletAccounts: updatedAccounts });
    setIsEditingAccount(null);
    setError("");
  };

  const handleDeleteWallet = (id: string) => {
    if (confirm("⚠️ هل أنت متأكد من حذف هذه المحفظة نهائياً من قائمة وسائل الدفع المتاحة؟")) {
      const updatedAccounts = settings.walletAccounts.filter((acc) => acc.id !== id);
      updateSettings({ walletAccounts: updatedAccounts });
      db.addAuditLog("PAYMENT_WALLET_DELETED", "WAM_ADMIN", `تم حذف المحفظة ذات الرقم التعريفي ${id}`);
    }
  };

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newAccountType.trim() || !newAccountNumber.trim() || !newAccountOwner.trim()) {
      setError("⚠️ يرجى ملء كافة تفاصيل المحفظة الجديدة.");
      return;
    }

    const newId = `wallet_${Date.now()}`;
    const newAcc: WalletAccount = {
      id: newId,
      name: newAccountType,
      accountNumber: newAccountNumber,
      accountName: newAccountOwner,
      isEnabled: true
    };

    const updatedAccounts = [...settings.walletAccounts, newAcc];
    updateSettings({ walletAccounts: updatedAccounts });

    // Reset inputs
    setNewAccountType("");
    setNewAccountNumber("");
    setNewAccountOwner("");
    showToast("🎉 تم إضافة حساب المحفظة الإلكترونية بنجاح!");
  };

  return (
    <div className="space-y-8 text-right font-sans" dir="rtl">
      {/* Notifications banner */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold flex items-center justify-between"
        >
          <span>{success}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-400 text-xs font-semibold flex items-center justify-between"
        >
          <span>{error}</span>
          <AlertCircle className="w-4 h-4 text-rose-400" />
        </motion.div>
      )}

      {/* SECTION 1: SYSTEM CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 flex-row-reverse">
          <div className="p-2.5 bg-amber-500/10 rounded-2xl">
            <CreditCard className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">إعدادات الدفع العامة والبوابة الإلكترونية</h3>
            <p className="text-[10px] text-slate-400">تفعيل المعاملات المالية، ربط الحجوزات وإظهار البوابة المالية للجمهور</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Toggle 1: isPaymentEnabled */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between flex-row-reverse">
              <span className="text-[11px] font-bold text-slate-300">تفعيل نظام الدفع الإلكتروني</span>
              <button
                onClick={() => updateSettings({ isPaymentEnabled: !settings.isPaymentEnabled })}
                className="transition-colors focus:outline-none"
              >
                {settings.isPaymentEnabled ? (
                  <ToggleRight className="w-9 h-9 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              عند التفعيل، يمكن للعملاء سداد الدفع المقدم والرسوم وحفظ الفواتير مباشرة من خلال المحافظ الإلكترونية اليمنية المعتمدة.
            </p>
          </div>

          {/* Toggle 2: showPaymentScreen */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between flex-row-reverse">
              <span className="text-[11px] font-bold text-slate-300">إظهار شاشة الدفع للمستخدمين</span>
              <button
                onClick={() => updateSettings({ showPaymentScreen: !settings.showPaymentScreen })}
                className="transition-colors focus:outline-none"
              >
                {settings.showPaymentScreen ? (
                  <ToggleRight className="w-9 h-9 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              التحكم في إظهار أو إخفاء زر التمويل والمحفظة وعمليات الشراء السريعة داخل واجهات حسابات المستخدمين ومزودي الخدمة.
            </p>
          </div>

          {/* Toggle 3: linkPaymentToBookings */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between flex-row-reverse">
              <span className="text-[11px] font-bold text-slate-300">ربط الدفع التلقائي بالحجوزات</span>
              <button
                onClick={() => updateSettings({ linkPaymentToBookings: !settings.linkPaymentToBookings })}
                className="transition-colors focus:outline-none"
              >
                {settings.linkPaymentToBookings ? (
                  <ToggleRight className="w-9 h-9 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              إجبار العملاء على تسديد نسبة العربون المتفق عليها لتثبيت وتفعيل مواعيد حجز الخدمات وحماية حقوق مقدمي الخدمة من التلاعب.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: ADMIN WALLET ACCOUNTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 flex-row-reverse">
          <div className="p-2.5 bg-blue-500/10 rounded-2xl">
            <Coins className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">إدارة حسابات المحافظ وبنك الإيداع الرئيسي</h3>
            <p className="text-[10px] text-slate-400">تعديل وتفعيل حسابات استلام المستحقات (جيب، جوالي، كريمي، نجم)</p>
          </div>
        </div>

        {/* Existing Accounts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.walletAccounts.map((acc) => {
            const isEditing = isEditingAccount === acc.id;
            return (
              <div
                key={acc.id}
                className={`bg-slate-950 border rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between ${
                  acc.isEnabled ? "border-slate-800/80 hover:border-amber-500/20" : "border-slate-900/50 opacity-60"
                }`}
              >
                <div className="flex justify-between items-start flex-row-reverse">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900 text-amber-500 border border-amber-500/10">
                      {acc.name}
                    </span>
                    <span className="text-xs font-bold text-white">حساب {acc.name} الرسمي</span>
                  </div>
                  
                  <div className="flex gap-1.5 items-center">
                    <button
                      onClick={() => toggleWalletStatus(acc.id)}
                      className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                        acc.isEnabled ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {acc.isEnabled ? "مفعّل" : "معطّل"}
                    </button>
                    <button
                      onClick={() => setIsEditingAccount(isEditing ? null : acc.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteWallet(acc.id)}
                      className="p-1 hover:bg-rose-950 rounded text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Account Details Form/Text */}
                <div className="mt-4 space-y-3">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        id={`input-no-${acc.id}`}
                        type="text"
                        defaultValue={acc.accountNumber}
                        placeholder="رقم الحساب أو الهاتف"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none font-mono"
                      />
                      <input
                        id={`input-name-${acc.id}`}
                        type="text"
                        defaultValue={acc.accountName}
                        placeholder="اسم صاحب الحساب المستفيد"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditingAccount(null)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg"
                        >
                          إلغاء
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const num = (document.getElementById(`input-no-${acc.id}`) as HTMLInputElement)?.value;
                            const name = (document.getElementById(`input-name-${acc.id}`) as HTMLInputElement)?.value;
                            handleUpdateAccount(acc.id, num, name);
                          }}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg"
                        >
                          حفظ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/60 p-3 rounded-xl space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between flex-row-reverse text-slate-400">
                        <span>رقم الحساب/المحفظة:</span>
                        <span className="text-white text-left font-bold">{acc.accountNumber}</span>
                      </div>
                      <div className="flex justify-between flex-row-reverse text-slate-400">
                        <span>الاسم المعتمد:</span>
                        <span className="text-white text-left font-bold truncate max-w-[150px]">{acc.accountName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Wallet Account form */}
        <form onSubmit={handleAddWallet} className="bg-slate-950/40 border border-slate-800/70 rounded-2xl p-4 mt-4 space-y-3">
          <span className="text-xs font-bold text-slate-300 block mb-1">إضافة وسيلة دفع/محفظة مالية جديدة:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newAccountType}
              onChange={(e) => setNewAccountType(e.target.value)}
              placeholder="مثال: محفظة النجم، محفظة كاش"
              className="bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
            <input
              type="text"
              value={newAccountNumber}
              onChange={(e) => setNewAccountNumber(e.target.value)}
              placeholder="رقم الهاتف أو رقم الحساب"
              className="bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
            />
            <input
              type="text"
              value={newAccountOwner}
              onChange={(e) => setNewAccountOwner(e.target.value)}
              placeholder="الاسم الكامل للمستفيد"
              className="bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 flex-row-reverse"
            >
              <Plus className="w-4 h-4" />
              إدراج محفظة جديدة
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: ADVANCE PAYMENTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 flex-row-reverse">
          <div className="p-2.5 bg-emerald-500/10 rounded-2xl">
            <Percent className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">إعدادات الرسوم والدفع المقدم (العربون)</h3>
            <p className="text-[10px] text-slate-400">تحديد نسبة العربون المفروضة وحماية المعاملات وفترة الإفراج التلقائي للفني</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Require Advance Payment Toggle */}
            <div className="flex items-center justify-between bg-slate-950/30 p-3 rounded-xl border border-slate-800/50 flex-row-reverse">
              <div>
                <span className="text-xs font-bold text-white block">طلب الدفع المقدم كعربون أساسي</span>
                <span className="text-[10px] text-slate-500">فرض سداد مقدم قبل إتاحة التواصل للعميل</span>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ requireAdvancePayment: !settings.requireAdvancePayment })}
                className="focus:outline-none"
              >
                {settings.requireAdvancePayment ? (
                  <ToggleRight className="w-8 h-8 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>

            {/* Advance payment percentage */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold flex justify-between flex-row-reverse">
                <span>نسبة الدفع المقدم من قيمة الخدمة:</span>
                <span className="text-emerald-400 font-bold">{settings.advancePaymentPercentage}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={settings.advancePaymentPercentage}
                onChange={(e) => updateSettings({ advancePaymentPercentage: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono flex-row-reverse">
                <span>100% (دفع كامل)</span>
                <span>50%</span>
                <span>10% (حد أدنى)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Minimum and Maximum values */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-[10px] mb-1 font-semibold">الحد الأدنى للدفع المقدم (ريال):</label>
                <input
                  type="number"
                  value={settings.minAdvanceAmount}
                  onChange={(e) => updateSettings({ minAdvanceAmount: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none text-left font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] mb-1 font-semibold">الحد الأقصى للدفع المقدم (ريال):</label>
                <input
                  type="number"
                  value={settings.maxAdvanceAmount}
                  onChange={(e) => updateSettings({ maxAdvanceAmount: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none text-left font-mono"
                />
              </div>
            </div>

            {/* Auto release settings */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 space-y-3">
              <div className="flex items-center justify-between flex-row-reverse">
                <div>
                  <span className="text-xs font-bold text-white block">الإفراج التلقائي عن الدفعة للفني</span>
                  <span className="text-[9px] text-slate-500">تحويل المبلغ لمحفظة الفني بعد انقضاء الوقت</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ autoReleasePayment: !settings.autoReleasePayment })}
                  className="focus:outline-none"
                >
                  {settings.autoReleasePayment ? (
                    <ToggleRight className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-slate-600" />
                  )}
                </button>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1 font-semibold flex justify-between flex-row-reverse">
                  <span>مدة الإفراج التلقائي (بالساعات بعد موعد الخدمة):</span>
                  <span className="text-white font-bold">{settings.releaseHours} ساعة</span>
                </label>
                <input
                  type="number"
                  value={settings.releaseHours}
                  onChange={(e) => updateSettings({ releaseHours: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none text-left font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: TECHNICIAN WALLETS SETTINGS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 flex-row-reverse">
          <div className="p-2.5 bg-purple-500/10 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">إعدادات سحب الأرباح ومحافظ الفنيين</h3>
            <p className="text-[10px] text-slate-400">إدارة القيود المالية وسحب مستحقات مقدمي الخدمة المعتمدين</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Toggle 1: enableProviderWallets */}
          <div className="bg-slate-950/30 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start flex-row-reverse">
              <span className="text-xs font-bold text-white">تفعيل محافظ الفنيين</span>
              <button
                type="button"
                onClick={() => updateSettings({ enableProviderWallets: !settings.enableProviderWallets })}
                className="focus:outline-none"
              >
                {settings.enableProviderWallets ? (
                  <ToggleRight className="w-8 h-8 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-500">تمكين مقدمي الخدمات من تجميع مستحقاتهم وأرباحهم في محافظهم الإلكترونية الفردية.</p>
          </div>

          {/* Min withdrawal amount */}
          <div className="bg-slate-950/30 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between h-32">
            <span className="text-xs font-bold text-white block mb-1">الحد الأدنى لطلب السحب:</span>
            <div className="relative mt-2">
              <input
                type="number"
                value={settings.minWithdrawalAmount}
                onChange={(e) => updateSettings({ minWithdrawalAmount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none pl-12 text-left font-mono"
              />
              <span className="absolute left-3 top-2.5 text-[9px] text-slate-500 font-bold">ريال</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">المبلغ الأدنى المطلوب توفره في رصيد محفظة الفني لتمكينه من طلب تسييل المستحقات.</p>
          </div>

          {/* Withdrawal fee percentage */}
          <div className="bg-slate-950/30 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between h-32">
            <span className="text-xs font-bold text-white block mb-1">رسوم السحب الإدارية (%):</span>
            <div className="relative mt-2">
              <input
                type="number"
                step="0.1"
                value={settings.withdrawalFeePercentage}
                onChange={(e) => updateSettings({ withdrawalFeePercentage: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none pl-8 text-left font-mono"
              />
              <span className="absolute left-3 top-2.5 text-[11px] text-slate-400 font-bold">%</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">النسبة المقتطعة تلقائياً من الفني لصالح المنصة عند كل عملية سحب أرباح إلكترونية ناجحة.</p>
          </div>
        </div>

        {/* Informative Security Label */}
        <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-2xl flex items-center gap-3 flex-row-reverse">
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
          <p className="text-[10px] text-blue-300 leading-relaxed text-right">
            تخضع كافة التحويلات وسحوبات المحافظ للتحقق والتدقيق عبر <strong>سجل الأنشطة والأمان</strong> المسجل تلقائياً. لا يمكن التراجع عن المعاملات المؤكدة.
          </p>
        </div>
      </div>
    </div>
  );
};

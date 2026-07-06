import React, { useState } from "react";
import { AppSettings, User } from "../types";
import { 
  CreditCard, 
  QrCode, 
  Wallet, 
  CheckCircle2, 
  Loader2, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Receipt,
  Download,
  AlertCircle
} from "lucide-react";

interface PaymentTabProps {
  settings: AppSettings;
  currentUser: User;
}

type PaymentMethod = "wallet" | "card" | "qr";

export default function PaymentTab({ settings, currentUser }: PaymentTabProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");
  const [selectedWallet, setSelectedWallet] = useState<string>("kuraimi");
  const [amount, setAmount] = useState<string>("5000");
  const [phone, setPhone] = useState<string>(currentUser.phone || "");
  const [coupon, setCoupon] = useState<string>("");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  
  // Card details
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // States for flow
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
  const [transactionId, setTransactionId] = useState<string>("");

  // Wallets options
  const WALLETS = [
    { id: "kuraimi", name: "الكريمي (ام فلوس)", merchantNo: settings.paymentMerchantKuraimi || "123456", logoText: "K", color: "from-emerald-700 to-emerald-900 border-emerald-500" },
    { id: "mfloos", name: "ام فلوس (التضامن)", merchantNo: settings.paymentMerchantMFloos || "777644", logoText: "M", color: "from-blue-700 to-blue-900 border-blue-500" },
    { id: "jawwal", name: "جوال بي (كاش)", merchantNo: settings.paymentMerchantJawwalPay || "987654", logoText: "J", color: "from-amber-700 to-amber-950 border-amber-500" },
  ];

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "wam2026") {
      setDiscount(1000);
      setCouponApplied(true);
      alert("✅ تم تطبيق الكوبون بنجاح! خصم بقيمة 1000 ريال يمني.");
    } else {
      alert("❌ الكوبون غير صالح أو منتهي الصلاحية.");
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      alert("⚠️ يرجى إدخال مبلغ صحيح أكبر من الصفر.");
      return;
    }

    setPaymentState("processing");

    // Simulate API delay
    setTimeout(() => {
      setTransactionId(`TXN_${Date.now().toString().substring(6)}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
      setPaymentState("success");
    }, 2500);
  };

  const finalAmount = Math.max(0, Number(amount) - discount);

  return (
    <div 
      className="max-w-md mx-auto font-sans text-right space-y-6 pb-20 select-none animate-fade-in" 
      dir="rtl"
      style={{ fontFamily: settings.selectedFontName }}
    >
      
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center pt-6 space-y-2">
        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20 shadow-lg">
          <CreditCard className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>
        <h2 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
          بوابة WAM Pay الإلكترونية 💳
        </h2>
        <p className="text-[10px] text-slate-400 text-center max-w-xs leading-relaxed">
          سدد أجور الفنيين، اشترك في باقات VIP، أو اشحن رصيد محفظتك عبر المحافظ والشبكات اليمنية المعتمدة فوراً ومجاناً.
        </p>
      </div>

      {paymentState === "idle" && (
        <form onSubmit={handlePay} className="space-y-5">
          
          {/* Method Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-850 text-xs">
            <button
              type="button"
              onClick={() => setPaymentMethod("wallet")}
              className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                paymentMethod === "wallet" ? "bg-amber-600 text-black font-extrabold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>محفظة جوال</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                paymentMethod === "card" ? "bg-amber-600 text-black font-extrabold" : "text-slate-400 hover:text-white"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>بطاقة فيزا/ماستر</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("qr")}
              className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                paymentMethod === "qr" ? "bg-amber-600 text-black font-extrabold" : "text-slate-400 hover:text-white"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>مسح الكود QR</span>
            </button>
          </div>

          {/* Amount input block */}
          <div className="bg-[#1e1e24] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div>
              <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1">المبلغ المراد سداده (ريال يمني):</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center font-extrabold text-amber-500 text-lg sm:text-xl font-mono focus:border-amber-500 outline-none"
                  placeholder="0.00"
                />
                <span className="absolute left-3.5 top-4.5 text-[9px] text-slate-500 font-bold">ر.ي</span>
              </div>
            </div>

            {/* Quick amount presets */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              {["1000", "3000", "5000", "10000"].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-1.5 rounded-lg border text-[10px] font-extrabold cursor-pointer transition-all ${
                    amount === preset 
                      ? "bg-amber-500/20 text-amber-400 border-amber-500" 
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {Number(preset).toLocaleString()} ر.ي
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1 Content: Mobile Wallets */}
          {paymentMethod === "wallet" && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <label className="block text-slate-400 text-xs font-bold mb-1">اختر محفظتك المفضلة في اليمن:</label>
                
                <div className="space-y-2.5">
                  {WALLETS.map((wal) => (
                    <div
                      key={wal.id}
                      onClick={() => setSelectedWallet(wal.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between flex-row-reverse ${
                        selectedWallet === wal.id 
                          ? "bg-slate-950/80 border-amber-500 shadow-md" 
                          : "bg-slate-950 border-slate-850 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-row-reverse">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${wal.color} flex items-center justify-center font-extrabold text-white text-sm shadow-md`}>
                          {wal.logoText}
                        </div>
                        <div className="text-right">
                          <h5 className="font-extrabold text-white text-xs">{wal.name}</h5>
                          <p className="text-[9px] text-slate-500 font-mono">رقم التاجر: {wal.merchantNo}</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedWallet === wal.id ? "border-amber-500 bg-amber-500" : "border-slate-700"
                      }`}>
                        {selectedWallet === wal.id && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <label className="block text-slate-400 text-xs font-bold mb-1">رقم هاتف المشترك للمحفظة 📱:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white font-mono text-center"
                  placeholder="77XXXXXXX"
                />
              </div>
            </div>
          )}

          {/* Tab 2 Content: Credit Cards (Interactive Graphic) */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              
              {/* Visa Card Mock graphic */}
              <div 
                className="w-full h-44 rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950 p-5 relative overflow-hidden border border-slate-800 text-white font-mono shadow-2xl flex flex-col justify-between cursor-pointer group"
                onClick={() => setIsCardFlipped(!isCardFlipped)}
              >
                {/* Visual accent backgrounds */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {!isCardFlipped ? (
                  <>
                    <div className="flex justify-between items-center flex-row-reverse">
                      <span className="text-xs italic font-black text-amber-400">WAM PAY PREMIUM</span>
                      <div className="w-9 h-7 rounded bg-amber-400/80 shadow-md border border-amber-300" />
                    </div>
                    
                    <div className="space-y-1 mt-4">
                      <p className="text-[10px] text-slate-400 tracking-wider">CARD NUMBER</p>
                      <p className="text-sm sm:text-base font-extrabold tracking-widest text-center">
                        {cardNumber || "••••  ••••  ••••  ••••"}
                      </p>
                    </div>

                    <div className="flex justify-between items-end flex-row-reverse mt-2">
                      <div className="text-right">
                        <p className="text-[8px] text-slate-400">CARDHOLDER</p>
                        <p className="text-[10px] font-bold tracking-wide uppercase truncate max-w-[150px]">
                          {cardName || "YOUR NAME"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400">EXPIRES</p>
                        <p className="text-[10px] font-bold tracking-wide">
                          {cardExpiry || "MM/YY"}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-8 w-full bg-slate-900 absolute left-0 top-6" />
                    <div className="flex justify-between items-center flex-row-reverse mt-12 pr-4 pl-4">
                      <div className="bg-slate-300 text-black px-2 py-0.5 text-[9px] font-bold w-12 text-center rounded">
                        {cardCvv || "•••"}
                      </div>
                      <p className="text-[8px] text-slate-400 tracking-wider">CVV CODE SECURITY</p>
                    </div>
                    <p className="text-[8px] text-slate-500 text-center mt-6">
                      انقر على البطاقة لقلبها للواجهة الأمامية
                    </p>
                  </>
                )}
              </div>

              {/* Form Inputs for card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3.5">
                <div>
                  <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1">اسم حامل البطاقة كما بالإنجليزية:</label>
                  <input
                    type="text"
                    required={paymentMethod === "card"}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white"
                    placeholder="MAHER AL-YAMANI"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1">رقم بطاقة الائتمان (16 خانة):</label>
                  <input
                    type="text"
                    required={paymentMethod === "card"}
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      // format card number with spaces
                      const val = e.target.value.replace(/\D/g, "");
                      const matches = val.match(/\d{4,16}/g);
                      const match = (matches && matches[0]) || "";
                      const parts = [];

                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }

                      if (parts.length > 0) {
                        setCardNumber(parts.join("  "));
                      } else {
                        setCardNumber(val);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono text-center"
                    placeholder="4000  1234  5678  9010"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1">تاريخ الانتهاء (MM/YY):</label>
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length > 2) {
                          val = val.substring(0, 2) + "/" + val.substring(2, 4);
                        }
                        setCardExpiry(val);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono text-center"
                      placeholder="12/28"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1">الرمز السري (CVV):</label>
                    <input
                      type="password"
                      required={paymentMethod === "card"}
                      maxLength={3}
                      value={cardCvv}
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono text-center"
                      placeholder="•••"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3 Content: QR Code merchant Scanner */}
          {paymentMethod === "qr" && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-4">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  امسح كود الـ QR الخاص بمنصة WAM Pay من هاتفك للتحويل المباشر لمرتبات الفنيين المعتمدين.
                </p>
                
                {/* Mock Visual QR code */}
                <div className="relative w-40 h-40 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-4 border-amber-500 animate-pulse">
                  <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm ${
                          (i * 7 + 3) % 2 === 0 ? "bg-black" : "bg-transparent"
                        }`} 
                      />
                    ))}
                  </div>
                  {/* Overlay Logo */}
                  <div className="absolute w-10 h-10 bg-amber-500 text-black rounded-lg border-2 border-white flex items-center justify-center font-black text-xs shadow-md">
                    WAM
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 inline-block text-xs font-bold text-amber-500 font-mono">
                  ID: QR-WAM-PAY-2026
                </div>
              </div>
            </div>
          )}

          {/* Coupon / Discount Code Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <label className="block text-slate-400 text-xs font-bold mb-1">هل لديك كوبون خصم؟</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-slate-800 hover:bg-slate-750 text-amber-400 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                تطبيق
              </button>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white text-center font-mono uppercase"
                placeholder="مثال: WAM2026"
              />
            </div>
            {couponApplied && (
              <p className="text-[10px] text-emerald-400 font-semibold text-right">✓ كوبون WAM2026 نشط (تم خصم 1000 ريال يمني).</p>
            )}
          </div>

          {/* Checkout billing details card */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 text-xs space-y-2 text-slate-300">
            <div className="flex justify-between items-center flex-row-reverse border-b border-slate-900 pb-2">
              <span className="font-bold text-white">تفاصيل الفاتورة:</span>
              <span className="text-[9px] text-slate-500">فاتورة دفع فوري</span>
            </div>
            <div className="flex justify-between items-center flex-row-reverse">
              <span>المبلغ الإجمالي:</span>
              <span className="font-mono">{Number(amount).toLocaleString()} ريال يمني</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center flex-row-reverse text-rose-400">
                <span>كوبون الخصم:</span>
                <span className="font-mono">- {discount.toLocaleString()} ريال يمني</span>
              </div>
            )}
            <div className="flex justify-between items-center flex-row-reverse font-extrabold text-white text-sm border-t border-slate-900 pt-2 text-amber-500">
              <span>الصافي المطلوب:</span>
              <span className="font-mono">{finalAmount.toLocaleString()} ريال يمني</span>
            </div>
          </div>

          {/* Secure Trust row */}
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-[10px] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>بوابة مشفرة ومؤمنة بالكامل للتعامل السريع والموثوق 🔐</span>
          </div>

          {/* Submit Pay button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold py-3.5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-95"
          >
            <CreditCard className="w-5 h-5 text-black" />
            <span>تأكيد ودفع {finalAmount.toLocaleString()} ريال يمني فوراً</span>
          </button>
        </form>
      )}

      {/* Processing Loader view */}
      {paymentState === "processing" && (
        <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-10 text-center space-y-6">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm">جاري مراجعة طلب الدفع...</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              يرجى الانتظار، جاري التواصل مع شبكة السداد اليمنية وتوثيق رقم المعاملة السحابية المشفرة. لا تقم بإغلاق الشاشة.
            </p>
          </div>
        </div>
      )}

      {/* Success Receipt view */}
      {paymentState === "success" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
          
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce mt-4" />
          
          <div className="space-y-1">
            <h3 className="font-extrabold text-white text-base">🎉 تم الدفع والسداد بنجاح!</h3>
            <p className="text-[10px] text-emerald-400 font-bold">معاملة موثقة ومقيدة بمركز المقاصة الإلكتروني</p>
          </div>

          {/* Receipts specs */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 text-xs text-right space-y-2.5 text-slate-300 font-mono">
            <div className="flex items-center gap-1 flex-row-reverse border-b border-slate-900 pb-1.5 text-slate-400">
              <Receipt className="w-4 h-4 text-amber-500" />
              <span className="font-extrabold text-white text-[10px]">إيصال استلام الكتروني WAM Pay</span>
            </div>
            <div className="flex justify-between flex-row-reverse">
              <span className="text-slate-500">رقم الحركة:</span>
              <span className="text-white font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between flex-row-reverse">
              <span className="text-slate-500">طريقة الدفع:</span>
              <span className="text-white font-bold">
                {paymentMethod === "wallet" ? "محفظة الهاتف الذكي" : paymentMethod === "card" ? "بطاقة ائتمانية" : "رمز استجابة سريعة QR"}
              </span>
            </div>
            {paymentMethod === "wallet" && (
              <div className="flex justify-between flex-row-reverse">
                <span className="text-slate-500">محفظة المحول:</span>
                <span className="text-white font-bold">{selectedWallet === "kuraimi" ? "الكريمي ام فلوس" : selectedWallet === "mfloos" ? "التضامن ام فلوس" : "جوال كاش"}</span>
              </div>
            )}
            <div className="flex justify-between flex-row-reverse">
              <span className="text-slate-500">تاريخ الحركة:</span>
              <span className="text-white font-bold">{new Date().toLocaleString("ar-YE")}</span>
            </div>
            <div className="flex justify-between flex-row-reverse border-t border-slate-900 pt-2 font-extrabold text-amber-500">
              <span>المبلغ المدفوع:</span>
              <span>{finalAmount.toLocaleString()} ريال يمني</span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => setPaymentState("idle")}
              className="bg-slate-800 hover:bg-slate-750 text-white font-bold py-3 px-4 rounded-xl text-xs cursor-pointer transition-all"
            >
              دفع عملية أخرى
            </button>
            <button
              onClick={() => {
                alert("✅ تم حفظ وتنزيل إيصال السداد على ذاكرة جهازك بصيغة PDF بنجاح!");
              }}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-black" />
              <span>تحميل الإيصال</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

import React, { useState } from "react";
import { AppSettings } from "../types";
import { CreditCard, Award, Ticket, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

interface PaymentTabProps {
  settings: AppSettings;
  currentUser: any;
}

export default function PaymentTab({ settings, currentUser }: PaymentTabProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState<number | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleValidateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    setDiscountValue(null);

    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "YEMEN2026") {
      setDiscountValue(20);
      setCouponSuccess("✅ تم تطبيق رمز الخصم بنجاح! خصم بقيمة 20% على خدماتك الفنية القادمة.");
    } else if (couponCode.toUpperCase() === "FREE5") {
      setDiscountValue(5);
      setCouponSuccess("✅ تم تطبيق رمز الخصم بنجاح! خصم بقيمة 500 ريال يمني على تكلفة الحجز.");
    } else {
      setCouponError("⚠️ رمز الكوبون أو الخصم الذي أدخلته غير صالح أو منتهي الصلاحية.");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-right pb-12" dir="rtl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-amber-500" />
          المحفظة الرقمية ونقاط الولاء
        </h1>
        <p className="text-slate-400 text-xs">
          تتبع رصيدك، استبدل نقاط الولاء الخاصة بك بخصومات رائعة واستفد من كوبونات العروض الحصرية.
        </p>
      </div>

      {/* Loyalty Points Section */}
      {settings.loyaltyPointsEnabled && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden shadow-xl flex items-center justify-between gap-6">
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-black block">برنامج الولاء والجوائز</span>
            <h3 className="text-sm font-bold text-white">إجمالي نقاط الولاء الحالية لديك</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              احصل على 10 نقاط تلقائياً مقابل كل عملية حجز تتم بنجاح عبر المنصة. يمكنك استبدال هذه النقاط بأكواد خصم مجانية مذهلة!
            </p>
          </div>
          <div className="shrink-0 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center relative z-10">
            <Award className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
            <div className="text-2xl font-black text-white mt-1.5">{currentUser?.loyaltyPoints || 0}</div>
            <div className="text-[10px] text-slate-500 font-bold">نقطة مجانية</div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
        </div>
      )}

      {/* Coupons Section */}
      {settings.couponCodesEnabled && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Ticket className="w-4.5 h-4.5 text-amber-500" /> تفعيل كوبونات الخصم والرموز الترويجية
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            أدخل رمز الكوبون أو الرمز الترويجي الذي حصلت عليه لتخفيض تكلفة الخدمة عند الحجز.
          </p>

          <form onSubmit={handleValidateCoupon} className="flex gap-2.5">
            <input
              type="text"
              placeholder="مثال: YEMEN2026..."
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500 uppercase"
            />
            <button
              type="submit"
              className="px-5 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs cursor-pointer shadow-lg shadow-amber-500/10 transition-all active:scale-95 shrink-0"
            >
              تطبيق الرمز
            </button>
          </form>

          {couponSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
              <span>{couponSuccess}</span>
            </div>
          )}

          {couponError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
              <span>{couponError}</span>
            </div>
          )}
        </div>
      )}

      {/* Subscriptions Info */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <Sparkles className="w-4.5 h-4.5 text-amber-500" /> باقات واشتراكات الفنيين ومزودي الخدمة
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          هل أنت مقدم خدمة فنية مميز؟ اشترك الآن بإحدى الباقات الذهبية المدفوعة أو الـ VIP لتظهر في مقدمة نتائج البحث، والحصول على شارات التميز الفضية والذهبية التي تجلب ثقة مئات العملاء الجدد إليك فوراً!
        </p>
        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white block">باقة الـ VIP الفائقة للتميز</span>
            <span className="text-[10px] text-slate-500">ميزات حصرية، عملاء مخصصين، تتبع للمسار وحفظ الخريطة</span>
          </div>
          <span className="text-amber-500 font-extrabold text-sm">
            {settings.vipSubscriptionPrice && settings.vipSubscriptionPrice > 0 
              ? `${settings.vipSubscriptionPrice.toLocaleString("ar-YE")} ريال / شهرياً` 
              : "اشتراك مجاني بالكامل حالياً"
            }
          </span>
        </div>
      </div>
    </div>
  );
}

// Named export mapping for index routing support
export { PaymentTab };

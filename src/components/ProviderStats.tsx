import React from "react";
import { AppSettings, Booking, Provider, User } from "../types";
import { db } from "../lib/db";
import { 
  BarChart3, 
  CheckCircle2, 
  Star, 
  DollarSign, 
  Clock, 
  Calendar,
  Sparkles,
  Lock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface ProviderStatsProps {
  settings: AppSettings;
  bookings: Booking[];
  providers: Provider[];
  currentUser: User;
}

export default function ProviderStats({
  settings,
  bookings,
  providers,
  currentUser
}: ProviderStatsProps) {
  
  // Find current provider's record
  const currentProvider = providers.find(
    p => p.id === currentUser.id || p.phone === currentUser.phone
  );

  // Filter bookings belonging to this provider
  const myBookings = bookings.filter(
    b => b.providerId === currentUser.id || b.assignedTo === currentUser.id || b.userPhone === currentUser.phone
  );

  // Completed bookings
  const completedBookings = myBookings.filter(b => b.status === "completed");
  const pendingBookings = myBookings.filter(b => b.status === "pending" || b.status === "accepted");
  const activeBookings = myBookings.filter(b => b.status === "in_progress");

  // Statistics calculation
  const completedCount = completedBookings.length;
  const averageRating = currentProvider ? currentProvider.rating : 5.0;
  const reviewCount = currentProvider ? currentProvider.reviewCount : 0;
  const basePrice = currentProvider?.price || 5000; // default 5000 YER if not set
  
  // Total estimated earnings based on completed bookings
  const totalEarnings = completedCount * basePrice;

  const handleToggleAvailability = async () => {
    if (!currentProvider) return;
    const allProviders = db.getProviders();
    const updated = allProviders.map(p => {
      if (p.id === currentProvider.id) {
        return { ...p, isAvailable: !p.isAvailable };
      }
      return p;
    });
    await db.saveProviders(updated);
  };

  // If the Admin has disabled provider stats, show an elegant notice
  if (settings.showProviderStats === false) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-300 max-w-lg mx-auto space-y-4" dir="rtl">
        <div className="p-4 bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-amber-500 border border-amber-500/20">
          <Lock className="w-7 h-7" />
        </div>
        <h3 className="font-extrabold text-white text-base">لوحة الإحصائيات مغلقة حالياً 🔒</h3>
        <p className="text-xs leading-relaxed text-slate-400">
          لقد قامت إدارة منصة <b>{settings.appName}</b> بإيقاف لوحة إحصائيات الأرباح والحجوزات مؤقتاً لأغراض الترقية أو صيانة خوادم الفوترة.
        </p>
        <p className="text-[10px] text-slate-500">إذا كنت تعتقد أن هذا خطأ، يرجى مراجعة الإشراف العام أو التواصل مع الدعم الفني مباشرة.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
      
      {/* Welcome & Overview Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-900/90 to-amber-950/10 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="absolute top-2 left-2 text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
          مزامنة فورية نشطة ●
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">لوحة الفنيين المهنية</span>
          <h2 className="font-extrabold text-white text-base sm:text-lg">أهلاً بك، {currentUser.name} 👋</h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
            نحن نوفر لك تحليلاً بيانياً فورياً ومزامناً مع خوادم المنصة لتتبع أدائك، حجوزاتك، وأرباحك المالية التقديرية بناءً على المعاملات المسجلة.
          </p>
        </div>
      </div>

      {/* 🟢/🔴 Active Availability Toggle Widget */}
      <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl flex flex-col sm:flex-row-reverse items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 flex-row-reverse text-right">
          <div className={`p-3 rounded-2xl shrink-0 flex items-center justify-center ${currentProvider?.isAvailable ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
            {currentProvider?.isAvailable ? (
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            ) : (
              <span className="inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">حالة الإتاحة والظهور للعملاء</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {currentProvider?.isAvailable 
                ? "أنت تظهر الآن للعملاء بوضع (متاح للعمل). يمكنهم الاتصال بك وحجز خدماتك مباشرة عبر الموقع."
                : "أنت تظهر الآن بوضع (مشغول حالياً). لن يتمكن العملاء من الاتصال بك أو إرسال طلبات حجز جديدة حتى تفعّل الإتاحة."}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleToggleAvailability}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer shadow-md select-none ${
            currentProvider?.isAvailable
              ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 hover:border-rose-500/40 shadow-rose-950/10"
              : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/40 shadow-emerald-950/10"
          }`}
        >
          <span>{currentProvider?.isAvailable ? "🔴 تحويل حالتي إلى (مشغول)" : "🟢 تحويل حالتي إلى (متاح للعمل)"}</span>
        </button>
      </div>

      {/* 👤 Professional Profile Card (الملف الشخصي للفني) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between flex-row-reverse border-b border-slate-850 pb-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 flex-row-reverse">
            <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">👤</span>
            <span>ملفك المهني ومعلوماتك الشخصية</span>
          </h3>
          <span className="text-[10px] text-slate-500 font-bold">الرقم التعريفي: {currentProvider?.id || "غير متوفر"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">الاسم الكامل:</span>
              <span className="font-bold text-white">{currentProvider?.name || currentUser.name}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">رقم الهاتف المعتمد:</span>
              <span className="font-bold text-emerald-400 font-mono select-all">{currentProvider?.phone || currentUser.phone}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">القسم الرئيسي:</span>
              <span className="font-bold text-amber-500">{currentProvider?.category || "صيانة عامة"}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">التخصص الدقيق:</span>
              <span className="font-semibold text-white">{currentProvider?.subCategory || "فني معتمد"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">المحافظة / المدينة:</span>
              <span className="font-bold text-white">{currentProvider?.city || "صنعاء"}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">المنطقة والحي السكني:</span>
              <span className="font-semibold text-white">{currentProvider?.area || "غير محدد"}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">سعر المعاينة الأولي:</span>
              <span className="font-bold text-emerald-400">{currentProvider?.price || 3000} ريال يمني</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="text-slate-400">ساعات العمل المفضلة:</span>
              <span className="font-semibold text-white">{currentProvider?.workingHours || "8:00 ص - 10:00 م"}</span>
            </div>
          </div>
        </div>

        {currentProvider?.description && (
          <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-850 text-xs">
            <span className="block text-slate-400 font-bold mb-1.5">نبذة تعريفية بخدماتك للعملاء:</span>
            <p className="text-slate-300 leading-relaxed font-medium">{currentProvider.description}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
          <div className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 ${
            currentProvider?.isVerified 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}>
            <span>{currentProvider?.isVerified ? "✓ حساب موثق معتمد لدى WAM" : "⏳ قيد مراجعة وتدقيق المستندات"}</span>
          </div>

          <div className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 ${
            currentProvider?.isSubscribed 
              ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
              : "bg-slate-950/40 border-slate-850 text-slate-400"
          }`}>
            <span>{currentProvider?.isSubscribed ? "🏆 عضوية ذهبية مميزة (VIP)" : "عضوية عادية"}</span>
          </div>

          <button
            onClick={handleToggleAvailability}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-all active:scale-[0.96] hover:brightness-110 cursor-pointer ${
              currentProvider?.isAvailable 
                ? "bg-emerald-600/25 border-emerald-500/40 text-emerald-400" 
                : "bg-rose-500/25 border-rose-500/35 text-rose-400"
            }`}
            title="اضغط لتعديل حالة الإتاحة والظهور فوراً"
          >
            <span>{currentProvider?.isAvailable ? "● متاح حالياً للعمل (اضغط للتغيير)" : "○ مشغول حالياً (اضغط للتغيير)"}</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Completed Bookings */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-750 p-5 rounded-2xl transition-all shadow relative overflow-hidden group">
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between flex-row-reverse mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-slate-400 text-[10px] font-extrabold">الإنتاجية والإتمام</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">الحجوزات المكتملة</span>
            <div className="flex items-baseline gap-1.5 justify-start">
              <span className="text-2xl font-extrabold text-white">{completedCount}</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> 100% مكتمل
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              إجمالي الحجوزات النشطة: {myBookings.length} (معلق: {pendingBookings.length} | قيد الصيانة: {activeBookings.length})
            </p>
          </div>
        </div>

        {/* Card 2: Average Rating */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-750 p-5 rounded-2xl transition-all shadow relative overflow-hidden group">
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-amber-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between flex-row-reverse mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/10">
              <Star className="w-5 h-5 fill-amber-400/10" />
            </div>
            <span className="text-slate-400 text-[10px] font-extrabold">تقييم الجودة</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">متوسط تقييماتك</span>
            <div className="flex items-baseline gap-1.5 justify-start">
              <span className="text-2xl font-extrabold text-white">{averageRating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-[10px] text-slate-400">({reviewCount} عميل)</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              {reviewCount > 0 ? "رأي عملائك يعزز ظهورك في أعلى نتائج البحث للدليل!" : "لم تتلق تقييمات كافية بعد في الدليل."}
            </p>
          </div>
        </div>

        {/* Card 3: Estimated Revenue */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-750 p-5 rounded-2xl transition-all shadow relative overflow-hidden group">
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-emerald-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between flex-row-reverse mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-slate-400 text-[10px] font-extrabold">التقدير المالي</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">مجموع الأرباح التقديرية</span>
            <div className="flex items-baseline gap-1 justify-start">
              <span className="text-2xl font-extrabold text-emerald-400">{totalEarnings.toLocaleString("en-US")}</span>
              <span className="text-[10px] text-slate-400">ريال يمني</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              محسوبة بناءً على سعر خدمتك الأساسي ({basePrice} ريال) × {completedCount} حجز مكتمل.
            </p>
          </div>
        </div>

      </div>

      {/* Progress & Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Earnings Progress meter */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-row-reverse border-b border-slate-850 pb-2.5">
            <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-400" />
              <span>معدل نمو الأرباح وهدف الشهر الحالي</span>
            </h3>
            <span className="text-[10px] text-slate-400">الهدف: 200,000 ريال</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] flex-row-reverse">
              <span className="text-slate-400 font-semibold">النسبة المحققة للهدف المالي:</span>
              <span className="text-emerald-400 font-bold font-mono">
                {Math.min(100, Math.round((totalEarnings / 200000) * 100))}%
              </span>
            </div>
            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-850 p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalEarnings / 200000) * 100))}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              {settings.isLoyaltyEnabled 
                ? "تحقيق الأهداف الشهرية يزيد من نقاط الولاء وفرص ظهور حسابك كفني نخبة VIP!" 
                : "تحقيق الأهداف الشهرية يزيد من تقييمك وفرص ظهور حسابك كفني نخبة VIP!"}
            </p>
          </div>

          {/* Quick Stats list */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 divide-y divide-slate-900 text-xs space-y-1">
            <div className="flex items-center justify-between py-1.5 flex-row-reverse">
              <span className="text-slate-400">سعر الخدمة الافتراضي:</span>
              <span className="text-white font-bold">{basePrice} ريال يمني</span>
            </div>
            <div className="flex items-center justify-between py-1.5 flex-row-reverse">
              <span className="text-slate-400">إجمالي الحجوزات المستلمة:</span>
              <span className="text-white font-bold">{myBookings.length} حجز</span>
            </div>
            <div className="flex items-center justify-between py-1.5 flex-row-reverse">
              <span className="text-slate-400">نسبة تلبية وحل طلبات الحجز:</span>
              <span className="text-emerald-400 font-bold">
                {myBookings.length > 0 ? Math.round((completedCount / myBookings.length) * 100) : 100}%
              </span>
            </div>
          </div>
        </div>

        {/* Recent booking sources breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-row-reverse border-b border-slate-850 pb-2.5">
            <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-amber-500" />
              <span>آخر الحجوزات المالية المكتملة</span>
            </h3>
            <span className="text-[10px] text-slate-400">سجل المعاملات</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {completedBookings.length === 0 ? (
              <div className="py-8 text-center text-slate-500 space-y-1.5">
                <AlertCircle className="w-7 h-7 mx-auto text-slate-600" />
                <p className="text-xs">لا يوجد حجوزات مكتملة مسجلة لك حالياً.</p>
                <p className="text-[10px]">عند إتمام عملائك لخدماتك، ستظهر الأرباح هنا تلقائياً.</p>
              </div>
            ) : (
              completedBookings.slice(0, 4).map((book) => (
                <div 
                  key={book.id} 
                  className="bg-slate-950 p-2.5 rounded-xl border border-slate-850/60 flex items-center justify-between flex-row-reverse text-right hover:border-slate-800 transition-all"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">{book.userName}</p>
                    <p className="text-[9px] text-slate-500">
                      التاريخ: {book.preferredDate} | {book.subCategory}
                    </p>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-emerald-400">+{basePrice} ريال</span>
                    <p className="text-[8px] text-slate-500">مكتمل ومسدد ✓</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

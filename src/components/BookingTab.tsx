import { useState } from "react";
import { Booking, Provider, User, AppSettings } from "../types";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Play, 
  CheckCheck, 
  MessageSquare,
  Sparkles,
  UserCheck,
  Smartphone,
  ShieldAlert,
  ClipboardList,
  ChevronLeft,
  Download,
  FileText
} from "lucide-react";
import { db } from "../lib/db";

interface BookingTabProps {
  bookings: Booking[];
  settings: AppSettings;
  currentUser: User | null;
  onOpenChat: (providerId: string, providerName: string) => void;
  onBookingUpdated: () => void;
}

export default function BookingTab({
  bookings,
  settings,
  currentUser,
  onOpenChat,
  onBookingUpdated
}: BookingTabProps) {
  const [filterStatus, setFilterStatus] = useState<string>("الكل");

  // Filter bookings:
  // - Customers (Users) can only see their own bookings.
  // - Providers can only see bookings assigned to them.
  // - Admins/Owners can see ALL bookings.
  const filteredBookings = bookings.filter(b => {
    // Role filter
    let visible = false;
    if (!currentUser) return false;
    
    if (currentUser.role === "owner" || currentUser.role === "admin" || currentUser.role === "supervisor") {
      visible = true;
    } else if (currentUser.role === "provider") {
      visible = b.providerId === `prov_${currentUser.phone}`;
    } else if (currentUser.role === "user") {
      visible = b.userId === currentUser.id;
    }

    if (!visible) return false;

    // Status filter
    if (filterStatus === "الكل") return true;
    return b.status === filterStatus;
  });

  const handleDownloadDocument = (booking: Booking) => {
    const title = `مستند حجز خدمة رقم: ${booking.id}`;
    const divider = "==================================================";
    const content = `
${divider}
             بوابة كل خدمات اليمن (WAM)             
           مستند تأكيد وتفاصيل حجز الخدمة          
${divider}

• رقم الحجز: ${booking.id}
• تاريخ الحجز: ${new Date(booking.timestamp).toLocaleString("ar-YE")}
• حالة الحجز الحالية: ${{
      pending: "انتظار القبول (معلق)",
      accepted: "مقبول ومؤكد وننتظر البدء ⏳",
      in_progress: "قيد التنفيذ والمباشرة حالياً 🛠️",
      completed: "مكتمل بنجاح! ✨",
      cancelled: "ملغى ✕"
    }[booking.status] || booking.status}

${divider}
              بيانات العميل (المستفيد)             
${divider}
• اسم العميل: ${booking.userName}
• رقم الهاتف: ${booking.userPhone}
• عنوان العمل: ${booking.userAddress}

${divider}
              بيانات مقدم الخدمة (الفني)           
${divider}
• اسم الفني: ${booking.providerName}
• رقم فني الخدمة: ${booking.providerId}
• القسم الرئيسي: ${booking.category}
• القسم الفرعي: ${booking.subCategory}

${divider}
                تفاصيل طلب الصيانة                
${divider}
• الموعد المفضل: ${booking.preferredDate}
• الوقت المفضل: ${booking.preferredTime}
• شرح تفاصيل الخدمة:
  ${booking.serviceDetails}

${booking.notes ? `• ملاحظات إضافية:\n  ${booking.notes}\n` : ""}
${divider}
   مستند صادر تلقائياً عن منصة WAM لخدمات اليمن   
  رقم دعم الطوارئ وحل المشكلات: 777644
${divider}
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `WAM_Booking_${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpdateStatus = (bookingId: string, newStatus: Booking["status"]) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        let progress = 0;
        if (newStatus === "accepted") progress = 35;
        if (newStatus === "in_progress") progress = 70;
        if (newStatus === "completed") progress = 100;
        if (newStatus === "cancelled") progress = 100;

        return { 
          ...b, 
          status: newStatus, 
          progress, 
          completedAt: newStatus === "completed" ? Date.now() : 0 
        };
      }
      return b;
    });

    db.saveBookings(updated);

    // Send Notification to customer about booking status update
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const isPendingToConfirmedOrCompleted = 
        booking.status === "pending" && (newStatus === "accepted" || newStatus === "completed");

      const statusArabic = {
        accepted: "مقبول ومؤكد وننتظر البدء ⏳",
        in_progress: "قيد التنفيذ والمباشرة حالياً 🛠️",
        completed: "مكتمل بنجاح! شكراً لتعاملك معنا ✨",
        cancelled: "ملغى من قبل الفني ✕"
      }[newStatus];

      const title = isPendingToConfirmedOrCompleted 
        ? "🚨 تنبيه فوري: تم تأكيد/إتمام حجزك!" 
        : "تحديث حالة الحجز 📅";

      const body = isPendingToConfirmedOrCompleted
        ? `تنبيه فوري: تم تغيير حالة حجزك للخدمة (${booking.subCategory}) من [قيد الانتظار] إلى [${statusArabic}] مباشرةً!`
        : `تم تحديث حالة حجزك للخدمة (${booking.subCategory}) مع الفني ${booking.providerName} إلى: [${statusArabic}]`;

      const systemNotifs = db.getNotifications();
      const newNotif: any = {
        id: `not_${Date.now()}_b_upd`,
        title,
        body,
        type: "booking",
        targetType: "specific",
        targetId: booking.userId,
        targetRole: "user",
        isRead: false,
        timestamp: Date.now()
      };
      db.saveNotifications([...systemNotifs, newNotif]);
    }

    onBookingUpdated();
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 flex-row-reverse shadow-sm shadow-amber-500/5">
            <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>قيد الانتظار</span>
          </span>
        );
      case "accepted":
        return (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 flex-row-reverse shadow-sm shadow-emerald-500/5">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>مقبول ومؤكد</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 flex-row-reverse shadow-sm shadow-sky-500/5">
            <Play className="w-3 h-3 text-sky-400 fill-sky-400/20" />
            <span>تحت العمل</span>
          </span>
        );
      case "completed":
        return (
          <span className="bg-slate-800 text-slate-400 border border-slate-700 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 flex-row-reverse shadow-sm">
            <CheckCheck className="w-3 h-3 text-slate-400" />
            <span>مكتمل بنجاح</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 flex-row-reverse shadow-sm shadow-rose-500/5">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>ملغى / مرفوض</span>
          </span>
        );
    }
  };

  if (!currentUser || currentUser.role === "visitor") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-300 space-y-4 max-w-lg mx-auto font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
        <ShieldAlert className="w-14 h-14 text-amber-500 mx-auto animate-pulse" />
        <h3 className="font-extrabold text-white text-base">جدار الحماية الفوري (Firewall) 🛡️</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          عذراً، لا يمكنك عرض أو طلب الحجوزات كزائر مجهول. يرجى اختيار دورك (مستخدم / فني) في لوحة الحساب العلوية أو تسجيل الدخول للمتابعة وحماية خصوصية البيانات.
        </p>
        <p className="text-[10px] text-slate-500">رقم دعم الطوارئ وحل المشكلات: <span className="text-amber-500 font-bold">777644</span></p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
      {/* Search status filter bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-row-reverse text-right">
        <div className="flex items-center gap-2 justify-end flex-row-reverse">
          <ClipboardList className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-white text-sm">مستندات وجدول الحجوزات المباشرة 📅</h3>
        </div>

        {/* Status filtering tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 flex-row-reverse">
          {["الكل", "pending", "accepted", "in_progress", "completed", "cancelled"].map((st) => {
            const label = {
              "الكل": "الكل",
              "pending": "معلق",
              "accepted": "مؤكد",
              "in_progress": "تحت العمل",
              "completed": "مكتمل",
              "cancelled": "ملغى"
            }[st] || st;

            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border shrink-0 cursor-pointer transition-all ${
                  filterStatus === st
                    ? "bg-amber-500 text-black border-amber-500"
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings list */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 space-y-2">
          <ClipboardList className="w-8 h-8 mx-auto opacity-30 text-amber-500" />
          <p className="text-xs font-semibold">لا توجد حجوزات في هذا التبويب حالياً.</p>
          <p className="text-[10px]">الحجوزات الجديدة للفنيين ستظهر هنا فور إرسالها من العملاء!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const dateObj = new Date(b.timestamp);
            const dateStr = dateObj.toLocaleDateString("ar-YE", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

            return (
              <div 
                key={b.id} 
                className={`bg-slate-900 border rounded-2xl p-4 space-y-4 transition-all text-right ${
                  b.isEmergency 
                    ? "border-red-500 bg-red-950/10 shadow-lg shadow-red-500/10" 
                    : b.status === "pending" 
                      ? "border-amber-500/30 shadow-md shadow-amber-500/5" 
                      : "border-slate-800"
                }`}
              >
                {/* Header info */}
                <div className="flex items-start justify-between flex-row-reverse">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-row-reverse flex-wrap">
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {currentUser.role === "provider" ? `العميل: ${b.userName}` : `الفني: ${b.providerName}`}
                      </span>
                      {getStatusBadge(b.status)}
                      {b.isEmergency && (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] px-2 py-0.5 rounded-full font-extrabold animate-pulse">
                          🚨 طوارئ عاجلة
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[10px] font-semibold">
                      📌 {b.category} | <span className="text-amber-500">{b.subCategory}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono" dir="ltr">{dateStr}</span>
                </div>

                {/* Main Service Description */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed font-medium">
                    <b>تفاصيل الخدمة المطلوبة:</b> {b.serviceDetails}
                  </p>
                  {b.notes && (
                    <p className="text-slate-400 text-[11px]">
                      <b>ملاحظات إضافية:</b> {b.notes}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <p>📅 الموعد المفضل: <span className="text-white font-bold">{b.preferredDate}</span></p>
                    <p>⏰ الوقت المفضل: <span className="text-white font-bold">{b.preferredTime}</span></p>
                    <p>📍 العنوان: <span className="text-white">{b.userAddress}</span></p>
                    <p>📞 رقم الاتصال: <span className="text-white font-mono">{b.userPhone}</span></p>
                  </div>
                </div>

                {/* Progress bar representing the booking lifecycle (PENDING -> ACCEPTED -> IN_PROGRESS -> COMPLETED) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] text-slate-500 flex-row-reverse font-bold">
                    <span className={b.progress >= 100 ? "text-emerald-400" : "text-slate-500"}>مكتمل 🏁</span>
                    <span className={b.progress >= 70 ? "text-sky-400" : "text-slate-500"}>تحت العمل 🛠️</span>
                    <span className={b.progress >= 35 ? "text-emerald-400" : "text-slate-500"}>تم التأكيد ✓</span>
                    <span className={b.progress >= 0 ? "text-amber-500" : "text-slate-500"}>انتظار</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850 relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        b.status === "cancelled" 
                          ? "bg-rose-500 w-full" 
                          : b.status === "completed" 
                          ? "bg-emerald-500" 
                          : b.status === "in_progress" 
                          ? "bg-sky-500" 
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${b.status === "cancelled" ? 100 : b.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action controls for updating booking state */}
                <div className="flex gap-2 justify-end pt-1">
                  {/* Download booking document button */}
                  <button
                    onClick={() => handleDownloadDocument(b)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-bold rounded-xl border border-slate-750 cursor-pointer transition-all flex items-center gap-1.5"
                    title="تحميل مستند الحجز"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>تحميل المستند</span>
                  </button>

                  {/* Chat directly inside application */}
                  <button
                    onClick={() => onOpenChat(b.providerId, b.providerName)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                    title="فتح دردشة مباشرة"
                  >
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </button>

                  {/* Provider Action Buttons */}
                  {currentUser.role === "provider" && b.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(b.id, "cancelled")}
                        className="px-3.5 py-1.5 bg-rose-950/40 hover:bg-rose-950 text-rose-300 text-[10px] font-bold rounded-xl border border-rose-500/20 cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        رفض
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(b.id, "accepted")}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black text-[10px] font-extrabold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-black" />
                        قبول وتأكيد
                      </button>
                    </>
                  )}

                  {currentUser.role === "provider" && b.status === "accepted" && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, "in_progress")}
                      className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-black text-[10px] font-extrabold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 text-black fill-black" />
                      مباشرة وبدء العمل
                    </button>
                  )}

                  {currentUser.role === "provider" && b.status === "in_progress" && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, "completed")}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black text-[10px] font-extrabold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-black" />
                      إتمام العمل وتسليمه
                    </button>
                  )}

                  {/* Customer (User) Action Buttons */}
                  {currentUser.role === "user" && b.status === "pending" && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, "cancelled")}
                      className="px-3.5 py-1.5 bg-rose-950/40 hover:bg-rose-950 text-rose-300 text-[10px] font-bold rounded-xl border border-rose-500/20 cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      إلغاء طلب الحجز
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

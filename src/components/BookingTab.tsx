import React from "react";
import { AppSettings, Booking } from "../types";
import { db } from "../lib/db";
import { 
  CalendarDays, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  MapPin, 
  Phone 
} from "lucide-react";

interface BookingTabProps {
  bookings: Booking[];
  settings: AppSettings;
  currentUser: any;
  onOpenChat: (id: string, name: string) => void;
  onBookingUpdated: () => void;
}

export default function BookingTab({
  bookings,
  settings,
  currentUser,
  onOpenChat,
  onBookingUpdated
}: BookingTabProps) {
  // Filter bookings:
  // If user is provider -> show bookings assigned to them
  // If user is admin/owner/supervisor -> show all bookings
  // If user is standard client -> show their own bookings
  const filteredBookings = bookings.filter(b => {
    if (currentUser.role === "admin" || currentUser.role === "owner" || currentUser.role === "supervisor") {
      return true;
    }
    if (currentUser.role === "provider") {
      return b.providerId === currentUser.id;
    }
    return b.userId === currentUser.id;
  });

  const handleUpdateStatus = (bookingId: string, newStatus: "accepted" | "completed" | "rejected") => {
    const bks = db.getBookings();
    const target = bks.find(b => b.id === bookingId);
    if (!target) return;

    const updated = bks.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    db.saveBookings(updated);

    // If completed and loyalty points are enabled, reward points to user
    if (newStatus === "completed" && settings.loyaltyPointsEnabled) {
      const usersList = db.getUsers();
      const updatedUsers = usersList.map(u => {
        if (u.id === target.userId) {
          return { ...u, loyaltyPoints: (u.loyaltyPoints || 0) + 10 };
        }
        return u;
      });
      db.saveUsers(updatedUsers);
    }

    // System log
    db.addAuditLog("تحديث حالة الحجز", `تحديث حالة الحجز رقم ${bookingId} إلى ${newStatus}`);

    // Notify user
    const systemNotifs = db.getNotifications();
    const newNotif = {
      id: `not_bk_${Date.now()}`,
      title: "تحديث جديد لحالة حجزك 📅",
      body: `تم تحديث حالة حجزك للخدمة (${target.subCategory}) من الفني ${target.providerName} إلى: [${
        newStatus === "accepted" ? "مقبول" : newStatus === "completed" ? "مكتمل" : "مرفوض"
      }]`,
      type: "user" as const,
      targetType: "users" as const,
      targetId: target.userId,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...systemNotifs, newNotif]);

    onBookingUpdated();
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "accepted":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> مقبول ومؤكد</span>;
      case "completed":
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> مكتمل</span>;
      case "rejected":
        return <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> مرفوض</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> قيد الانتظار</span>;
    }
  };

  return (
    <div className="space-y-6 text-right pb-12" dir="rtl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-amber-500" />
          إدارة حجز المواعيد والخدمات
        </h1>
        <p className="text-slate-400 text-xs">
          تصفح طلبات الخدمة والحجوزات ومتابعة تقدم العمل خطوة بخطوة.
        </p>
      </div>

      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div 
              key={booking.id}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-lg hover:border-slate-700/80 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">معرف الحجز: #{booking.id}</span>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    خدمة: {booking.subCategory}
                  </h3>
                </div>
                <div>{getStatusBadge(booking.status)}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Provider details */}
                <div className="p-3 bg-slate-950/40 rounded-xl space-y-2 border border-slate-800/40">
                  <div className="text-[10px] text-amber-500 font-bold">مقدم الخدمة (الفني)</div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold">{booking.providerName}</span>
                  </div>
                </div>

                {/* Client details */}
                <div className="p-3 bg-slate-950/40 rounded-xl space-y-2 border border-slate-800/40">
                  <div className="text-[10px] text-amber-500 font-bold">العميل والمستلم</div>
                  <div className="space-y-1.5 text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold">{booking.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span>{booking.userPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{booking.userAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[10px] text-slate-500">
                  تاريخ الطلب: {new Date(booking.timestamp).toLocaleString("ar-YE")}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (currentUser.role === "provider") {
                        onOpenChat(booking.userId, booking.userName);
                      } else {
                        onOpenChat(booking.providerId, booking.providerName);
                      }
                    }}
                    className="px-3.5 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>مراسلة فورية</span>
                  </button>

                  {/* Provider controls */}
                  {currentUser.role === "provider" && booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, "accepted")}
                        className="px-3.5 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs cursor-pointer transition-all shadow-lg shadow-emerald-500/10"
                      >
                        قبول وتأكيد
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, "rejected")}
                        className="px-3.5 h-9 rounded-xl bg-red-500 hover:bg-red-400 text-black font-extrabold text-xs cursor-pointer transition-all"
                      >
                        رفض
                      </button>
                    </>
                  )}

                  {/* Complete button */}
                  {booking.status === "accepted" && (currentUser.role === "provider" || currentUser.role === "admin" || currentUser.role === "owner") && (
                    <button
                      onClick={() => handleUpdateStatus(booking.id, "completed")}
                      className="px-3.5 h-9 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-extrabold text-xs cursor-pointer transition-all shadow-lg shadow-blue-500/10"
                    >
                      إتمام الخدمة بنجاح
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-500 space-y-2">
          <CalendarDays className="w-10 h-10 mx-auto opacity-30" />
          <p className="text-sm">ليس لديك أي حجوزات نشطة حالياً.</p>
        </div>
      )}
    </div>
  );
}

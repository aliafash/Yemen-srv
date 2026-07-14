import React from "react";
import { AppSettings, Notification } from "../types";
import { db } from "../lib/db";
import { Bell, X, Trash2, CheckCircle } from "lucide-react";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  settings: AppSettings;
  onUpdated: () => void;
}

export default function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  settings,
  onUpdated
}: NotificationCenterProps) {
  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    const notifs = db.getNotifications();
    const updated = notifs.map(n => ({ ...n, isRead: true }));
    db.saveNotifications(updated);
    onUpdated();
  };

  const handleClearNotifications = () => {
    if (window.confirm("⚠️ هل تريد مسح كافة الإشعارات المسجلة لديك؟")) {
      db.saveNotifications([]);
      onUpdated();
    }
  };

  const handleMarkRead = (id: string) => {
    const notifs = db.getNotifications();
    const updated = notifs.map(n => {
      if (n.id === id) {
        return { ...n, isRead: true };
      }
      return n;
    });
    db.saveNotifications(updated);
    onUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative h-[500px] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-800/85 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500 animate-swing" />
            <h3 className="text-sm font-bold text-white">مركز الإشعارات والتنبيهات المستمرة</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-950/40 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Action controls */}
        {notifications.length > 0 && (
          <div className="p-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs font-semibold">
            <button
              onClick={handleMarkAllRead}
              className="px-2.5 py-1 text-slate-400 hover:text-amber-500 transition-all cursor-pointer flex items-center gap-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>تحديد الكل كمقروء</span>
            </button>

            <button
              onClick={handleClearNotifications}
              className="px-2.5 py-1 text-red-500/80 hover:text-red-500 transition-all cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح كافة التنبيهات</span>
            </button>
          </div>
        )}

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-slate-950/20">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleMarkRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all text-xs space-y-1.5 cursor-pointer select-none ${
                  notif.isRead 
                    ? "bg-slate-900/40 border-slate-800/60 text-slate-400" 
                    : "bg-slate-900 border-slate-700/80 text-slate-200 shadow shadow-amber-500/5 ring-1 ring-amber-500/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${notif.isRead ? "text-slate-400" : "text-white"}`}>{notif.title}</span>
                  <span className="text-[9px] text-slate-500">{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">{notif.body}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 h-full text-slate-500 space-y-2">
              <Bell className="w-12 h-12 opacity-25 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-400">لا توجد أي إشعارات جديدة حالياً</h3>
              <p className="text-xs text-slate-500">عند حجز خدمة أو تلقي رسائل أو عروض جديدة ستظهر تفاصيلها فوراً في هذا المكان.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

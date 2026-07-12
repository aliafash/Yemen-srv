import { useState } from "react";
import { Notification, AppSettings } from "../types";
import { 
  Bell, 
  Trash2, 
  CheckCheck, 
  X, 
  Sparkles, 
  MessageSquare, 
  CalendarDays, 
  ShieldAlert, 
  Info 
} from "lucide-react";
import { db } from "../lib/db";

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
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    db.saveNotifications(updated);
    onUpdated();
  };

  const handleClearAll = () => {
    db.saveNotifications([]);
    onUpdated();
  };

  const handleDeleteOne = (notifId: string) => {
    const filtered = notifications.filter(n => n.id !== notifId);
    db.saveNotifications(filtered);
    onUpdated();
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return <CalendarDays className="w-4 h-4 text-purple-400" />;
      case "chat":
        return <MessageSquare className="w-4 h-4 text-sky-400" />;
      case "admin":
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case "promotion":
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/60 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-16 animate-fade-in flex flex-col h-[480px]">
        
        {/* Header toolbar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-row-reverse shrink-0">
          <div className="flex items-center gap-1.5 flex-row-reverse">
            <Bell className="w-5 h-5 text-amber-500 animate-swing" />
            <h3 className="font-extrabold text-white text-sm">مركز الإشعارات والتنبيهات 🔔</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action controls */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-850 flex items-center justify-between flex-row-reverse text-[10px] text-slate-400 shrink-0 select-none">
            <button 
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 hover:text-amber-400 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-amber-500" />
              تعيين المقروء للكل
            </button>
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-1 hover:text-rose-400 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              مسح جميع الإشعارات
            </button>
          </div>
        )}

        {/* Body content */}
        <div className="grow overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
              <Bell className="w-10 h-10 text-slate-700 opacity-30 animate-pulse" />
              <p className="text-xs font-semibold">صندوق الإشعارات فارغ حالياً.</p>
              <p className="text-[10px] text-slate-650">سنبقيك على اطلاع عندما يتغير حجز أو تصلك رسالة جديدة!</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`group p-3 rounded-xl border transition-all relative flex gap-3 flex-row-reverse text-right overflow-hidden ${
                  notif.isRead 
                    ? "bg-slate-950/20 border-slate-850" 
                    : "bg-slate-850 border-slate-800/80 shadow shadow-amber-500/5"
                }`}
              >
                {/* Visual Type Indicator Icon */}
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                  {getIcon(notif.type)}
                </div>

                {/* Details text */}
                <div className="grow min-w-0 space-y-1">
                  <div className="flex items-center justify-between flex-row-reverse gap-2">
                    <h4 className={`text-xs font-bold truncate ${notif.isRead ? "text-slate-300" : "text-white"}`}>
                      {notif.title}
                    </h4>
                    {!notif.isRead && (
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" title="غير مقروء" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed truncate-2-lines">{notif.body}</p>
                  <span className="text-[9px] text-slate-650 font-mono block">
                    {new Date(notif.timestamp).toLocaleTimeString("ar-YE", { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>

                {/* Swipe/Delete single action trigger */}
                <button
                  onClick={() => handleDeleteOne(notif.id)}
                  className="opacity-0 group-hover:opacity-100 absolute left-2 top-3 p-1 rounded hover:bg-rose-950 text-slate-500 hover:text-rose-400 transition-opacity cursor-pointer shrink-0"
                  title="حذف هذا التنبيه"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

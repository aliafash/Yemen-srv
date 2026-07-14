import React, { useState } from "react";
import { AppSettings, Provider, PendingProvider, Booking, User, Notification } from "../types";
import { db } from "../lib/db";
import { 
  Sliders, 
  Users, 
  FileCheck, 
  Calendar, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  Star, 
  ShieldCheck, 
  Settings, 
  Eye, 
  Lock, 
  Trash2, 
  Sparkles, 
  Globe 
} from "lucide-react";

interface AdminPanelProps {
  settings: AppSettings;
  providers: Provider[];
  pendingProviders: PendingProvider[];
  bookings: Booking[];
  chats: any[];
  notifications: Notification[];
  users: User[];
  onUpdateSettings: (s: AppSettings) => void;
  onRefreshData: () => void;
  currentUser: any;
}

export default function AdminPanel({
  settings,
  providers,
  pendingProviders,
  bookings,
  chats,
  notifications,
  users,
  onUpdateSettings,
  onRefreshData,
  currentUser
}: AdminPanelProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<"settings" | "providers" | "pending" | "bookings">("settings");
  const [formData, setFormData] = useState({ ...settings });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    db.saveSettings(formData);
    db.addAuditLog("تعديل إعدادات النظام", "قام المسؤول بحفظ الإعدادات والتطبيقات العامة بنجاح.");
    alert("✅ تم حفظ وتطبيق الإعدادات بنجاح في كافة واجهات الموقع!");
  };

  const handleApproveProvider = (id: string) => {
    const pendingList = db.getPendingProviders();
    const target = pendingList.find(p => p.id === id);
    if (!target) return;

    // Move to approved
    const newProv: Provider = {
      ...target,
      id: `prov_${Date.now()}`,
      isAvailable: true,
      isVerified: true,
      isRecommended: true,
      isPinned: false,
      isSubscribed: false,
      callsCount: 0,
      rating: 4.5,
      ratingsCount: 0,
      completedBookingsCount: 0,
    };

    const currentProviders = db.getProviders();
    db.saveProviders([newProv, ...currentProviders]);

    // Remove from pending
    const updatedPending = pendingList.filter(p => p.id !== id);
    db.saveCollection("pending_providers", updatedPending);

    // Notify User/Provider
    const systemNotifs = db.getNotifications();
    const newNotif = {
      id: `not_app_${Date.now()}`,
      title: "تم توثيق وتفعيل حسابك الفني بنجاح! 🎉",
      body: `مبروك! تم تفعيل حسابك كفني معتمد ومزود خدمة رسمي في منصة ${settings.appName}. يمكنك استقبال الطلبات والرسائل الآن.`,
      type: "provider" as const,
      targetType: "providers" as const,
      targetId: newProv.id,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...systemNotifs, newNotif]);

    db.addAuditLog("اعتماد فني جديد", `تم قبول وتنشيط حساب الفني ${target.name} بنجاح.`);
    onRefreshData();
    alert("✅ تم اعتماد وتفعيل حساب الفني بنجاح!");
  };

  const handleRejectProvider = (id: string) => {
    const pendingList = db.getPendingProviders();
    const updated = pendingList.filter(p => p.id !== id);
    db.saveCollection("pending_providers", updated);
    db.addAuditLog("رفض فني", `تم رفض طلب انضمام الفني ذو المعرف ${id}.`);
    onRefreshData();
    alert("❌ تم رفض طلب انضمام الفني وحذفه.");
  };

  const handleTogglePin = (id: string) => {
    const provs = db.getProviders();
    const updated = provs.map(p => {
      if (p.id === id) {
        return { ...p, isPinned: !p.isPinned };
      }
      return p;
    });
    db.saveProviders(updated);
    db.addAuditLog("تعديل تمييز فني", `تم تعديل حالة تمييز VIP للفني ذو المعرف ${id}.`);
    onRefreshData();
  };

  return (
    <div className="space-y-6 text-right pb-12" dir="rtl">
      {/* Dashboard Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-500 font-bold block">الفنيون المعتمدون</span>
          <span className="text-2xl font-black text-white">{providers.length}</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-500 font-bold block">طلبات قيد المراجعة</span>
          <span className="text-2xl font-black text-amber-500">{pendingProviders.length}</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-500 font-bold block">إجمالي حجز الخدمات</span>
          <span className="text-2xl font-black text-emerald-500">{bookings.length}</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-500 font-bold block">إجمالي المستخدمين</span>
          <span className="text-2xl font-black text-blue-500">{users.length}</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-slate-800 flex gap-2.5 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab("settings")}
          className={`h-11 px-4 text-xs font-bold border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-all ${
            activeAdminTab === "settings"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>إعدادات ومعلومات النظام</span>
        </button>

        <button
          onClick={() => setActiveAdminTab("pending")}
          className={`h-11 px-4 text-xs font-bold border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-all ${
            activeAdminTab === "pending"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-white"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>طلبات الانضمام ({pendingProviders.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab("providers")}
          className={`h-11 px-4 text-xs font-bold border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-all ${
            activeAdminTab === "providers"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة الفنيين ({providers.length})</span>
        </button>
      </div>

      {/* Tab 1: General Settings */}
      {activeAdminTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-xl">
          <h3 className="text-xs font-black text-amber-500 tracking-wider uppercase border-b border-slate-800/60 pb-1.5">
            إعدادات شريط التطبيق ومعلومات التواصل للعملاء
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">اسم منصة الموقع واللوجو</label>
              <input
                type="text"
                required
                value={formData.appName}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">رابط الموقع الرسمي</label>
              <input
                type="text"
                value={formData.websiteLink || ""}
                onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">قناة تليجرام</label>
              <input
                type="text"
                value={formData.telegramLink || ""}
                onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">صفحة فيسبوك</label>
              <input
                type="text"
                value={formData.facebookLink || ""}
                onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">صفحة إنستجرام</label>
              <input
                type="text"
                value={formData.instagramLink || ""}
                onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl cursor-pointer shadow-lg shadow-amber-500/15"
          >
            حفظ وتحديث معلومات المنصة
          </button>
        </form>
      )}

      {/* Tab 2: Pending Providers */}
      {activeAdminTab === "pending" && (
        <div className="space-y-4">
          {pendingProviders.length > 0 ? (
            pendingProviders.map((pending) => (
              <div key={pending.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-bold">معلق المراجعة</span>
                  <h4 className="text-sm font-bold text-white">{pending.name}</h4>
                  <p className="text-slate-400 text-xs">{pending.category} • {pending.subCategory} • {pending.area}</p>
                  <p className="text-slate-500 text-xs">رقم الهاتف: {pending.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveProvider(pending.id)}
                    className="px-3.5 h-9 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs cursor-pointer flex items-center gap-1 shadow"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>اعتماد وتنشيط</span>
                  </button>

                  <button
                    onClick={() => handleRejectProvider(pending.id)}
                    className="px-3.5 h-9 rounded-lg bg-red-500 hover:bg-red-400 text-black font-extrabold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>رفض الطلب</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-500 space-y-2">
              <FileCheck className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-sm">لا توجد طلبات انضمام جديدة للمراجعة والتحقق حالياً.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Approved Providers List */}
      {activeAdminTab === "providers" && (
        <div className="space-y-4">
          {providers.map((p) => (
            <div key={p.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  {p.isPinned && <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-black" /> VIP</span>}
                </div>
                <p className="text-slate-400 text-xs">{p.category} • {p.subCategory}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePin(p.id)}
                  className={`px-3 h-8 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    p.isPinned
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.isPinned ? "إلغاء تمييز VIP" : "ترقية إلى VIP"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

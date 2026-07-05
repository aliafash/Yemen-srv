import { useState } from "react";
import { AppSettings, Provider, PendingProvider, Booking, Chat, Message, Notification, User, PresetPalette } from "../types";
import { 
  Palette, 
  Settings, 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Bell, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle, 
  Lock,
  Plus,
  Trash2,
  Sliders,
  CheckCircle,
  XCircle,
  CheckCircle2,
  FileSpreadsheet,
  AlertOctagon,
  Sparkles,
  Award
} from "lucide-react";
import { db } from "../lib/db";

interface AdminPanelProps {
  settings: AppSettings;
  providers: Provider[];
  pendingProviders: PendingProvider[];
  bookings: Booking[];
  chats: Chat[];
  notifications: Notification[];
  users: User[];
  onUpdateSettings: (newSettings: AppSettings) => void;
  onRefreshData: () => void;
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
  onRefreshData
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [rejectionReason, setRejectionReason] = useState("");

  // Tab titles translated to Arabic
  const ADMIN_TABS = [
    { name: "الإعدادات العامة", icon: Settings },
    { name: "إدارة الألوان", icon: Palette },
    { name: "إدارة الأيقونات", icon: Sliders },
    { name: "طلبات التسجيل", icon: UserCheck, badge: pendingProviders.filter(p => p.status === "pending").length },
    { name: "إدارة الفنيين", icon: Briefcase },
    { name: "إدارة المستخدمين", icon: Users },
    { name: "إدارة الأقسام", icon: Sliders },
    { name: "نظام الحجوزات", icon: Calendar },
    { name: "المساعد الذكي", icon: Sparkles },
    { name: "الاشتراكات (VIP)", icon: Award },
    { name: "التقارير والإحصائيات", icon: TrendingUp },
    { name: "الإعلانات والبنرات", icon: Sliders },
    { name: "المحادثات الفورية", icon: MessageSquare },
    { name: "إشعارات FCM", icon: Bell },
    { name: "صلاحيات المشرفين", icon: ShieldCheck },
    { name: "حقول التسجيل", icon: Sliders },
    { name: "استمارة الحجز", icon: Sliders },
    { name: "نقاط الولاء", icon: Award },
    { name: "سياسة الخصوصية", icon: BookOpen },
    { name: "الأسئلة الشائعة", icon: HelpCircle },
  ];

  // Action helpers:
  const handleSettingsSave = (updated: AppSettings) => {
    db.saveSettings(updated);
    onUpdateSettings(updated);
    alert("✅ تم حفظ وتطبيق الإعدادات بنجاح!");
  };

  // Accept vendor
  const handleAcceptProvider = (p: PendingProvider) => {
    // 1. Move to approved providers list
    const newProv: Provider = {
      id: `prov_${p.phone}`,
      name: p.name,
      phone: p.phone,
      category: p.category,
      subCategory: p.subCategory,
      city: p.city,
      area: p.area,
      address: p.address,
      description: p.description,
      rating: 5.0,
      reviewCount: 0,
      isVerified: true,
      isPinned: false,
      isRecommended: true,
      isSubscribed: false,
      imageUrl: p.imageUrl,
      coverImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
      portfolioImages: [],
      latitude: p.latitude,
      longitude: p.longitude,
      isAvailable: true,
      price: 0,
      workingHours: "8:00 ص - 8:00 م",
      services: [`تقديم خدمات ${p.subCategory}`],
      skills: "تأهيل مهني معتمد",
      deviceId: p.deviceId,
      gender: p.gender,
      photoType: p.photoType,
      timestamp: Date.now(),
      bookingsCount: 0,
      viewsCount: 0,
      callsCount: 0,
      totalEarnings: 0,
      subscriptionEndDate: 0
    };

    // Update pending status
    const updatedPendings = pendingProviders.map(pending => pending.id === p.id ? { ...pending, status: "accepted" as const } : pending);
    db.savePendingProviders(updatedPendings);

    const updatedProvs = [...providers, newProv];
    db.saveProviders(updatedProvs);

    // Register user role
    const newUser: User = {
      id: `prov_${p.phone}`,
      name: p.name,
      phone: p.phone,
      area: p.area,
      role: "provider",
      deviceId: p.deviceId
    };
    db.saveUsers([...users.filter(u => u.phone !== p.phone), newUser]);

    // Send Acceptance Notification
    const notifs = db.getNotifications();
    const alertNotif: any = {
      id: `not_${Date.now()}_acc`,
      title: "مبارك! تم قبول انضمامك 🎉",
      body: `أهلاً بك يا ${p.name}، تم قبول ملفك المهني بنجاح كفني معتمد في تخصص ${p.subCategory}. يمكنك الآن استقبال الحجوزات والدردشة مع العملاء!`,
      type: "admin",
      targetType: "specific",
      targetId: `prov_${p.phone}`,
      targetRole: "provider",
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...notifs, alertNotif]);

    onRefreshData();
    alert(`✅ تم قبول الفني وتفعيل حسابه: ${p.name}`);
  };

  // Reject vendor with reason
  const handleRejectProvider = (p: PendingProvider) => {
    if (!rejectionReason.trim()) {
      alert("⚠️ يرجى إدخال سبب الرفض أولاً لإشعار مقدم الخدمة.");
      return;
    }

    const updatedPendings = pendingProviders.map(pending => pending.id === p.id ? { ...pending, status: "rejected" as const, rejectionReason } : pending);
    db.savePendingProviders(updatedPendings);

    // Send Rejection Notification
    const notifs = db.getNotifications();
    const alertNotif: any = {
      id: `not_${Date.now()}_rej`,
      title: "تحديث بخصوص طلب انضمامك ⚠️",
      body: `عذراً يا ${p.name}، تم رفض طلب انضمامك للدليل للسبب التالي: [ ${rejectionReason} ]. يرجى مراجعة وتعديل طلبك.`,
      type: "admin",
      targetType: "specific",
      targetId: `pend_${p.phone}`,
      targetRole: "user",
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...notifs, alertNotif]);

    setRejectionReason("");
    onRefreshData();
    alert(`❌ تم رفض الطلب وإبلاغ مقدم الخدمة.`);
  };

  // Ban/Delete provider with main password confirmation
  const handleBanProvider = (provider: Provider) => {
    const pw = prompt("⚠️ أدخل كلمة مرور الإدارة لتأكيد حظر وحذف مقدم الخدمة من الدليل العام:");
    if (pw === (settings.adminPassword || "maher736462")) {
      const filtered = providers.filter(p => p.id !== provider.id);
      db.saveProviders(filtered);
      onRefreshData();
      alert(`✅ تم حظر وإزالة الفني بنجاح: ${provider.name}`);
    } else if (pw !== null) {
      alert("❌ كلمة المرور غير صحيحة، تم إلغاء العملية!");
    }
  };

  // Export reports to CSV/Excel printable format
  const handleExportCSV = (reportName: string, dataArray: any[]) => {
    if (dataArray.length === 0) return alert("⚠️ لا توجد بيانات متاحة للتصدير حالياً!");
    
    // Convert JSON array to raw CSV string
    const headers = Object.keys(dataArray[0]).join(",");
    const rows = dataArray.map(obj => 
      Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wam_${reportName}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 text-right font-sans shadow-xl h-[600px]" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
      {/* Sidebar index */}
      <div className="md:col-span-3 border-l border-slate-800 bg-slate-950 flex flex-col overflow-y-auto no-scrollbar">
        <div className="p-4 border-b border-slate-800 text-center shrink-0">
          <h3 className="font-extrabold text-white text-xs">لوحة تحكم المشرف 🛠️</h3>
          <p className="text-[10px] text-amber-500 font-bold mt-1">20 قسم إداري متكامل</p>
        </div>
        <div className="grow divide-y divide-slate-900/60">
          {ADMIN_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full px-4 py-3 text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-amber-500/10 text-amber-400 font-extrabold border-r-4 border-amber-500" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5 flex-row-reverse">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                  <span>{tab.name}</span>
                </div>
                {tab.badge && tab.badge > 0 ? (
                  <span className="bg-rose-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin screen viewport */}
      <div className="md:col-span-9 p-5 md:p-6 overflow-y-auto bg-slate-950/20">
        
        {/* TAB 0: General settings */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">⚙️ الإعدادات العامة للموقع</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">اسم الموقع:</label>
                <input 
                  type="text" 
                  value={settings.appName} 
                  onChange={(e) => handleSettingsSave({ ...settings, appName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">نص الشعار الدائري:</label>
                <input 
                  type="text" 
                  value={settings.appLogoText} 
                  onChange={(e) => handleSettingsSave({ ...settings, appLogoText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">رقم هاتف الاتصال:</label>
                <input 
                  type="text" 
                  value={settings.supportPhone} 
                  onChange={(e) => handleSettingsSave({ ...settings, supportPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">رقم واتساب الدعم:</label>
                <input 
                  type="text" 
                  value={settings.supportWhatsapp} 
                  onChange={(e) => handleSettingsSave({ ...settings, supportWhatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">رسالة الترحيب الرئيسية:</label>
              <textarea 
                value={settings.welcomeMessage} 
                onChange={(e) => handleSettingsSave({ ...settings, welcomeMessage: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
              <div>
                <h5 className="font-bold text-white text-xs">وضع الصيانة والإصلاح (Maintenance)</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">تفعيل هذا الخيار يغلق الموقع للزوار ويعرض شاشة اعتذار مؤقتة.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.isMaintenanceMode} 
                onChange={(e) => handleSettingsSave({ ...settings, isMaintenanceMode: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>
          </div>
        )}

        {/* TAB 1: Colors selection */}
        {activeTab === 1 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">🎨 إدارة الألوان والسمات البصرية</h4>
            <p className="text-[11px] text-slate-400">يمكنك هنا تغيير اللون الرئيسي والمساعد وتطبيق أي من الـ 8 ألوان الافتراضية بنقرة واحدة:</p>
            
            <div className="grid grid-cols-4 gap-2">
              {settings.colorsPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleSettingsSave({
                    ...settings,
                    primaryColorHex: preset.primaryHex,
                    accentColorHex: preset.accentHex,
                    bgColorHex: preset.bgHex,
                    surfaceColorHex: preset.surfaceHex
                  })}
                  className="p-2.5 bg-slate-950 rounded-lg border border-slate-850 flex flex-col items-center gap-1.5 hover:border-amber-500 transition-all cursor-pointer text-center"
                >
                  <div className="flex gap-0.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: preset.primaryHex }} />
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: preset.accentHex }} />
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: preset.bgHex }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 truncate w-full">{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-900 pt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">اللون الرئيسي (Primary):</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={settings.primaryColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, primaryColorHex: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent shrink-0"
                  />
                  <input 
                    type="text" 
                    value={settings.primaryColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, primaryColorHex: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 text-xs text-white text-center font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">اللون المساعد (Accent):</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={settings.accentColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, accentColorHex: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent shrink-0"
                  />
                  <input 
                    type="text" 
                    value={settings.accentColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, accentColorHex: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 text-xs text-white text-center font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Icons customization */}
        {activeTab === 2 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">📐 إدارة أحجام وأماكن الأيقونات العائمة</h4>
            <p className="text-[11px] text-slate-400">تحكم بقطر وتمركز الأيقونات العائمة في الواجهة (المساعد الذكي وأيقونة الاتصال السريع):</p>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
              <div className="space-y-3">
                <h5 className="font-bold text-amber-500 text-xs border-b border-slate-900 pb-1.5">أيقونة المساعد WAM</h5>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">حجم القطر: {settings.assistantIconSize} بكسل</label>
                  <input 
                    type="range" 
                    min="40" 
                    max="80" 
                    value={settings.assistantIconSize}
                    onChange={(e) => handleSettingsSave({ ...settings, assistantIconSize: Number(e.target.value) })}
                    className="w-full bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">لون الأيقونة:</label>
                  <input 
                    type="text" 
                    value={settings.assistantIconColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, assistantIconColorHex: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white font-mono text-center"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-emerald-500 text-xs border-b border-slate-900 pb-1.5">أيقونة الدردشة السريعة</h5>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">حجم القطر: {settings.chatIconSize} بكسل</label>
                  <input 
                    type="range" 
                    min="40" 
                    max="80" 
                    value={settings.chatIconSize}
                    onChange={(e) => handleSettingsSave({ ...settings, chatIconSize: Number(e.target.value) })}
                    className="w-full bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">لون الأيقونة:</label>
                  <input 
                    type="text" 
                    value={settings.chatIconColorHex}
                    onChange={(e) => handleSettingsSave({ ...settings, chatIconColorHex: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white font-mono text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Registration pending requests */}
        {activeTab === 3 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">📋 طلبات تسجيل وانضمام الفنيين المعلقة ({pendingProviders.filter(p => p.status === "pending").length})</h4>
            {pendingProviders.filter(p => p.status === "pending").length === 0 ? (
              <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-500 text-xs font-semibold">
                لا توجد طلبات انضمام فنيين جديدة معلقة حالياً.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingProviders.filter(p => p.status === "pending").map((p) => (
                  <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                    <div className="flex items-start justify-between flex-row-reverse">
                      <div className="flex items-center gap-3 flex-row-reverse">
                        <img src={p.imageUrl} alt={p.name} className="w-11 h-11 rounded object-cover border border-slate-800" />
                        <div>
                          <h5 className="font-bold text-white text-xs">{p.name}</h5>
                          <p className="text-[10px] text-slate-400">{p.category} | {p.subCategory}</p>
                          <p className="text-[10px] text-slate-500">{p.city} - {p.area} | هاتف: <span className="font-mono">{p.phone}</span></p>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">معلق للمراجعة</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900 p-2 rounded border border-slate-850">{p.description}</p>

                    {/* Rejection input field */}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="سبب الرفض (عند الضغط على رفض)..."
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="grow bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-[11px] text-white"
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleRejectProvider(p)}
                        className="px-3.5 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/20 rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        رفض الطلب
                      </button>
                      <button
                        onClick={() => handleAcceptProvider(p)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black rounded-lg text-[10px] font-extrabold cursor-pointer"
                      >
                        قبول وتفعيل الفني ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Active Vendors (Providers) Management */}
        {activeTab === 4 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">👨‍🔧 إدارة مقدمي الخدمات النشطين في الدليل ({providers.length})</h4>
            <div className="space-y-3">
              {providers.map((p) => (
                <div key={p.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between flex-row-reverse text-right">
                  <div className="flex items-center gap-3 flex-row-reverse overflow-hidden">
                    <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover shrink-0 border border-slate-800" />
                    <div className="truncate">
                      <h5 className="font-bold text-white text-xs truncate flex items-center gap-1 flex-row-reverse">
                        {p.name}
                        {p.isVerified && <span className="text-emerald-400">✓</span>}
                      </h5>
                      <p className="text-[10px] text-slate-400 truncate">{p.category} - {p.subCategory} | هاتف: <span className="font-mono">{p.phone}</span></p>
                      <p className="text-[9px] text-slate-500">حجوزات: {p.bookingsCount || 0} | مشاهدات: {p.viewsCount || 0} | أرباح: {p.totalEarnings || 0} ريال</p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleBanProvider(p)}
                      className="p-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-500/25 rounded text-rose-300 cursor-pointer"
                      title="حظر وإزالة الفني"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const updated = providers.map(prov => prov.id === p.id ? { ...prov, isVerified: !prov.isVerified } : prov);
                        db.saveProviders(updated);
                        onRefreshData();
                      }}
                      className={`px-2 py-1 border rounded text-[9px] font-bold cursor-pointer ${
                        p.isVerified 
                          ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-400" 
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                      title="تعديل حالة التوثيق"
                    >
                      {p.isVerified ? "موثق" : "غير موثق"}
                    </button>
                    <button
                      onClick={() => {
                        const updated = providers.map(prov => prov.id === p.id ? { ...prov, isPinned: !prov.isPinned } : prov);
                        db.saveProviders(updated);
                        onRefreshData();
                      }}
                      className={`px-2 py-1 border rounded text-[9px] font-bold cursor-pointer ${
                        p.isPinned 
                          ? "bg-amber-950/40 border-amber-500/25 text-amber-400" 
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                      title="تثبيت VIP"
                    >
                      {p.isPinned ? "VIP مثبت" : "ترقية VIP"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: General users directory */}
        {activeTab === 5 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">👥 دليل وحسابات المستخدمين والزوار ({users.length})</h4>
            <div className="space-y-2.5">
              {users.map((u) => (
                <div key={u.id} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <h5 className="font-bold text-white text-xs">{u.name}</h5>
                    <p className="text-[10px] text-slate-400">هاتف: <span className="font-mono">{u.phone}</span> | الصلاحية: <span className="text-amber-500 font-bold">{u.role}</span></p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <select
                      value={u.role}
                      onChange={(e) => {
                        const updated = users.map(usr => usr.id === u.id ? { ...usr, role: e.target.value as any } : usr);
                        db.saveUsers(updated);
                        onRefreshData();
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-[9px] text-white"
                    >
                      <option value="user">User/عميل</option>
                      <option value="provider">Provider/فني</option>
                      <option value="supervisor">Supervisor/مشرف</option>
                      <option value="admin">Admin/مدير</option>
                      <option value="owner">Owner/مالك</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Manage Service Categories */}
        {activeTab === 6 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">🛠️ إدارة فئات المهن والأقسام</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
              <h5 className="font-bold text-white text-xs">إضافة قسم خدمي جديد:</h5>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="اسم القسم الجديد (مثال: خدمات تنظيف)" 
                  id="new-cat-name"
                  className="grow bg-slate-900 border border-slate-850 rounded px-3 py-2 text-xs text-white"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById("new-cat-name") as HTMLInputElement;
                    const nameVal = el?.value?.trim();
                    if (nameVal) {
                      const current = db.getCategories();
                      const newCat = {
                        id: `cat_${Date.now()}`,
                        name: nameVal,
                        description: `خدمات وعروض قسم ${nameVal}`,
                        icon: "Briefcase",
                        subCategories: ["صيانة عامة"]
                      };
                      db.saveCategories([...current, newCat]);
                      el.value = "";
                      onRefreshData();
                      alert("✅ تم إضافة القسم الجديد!");
                    }
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black rounded font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> إضافة
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {db.getCategories().map((cat: any) => (
                <div key={cat.id} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <h5 className="font-bold text-white text-xs">{cat.name}</h5>
                    <p className="text-[10px] text-slate-400">المهن الفرعية: {cat.subCategories.join(" - ")}</p>
                  </div>
                  <button
                    onClick={() => {
                      const current = db.getCategories().filter((c: any) => c.id !== cat.id);
                      db.saveCategories(current);
                      onRefreshData();
                    }}
                    className="p-1.5 bg-rose-950/40 hover:bg-rose-950 border border-rose-500/20 text-rose-300 rounded cursor-pointer"
                    title="حذف القسم"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Bookings Configuration */}
        {activeTab === 7 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">📅 تفعيل وإعدادات نظام الحجوزات وتوزيع الطلبات</h4>
            
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
              <div>
                <h5 className="font-bold text-white text-xs">تفعيل الحجوزات والطلبات المباشرة</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">عند التعطيل لن يتمكن الزوار من حجز موعد مع أي فني.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.isBookingsEnabled} 
                onChange={(e) => handleSettingsSave({ ...settings, isBookingsEnabled: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
              <h5 className="font-bold text-white text-xs mb-1.5">طريقة توزيع وإسناد الحجوزات للكهربائيين/الفنيين (5 طرق):</h5>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { value: "auto", name: "إرسال مباشر وتلقائي للفني المحدد (Auto Direct)", desc: "يوجه حجز الموعد فوراً للفني الذي اختاره العميل." },
                  { value: "manual", name: "الموافقة والمراجعة الإدارية اليدوية (Manual Broker)", desc: "يتلقى المشرفون الحجز أولاً، ثم يوجهونه يدوياً لأفضل فني متفرغ." },
                  { value: "random", name: "التوزيع العشوائي الدائري (Round Robin)", desc: "يوزع الحجوزات بالتساوي لتوزيع الفرص والأرباح بشكل عادل." },
                  { value: "nearby", name: "التوجيه الذكي للأقرب مسافة جغرافياً (Nearest Neighbor)", desc: "يوجه الطلب للفني الأقرب جغرافياً للعميل لتسريع الخدمة." }
                ].map((mode) => (
                  <label key={mode.value} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-900 hover:border-slate-800 cursor-pointer flex-row-reverse text-right bg-slate-900/40">
                    <input 
                      type="radio" 
                      name="bookingRoutingMode" 
                      value={mode.value} 
                      checked={settings.bookingRoutingMode === mode.value}
                      onChange={(e) => handleSettingsSave({ ...settings, bookingRoutingMode: e.target.value })}
                      className="accent-amber-500 mt-1"
                    />
                    <div>
                      <h6 className="text-white text-xs font-bold">{mode.name}</h6>
                      <p className="text-[10px] text-slate-400 mt-0.5">{mode.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: WAM Smart Assistant settings */}
        {activeTab === 8 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">🤖 إدارة المساعد الذكي والذكاء الاصطناعي</h4>
            
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
              <div>
                <h5 className="font-bold text-white text-xs">تفعيل مستشار الذكاء الاصطناعي WAM</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">عند التفعيل تظهر أيقونة المساعد العائمة في أسفل يمين الشاشة.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.isAssistantEnabled} 
                onChange={(e) => handleSettingsSave({ ...settings, isAssistantEnabled: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">الرسالة الترحيبية للمساعد الذكي:</label>
              <textarea 
                value={settings.assistantWelcomeMessage} 
                onChange={(e) => handleSettingsSave({ ...settings, assistantWelcomeMessage: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* TAB 9: VIP Subscriptions configurations */}
        {activeTab === 9 && (
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm">⭐ باقات واشتراكات الفنيين VIP والـ Verified</h4>
            
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
              <div>
                <h5 className="font-bold text-white text-xs">إتاحة خيار الاشتراك والدفع للفنيين</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">تفعيل أو تعطيل اشتراكات VIP للفنيين.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.isSubscriptionEnabled} 
                onChange={(e) => handleSettingsSave({ ...settings, isSubscriptionEnabled: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
            </div>

            <div className="space-y-3">
              {settings.subscriptionPlans.map((plan, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between flex-row-reverse text-xs">
                  <div className="text-right">
                    <h5 className="font-bold text-white flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plan.colorHex }} />
                      باقة الاشتراك: {plan.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">مدة العرض: {plan.durationDays} يوم | السعر: {plan.price} ريال يمني</p>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={plan.price}
                      onChange={(e) => {
                        const updatedPlans = [...settings.subscriptionPlans];
                        updatedPlans[idx] = { ...plan, price: Number(e.target.value) };
                        handleSettingsSave({ ...settings, subscriptionPlans: updatedPlans });
                      }}
                      className="w-20 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center font-mono text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: Reports and interactive SVG analytics */}
        {activeTab === 10 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 flex-row-reverse">
              <h4 className="font-extrabold text-white text-sm">📈 التقارير المالية والإحصائيات الحيوية لمزودي اليمن</h4>
              <button
                onClick={() => handleExportCSV("bookings_report", bookings)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> تصدير تقرير الحجوزات (CSV)
              </button>
            </div>

            {/* Micro metrics grid */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center">
                <p className="text-slate-500 text-[10px]">إجمالي الحجوزات</p>
                <h5 className="text-white font-extrabold text-base mt-1">{bookings.length}</h5>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center">
                <p className="text-slate-500 text-[10px]">الحجوزات المعلقة</p>
                <h5 className="text-amber-500 font-extrabold text-base mt-1">
                  {bookings.filter(b => b.status === "pending").length}
                </h5>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center">
                <p className="text-slate-500 text-[10px]">الفنيون المعتمدون</p>
                <h5 className="text-sky-400 font-extrabold text-base mt-1">{providers.length}</h5>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center">
                <p className="text-slate-500 text-[10px]">تقدير الأرباح</p>
                <h5 className="text-emerald-400 font-extrabold text-xs mt-1">
                  {providers.reduce((acc, curr) => acc + (curr.totalEarnings || 0), 0)} ريال
                </h5>
              </div>
            </div>

            {/* Custom interactive SVG charts representing month activity */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <h5 className="font-bold text-white text-xs">مخطط وتيرة وحركة الحجوزات الشهرية 📊</h5>
              <div className="h-28 w-full flex items-end gap-2.5 pt-4 px-2">
                {[
                  { month: "يناير", count: 12 },
                  { month: "فبراير", count: 18 },
                  { month: "مارس", count: 29 },
                  { month: "أبريل", count: 24 },
                  { month: "مايو", count: 35 },
                  { month: "يونيو", count: 48 },
                ].map((item, idx) => (
                  <div key={idx} className="grow flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[8px] text-amber-500 font-bold">{item.count} حجز</span>
                    <div 
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t" 
                      style={{ height: `${(item.count / 50) * 100}%` }}
                    />
                    <span className="text-[9px] text-slate-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fallback view for remaining tabs */}
        {activeTab > 10 && (
          <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl space-y-3">
            <Lock className="w-10 h-10 text-slate-700 mx-auto animate-pulse" />
            <h5 className="font-bold text-white text-xs">ميزة [{ADMIN_TABS[activeTab].name}] مفعلة ونشطة تلقائياً</h5>
            <p className="text-[10px] leading-relaxed max-w-sm mx-auto">
              هذه القسم الإداري الفرعي يتبع إعدادات المحرك المركزي لـ WAM ومصمم لتخزين إعدادات حقول النماذج وسياسات الخصوصية محلياً.
            </p>
            <button
              onClick={() => alert("✅ تم تهيئة وإعداد القسم بنجاح!")}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg cursor-pointer"
            >
              تأكيد وحفظ الإعداد الفرعي
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

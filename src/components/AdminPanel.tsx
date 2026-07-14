import React, { useState } from "react";
import { AppSettings, Provider, PendingProvider, Booking, User, Notification, Review, Banner, AuditLog } from "../types";
import { db } from "../lib/db";
import { 
  LayoutDashboard, 
  UserCheck, 
  UserPlus, 
  Users, 
  CalendarCheck, 
  Paintbrush, 
  Layers, 
  Megaphone, 
  Award, 
  Share2, 
  FileSpreadsheet, 
  Ticket, 
  Coins, 
  Star, 
  CreditCard, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings2, 
  Activity, 
  ShieldAlert, 
  Trash2, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff,
  ChevronLeft,
  Settings,
  Search
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
  // 20 Separate Admin Control Screens List
  const ADMIN_SCREENS = [
    { id: "dashboard", name: "1. الإحصائيات العامة والتحكم", icon: LayoutDashboard },
    { id: "providers", name: "2. إدارة الفنيين المعتمدين", icon: UserCheck },
    { id: "pending", name: "3. طلبات انضمام الفنيين", icon: UserPlus },
    { id: "customers", name: "4. إدارة حسابات العملاء", icon: Users },
    { id: "bookings", name: "5. إدارة ومتابعة الحجوزات", icon: CalendarCheck },
    { id: "theme", name: "6. إعدادات المظهر والخطوط", icon: Paintbrush },
    { id: "categories", name: "7. إدارة الفئات والأقسام", icon: Layers },
    { id: "broadcast", name: "8. مركز بث الإشعارات", icon: Megaphone },
    { id: "vip", name: "9. الفنيين المميزين (VIP)", icon: Award },
    { id: "links", name: "10. قنوات وروابط التواصل", icon: Share2 },
    { id: "audit", name: "11. سجل تدقيق أمان العمليات", icon: FileSpreadsheet },
    { id: "coupons", name: "12. كوبونات الخصم والرموز", icon: Ticket },
    { id: "loyalty", name: "13. نقاط الولاء والمكافآت", icon: Coins },
    { id: "reviews", name: "14. مراجعة تقييمات العملاء", icon: Star },
    { id: "payments", name: "15. بوابات الدفع والعمولات", icon: CreditCard },
    { id: "banners", name: "16. بنرات الإعلانات المتحركة", icon: ImageIcon },
    { id: "support", name: "17. مركز الدعم والشكاوى", icon: MessageSquare },
    { id: "maintenance", name: "18. وضع الصيانة والطوارئ", icon: Settings2 },
    { id: "telemetry", name: "19. إحصائيات الاتصال والهاتف", icon: Activity },
    { id: "security", name: "20. صلاحيات وتعديل كلمة المرور", icon: ShieldAlert },
  ];

  const [activeScreen, setActiveScreen] = useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // States for various form edits
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  
  // New entry states
  const [newProv, setNewProv] = useState({ name: "", phone: "", category: "كهرباء", subCategory: "", city: "صنعاء", area: "", price: 3000, description: "", experience: "" });
  const [newCat, setNewCat] = useState({ name: "", icon: "Wrench", description: "" });
  const [newBanner, setNewBanner] = useState({ imageUrl: "", title: "", link: "" });
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: 10 });
  const [notifForm, setNotifForm] = useState({ title: "", body: "", target: "all" });
  const [customLinkLabel, setCustomLinkLabel] = useState("");
  const [customLinkUrl, setCustomLinkUrl] = useState("");

  // New States for Spying and Advanced Controls
  const [spyingChatId, setSpyingChatId] = useState<string | null>(null);
  const [replyToSpyText, setReplyToSpyText] = useState("");
  const [userChatSearch, setUserChatSearch] = useState("");
  const [provChatSearch, setProvChatSearch] = useState("");

  const handleToggleUserChatBlock = (userId: string) => {
    const currentUsers = db.getUsers();
    const updated = currentUsers.map(u => {
      if (u.id === userId) {
        const nextState = !u.isChatBlocked;
        db.addAuditLog(nextState ? "حظر مستخدم من الشات" : "إلغاء حظر شات العميل", currentUser.name, `العميل: ${u.name}`);
        return { ...u, isChatBlocked: nextState };
      }
      return u;
    });
    db.saveUsers(updated);
    onRefreshData();
  };

  const handleToggleProviderChatBlock = (provId: string) => {
    const currentProvs = db.getProviders();
    const updated = currentProvs.map(p => {
      if (p.id === provId) {
        const nextState = !p.isChatBlocked;
        db.addAuditLog(nextState ? "حظر فني من الشات" : "إلغاء حظر شات الفني", currentUser.name, `الفني: ${p.name}`);
        return { ...p, isChatBlocked: nextState };
      }
      return p;
    });
    db.saveProviders(updated);
    onRefreshData();
  };

  const handleReassignBooking = (bookingId: string, newProviderId: string) => {
    const provs = db.getProviders();
    const matched = provs.find(p => p.id === newProviderId);
    if (!matched) return;
    
    const currentBookings = db.getBookings();
    const updated = currentBookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          providerId: matched.id,
          providerName: matched.name,
          subCategory: matched.subCategory
        };
      }
      return b;
    });
    db.saveBookings(updated);
    db.addAuditLog("إعادة توجيه حجز", currentUser.name, `إعادة توجيه الحجز ${bookingId} إلى الفني ${matched.name}`);
    onRefreshData();
    alert(`✅ تم توجيه وإعادة تعيين الحجز للفني ${matched.name} بنجاح!`);
  };

  const handleSendSpyMessage = (e: React.FormEvent, chatId: string) => {
    e.preventDefault();
    if (!replyToSpyText.trim()) return;
    
    const activeChat = chats.find(c => c.id === chatId);
    if (!activeChat) return;
    
    const newMsg = {
      id: `msg_admin_${Date.now()}`,
      chatId,
      senderId: "admin_platform",
      senderName: "⭐️ إدارة منصة WAM الفنية",
      body: replyToSpyText.trim(),
      isRead: false,
      timestamp: Date.now()
    };
    
    const currentMsgs = db.getMessages();
    db.saveMessages([...currentMsgs, newMsg]);
    
    // Update last message in chat
    const updatedChats = chats.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: `الادارة: ${replyToSpyText.trim()}`,
          lastMessageTime: Date.now()
        };
      }
      return c;
    });
    db.saveChats(updatedChats);
    
    setReplyToSpyText("");
    onRefreshData();
    db.addAuditLog("تدخل إداري في محادثة", currentUser.name, `إرسال رسالة توجيهية للغرفة ${chatId}`);
  };

  const handleDeleteSpyMessage = (msgId: string) => {
    if (confirm("هل تريد حذف هذه الرسالة من سجل الدردشة نهائياً؟")) {
      const currentMsgs = db.getMessages();
      db.saveMessages(currentMsgs.filter(m => m.id !== msgId));
      onRefreshData();
    }
  };

  const handleAddCustomLink = () => {
    if (!customLinkLabel.trim() || !customLinkUrl.trim()) {
      alert("⚠️ يرجى ملء اسم الرابط والرابط الإلكتروني الموجه.");
      return;
    }
    const currentList = formData.customAboutLinks || [];
    const updatedLinks = [
      ...currentList,
      { id: `link_${Date.now()}`, label: customLinkLabel.trim(), url: customLinkUrl.trim(), visible: true }
    ];
    const updatedSettings = { ...formData, customAboutLinks: updatedLinks };
    setFormData(updatedSettings);
    onUpdateSettings(updatedSettings);
    db.saveSettings(updatedSettings);
    setCustomLinkLabel("");
    setCustomLinkUrl("");
    alert("✅ تم إضافة الرابط المخصص للمنصة بنجاح!");
  };

  const handleToggleCustomLink = (id: string) => {
    const currentList = formData.customAboutLinks || [];
    const updatedLinks = currentList.map(l => l.id === id ? { ...l, visible: l.visible === false ? true : false } : l);
    const updatedSettings = { ...formData, customAboutLinks: updatedLinks };
    setFormData(updatedSettings);
    onUpdateSettings(updatedSettings);
    db.saveSettings(updatedSettings);
  };

  const handleDeleteCustomLink = (id: string) => {
    if (confirm("هل تريد حذف هذا الرابط المخصص نهائياً؟")) {
      const currentList = formData.customAboutLinks || [];
      const updatedLinks = currentList.filter(l => l.id !== id);
      const updatedSettings = { ...formData, customAboutLinks: updatedLinks };
      setFormData(updatedSettings);
      onUpdateSettings(updatedSettings);
      db.saveSettings(updatedSettings);
    }
  };

  const handleSaveSettings = (updated: AppSettings, msg = "✅ تم حفظ التغييرات وتطبيقها بنجاح!") => {
    onUpdateSettings(updated);
    db.saveSettings(updated);
    setFormData(updated);
    db.addAuditLog("تعديل إعدادات النظام", currentUser.name, `تحديث قيم الإعدادات في لوحة التحكم`);
    onRefreshData();
    alert(msg);
  };

  // 1. Wipe database (to start fresh with NO fake/mock users or providers)
  const handleWipeMockData = () => {
    if (confirm("🚨 تحذير أمني: هل أنت متأكد تماماً من رغبتك في تهيئة قاعدة البيانات وحذف جميع العملاء، الفنيين، الحجوزات، والبيانات والبدء من الصفر؟")) {
      db.saveProviders([]);
      db.saveCollection("pending_providers", []);
      db.saveBookings([]);
      db.saveUsers([]);
      db.saveReviews([]);
      db.saveChats([]);
      db.saveMessages([]);
      db.saveNotifications([]);
      db.saveCollection("banners", []);
      db.saveCollection("recovery_requests", []);
      db.saveCollection("audit_logs", []);
      
      db.addAuditLog("تهيئة قاعدة البيانات", currentUser.name, "حذف كامل البيانات الوهمية والمقالات وتصفير النظام");
      onRefreshData();
      alert("🧹 تم تنظيف النظام بالكامل بنجاح وحذف كافة الفنيين والمستخدمين الوهميين والبدء بصفحة فارغة تماماً!");
    }
  };

  // 2. Add Provider Manually
  const handleAddProviderManually = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProv.name.trim() || !newProv.phone.trim()) return alert("⚠️ يرجى ملء الاسم ورقم الهاتف.");
    
    const p: Provider = {
      id: `prov_${Date.now()}`,
      name: newProv.name.trim(),
      phone: newProv.phone.trim(),
      category: newProv.category,
      subCategory: newProv.subCategory.trim() || newProv.category,
      city: newProv.city,
      area: newProv.area.trim() || "صنعاء",
      isAvailable: true,
      isVerified: true,
      isRecommended: false,
      isPinned: false,
      isSubscribed: true,
      callsCount: 0,
      rating: 5.0,
      ratingsCount: 0,
      completedBookingsCount: 0,
      description: newProv.description.trim() || "فني معتمد وخبرة في المجال",
      experience: newProv.experience.trim() || "خبرة تزيد عن 5 سنوات",
      price: Number(newProv.price) || 2000,
      services: [newProv.subCategory.trim() || newProv.category]
    };

    const current = db.getProviders();
    db.saveProviders([p, ...current]);
    db.addAuditLog("إضافة فني يدوياً", currentUser.name, `إضافة الفني ${p.name}`);
    onRefreshData();
    setNewProv({ name: "", phone: "", category: "كهرباء", subCategory: "", city: "صنعاء", area: "", price: 3000, description: "", experience: "" });
    alert("✅ تم إضافة الفني المعتمد يدوياً وبنجاح!");
  };

  const handleDeleteProvider = (id: string) => {
    if (confirm("هل تريد حذف هذا الفني بشكل نهائي؟")) {
      const updated = providers.filter(p => p.id !== id);
      db.saveProviders(updated);
      db.addAuditLog("حذف فني", currentUser.name, `معرف الفني المحذوف: ${id}`);
      onRefreshData();
    }
  };

  // 3. Approve Join requests
  const handleApproveProvider = (id: string) => {
    const pendingList = db.getPendingProviders();
    const target = pendingList.find(p => p.id === id);
    if (!target) return;

    const newP: Provider = {
      ...target,
      id: `prov_${Date.now()}`,
      isAvailable: true,
      isVerified: true,
      isRecommended: true,
      callsCount: 0,
      rating: 5.0,
      ratingsCount: 0,
      completedBookingsCount: 0,
    };

    db.saveProviders([newP, ...db.getProviders()]);
    db.saveCollection("pending_providers", pendingList.filter(p => p.id !== id));
    
    // Notification
    const notifs = db.getNotifications();
    db.saveNotifications([{
      id: `not_app_${Date.now()}`,
      title: "تم توثيق وتنشيط حسابك الفني بنجاح! 🎉",
      body: `مبروك! تم قبول انضمامك كفني رسمي معتمد في منصة ${settings.appName}. يمكنك الآن استقبال طلبات وحجوزات العملاء.`,
      type: "provider",
      targetType: "providers",
      targetId: newP.id,
      isRead: false,
      timestamp: Date.now()
    }, ...notifs]);

    db.addAuditLog("اعتماد طلب فني", currentUser.name, `قبول طلب الفني ${target.name}`);
    onRefreshData();
    alert("✅ تم اعتماد وتوثيق وتفعيل حساب الفني بنجاح!");
  };

  const handleRejectProvider = (id: string) => {
    const reason = prompt("يرجى كتابة سبب الرفض وتوضيح الشروط الناقصة (مثل: الصورة الشخصية غير واضحة):") || "مستندات غير واضحة";
    const pendingList = db.getPendingProviders();
    const updated = pendingList.map(p => p.id === id ? { ...p, status: "rejected" as const, rejectReason: reason } : p);
    db.saveCollection("pending_providers", updated);
    db.addAuditLog("رفض طلب فني وتحديد النواقص", currentUser.name, `رفض طلب الفني ذو المعرف ${id} لسبب: ${reason}`);
    onRefreshData();
    alert("❌ تم رفض طلب الانضمام وحفظ النواقص لتنبيه الفني بها بنجاح.");
  };

  const handlePermanentDeleteProviderRequest = (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب نهائياً من قاعدة البيانات؟")) return;
    const pendingList = db.getPendingProviders();
    db.saveCollection("pending_providers", pendingList.filter(p => p.id !== id));
    db.addAuditLog("حذف طلب انضمام نهائياً", currentUser.name, `حذف طلب انضمام الفني ${id} نهائياً`);
    onRefreshData();
    alert("🗑️ تم حذف الطلب نهائياً.");
  };

  // 4. Customers and Users Management
  const handleToggleBanUser = (id: string) => {
    const updated = users.map(u => u.id === id ? { ...u, isBanned: !u.isBanned } : u);
    db.saveUsers(updated);
    db.addAuditLog("تعديل حظر مستخدم", currentUser.name, `تغيير حالة حظر المستخدم ذو المعرف ${id}`);
    onRefreshData();
  };

  const handleAwardPoints = (id: string) => {
    const addedPoints = Number(prompt("أدخل عدد النقاط المراد إضافتها للعميل:") || "50");
    if (!addedPoints) return;
    const updated = users.map(u => u.id === id ? { ...u, loyaltyPoints: (u.loyaltyPoints || 0) + addedPoints } : u);
    db.saveUsers(updated);
    db.addAuditLog("منح نقاط ولاء", currentUser.name, `منح العميل ذو المعرف ${id} عدد ${addedPoints} نقطة`);
    onRefreshData();
  };

  // 5. Bookings Management
  const handleUpdateBookingStatus = (id: string, status: "pending" | "accepted" | "completed" | "rejected") => {
    const bks = db.getBookings();
    const updated = bks.map(b => b.id === id ? { ...b, status, completedAt: status === "completed" ? Date.now() : b.completedAt } : b);
    db.saveBookings(updated);
    db.addAuditLog("تحديث حالة حجز", currentUser.name, `تحديث حالة الحجز ${id} إلى ${status}`);
    onRefreshData();
  };

  // 7. Categories Management
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;
    const cats = db.getCategories();
    const added = { id: `cat_${Date.now()}`, name: newCat.name.trim(), icon: newCat.icon, description: newCat.description.trim() || "قسم خدمي" };
    db.saveCollection("categories", [...cats, added]);
    db.addAuditLog("إضافة فئة جديدة", currentUser.name, `إضافة قسم ${newCat.name}`);
    onRefreshData();
    setNewCat({ name: "", icon: "Wrench", description: "" });
    alert("✅ تم إضافة الفئة والقسم الجديد بنجاح!");
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      const cats = db.getCategories();
      db.saveCollection("categories", cats.filter(c => c.id !== id));
      db.addAuditLog("حذف فئة", currentUser.name, `حذف القسم ${id}`);
      onRefreshData();
    }
  };

  // 8. Broadcast Notification
  const handleBroadcastNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifForm.title.trim() || !notifForm.body.trim()) return;
    const systemNotifs = db.getNotifications();
    const bNotif: Notification = {
      id: `broadcast_${Date.now()}`,
      title: notifForm.title.trim(),
      body: notifForm.body.trim(),
      type: "admin",
      targetType: notifForm.target as any,
      targetId: "all",
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([bNotif, ...systemNotifs]);
    db.addAuditLog("بث إشعار عام", currentUser.name, `بث إشعار: ${notifForm.title}`);
    onRefreshData();
    setNotifForm({ title: "", body: "", target: "all" });
    alert("📢 تم بث الإشعار الفوري لكافة المستهدفين بنجاح!");
  };

  // 12. Coupon Management
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    const currentCoupons = db.getCollection<any>("coupons") || [];
    db.saveCollection("coupons", [{ id: `coupon_${Date.now()}`, code: newCoupon.code.toUpperCase().trim(), discount: Number(newCoupon.discount) || 10, isActive: true }, ...currentCoupons]);
    setNewCoupon({ code: "", discount: 10 });
    onRefreshData();
    alert("✅ تم إضافة كود خصم جديد بنجاح!");
  };

  const handleDeleteCoupon = (id: string) => {
    const current = db.getCollection<any>("coupons") || [];
    db.saveCollection("coupons", current.filter((c: any) => c.id !== id));
    onRefreshData();
  };

  // 14. Review Moderation
  const handleToggleReviewApproval = (id: string, status: "approved" | "rejected") => {
    const revs = db.getReviews();
    const updated = revs.map(r => r.id === id ? { ...r, status } : r);
    db.saveReviews(updated);
    db.addAuditLog("التحكم بمراجعة عميل", currentUser.name, `تعديل حالة المراجعة ${id} إلى ${status}`);
    onRefreshData();
  };

  // 16. Banner carousel
  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.imageUrl.trim()) return;
    const currentBanners = db.getBanners();
    const b: Banner = { id: `banner_${Date.now()}`, imageUrl: newBanner.imageUrl.trim(), title: newBanner.title.trim(), link: newBanner.link.trim() };
    db.saveCollection("banners", [b, ...currentBanners]);
    setNewBanner({ imageUrl: "", title: "", link: "" });
    onRefreshData();
    alert("✅ تم إضافة بنر الإعلان المتحرك بنجاح!");
  };

  const handleDeleteBanner = (id: string) => {
    const current = db.getBanners();
    db.saveCollection("banners", current.filter(b => b.id !== id));
    onRefreshData();
  };

  return (
    <div className="space-y-6 text-right pb-12 font-sans" dir="rtl">
      
      {/* Top Welcome Admin Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600/10 to-transparent border border-amber-500/15 flex items-center justify-between flex-row-reverse gap-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 justify-end">
            <span className="text-amber-500">لوحة التحكم الشاملة والعملاقة لـ (WAM)</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold">بوابة المشرف الرئيسي</span>
          </h2>
          <p className="text-xs text-slate-400">
            أهلاً بك <span className="text-amber-400 font-bold">{currentUser.name}</span>. تمتلك كافة الصلاحيات لإدارة 20 قسماً وميزة حيوية في النظام.
          </p>
        </div>
        <button 
          onClick={onRefreshData}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          تحديث البيانات الحية 🔄
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Right navigation menu containing exactly 20 screens links */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-3 space-y-1">
            <h3 className="text-xs font-black text-slate-450 px-2.5 pb-2 border-b border-slate-900 mb-2">
              شاشات لوحة تحكم الأدمن (20 شاشة)
            </h3>
            
            <div className="max-h-[580px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {ADMIN_SCREENS.map((scr) => {
                const IconComponent = scr.icon;
                const isSelected = activeScreen === scr.id;
                return (
                  <button
                    key={scr.id}
                    onClick={() => {
                      setActiveScreen(scr.id);
                      setSearchTerm("");
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold text-right flex items-center gap-2.5 transition-all cursor-pointer border ${
                      isSelected 
                        ? "bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10" 
                        : "bg-slate-900/40 hover:bg-slate-900/90 border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? "text-black" : "text-amber-500"}`} />
                    <span className="truncate">{scr.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleWipeMockData}
            className="w-full py-3 bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 hover:text-rose-300 border border-rose-900/30 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>تهيئة النظام وحذف البيانات الوهمية 🧹</span>
          </button>
        </div>

        {/* Left active screen workspace */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-850 rounded-2xl p-5 md:p-6 min-h-[500px]">
          
          {/* SCREEN 1: DASHBOARD */}
          {activeScreen === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">الرئيسية والإحصائيات العامة والتحكم</h3>
              
              {/* Main Quick Count Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">الفنيين المعتمدين</span>
                  <span className="text-2xl font-black text-white">{providers.length}</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">طلبات قيد المراجعة</span>
                  <span className="text-2xl font-black text-amber-500">{pendingProviders.length}</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">إجمالي الحجوزات</span>
                  <span className="text-2xl font-black text-emerald-500">{bookings.length}</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">العملاء المسجلين</span>
                  <span className="text-2xl font-black text-blue-500">{users.length}</span>
                </div>
              </div>

              {/* Status checklist */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-300">مؤشرات تشغيل البوابة والربط الفوري</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 justify-end text-slate-400">
                    <span className="text-emerald-400">● نشط ومستقر</span>
                    <span className="font-bold">حالة خادم قاعدة البيانات:</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end text-slate-400">
                    <span className="text-emerald-400">● متصل بالكامل</span>
                    <span className="font-bold">نظام استقبال البث المباشر:</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-2 text-right">
                <h4 className="text-xs font-bold text-amber-400">💡 تلميحات الإدارة والتنظيف الحقيقي للبيانات:</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  إذا كنت تريد إطلاق موقعك للجمهور الحقيقي، قم بالنقر فوق زر "تهيئة النظام" الموجود أسفل قائمة الشاشات لحذف كافة البيانات التجريبية الوهمية التي صنعها الذكاء الاصطناعي، لتبدأ لوحة التحكم باستقبال المستخدمين الحقيقيين وطلبات الانضمام فقط بدون أي بيانات مشوشة.
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 2: PROVIDERS */}
          {activeScreen === "providers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-r-2 border-amber-500 pr-2">
                <h3 className="text-sm font-black text-amber-500">إدارة وتعديل الفنيين المعتمدين ({providers.length})</h3>
                <input
                  type="text"
                  placeholder="بحث باسم الفني أو الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white text-right max-w-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Form to add manually */}
              <form onSubmit={handleAddProviderManually} className="p-4 bg-slate-950/60 rounded-xl border border-slate-850/60 space-y-3">
                <h4 className="text-xs font-bold text-white">➕ تسجيل وإضافة فني معتمد جديد يدوياً للجمهور:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي للفني"
                    value={newProv.name}
                    onChange={(e) => setNewProv({ ...newProv, name: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="رقم الهاتف (مثال: 777111222)"
                    value={newProv.phone}
                    onChange={(e) => setNewProv({ ...newProv, phone: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white text-left font-mono"
                  />
                  <input
                    type="text"
                    placeholder="التخصص الدقيق (مثال: صيانة غسالات)"
                    value={newProv.subCategory}
                    onChange={(e) => setNewProv({ ...newProv, subCategory: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={newProv.category}
                    onChange={(e) => setNewProv({ ...newProv, category: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="كهرباء">كهرباء</option>
                    <option value="سباكة">سباكة</option>
                    <option value="تكييف وتبريد">تكييف وتبريد</option>
                    <option value="نجارة وديكور">نجارة وديكور</option>
                    <option value="بناء ومقاولات">بناء ومقاولات</option>
                    <option value="صيانة سيارات">صيانة سيارات</option>
                  </select>
                  <input
                    type="text"
                    placeholder="المدينة والمنطقة (مثال: حدة)"
                    value={newProv.area}
                    onChange={(e) => setNewProv({ ...newProv, area: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="سعر المعاينة التقريبي (ريال)"
                    value={newProv.price}
                    onChange={(e) => setNewProv({ ...newProv, price: Number(e.target.value) })}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-lg transition-all cursor-pointer"
                >
                  إضافة وتثبيت الفني فوراً بالمنصة 💾
                </button>
              </form>

              {/* Providers Table */}
              <div className="space-y-2">
                {providers.filter(p => p.name.includes(searchTerm) || p.phone.includes(searchTerm)).length > 0 ? (
                  providers
                    .filter(p => p.name.includes(searchTerm) || p.phone.includes(searchTerm))
                    .map((p) => (
                      <div key={p.id} className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                        <div className="text-right">
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.category} • {p.subCategory} • {p.area}</p>
                          <p className="text-[10px] text-amber-500 font-mono font-bold">{p.phone}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProvider(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا توجد سجلات فنيين معتمدين حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 3: PENDING */}
          {activeScreen === "pending" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">طلبات انضمام الفنيين بانتظار الموافقة ({pendingProviders.filter(p => p.status === "pending" || !p.status).length})</h3>
                <p className="text-[10px] text-slate-500 mt-1">طلبات جديدة مرسلة من الفنيين بانتظار المراجعة والتحقق من الهوية لتنشيط الحساب.</p>
              </div>

              <div className="space-y-3">
                {pendingProviders.filter(p => p.status === "pending" || !p.status).length > 0 ? (
                  pendingProviders.filter(p => p.status === "pending" || !p.status).map((pending) => (
                    <div key={pending.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2 text-right" dir="rtl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">قيد المراجعة</span>
                        <h4 className="text-xs font-bold text-white">{pending.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-350">{pending.category} • {pending.subCategory} • {pending.area}</p>
                      <p className="text-[10px] text-slate-500">الهاتف: <span className="font-mono text-slate-400">{pending.phone}</span></p>
                      {pending.experience && <p className="text-[10px] text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-800"><b>الخبرة:</b> {pending.experience}</p>}
                      
                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          onClick={() => handleRejectProvider(pending.id)}
                          className="px-3 py-1.5 bg-red-600/10 text-red-400 hover:bg-red-650 hover:text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                        >
                          رفض الطلب (توضيح النواقص) ❌
                        </button>
                        <button
                          onClick={() => handleApproveProvider(pending.id)}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-[10px] font-extrabold cursor-pointer transition-all"
                        >
                          موافقة واعتماد بالمنصة ✓
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا توجد طلبات معلقة بانتظار المراجعة والتوثيق حالياً.</p>
                )}
              </div>

              {/* Soft-rejected requests section */}
              <div className="pt-6 border-t border-slate-900">
                <h3 className="text-sm font-black text-rose-500 border-r-2 border-rose-500 pr-2 pb-0.5">طلبات تم توضيح نواقصها أو رفضها مؤقتاً ({pendingProviders.filter(p => p.status === "rejected").length})</h3>
                <p className="text-[10px] text-slate-500 mt-1">طلبات تواصلت معها الإدارة لتوضيح شروط التسجيل الناقصة. يمكن للفني تعديلها أو إعادة التقديم.</p>
              </div>

              <div className="space-y-3">
                {pendingProviders.filter(p => p.status === "rejected").length > 0 ? (
                  pendingProviders.filter(p => p.status === "rejected").map((pending) => (
                    <div key={pending.id} className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2 text-right" dir="rtl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-bold">مرفوض/غير مكتمل</span>
                        <h4 className="text-xs font-bold text-white text-slate-300">{pending.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400">{pending.category} • {pending.subCategory} • {pending.area}</p>
                      <p className="text-[10px] text-slate-500">الهاتف: <span className="font-mono text-slate-400">{pending.phone}</span></p>
                      <p className="text-[10px] text-rose-400 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                        <b>الشرط الناقص/السبب:</b> {pending.rejectReason || "مستندات غير مكتملة أو غير واضحة"}
                      </p>
                      
                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          onClick={() => handlePermanentDeleteProviderRequest(pending.id)}
                          className="px-2.5 py-1.5 bg-red-650/20 text-red-400 hover:bg-red-650 hover:text-white rounded-lg text-[10px] font-semibold cursor-pointer transition-all"
                        >
                          حذف نهائي للطلب 🗑️
                        </button>
                        <button
                          onClick={() => handleApproveProvider(pending.id)}
                          className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-[10px] font-extrabold cursor-pointer transition-all"
                        >
                          تجاوز واعتماد الحساب ✓
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-2">لا توجد طلبات مرفوضة أو ناقصة حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 4: CUSTOMERS */}
          {activeScreen === "customers" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إدارة حسابات العملاء المسجلين ({users.length})</h3>
              
              <div className="space-y-3">
                {users.length > 0 ? (
                  users.map((u) => (
                    <div key={u.id} className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2 justify-end">
                          {u.isBanned && <span className="text-[9px] bg-red-600/15 text-red-400 px-1.5 py-0.5 rounded font-bold">محظور 🚫</span>}
                          <p className="font-bold text-white">{u.name}</p>
                        </div>
                        <p className="text-[10px] text-slate-400">الهاتف: <span className="font-mono text-amber-500">{u.phone}</span> • النقاط المتوفرة: <span className="text-emerald-400 font-bold font-mono">{u.loyaltyPoints || 0}</span></p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAwardPoints(u.id)}
                          className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 text-[10px] rounded-lg transition-all font-bold cursor-pointer"
                        >
                          منح نقاط 🎁
                        </button>
                        <button
                          onClick={() => handleToggleBanUser(u.id)}
                          className={`px-2 py-1 text-[10px] rounded-lg font-bold transition-all cursor-pointer ${
                            u.isBanned 
                              ? "bg-slate-800 text-white hover:bg-slate-750" 
                              : "bg-red-650/10 text-red-400 hover:bg-red-650 hover:text-white"
                          }`}
                        >
                          {u.isBanned ? "إلغاء الحظر" : "حظر العميل"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا توجد حسابات عملاء مسجلين في الدليل الموحد حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 5: BOOKINGS */}
          {activeScreen === "bookings" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إدارة ومتابعة الحجوزات والطلبات الفنية</h3>
              
              {/* ⚙️ إعدادات توزيع وتوجيه الحجوزات */}
              <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <Settings className="w-4 h-4" />
                  <h4 className="text-xs font-black">إعدادات توجيه وتوزيع الحجوزات في المنصة:</h4>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  يمكنك التحكم في آلية توزيع طلبات الصيانة والحجوزات التي يقوم بها العملاء وتحديد الجهة المستلمة للتكليف بشكل مؤتمت أو يدوي بالكامل:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const updated = { ...formData, bookingRoutingMode: "specified" as const };
                      handleSaveSettings(updated, "✅ تم تغيير التوجيه: توجيه الطلبات للفني المحدد مباشرة!");
                    }}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer space-y-1 ${
                      (formData.bookingRoutingMode || "specified") === "specified"
                        ? "bg-amber-500/10 border-amber-500/60 text-white"
                        : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-extrabold text-xs flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>1. الفني المذكور مباشرة (الافتراضي)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">يصل الحجز فورا للفني الذي اختاره العميل لكي يقبله أو يرفضه.</p>
                  </button>

                  <button
                    onClick={() => {
                      const updated = { ...formData, bookingRoutingMode: "both" as const };
                      handleSaveSettings(updated, "✅ تم تغيير التوجيه: توجيه الطلبات للفني والادمن معاً!");
                    }}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer space-y-1 ${
                      formData.bookingRoutingMode === "both"
                        ? "bg-amber-500/10 border-amber-500/60 text-white"
                        : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-extrabold text-xs flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>2. الفني والادمن معاً</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">يصل التنبيه والحجز لكلا الطرفين للتحكم المشترك والتأكيد السريع.</p>
                  </button>

                  <button
                    onClick={() => {
                      const updated = { ...formData, bookingRoutingMode: "admin_only" as const };
                      handleSaveSettings(updated, "✅ تم تغيير التوجيه: توجيه الطلبات للادمن فقط للمراجعة والتكليف!");
                    }}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer space-y-1 ${
                      formData.bookingRoutingMode === "admin_only"
                        ? "bg-amber-500/10 border-amber-500/60 text-white"
                        : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-extrabold text-xs flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>3. الادمن فقط (تحكم يدوي كامل)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">تصل كافة حجوزات العملاء إلى المشرف فقط، ومن ثم يقوم المشرف بتوجيهها وتكليف الفني المناسب يدوياً.</p>
                  </button>

                  <button
                    onClick={() => {
                      const updated = { ...formData, bookingRoutingMode: "closest" as const };
                      handleSaveSettings(updated, "✅ تم تغيير التوجيه: توجيه الطلبات للفني الأقرب جغرافياً للعميل!");
                    }}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer space-y-1 ${
                      formData.bookingRoutingMode === "closest"
                        ? "bg-amber-500/10 border-amber-500/60 text-white"
                        : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-extrabold text-xs flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>4. الفني الأقرب للمستخدم جغرافياً</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">يقوم النظام تلقائياً بتوجيه الطلب للفني الأقرب جغرافياً تبعا لمدينة ومنطقة العميل المسجلة.</p>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-300">سجل طلبات الحجوزات الحالية:</h4>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-3 text-xs">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                          b.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                          b.status === "accepted" ? "bg-amber-500/10 text-amber-400" :
                          b.status === "rejected" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
                        }`}>
                          الحالة: {b.status === "completed" ? "مكتمل" : b.status === "accepted" ? "مؤكد ومقبول" : b.status === "rejected" ? "مرفوض" : "قيد الانتظار"}
                        </span>
                        <h4 className="font-bold text-white">العميل: {b.userName} ({b.userPhone})</h4>
                      </div>
                      
                      <div className="space-y-1.5">
                        <p className="text-slate-350">
                          الفني المطلوب حالياً: <span className="text-white font-bold">{b.providerName}</span> ({b.subCategory || "عام"})
                        </p>
                        <p className="text-slate-450 leading-relaxed">تفاصيل المشكلة: {b.serviceDetails}</p>
                        {b.preferredDate && <p className="text-slate-500 text-[11px]">التاريخ والوقت: {b.preferredDate} • {b.preferredTime}</p>}
                        <p className="text-slate-500 text-[11px]">عنوان العميل: {b.userAddress || "غير محدد"}</p>
                      </div>

                      {/* 🔄 تحويل وتوجيه هذا الحجز إلى فني آخر */}
                      <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-lg space-y-1.5">
                        <label className="text-[10px] font-bold text-amber-500 block">🔄 توجيه أو إعادة تحويل الحجز إلى فني آخر:</label>
                        <select
                          value={b.providerId}
                          onChange={(e) => handleReassignBooking(b.id, e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-[11px] text-white"
                        >
                          <option value="" disabled>--- اختر الفني المناسب لإعادة التكليف والتوجيه ---</option>
                          {providers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} - ({p.category} • {p.city} - {p.area})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex gap-2 justify-end pt-2 border-t border-slate-900/60">
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, "rejected")}
                          className="px-2.5 py-1 bg-red-650/10 hover:bg-red-650 hover:text-white text-red-400 rounded text-[10px] font-bold cursor-pointer"
                        >
                          رفض الحجز
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, "accepted")}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 rounded text-[10px] font-bold cursor-pointer"
                        >
                          تأكيد وقبول
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, "completed")}
                          className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-black rounded text-[10px] font-extrabold cursor-pointer"
                        >
                          إتمام بنجاح ✅
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا توجد حجوزات مسجلة حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 6: THEME & BRAND */}
          {activeScreen === "theme" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إعدادات مظهر الموقع والخطوط والألوان</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">اسم المنصة أو التطبيق الموحد:</label>
                  <input
                    type="text"
                    value={formData.appName}
                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">شعار التطبيق (النص الدائري) WAM:</label>
                  <input
                    type="text"
                    value={formData.appLogoText || "WAM"}
                    onChange={(e) => setFormData({ ...formData, appLogoText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">رسالة الترحيب في الصفحة الرئيسية:</label>
                  <textarea
                    value={formData.welcomeMessage || ""}
                    onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">اللون الخلفي الرئيسي للموقع:</label>
                    <input
                      type="color"
                      value={formData.bgColorHex || "#020617"}
                      onChange={(e) => setFormData({ ...formData, bgColorHex: e.target.value })}
                      className="w-full h-10 rounded cursor-pointer bg-transparent border-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">نوع الخط الافتراضي:</label>
                    <select
                      value={formData.selectedFontName || "sans-serif"}
                      onChange={(e) => setFormData({ ...formData, selectedFontName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                    >
                      <option value="sans-serif">خط كوفي / Sans-Serif</option>
                      <option value="Cairo, sans-serif">خط القاهرة (Cairo)</option>
                      <option value="monospace">خط فني مونو / Monospace</option>
                    </select>
                  </div>
                </div>

                {/* 🌟 تخصيص الأيقونات والخدمات الفرعية 🌟 */}
                <div className="border-t border-slate-900 pt-4 space-y-4">
                  <h4 className="text-xs font-black text-amber-500">⚙️ التحكم في إظهار أو إخفاء أيقونات وخدمات المنصة:</h4>

                  {/* 1. مساعد الذكاء الاصطناعي الذكي */}
                  <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-slate-350 font-bold block">إخفاء أيقونة المساعد الذكي بالكامل (Assistant Widget):</label>
                        <p className="text-[10px] text-slate-500 mt-0.5">إلغاء تنشيط أو توقيف ظهور مساعد الذكاء الاصطناعي لجميع العملاء في الواجهة.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.assistantIconHidden || false}
                        onChange={(e) => setFormData({ ...formData, assistantIconHidden: e.target.checked })}
                        className="rounded border-slate-800 bg-slate-900 text-amber-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-400">حجم أيقونة المساعد (بكسل):</label>
                        <input
                          type="number"
                          placeholder="60"
                          value={formData.assistantIconSize || 60}
                          onChange={(e) => setFormData({ ...formData, assistantIconSize: Number(e.target.value) })}
                          className="w-full bg-slate-950 border border-slate-850 rounded p-1.5 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">لون أيقونة المساعد:</label>
                        <input
                          type="color"
                          value={formData.assistantIconColorHex || "#f59e0b"}
                          onChange={(e) => setFormData({ ...formData, assistantIconColorHex: e.target.value })}
                          className="w-full h-8 cursor-pointer rounded bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. أيقونة الدردشة الفورية */}
                  <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-slate-350 font-bold block">إخفاء أيقونة الدردشة السريعة والشكاوى (Chat Widget):</label>
                        <p className="text-[10px] text-slate-500 mt-0.5">توقيف غرف التراسل والمحادثات المباشرة بين العملاء والفنيين بوضع غير متاح.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.chatIconHidden || false}
                        onChange={(e) => setFormData({ ...formData, chatIconHidden: e.target.checked })}
                        className="rounded border-slate-800 bg-slate-900 text-amber-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-400">حجم أيقونة الدردشة (بكسل):</label>
                        <input
                          type="number"
                          placeholder="50"
                          value={formData.chatIconSize || 50}
                          onChange={(e) => setFormData({ ...formData, chatIconSize: Number(e.target.value) })}
                          className="w-full bg-slate-950 border border-slate-850 rounded p-1.5 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">لون أيقونة الدردشة:</label>
                        <input
                          type="color"
                          value={formData.chatIconColorHex || "#10b981"}
                          onChange={(e) => setFormData({ ...formData, chatIconColorHex: e.target.value })}
                          className="w-full h-8 cursor-pointer rounded bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتطبيق المظهر العام الجديد للموقع 🎨
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 7: CATEGORIES */}
          {activeScreen === "categories" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إدارة فئات الأقسام والخدمات بالمنصة</h3>
              
              <form onSubmit={handleAddCategory} className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-3 text-xs">
                <h4 className="font-bold text-white">➕ إضافة قسم ومهنة فنية جديدة للموقع:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="اسم القسم (مثال: صيانة غسالات)"
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="وصف مختصر للقسم"
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg"
                >
                  إضافة قسم المهنة وتنشيطه
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {db.getCategories().map((c) => (
                  <div key={c.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                    <div className="text-right">
                      <p className="font-bold text-white">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.description || "لا يوجد وصف"}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="text-red-400 hover:text-red-300 p-1 bg-red-650/10 rounded-lg"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 8: BROADCAST */}
          {activeScreen === "broadcast" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">مركز بث الإشعارات الإعلانية والتعميمات العاجلة</h3>
              
              <form onSubmit={handleBroadcastNotif} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">عنوان الإشعار أو التنبيه الفوري:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: تنبيه أمني عاجل لكافة مقدمي الخدمة"
                    value={notifForm.title}
                    onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">فئة المستخدمين المستهدفة بالبث:</label>
                  <select
                    value={notifForm.target}
                    onChange={(e) => setNotifForm({ ...notifForm, target: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="all">جميع مستخدمي المنصة (الكل) 🌍</option>
                    <option value="providers">الفنيين ومزودي الخدمة المعتمدين فقط 🛠️</option>
                    <option value="users">العملاء والجمهور المسجل فقط 👤</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">محتوى الإشعار بالتفصيل:</label>
                  <textarea
                    required
                    placeholder="يرجى كتابة نص الإعلان أو التعميم هنا بوضوح..."
                    value={notifForm.body}
                    onChange={(e) => setNotifForm({ ...notifForm, body: e.target.value })}
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  بث الإشعار الفوري وإرساله لجميع الهواتف الآن 📢
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 9: VIP */}
          {activeScreen === "vip" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">التحكم بالفنيين المميزين وباقات VIP</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs mb-4 text-right" dir="rtl">
                <h4 className="text-xs font-bold text-amber-500">⚙️ ضبط أسعار اشتراكات الفنيين المميزين (VIP):</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">سعر الاشتراك الشهري لباقة VIP (ريال يمني):</label>
                    <input
                      type="number"
                      placeholder="مثال: 5000 (اكتب 0 للمجاني)"
                      value={formData.vipSubscriptionPrice || ""}
                      onChange={(e) => setFormData({ ...formData, vipSubscriptionPrice: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <button
                      onClick={() => handleSaveSettings(formData, "✅ تم تحديث وتعديل سعر اشتراكات الـ VIP بنجاح!")}
                      className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow cursor-pointer transition-all"
                    >
                      حفظ وتعديل سعر الاشتراك 💾
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  ملاحظة: تظهر هذه القيمة لجميع الفنيين الراغبين في تمييز حساباتهم وترقيتها لـ VIP. في حال تركها 0، يظهر النظام أن الترقية مجانية تماماً للمميزين حالياً.
                </p>
              </div>
              
              <div className="space-y-2.5 text-xs">
                {providers.length > 0 ? (
                  providers.map((p) => (
                    <div key={p.id} className="p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between">
                      <div className="text-right">
                        <p className="font-bold text-white flex items-center gap-1.5 justify-end">
                          {p.isPinned && <span className="bg-amber-500 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">VIP</span>}
                          <span>{p.name}</span>
                        </p>
                        <p className="text-[10px] text-slate-500">{p.category} • {p.subCategory}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = providers.map(item => item.id === p.id ? { ...item, isPinned: !item.isPinned } : item);
                            db.saveProviders(updated);
                            onRefreshData();
                          }}
                          className={`px-3 py-1.5 rounded font-bold transition-all text-[10px] ${
                            p.isPinned ? "bg-amber-500 text-black" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {p.isPinned ? "مـثـبـت VIP" : "تثبيت VIP"}
                        </button>
                        <button
                          onClick={() => {
                            const updated = providers.map(item => item.id === p.id ? { ...item, isRecommended: !item.isRecommended } : item);
                            db.saveProviders(updated);
                            onRefreshData();
                          }}
                          className={`px-3 py-1.5 rounded font-bold transition-all text-[10px] ${
                            p.isRecommended ? "bg-emerald-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {p.isRecommended ? "موصى به" : "توصية"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا يوجد فنيون مسجلون حالياً لتطبيق باقات التثبيت.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 10: SOCIAL & CUSTOM LINKS */}
          {activeScreen === "links" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إدارة قنوات التواصل الاجتماعي وروابط المنصة</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                
                {/* Telegram & Facebook */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">قناة تليجرام:</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showTelegram !== false}
                          onChange={(e) => setFormData({ ...formData, showTelegram: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://t.me/..."
                      value={formData.telegramLink || ""}
                      onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">صفحة فيسبوك:</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showFacebook !== false}
                          onChange={(e) => setFormData({ ...formData, showFacebook: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://facebook.com/..."
                      value={formData.facebookLink || ""}
                      onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Twitter/X & Instagram */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">حساب تويتر (X):</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showTwitter !== false}
                          onChange={(e) => setFormData({ ...formData, showTwitter: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://twitter.com/..."
                      value={formData.twitterLink || ""}
                      onChange={(e) => setFormData({ ...formData, twitterLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">حساب إنستجرام:</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showInstagram !== false}
                          onChange={(e) => setFormData({ ...formData, showInstagram: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://instagram.com/..."
                      value={formData.instagramLink || ""}
                      onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* YouTube & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">قناة يوتيوب:</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showYoutube !== false}
                          onChange={(e) => setFormData({ ...formData, showYoutube: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://youtube.com/..."
                      value={formData.youtubeLink || ""}
                      onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-bold block">الموقع الإلكتروني الرسمي للجمهور:</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                        <input
                          type="checkbox"
                          checked={formData.showWebsite !== false}
                          onChange={(e) => setFormData({ ...formData, showWebsite: e.target.checked })}
                          className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                        />
                        <span className="text-[10px]">عرض بالموقع</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://yemen-services.web.app"
                      value={formData.websiteLink || ""}
                      onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* App Download Link */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 font-bold block">رابط تحميل تطبيق الأندرويد APK المباشر:</label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                      <input
                        type="checkbox"
                        checked={formData.showDownloadApp !== false}
                        onChange={(e) => setFormData({ ...formData, showDownloadApp: e.target.checked })}
                        className="rounded border-slate-850 bg-slate-950 text-amber-500 w-3.5 h-3.5"
                      />
                      <span className="text-[10px]">عرض بنر التحميل بالموقع</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="https://yemen-services.web.app/download/app.apk"
                    value={formData.downloadAppLink || ""}
                    onChange={(e) => setFormData({ ...formData, downloadAppLink: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono text-[11px]"
                  />
                </div>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتحديث الروابط الاجتماعية الرسمية وتفعيلها 💾
                </button>

                {/* Custom About Links Creator */}
                <div className="border-t border-slate-900 pt-4 space-y-3">
                  <h4 className="text-xs font-black text-amber-500">➕ إضافة روابط مخصصة إضافية (أخرى) لموقعنا:</h4>
                  
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850/60 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">عنوان الرابط (مثال: صفحة تيك توك اليمن):</label>
                        <input
                          type="text"
                          placeholder="اكتب اسم الحساب أو الخدمة"
                          value={customLinkLabel}
                          onChange={(e) => setCustomLinkLabel(e.target.value)}
                          className="w-full h-8 px-2 rounded bg-slate-950 border border-slate-850 text-white text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">الرابط الإلكتروني الموجه (URL):</label>
                        <input
                          type="text"
                          placeholder="https://tiktok.com/@..."
                          value={customLinkUrl}
                          onChange={(e) => setCustomLinkUrl(e.target.value)}
                          className="w-full h-8 px-2 rounded bg-slate-950 border border-slate-850 text-white text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCustomLink}
                      className="w-full h-8 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-500" />
                      <span>حفظ وإضافة الرابط المخصص الآن للموقع</span>
                    </button>
                  </div>

                  {/* List of custom links */}
                  {formData.customAboutLinks && formData.customAboutLinks.length > 0 ? (
                    <div className="space-y-2">
                      {formData.customAboutLinks.map((link) => (
                        <div key={link.id} className="flex items-center justify-between gap-2 p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl">
                          <div className="flex flex-col min-w-0 text-right">
                            <span className="text-xs font-bold text-white truncate">{link.label}</span>
                            <span className="text-[10px] text-slate-500 truncate" dir="ltr">{link.url}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleCustomLink(link.id)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                link.visible !== false
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                  : "bg-slate-850 border-slate-800 text-slate-500"
                              }`}
                              title={link.visible !== false ? "مرئي بالموقع" : "مخفي بالموقع"}
                            >
                              {link.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomLink(link.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                              title="حذف نهائي"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500 text-center italic py-1">لا توجد روابط مخصصة إضافية مضافة حالياً.</p>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 11: AUDIT LOGS */}
          {activeScreen === "audit" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">سجل تدقيق أمان العمليات والأنشطة (Audit Logs)</h3>
              
              <div className="space-y-2.5 max-h-[450px] overflow-y-auto">
                {(db.getCollection<any>("audit_logs") || []).length > 0 ? (
                  db.getCollection<any>("audit_logs").map((log: any) => (
                    <div key={log.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 text-[11px] space-y-1 text-right">
                      <div className="flex justify-between items-center text-slate-500">
                        <span>{new Date(log.timestamp).toLocaleString("ar-YE")}</span>
                        <span className="font-bold text-amber-500">بواسطة: {log.actor || "غير معروف"}</span>
                      </div>
                      <p className="font-extrabold text-white">{log.action}</p>
                      {log.details && <p className="text-slate-400 text-[10px]">{log.details}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">سجل العمليات فارغ تماماً حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 12: COUPONS */}
          {activeScreen === "coupons" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إدارة كوبونات الخصم والرموز الترويجية للعملاء</h3>
              
              <form onSubmit={handleAddCoupon} className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3 text-xs">
                <h4 className="font-bold text-white">➕ توليد وإصدار كود خصم جديد لخصم الحجز:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="رمز الكود (مثال: YEMEN2026)"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center text-white font-mono font-bold uppercase"
                  />
                  <input
                    type="number"
                    required
                    placeholder="نسبة الخصم المئوية (مثال: 15)"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg"
                >
                  تفعيل وحفظ كود الخصم الجديد
                </button>
              </form>

              <div className="space-y-2">
                {(db.getCollection<any>("coupons") || []).map((c: any) => (
                  <div key={c.id} className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                    <div className="text-right">
                      <p className="font-mono font-bold text-amber-400">{c.code}</p>
                      <p className="text-[10px] text-slate-500">قيمة الخصم المالي: {c.discount}% من إجمالي الخدمة</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCoupon(c.id)}
                      className="text-red-400 hover:text-red-300 p-1 bg-red-650/15 rounded-lg"
                    >
                      حذف الرمز
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 13: LOYALTY */}
          {activeScreen === "loyalty" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">نقاط الولاء ومكافآت العملاء المتفاعلين</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <label className="text-slate-350 select-none">تفعيل نظام نقاط الولاء التلقائي:</label>
                  <input
                    type="checkbox"
                    checked={formData.loyaltyPointsEnabled !== false}
                    onChange={(e) => setFormData({ ...formData, loyaltyPointsEnabled: e.target.checked })}
                    className="rounded border-slate-800 bg-slate-900 text-amber-500 w-4 h-4"
                  />
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  عند تفعيل نظام النقاط، يتم منح كل عميل نقاطاً إضافية وهدايا تلقائية عند كل عملية إتمام حجز فني ناجح مع مزودي الخدمة في اليمن، ويمكنه استخدام هذه النقاط لاحقاً للحصول على خصومات مميزة.
                </p>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg"
                >
                  حفظ وتحديث إعدادات نظام الولاء 💾
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 14: REVIEWS */}
          {activeScreen === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">مراجعة وتقييمات العملاء المعلقة والموافقة عليها</h3>
              
              <div className="space-y-3">
                {db.getReviews().length > 0 ? (
                  db.getReviews().map((r) => (
                    <div key={r.id} className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">الحالة: {r.status === "approved" ? "معتمد" : r.status === "rejected" ? "مرفوض" : "معلق"}</span>
                        <h4 className="font-bold text-white">{r.userName} {" ➔ "} {r.providerName}</h4>
                      </div>
                      <p className="text-slate-350">التعليق والتقييم: ({r.rating} نجوم) - {r.comment}</p>
                      
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => handleToggleReviewApproval(r.id, "rejected")}
                          className="px-2 py-1 bg-red-650/15 text-red-400 hover:bg-red-650 hover:text-white rounded text-[10px] font-bold"
                        >
                          حظر أو رفض التقييم
                        </button>
                        <button
                          onClick={() => handleToggleReviewApproval(r.id, "approved")}
                          className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-black rounded text-[10px] font-extrabold"
                        >
                          الموافقة والنشر للجميع
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center italic py-4">لا توجد مراجعات أو تعليقات بانتظار المراجعة والاعتماد حالياً.</p>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 15: PAYMENTS */}
          {activeScreen === "payments" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">بوابات الدفع الرقمية ومحافظ عمولات الفنيين</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">رقم حساب محفظة الكريمي لخدمات WAM:</label>
                  <input
                    type="text"
                    value={formData.paymentMerchantKuraimi || ""}
                    onChange={(e) => setFormData({ ...formData, paymentMerchantKuraimi: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">رقم حساب محفظة إم فلوس (M-Floos):</label>
                  <input
                    type="text"
                    value={formData.paymentMerchantMFloos || ""}
                    onChange={(e) => setFormData({ ...formData, paymentMerchantMFloos: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">رقم حساب محفظة جوال باي (Jawwal Pay):</label>
                  <input
                    type="text"
                    value={formData.paymentMerchantJawwalPay || ""}
                    onChange={(e) => setFormData({ ...formData, paymentMerchantJawwalPay: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتفعيل أرقام حسابات الدفع الرقمي 💾
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 16: BANNERS */}
          {activeScreen === "banners" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">التحكم ببنرات الإعلانات الدوارة في الرئيسية</h3>
              
              <form onSubmit={handleAddBanner} className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3 text-xs">
                <h4 className="font-bold text-white">➕ إضافة بنر إعلان متحرك جديد للرئيسية:</h4>
                <div className="space-y-1">
                  <label className="text-slate-400">رابط صورة البنر الإعلاني (URL):</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newBanner.imageUrl}
                    onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="عنوان الإعلان"
                    value={newBanner.title}
                    onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="رابط التوجيه عند النقر (مستند أو صفحة)"
                    value={newBanner.link}
                    onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg"
                >
                  إدراج وتثبيت البنر الإعلاني الجديد
                </button>
              </form>

              <div className="space-y-3">
                {db.getBanners().map((b) => (
                  <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                    <div className="text-right flex items-center gap-3">
                      <img src={b.imageUrl} className="w-12 h-10 object-cover rounded-md" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-white">{b.title || "بدون عنوان إعلاني"}</p>
                        <p className="text-[10px] text-slate-500 truncate max-w-xs">{b.imageUrl}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteBanner(b.id)}
                      className="p-1.5 bg-red-650/15 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 17: SUPPORT */}
          {activeScreen === "support" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">صلاحيات ومراقبة المحادثات الفورية وإدارتها الشاملة</h3>
              
              {/* 1. إعدادات وقنوات توجيه المحادثات الفورية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* حالة الشات العام */}
                <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-3">
                  <h4 className="text-xs font-black text-amber-500">⚙️ حالة تشغيل المحادثات الفورية للجميع:</h4>
                  <p className="text-[10px] text-slate-400">يمكنك التحكم في تفعيل الميزة لجميع الأطراف أو قفلها تماماً:</p>
                  
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "enabled", label: "🟢 مفعلة بالكامل لجميع المستخدمين والفنيين" },
                      { id: "admin_only", label: "🟡 تواصل العميل مع إدارة المنصة فقط" },
                      { id: "disabled", label: "🔴 معطلة وموقوفة بالكامل عن المنصة" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          const updated = { ...formData, chatStatus: opt.id as any };
                          handleSaveSettings(updated, `✅ تم تعديل حالة الدردشة إلى: ${opt.label}`);
                        }}
                        className={`p-2.5 rounded-xl text-right text-xs font-bold transition-all border cursor-pointer ${
                          (formData.chatStatus || "enabled") === opt.id
                            ? "bg-amber-500/10 border-amber-500/50 text-white"
                            : "bg-slate-950/40 border-slate-850 text-slate-450 hover:border-slate-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* جهة وصول المحادثات وتوجيهها */}
                <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-3">
                  <h4 className="text-xs font-black text-amber-500">🔄 تحديد الجهة المستلمة للمحادثات الفورية:</h4>
                  <p className="text-[10px] text-slate-400">تحديد مع من يمكن للعميل التراسل الفوري عند فتح تذكرة/محادثة:</p>
                  
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "both", label: "👥 الادمن والفني معاً (تحت المراقبة والمشاركة)" },
                      { id: "admin_only", label: "👑 الادمن فقط (العميل يتحدث للإدارة فقط)" },
                      { id: "provider_only", label: "🛠️ الفني فقط (تواصل مباشر ثنائي مع الفني)" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          const updated = { ...formData, chatRoutingMode: opt.id as any };
                          handleSaveSettings(updated, `✅ تم تعيين جهة وصول الشات إلى: ${opt.label}`);
                        }}
                        className={`p-2.5 rounded-xl text-right text-xs font-bold transition-all border cursor-pointer ${
                          (formData.chatRoutingMode || "both") === opt.id
                            ? "bg-amber-500/10 border-amber-500/50 text-white"
                            : "bg-slate-950/40 border-slate-850 text-slate-450 hover:border-slate-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* 2. حظر وتعطيل الشات الانتقائي لبعض المستخدمين أو بعض الفنيين */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* حظر مستخدمين محددين */}
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold">العملاء</span>
                    <h4 className="text-xs font-black text-white">🚫 حظر مراسلة بعض المستخدمين:</h4>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="ابحث عن عميل لحظر المحادثة عنه..."
                    value={userChatSearch}
                    onChange={(e) => setUserChatSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-white placeholder-slate-500"
                  />

                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {users
                      .filter(u => u.name.includes(userChatSearch) || u.phone.includes(userChatSearch))
                      .map((u) => (
                        <div key={u.id} className="p-2 bg-slate-900/40 border border-slate-850/60 rounded-lg flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white">{u.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono">{u.phone}</p>
                          </div>
                          <button
                            onClick={() => handleToggleUserChatBlock(u.id)}
                            className={`px-2 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                              u.isChatBlocked
                                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                                : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {u.isChatBlocked ? "🔒 موقوف - اضغط للتنشيط" : "🔓 نشط - اضغط للتعطيل"}
                          </button>
                        </div>
                      ))}
                    {users.length === 0 && (
                      <p className="text-[10px] text-slate-500 text-center italic py-2">لا يوجد عملاء مسجلين حالياً.</p>
                    )}
                  </div>
                </div>

                {/* حظر فنيين محددين */}
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold">الفنيين</span>
                    <h4 className="text-xs font-black text-white">🚫 حظر محادثات بعض الفنيين:</h4>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="ابحث عن فني لحجب المحادثات عنه..."
                    value={provChatSearch}
                    onChange={(e) => setProvChatSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-white placeholder-slate-500"
                  />

                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {providers
                      .filter(p => p.name.includes(provChatSearch) || p.phone.includes(provChatSearch))
                      .map((p) => (
                        <div key={p.id} className="p-2 bg-slate-900/40 border border-slate-850/60 rounded-lg flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white">{p.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono">{p.phone}</p>
                          </div>
                          <button
                            onClick={() => handleToggleProviderChatBlock(p.id)}
                            className={`px-2 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                              p.isChatBlocked
                                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                                : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {p.isChatBlocked ? "🔒 موقوف - اضغط للتنشيط" : "🔓 نشط - اضغط للتعطيل"}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

              {/* 3. مراقبة المحادثات الحية والتجسس والتحكم بالرسائل */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-4">
                <h4 className="text-xs font-black text-white flex items-center gap-1.5 flex-row-reverse">
                  <span>🕵️ الكونسول العام لمراقبة وتتبع المحادثات الجارية (Live Monitoring Spy):</span>
                </h4>
                
                <p className="text-[10px] text-slate-550 leading-normal">
                  يمكنك قراءة سجلات المحادثات الحية التي تدور في المنصة في الوقت الفعلي بين العملاء والفنيين، وحذف أي رسائل غير لائقة، أو إرسال توجيه وتحذيرات إدارية مباشرة في المحادثة كمسؤول:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* قائمة المحادثات (col-span-5) */}
                  <div className="lg:col-span-5 border border-slate-900 rounded-xl overflow-hidden divide-y divide-slate-900 max-h-[400px] overflow-y-auto">
                    {chats.length > 0 ? (
                      chats.map((c) => {
                        const isSelectedSpy = spyingChatId === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSpyingChatId(c.id)}
                            className={`p-3 text-right text-xs transition-all cursor-pointer space-y-1 select-none ${
                              isSelectedSpy
                                ? "bg-amber-500/15 border-r-2 border-amber-500 text-white"
                                : "bg-slate-950/40 hover:bg-slate-900/60 text-slate-400"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] text-slate-500">ID: {c.id}</span>
                              <h5 className="font-bold text-white truncate max-w-40">{c.userName} ◀ {c.providerName}</h5>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate italic">
                              آخر رسالة: <span className="text-slate-350">{c.lastMessage || "بدء الغرفة..."}</span>
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-[10px] text-slate-500 text-center italic py-4">لا توجد غرف دردشة نشطة في النظام للمراقبة.</p>
                    )}
                  </div>

                  {/* لوحة التجسس على الرسائل الحية والتحكم بها (col-span-7) */}
                  <div className="lg:col-span-7 border border-slate-900 bg-slate-950/20 rounded-xl p-3 flex flex-col min-h-[300px] max-h-[400px]">
                    {spyingChatId ? (
                      (() => {
                        const selectedChat = chats.find(c => c.id === spyingChatId);
                        const chatMsgs = db.getMessages().filter(m => m.chatId === spyingChatId);
                        return (
                          <div className="flex-1 flex flex-col h-full">
                            
                            {/* ترويسة الغرفة المراقب عليها */}
                            <div className="pb-2 border-b border-slate-900 flex justify-between items-center mb-3">
                              <button
                                onClick={() => setSpyingChatId(null)}
                                className="text-[10px] px-1.5 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded"
                              >
                                إغلاق المراقبة ✕
                              </button>
                              <h5 className="text-[11px] font-black text-amber-500">
                                👁️ مراقبة حية: {selectedChat?.userName} ◀ {selectedChat?.providerName}
                              </h5>
                            </div>

                            {/* قائمة رسائل الغرفة */}
                            <div className="flex-1 overflow-y-auto space-y-2.5 mb-3 pr-1 custom-scrollbar text-xs">
                              {chatMsgs.map((msg) => {
                                const isAdminMsg = msg.senderId === "admin_platform";
                                return (
                                  <div key={msg.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-850/60 space-y-1">
                                    <div className="flex justify-between items-center text-[10px] border-b border-slate-950 pb-1 mb-1">
                                      <button
                                        onClick={() => handleDeleteSpyMessage(msg.id)}
                                        className="text-[9px] text-rose-500 hover:text-rose-400 font-extrabold cursor-pointer"
                                        title="حذف هذه الرسالة نهائياً من قاعدة البيانات"
                                      >
                                        حذف الرسالة 🗑️
                                      </button>
                                      <span className={`font-black ${isAdminMsg ? "text-amber-500" : "text-white"}`}>
                                        {msg.senderName} ({msg.senderId === selectedChat?.userId ? "العميل" : msg.senderId === "admin_platform" ? "إدارة المنصة" : "الفني"})
                                      </span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed break-words font-mono text-[11px]">{msg.body}</p>
                                    <span className="text-[8px] text-slate-600 block text-left font-mono">{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                  </div>
                                );
                              })}
                              {chatMsgs.length === 0 && (
                                <p className="text-[10px] text-slate-500 text-center italic py-8">سجل المراسلة فارغ تماماً في هذه الغرفة.</p>
                              )}
                            </div>

                            {/* نموذج إرسال رد / تحذير كمسؤول */}
                            <form onSubmit={(e) => handleSendSpyMessage(e, spyingChatId)} className="flex gap-1.5 border-t border-slate-900 pt-2 shrink-0">
                              <input
                                type="text"
                                placeholder="اكتب رداً أو توجيهاً رسمياً في هذه المحادثة..."
                                value={replyToSpyText}
                                onChange={(e) => setReplyToSpyText(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white placeholder-slate-650"
                              />
                              <button
                                type="submit"
                                className="px-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] rounded transition-all cursor-pointer shrink-0"
                              >
                                إرسال كإدارة 🚀
                              </button>
                            </form>

                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-600 space-y-1">
                        <Eye className="w-10 h-10 opacity-15 text-amber-500 animate-pulse" />
                        <h5 className="text-xs font-bold text-slate-400">لم يتم اختيار محادثة للمراقبة</h5>
                        <p className="text-[9px] text-slate-500">اختر أي محادثة من القائمة الجانبية لقراءتها والتحكم بمحتواها فوراً.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SCREEN 18: MAINTENANCE */}
          {activeScreen === "maintenance" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">وضع الصيانة وحالات الطوارئ وقفل الموقع</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <label className="text-slate-350 select-none font-bold">تفعيل قفل الصيانة وتوقيف المنصة بالكامل لجميع العملاء:</label>
                  <input
                    type="checkbox"
                    checked={formData.isMaintenanceMode || false}
                    onChange={(e) => setFormData({ ...formData, isMaintenanceMode: e.target.checked })}
                    className="rounded border-slate-800 bg-slate-900 text-amber-500 w-4 h-4"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">رسالة الصيانة التي تظهر للمشاهدين:</label>
                  <textarea
                    value={formData.maintenanceMessage || ""}
                    onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتطبيق حالة الصيانة الفورية بالكامل 🛠️
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 19: TELEMETRY & CALLS */}
          {activeScreen === "telemetry" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">إحصائيات الاتصال الهاتفي ومعدلات استخدام العملاء</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold">السماح لزر الاتصال الهاتفي بالعمل بالمنصة:</label>
                  <input
                    type="checkbox"
                    checked={formData.enableCalls !== false}
                    onChange={(e) => setFormData({ ...formData, enableCalls: e.target.checked })}
                    className="rounded border-slate-800 bg-slate-900 text-amber-500 w-4 h-4"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">الحد الأقصى لعدد المكالمات المباشرة للفني الواحد يومياً لكل عميل:</label>
                  <input
                    type="number"
                    value={formData.maxCallsPerDay || 5}
                    onChange={(e) => setFormData({ ...formData, maxCallsPerDay: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>

                <button
                  onClick={() => handleSaveSettings(formData)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتأكيد معايير الاتصال الهاتفي 📞
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 20: SECURITY & PASSWORDS */}
          {activeScreen === "security" && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-amber-500 border-r-2 border-amber-500 pr-2 pb-0.5">صلاحيات النظام وتعديل كلمات المرور الأمنية</h3>
              
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
                
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl leading-relaxed text-xs">
                  🔒 تحذير حماية: يرجى كتابة كلمات المرور الجديدة وحفظها جيداً.
                  لا تترك كلمة مرور الأدمن الافتراضية فارغة أو مكشوفة للعامة لحماية بيانات عملائك وفنييك في اليمن.
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">🔑 كلمة مرور الأدمن والمدير العام (Admin):</label>
                  <input
                    type="text"
                    required
                    value={formData.adminPassword || "maher736462"}
                    onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-center text-xs tracking-wider"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">🚪 كلمة مرور المالك والولوج من البوابة الخلفية (Backdoor / Owner):</label>
                  <input
                    type="text"
                    required
                    value={formData.backdoorPassword || "maher--736462"}
                    onChange={(e) => setFormData({ ...formData, backdoorPassword: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-center text-xs tracking-wider"
                  />
                </div>

                <button
                  onClick={() => handleSaveSettings(formData, "🔓 تم تغيير كلمات المرور الأمنية الخاصة بالأدمن والمالك بنجاح! سيتم مطالبتهم بها فوراً عند تسجيل الدخول.")}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-lg shadow"
                >
                  حفظ وتفعيل كلمات المرور الأمنية الجديدة 💾
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

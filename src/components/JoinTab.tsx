import React, { useState, useEffect, useRef } from "react";
import { AppSettings, PendingProvider, Provider, Booking, Chat, Message, Notification } from "../types";
import { db } from "../lib/db";
import ProviderStats from "./ProviderStats";
import { 
  User, 
  Phone, 
  Briefcase, 
  MapPin, 
  Camera, 
  Upload, 
  Compass, 
  CheckCircle2, 
  Clock, 
  FileText,
  AlertTriangle,
  Wallet,
  Bell,
  MessageSquare,
  Check,
  X as XIcon,
  DollarSign,
  RefreshCw,
  Send,
  Star,
  ChevronLeft,
  Activity,
  AlertCircle
} from "lucide-react";

interface JoinTabProps {
  settings: AppSettings;
  categories: any[];
  currentUser: any;
  bookings: Booking[];
  providers: Provider[];
  onRegistered: () => void;
}

export default function JoinTab({
  settings,
  categories,
  currentUser,
  bookings,
  providers,
  onRegistered
}: JoinTabProps) {
  // Navigation inside the approved dashboard
  const [providerTab, setProviderTab] = useState<"dashboard" | "bookings" | "chats" | "wallet" | "notifications">("dashboard");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatReplyText, setChatReplyText] = useState("");
  const [isEditingRejected, setIsEditingRejected] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  
  // Registration form state
  const [formData, setFormData] = useState({
    name: "",
    phone: currentUser.phone || "",
    category: "",
    subCategory: "",
    workAddress: "",
    city: "صنعاء",
    area: "",
    neighborhood: "",
    idCardNumber: "",
    experience: "",
    gps: "",
    profileImg: "",
    idCardImg: "",
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Check if logged-in user is already an approved provider
  const matchedProvider = providers.find(
    p => p.phone === currentUser.phone || p.id === currentUser.id
  );

  // 2. Check if logged-in user has a pending provider request
  const pendingList = db.getPendingProviders();
  const matchedPending = pendingList.find(
    p => p.phone === currentUser.phone || p.id === currentUser.id
  );

  // Pre-populate form if they click Edit & Resubmit on a rejected application
  useEffect(() => {
    if (matchedPending && matchedPending.status === "rejected" && isEditingRejected) {
      setFormData({
        name: matchedPending.name || "",
        phone: matchedPending.phone || currentUser.phone || "",
        category: matchedPending.category || "",
        subCategory: matchedPending.subCategory || "",
        workAddress: matchedPending.address || "",
        city: matchedPending.city || "صنعاء",
        area: matchedPending.area ? matchedPending.area.split(" - ")[0] : "",
        neighborhood: matchedPending.area && matchedPending.area.includes(" - ") ? matchedPending.area.split(" - ")[1] : "",
        idCardNumber: "",
        experience: matchedPending.experience || "",
        gps: matchedPending.gps || "",
        profileImg: matchedPending.imageUrl || "",
        idCardImg: matchedPending.idCardUrl || "",
      });
    }
  }, [matchedPending, isEditingRejected]);

  // Scroll to bottom of active chats
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, bookings]);

  // Form Submission for registration/resubmission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.category || !formData.workAddress || !formData.area) {
      alert("⚠️ يرجى ملء كافة الحقول الإجبارية المؤشرة بنجمة (*)");
      return;
    }

    const pendingProv: PendingProvider = {
      id: matchedPending ? matchedPending.id : `pending_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      category: formData.category,
      subCategory: formData.subCategory || "خدمات عامة",
      city: formData.city,
      area: formData.neighborhood ? `${formData.area} - ${formData.neighborhood}` : formData.area,
      imageUrl: formData.profileImg || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      gps: formData.gps || "15.3694,44.1910",
      experience: formData.experience || "فني متخصص بخبرة عملية ممتازة",
      isAvailable: true,
      status: "pending", // Reset back to pending
      ratingsCount: 0,
      completedBookingsCount: 0,
    };

    // Replace or add to collection
    const currentPending = db.getPendingProviders();
    const filteredPending = currentPending.filter(p => p.id !== pendingProv.id && p.phone !== pendingProv.phone);
    db.saveCollection("pending_providers", [pendingProv, ...filteredPending]);

    // System Log
    db.addAuditLog(
      matchedPending ? "إعادة إرسال طلب انضمام فني" : "تسجيل مقدم خدمة جديد", 
      `قام الفني ${formData.name} بإرسال طلب انضمام للمراجعة.`
    );

    // Send admin notification
    const currentNotifs = db.getNotifications();
    const adminNotif = {
      id: `not_pending_${Date.now()}`,
      title: matchedPending ? "تعديل طلب انضمام فني ⚠️" : "طلب انضمام فني جديد 🛠️",
      body: `أرسل الفني ${formData.name} طلباً معدلاً لقسم (${formData.category}) للمراجعة والتدقيق.`,
      type: "admin" as const,
      targetType: "admins" as const,
      targetId: "",
      targetRole: "admin" as const,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...currentNotifs, adminNotif]);

    setIsEditingRejected(false);
    onRegistered();
  };

  const handleGetGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData({ ...formData, gps: `${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}` });
        },
        () => {
          alert("⚠️ تعذر جلب إحداثيات GPS تلقائياً. يمكنك نسخ الإحداثيات يدوياً من الخريطة.");
        }
      );
    } else {
      alert("⚠️ متصفحك لا يدعم تحديد الموقع الجغرافي GPS.");
    }
  };

  // Start fresh application flow (deletes the old rejected record so they can sign up clean)
  const handleStartFreshApplication = () => {
    if (!confirm("هل تريد إلغاء الطلب القديم بالكامل وبدء استمارة تسجيل جديدة؟")) return;
    if (matchedPending) {
      const currentPending = db.getPendingProviders();
      db.saveCollection("pending_providers", currentPending.filter(p => p.id !== matchedPending.id));
    }
    setIsEditingRejected(false);
    setFormData({
      name: "",
      phone: currentUser.phone || "",
      category: "",
      subCategory: "",
      workAddress: "",
      city: "صنعاء",
      area: "",
      neighborhood: "",
      idCardNumber: "",
      experience: "",
      gps: "",
      profileImg: "",
      idCardImg: "",
    });
    onRegistered();
  };

  // --- APPROVED PROVIDER ACTION HANDLERS ---
  const handleAcceptBooking = (bookingId: string) => {
    const currentBookings = db.getBookings();
    const updated = currentBookings.map(b => b.id === bookingId ? { ...b, status: "accepted" as const } : b);
    db.saveBookings(updated);
    db.addAuditLog("قبول حجز فني", matchedProvider?.name || currentUser.name, `تم قبول الحجز ذو المعرف ${bookingId}`);
    
    // Add client notification
    const b = currentBookings.find(item => item.id === bookingId);
    if (b) {
      const currentNotifs = db.getNotifications();
      db.saveNotifications([{
        id: `not_b_acc_${Date.now()}`,
        title: "تم قبول طلب الخدمة الخاص بك! 🛠️",
        body: `لقد وافق الفني ${matchedProvider?.name} على طلبك وهو يستعد للبدء الآن.`,
        type: "user",
        targetType: "users",
        targetId: b.userId,
        isRead: false,
        timestamp: Date.now()
      }, ...currentNotifs]);
    }
    onRegistered();
  };

  const handleDeclineBooking = (bookingId: string) => {
    const reason = prompt("يرجى كتابة سبب الاعتذار عن تلبية الحجز ليظهر للعميل:") || "مشغول في عمل آخر";
    const currentBookings = db.getBookings();
    const updated = currentBookings.map(b => b.id === bookingId ? { ...b, status: "rejected" as const, rejectionReason: reason } : b);
    db.saveBookings(updated);
    db.addAuditLog("اعتذار عن حجز", matchedProvider?.name || currentUser.name, `الاعتذار عن الحجز ${bookingId} لسبب: ${reason}`);
    
    const b = currentBookings.find(item => item.id === bookingId);
    if (b) {
      const currentNotifs = db.getNotifications();
      db.saveNotifications([{
        id: `not_b_dec_${Date.now()}`,
        title: "تم الاعتذار عن طلب الخدمة ⚠️",
        body: `نعتذر منك، لم يتمكن الفني ${matchedProvider?.name} من قبول الحجز لسبب: ${reason}`,
        type: "user",
        targetType: "users",
        targetId: b.userId,
        isRead: false,
        timestamp: Date.now()
      }, ...currentNotifs]);
    }
    onRegistered();
  };

  const handleCompleteBooking = (bookingId: string) => {
    const currentBookings = db.getBookings();
    const updated = currentBookings.map(b => b.id === bookingId ? { ...b, status: "completed" as const, completedAt: Date.now() } : b);
    db.saveBookings(updated);
    db.addAuditLog("إتمام حجز بنجاح", matchedProvider?.name || currentUser.name, `إتمام الخدمة للحجز ${bookingId}`);
    
    const b = currentBookings.find(item => item.id === bookingId);
    if (b) {
      const currentNotifs = db.getNotifications();
      db.saveNotifications([{
        id: `not_b_comp_${Date.now()}`,
        title: "اكتملت الخدمة الفنية بنجاح! 🎉",
        body: `تم إتمام خدمتك بواسطة الفني ${matchedProvider?.name}. يرجى تقديم تقييم وتعليق لمساعدتنا في تحسين الجودة.`,
        type: "user",
        targetType: "users",
        targetId: b.userId,
        isRead: false,
        timestamp: Date.now()
      }, ...currentNotifs]);
    }
    onRegistered();
    alert("🌟 مبروك! تم إكمال الخدمة وتسجيل الأرباح في محفظتك بنجاح.");
  };

  const handleSendChatReply = () => {
    if (!chatReplyText.trim() || !activeChatId || !matchedProvider) return;
    
    const currentMessages = db.getMessages();
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: activeChatId,
      senderId: matchedProvider.id,
      senderName: matchedProvider.name,
      body: chatReplyText.trim(),
      isRead: false,
      timestamp: Date.now()
    };
    
    db.saveMessages([...currentMessages, newMsg]);

    const currentChats = db.getChats();
    const updatedChats = currentChats.map(c => 
      c.id === activeChatId 
        ? { ...c, lastMessage: chatReplyText.trim(), lastMessageTime: Date.now() } 
        : c
    );
    db.saveChats(updatedChats);

    setChatReplyText("");
    onRegistered();
  };

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawalAmount);
    if (!amount || amount <= 0 || !matchedProvider) {
      alert("⚠️ يرجى إدخال مبلغ صحيح للسحب!");
      return;
    }

    // Send admin notice
    const currentNotifs = db.getNotifications();
    const adminNotif = {
      id: `not_with_${Date.now()}`,
      title: "طلب سحب رصيد أرباح 💸",
      body: `طلب الفني (${matchedProvider.name}) سحب أرباح بقيمة ${amount.toLocaleString("ar-YE")} ريال يمني إلى الكريمي/الواتساب.`,
      type: "admin" as const,
      targetType: "admins" as const,
      targetId: "",
      targetRole: "admin" as const,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...currentNotifs, adminNotif]);

    db.addAuditLog("طلب سحب رصيد أرباح", matchedProvider.name, `مبلغ طلب السحب: ${amount} ريال يمني`);
    setWithdrawalAmount("");
    setWithdrawalSuccess(true);
    setTimeout(() => setWithdrawalSuccess(false), 5000);
  };

  const handleToggleVipPremiumRequest = () => {
    if (!matchedProvider) return;
    const isVipNow = matchedProvider.isPinned || matchedProvider.isSubscribed;
    
    const currentProviders = db.getProviders();
    const updated = currentProviders.map(p => 
      p.id === matchedProvider.id 
        ? { ...p, isPinned: !isVipNow, isSubscribed: !isVipNow } 
        : p
    );
    db.saveProviders(updated);

    // Alert and notify
    db.addAuditLog(
      isVipNow ? "إلغاء اشتراك VIP فني" : "تفعيل اشتراك VIP فني", 
      matchedProvider.name, 
      isVipNow ? "طلب إلغاء ترقية VIP" : "ترقية الحساب الفني لعضوية VIP متميزة"
    );
    onRegistered();
    alert(isVipNow ? "🔒 تم إلغاء اشتراك باقة VIP والعودة للحساب العادي." : "🏆 تهانينا! تم تفعيل وتوثيق حسابك بباقة VIP الذهبية المتميزة بنجاح وبأعلى درجات الظهور للعملاء!");
  };


  // --- VIEW RENDERING STATES ---

  // STATE A: APPROVED PROVIDER DASHBOARD (لوحة الفني المعتمد المكتملة بكل الصلاحيات)
  if (matchedProvider) {
    const myBookings = bookings.filter(b => b.providerId === matchedProvider.id);
    const myChats = db.getChats().filter(c => c.providerId === matchedProvider.id);
    const myNotifications = db.getNotifications().filter(
      n => n.targetType === "providers" || n.targetRole === "provider" || n.targetId === matchedProvider.id
    );

    return (
      <div className="max-w-6xl mx-auto space-y-6 text-right pb-12" dir="rtl">
        {/* Dashboard Banner Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-4 flex-row-reverse text-right">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center text-3xl overflow-hidden relative shadow">
              <img src={matchedProvider.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              {matchedProvider.isPinned && (
                <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black text-[8px] font-black text-center py-0.5 uppercase tracking-wider">VIP</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-row-reverse justify-end">
                <h1 className="text-xl font-black text-white">{matchedProvider.name}</h1>
                {matchedProvider.isVerified && <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full">✓ معتمد وموثق</span>}
              </div>
              <p className="text-xs text-slate-400 mt-1">{matchedProvider.category} • {matchedProvider.subCategory} • {matchedProvider.area}</p>
            </div>
          </div>

          {/* Quick Segmented tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 w-full md:w-auto">
            <button
              onClick={() => setProviderTab("dashboard")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${providerTab === "dashboard" ? "bg-amber-500 text-black shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Activity className="w-4 h-4" />
              <span>إحصائياتي</span>
            </button>
            <button
              onClick={() => setProviderTab("bookings")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${providerTab === "bookings" ? "bg-amber-500 text-black shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>الحجوزات</span>
              {myBookings.filter(b => b.status === "pending").length > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
            <button
              onClick={() => setProviderTab("chats")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${providerTab === "chats" ? "bg-amber-500 text-black shadow" : "text-slate-400 hover:text-white"}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>المحادثات</span>
            </button>
            <button
              onClick={() => setProviderTab("wallet")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${providerTab === "wallet" ? "bg-amber-500 text-black shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Wallet className="w-4 h-4" />
              <span>المحفظة</span>
            </button>
            <button
              onClick={() => setProviderTab("notifications")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${providerTab === "notifications" ? "bg-amber-500 text-black shadow" : "text-slate-400 hover:text-white"}`}
            >
              <Bell className="w-4 h-4" />
              <span>الإشعارات</span>
              {myNotifications.length > 0 && (
                <span className="bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">{myNotifications.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Inner Tab Switcher */}
        <div className="space-y-6">
          
          {/* 1. Stats and Profile View */}
          {providerTab === "dashboard" && (
            <ProviderStats
              settings={settings}
              bookings={bookings}
              providers={providers}
              currentUser={{
                id: matchedProvider.id,
                name: matchedProvider.name,
                phone: matchedProvider.phone,
                area: matchedProvider.area,
                role: "provider",
                deviceId: "prov_device"
              }}
            />
          )}

          {/* 2. Bookings Management View */}
          {providerTab === "bookings" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500">إجمالي الحجوزات: {myBookings.length} طلب</span>
                <h2 className="text-base font-extrabold text-white">إدارة حجوزات وطلبات عملائك الجدد والسابقة 📅</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myBookings.length > 0 ? (
                  myBookings.map((b) => (
                    <div key={b.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-md text-right" dir="rtl">
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                          b.status === "accepted" ? "bg-blue-500/10 text-blue-400" :
                          b.status === "rejected" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400 animate-pulse"
                        }`}>
                          {b.status === "completed" ? "✓ مكتمل وناجح" :
                           b.status === "accepted" ? "⏳ قيد التنفيذ والعمل" :
                           b.status === "rejected" ? "❌ ملغي/معتذر عنه" : "🔔 طلب حجز جديد معلق"}
                        </span>
                        <span className="text-slate-500 font-mono text-[9px]">رقم الحجز: #{b.id.substring(b.id.length - 6)}</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-slate-400"><b className="text-white">العميل:</b> {b.userName}</p>
                        <p className="text-slate-400"><b className="text-white">رقم الهاتف:</b> <span className="font-mono text-emerald-400 select-all">{b.userPhone}</span></p>
                        <p className="text-slate-400"><b className="text-white">المدينة والنطاق:</b> {b.userAddress || "صنعاء - السبعين"}</p>
                        {b.preferredDate && <p className="text-slate-400"><b className="text-white">الموعد المفضل:</b> {b.preferredDate} @ {b.preferredTime || "خلال اليوم"}</p>}
                        {b.notes && <p className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 text-slate-300 font-medium leading-relaxed"><b>وصف العميل:</b> {b.notes}</p>}
                        {b.rejectionReason && <p className="p-2 bg-rose-950/20 text-rose-400 border border-rose-950/40 rounded-lg text-[11px]"><b>سبب الرفض والاعتذار:</b> {b.rejectionReason}</p>}
                      </div>

                      {/* Dynamic Action Buttons */}
                      <div className="flex gap-2 justify-end pt-2 border-t border-slate-850">
                        {b.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleDeclineBooking(b.id)}
                              className="px-3.5 py-2 bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                            >
                              الاعتذار والرفض ❌
                            </button>
                            <button
                              onClick={() => handleAcceptBooking(b.id)}
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-black cursor-pointer transition-all"
                            >
                              قبول وبدء الحجز ✓
                            </button>
                          </>
                        )}
                        {b.status === "accepted" && (
                          <button
                            onClick={() => handleCompleteBooking(b.id)}
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-black cursor-pointer transition-all flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>تم الانتهاء والخدمة اكتملت بنجاح 🎉</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl max-w-lg mx-auto text-slate-400 text-xs">
                    <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    لا توجد لديك أي حجوزات فنية مرسلة أو مكتملة بعد. عند حجز خدماتك، ستظهر طلبات العملاء فوراً هنا لتأكيدها وتلقي الاتصالات والتحركات الجغرافية.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. Client Messaging & Chats View */}
          {providerTab === "chats" && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">المحادثات المباشرة وغرف الدردشة مع عملائك 💬</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden h-[480px]">
                {/* Chats list panel (1/3 width) */}
                <div className="border-l border-slate-800 p-4 space-y-2 overflow-y-auto max-h-[480px]">
                  <p className="text-[10px] text-slate-500 border-b border-slate-800 pb-2 mb-2 font-bold">غرف الدردشة المفتوحة</p>
                  {myChats.length > 0 ? (
                    myChats.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setActiveChatId(c.id);
                        }}
                        className={`p-3 rounded-xl text-right text-xs cursor-pointer transition-all border ${
                          activeChatId === c.id ? "bg-amber-500 text-black border-amber-500" : "bg-slate-950/40 border-slate-850 text-slate-300 hover:bg-slate-950/80"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] opacity-65 font-bold">عميل</span>
                          <h4 className="font-bold">{c.userName}</h4>
                        </div>
                        <p className={`text-[10px] truncate mt-1 ${activeChatId === c.id ? "text-slate-900" : "text-slate-500"}`}>{c.lastMessage || "بدء محادثة جديدة..."}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-500 text-center italic py-4">لا توجد محادثات عملاء نشطة.</p>
                  )}
                </div>

                {/* Messages Panel (2/3 width) */}
                <div className="col-span-2 flex flex-col h-[480px] bg-slate-950/40 relative">
                  {activeChatId ? (
                    <>
                      {/* Active Room Header */}
                      <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-white flex items-center justify-between">
                        <span>قناة دعم فنية مشفرة</span>
                        <span>محادثة: {myChats.find(c => c.id === activeChatId)?.userName || "عميل"}</span>
                      </div>

                      {/* Messages scroll content */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[350px] flex flex-col">
                        {db.getMessages().filter(m => m.chatId === activeChatId).map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-2xl max-w-xs text-xs space-y-1 ${
                              msg.senderId === matchedProvider.id
                                ? "bg-amber-500 text-black self-start"
                                : "bg-slate-900 text-white border border-slate-800 self-end"
                            }`}
                          >
                            <p className="font-black text-[9px] opacity-70">{msg.senderName}</p>
                            <p className="font-medium leading-relaxed break-words">{msg.body}</p>
                            <span className="text-[8px] opacity-60 block text-left font-mono">{new Date(msg.timestamp).toLocaleTimeString("ar-YE", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Chat entry form */}
                      {matchedProvider?.isChatBlocked || settings?.chatStatus === "disabled" ? (
                        <div className="p-3 bg-red-950/20 border-t border-slate-800 text-center text-xs font-bold text-rose-400 absolute bottom-0 inset-x-0">
                          ⚠️ تم تجميد ميزة المحادثات الخاصة بحسابك الفني مؤقتاً من قبل الإدارة الفنية لمخالفة التعليمات.
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2 items-center absolute bottom-0 inset-x-0">
                          <button
                            onClick={handleSendChatReply}
                            className="p-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <input
                            type="text"
                            placeholder="اكتب ردك أو رسالتك للعميل هنا..."
                            value={chatReplyText}
                            onChange={(e) => setChatReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSendChatReply();
                            }}
                            className="flex-1 h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="m-auto text-center p-6 space-y-2 text-slate-500 text-xs">
                      <MessageSquare className="w-12 h-12 text-slate-700 mx-auto" />
                      <p>يرجى اختيار إحدى غرف المحادثة النشطة من اللوحة الجانبية لبدء التراسل مع العميل وتحديد موقع العمل بدقة.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. Wallet & Payments View */}
          {providerTab === "wallet" && (
            <div className="space-y-6">
              <h2 className="text-base font-extrabold text-white">المحفظة المالية وإدارة عمولات الفني والاشتراكات 💳</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Part A: Wallet Info and payout */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">نشطة مفعّلة</span>
                    <h3 className="font-bold text-white flex items-center gap-1.5"><Wallet className="w-4.5 h-4.5 text-amber-500" /> الرصيد والتحصيلات المالية</h3>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">رصيد الأرباح الحالي القابل للسحب:</span>
                      <span className="text-2xl font-black text-emerald-400">
                        {(myBookings.filter(b => b.status === "completed").length * (matchedProvider.price || 3000)).toLocaleString("ar-YE")} ريال
                      </span>
                    </div>
                    <span className="text-3xl text-emerald-500">💰</span>
                  </div>

                  <form onSubmit={handleRequestWithdrawal} className="space-y-3">
                    <label className="text-xs text-slate-350 font-bold block">طلب سحب فوري للأرباح إلى الكريمي أو محفظة الجوال:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="أدخل المبلغ المراد سحبه (مثال: 15000)..."
                        required
                        value={withdrawalAmount}
                        onChange={(e) => setFormData({ ...formData })} // keep unchanged but set local
                        onInput={(e: any) => setWithdrawalAmount(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl cursor-pointer"
                      >
                        طلب سحب 💸
                      </button>
                    </div>
                    {withdrawalSuccess && (
                      <p className="text-xs text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        ✓ تم إرسال طلب السحب بنجاح للمدير العام! سيتم تحويل المبلغ إلى حساب الكريمي المسجل للواتساب الخاص بك خلال 24 ساعة.
                      </p>
                    )}
                  </form>
                </div>

                {/* Part B: VIP Status & Subscription Options */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <span className="text-[10px] text-amber-500 font-bold">باقة المطورين 🏆</span>
                    <h3 className="font-bold text-white flex items-center gap-1.5"><Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" /> باقة اشتراك VIP الذهبية للتميز</h3>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed">
                    اشترك الآن أو قم بإلغاء اشتراكك في باقة التميز الذهبية التي توفر لك الأسبقية في الظهور عند بحث العملاء، شارة النجمة المضيئة، وتوصيات خوارزمية WAM!
                  </p>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 text-xs block font-bold">سعر الباقة الحالي المحدد من الإدارة:</span>
                      <span className="text-amber-500 text-sm font-extrabold font-mono">
                        {settings.vipSubscriptionPrice && settings.vipSubscriptionPrice > 0 
                          ? `${settings.vipSubscriptionPrice.toLocaleString("ar-YE")} ريال / شهرياً` 
                          : "اشتراك مجاني بالكامل حالياً"
                        }
                      </span>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] px-2 py-0.5 rounded-full font-bold">قيمة تفاعلية</span>
                  </div>

                  <button
                    onClick={handleToggleVipPremiumRequest}
                    className={`w-full py-2.5 rounded-xl font-black text-xs transition-all active:scale-[0.98] cursor-pointer ${
                      matchedProvider.isPinned 
                        ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30" 
                        : "bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/10"
                    }`}
                  >
                    {matchedProvider.isPinned ? "🚫 إلغاء باقة VIP الذهبية" : "🏆 تفعيل/ترقية حسابي لـ VIP الآن"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. Notifications View */}
          {providerTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-base font-extrabold text-white">إشعارات النظام وتنبيهات الإدارة الفنية 🔔</h2>
              
              <div className="space-y-2.5">
                {myNotifications.length > 0 ? (
                  myNotifications.map((n) => (
                    <div key={n.id} className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-right text-xs space-y-1.5" dir="rtl">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[10px]">{new Date(n.timestamp).toLocaleString("ar-YE")}</span>
                        <h4 className="font-bold text-amber-500 flex items-center gap-1.5">
                          <span>📢</span>
                          <span>{n.title}</span>
                        </h4>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-semibold">{n.body}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl max-w-lg mx-auto text-slate-400 text-xs">
                    <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    لا توجد أي تعميمات أو إشعارات إدارية جديدة مرسلة إلى فئتك المهنية حالياً. تابع قنواتنا للحصول على كل جديد.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // STATE B: PENDING APPROVAL WORKFLOW (قيد الموافقة والتحقق الفوري من الهوية)
  if (matchedPending && matchedPending.status === "pending" && !isEditingRejected) {
    return (
      <div className="p-8 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-6 max-w-xl mx-auto text-right shadow-xl" dir="rtl">
        <div className="p-4 bg-amber-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto text-amber-500 border border-amber-500/20 animate-pulse">
          <Clock className="w-10 h-10" />
        </div>
        
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-black text-white">طلب الانضمام قيد المراجعة والتدقيق ⏳</h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
            أهلاً بك شريكنا العزيز! طلبك لتسجيل كفني رسمي معتمد في منصة <b>{settings.appName}</b> قيد المراجعة الأمنية والمطابقة الفنية حالياً للتحقق من مصداقية وثائقك الثبوتية.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
            <span className="text-slate-400">حالة الطلب الحالية:</span>
            <span className="text-amber-500 font-black flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" /> قيد التحقق ومراجعة الهوية
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">الاسم الثلاثي المسجل:</span>
            <span className="text-white font-extrabold">{matchedPending.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">رقم الهاتف الفعال:</span>
            <span className="text-emerald-400 font-mono font-semibold">{matchedPending.phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">القسم الفني الرئيسي:</span>
            <span className="text-amber-500 font-bold">{matchedPending.category}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">المنطقة الجغرافية:</span>
            <span className="text-slate-300 font-semibold">{matchedPending.area || "صنعاء"}</span>
          </div>
        </div>

        <div className="p-3 bg-slate-950/40 rounded-xl text-[11px] text-slate-500 leading-relaxed text-center">
          💡 يمكنك البقاء في هذه الصفحة أو إغلاق التطبيق. سنقوم فور اعتماد طلبك بإشعارك تلقائياً عبر الواتساب على الرقم المسجل <b>{matchedPending.phone}</b>، وعندما تفتح التطبيق ستتحول هذه الشاشة تلقائياً للوحتك المهنية الكاملة!
        </div>

        <button
          onClick={onRegistered}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>تحديث حالة الطلب الفوري 🔄</span>
        </button>
      </div>
    );
  }

  // STATE C: REJECTED / INCOMPLETE WORKFLOW (مرفوض مؤقتاً بسبب شروط ناقصة)
  if (matchedPending && matchedPending.status === "rejected" && !isEditingRejected) {
    return (
      <div className="p-8 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-6 max-w-xl mx-auto text-right shadow-xl" dir="rtl">
        <div className="p-4 bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-black text-rose-500">طلب الانضمام مرفوض أو غير مكتمل ⚠️</h2>
          <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
            عذراً شريكنا العزيز، لم نتمكن من اعتماد وتوثيق حسابك الفني في منصة <b>{settings.appName}</b> حالياً بسبب نقص بعض شروط التسجيل المطلوبة للتوثيق.
          </p>
        </div>

        <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/20 text-xs text-right space-y-2.5">
          <p className="text-rose-400 font-extrabold flex items-center gap-1">
            <span>📝</span>
            <span>الشرط الناقص والنواقص المطلوبة للتعديل:</span>
          </p>
          <p className="text-white bg-slate-950 p-3 rounded-xl border border-slate-850 font-bold leading-relaxed text-xs">
            {matchedPending.rejectReason || "يرجى تعديل استمارة الهوية وإعادة إرسال صورة شخصية وصورة هوية واضحة بخلفية مناسبة."}
          </p>
        </div>

        <div className="p-3 bg-slate-950/40 rounded-xl text-[11px] text-slate-500 leading-relaxed text-center">
          يمكنك إعادة التقديم بسهولة فوراً بتعديل الشروط الناقصة وتأكيدها لتسريع تفعيل حسابك والبدء في تلقي الحجوزات.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            onClick={handleStartFreshApplication}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            حذف والبدء من جديد 🗑️
          </button>
          <button
            onClick={() => setIsEditingRejected(true)}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-black transition-all shadow cursor-pointer"
          >
            تعديل الطلب وإعادة الإرسال 🛠️
          </button>
        </div>
      </div>
    );
  }

  // STATE D: SIGNUP FORM (أول مرة تسجيل أو فني جديد)
  return (
    <div className="max-w-xl mx-auto space-y-6 text-right pb-12" dir="rtl">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-black text-white">انضم كشريك خدمة فنية معتمد 🛠️</h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          سجل معلوماتك بدقة، وسنقوم بمراجعة طلبك وتوثيق حسابك وربطك بآلاف العملاء الباحثين عن خدماتك الفنية في منطقتك الجغرافية!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        {/* Section 1: Personal Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <User className="w-4 h-4" /> المعطيات الشخصية الأساسية
          </h3>
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">الاسم الثلاثي الكامل <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد عبد الله اليماني"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
                <User className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">رقم هاتف فعال / واتساب للتواصل والتوثيق <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="مثال: 777111222"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
                <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Service and Specialty */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Briefcase className="w-4 h-4" /> التخصص والخدمة الفنية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">القسم والخدمة الرئيسية <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none focus:border-amber-500"
              >
                <option value="">اختر القسم الرئيسي...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">الخدمة التفصيلية / التخصص</label>
              <input
                type="text"
                placeholder="مثال: تركيب لوحات، كشف تسريب..."
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Workplace and Area Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <MapPin className="w-4 h-4" /> النطاق الجغرافي السكني والعملي
          </h3>
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-bold">المدينة <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                >
                  <option value="صنعاء">صنعاء</option>
                  <option value="عدن">عدن</option>
                  <option value="تعز">تعز</option>
                  <option value="الحديدة">الحديدة</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-bold">المديرية <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="مثال: السبعين"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">الحي السكني</label>
                <input
                  type="text"
                  placeholder="مثال: حي حدة"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">عنوان مركز/مكتب العمل الحالي بالتفصيل <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder="مثال: تقاطع شارع الجزائر مع بغداد، بجانب مركز اليمن للتقنية"
                value={formData.workAddress}
                onChange={(e) => setFormData({ ...formData, workAddress: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: GPS Coordinates Locator */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Compass className="w-4 h-4" /> الإحداثيات الجغرافية GPS للعمل المباشر
          </h3>
          <div className="flex gap-2.5">
            <input
              type="text"
              placeholder="خط العرض وخط الطول (تلقائي أو يدوي)..."
              value={formData.gps}
              onChange={(e) => setFormData({ ...formData, gps: e.target.value })}
              className="flex-1 h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGetGps}
              className="px-4 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>تحديد تلقائي</span>
            </button>
          </div>
        </div>

        {/* Section 5: Documents uploads */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Camera className="w-4 h-4" /> تحميل الصور والوثائق الثبوتية للتحقق
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 bg-slate-950/40 text-center space-y-2 cursor-pointer relative">
              <Upload className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-semibold">تحميل الصورة الشخصية *</p>
              <p className="text-[10px] text-slate-600">صورة واضحة بخلفية بيضاء للملف الشخصي</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFormData({ ...formData, profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.profileImg && (
                <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center gap-2">
                  <img src={formData.profileImg} alt="Preview" className="w-10 h-10 rounded object-cover" />
                  <span className="text-[10px] text-emerald-500 font-bold flex-1 text-right">تم تحميل الصورة الشخصية بنجاح!</span>
                </div>
              )}
            </div>

            <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 bg-slate-950/40 text-center space-y-2 cursor-pointer relative">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-semibold">تحميل صورة الهوية / جواز السفر *</p>
              <p className="text-[10px] text-slate-600">نسخة ثبوتية واضحة للتحقق من هوية مقدم الخدمة</p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  setFormData({ ...formData, idCardImg: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=300" });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.idCardImg && (
                <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center gap-2">
                  <FileText className="w-8 h-8 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-bold flex-1 text-right">تم تحميل وثيقة الهوية بنجاح!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Additional details */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-300">شهادات الخبرة المهنية / نبذة تعريفية قصيرة</label>
          <textarea
            rows={3}
            placeholder="مثال: متخصص في صيانة الكهرباء، حاصل على شهادة دبلوم فني فني ذو خبرة ممتازة..."
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm rounded-xl cursor-pointer transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99]"
        >
          {matchedPending ? "تأكيد وإعادة إرسال طلب الانضمام المحدث ✓" : "إرسال طلب الانضمام كشريك خدمات معتمد"}
        </button>
      </form>
    </div>
  );
}

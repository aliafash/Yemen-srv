import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AppSettings, 
  Provider, 
  PendingProvider, 
  Booking, 
  Chat, 
  Message, 
  Notification, 
  User 
} from "./types";
import { db } from "./lib/db";

// Lucide Icons
import { 
  Home, 
  Compass, 
  UserCheck, 
  Bell, 
  MessageSquare, 
  Bot, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  Star, 
  Share2, 
  Calendar, 
  MapPin, 
  X, 
  Send,
  MessageCircle,
  HelpCircle,
  Award,
  CheckCircle2,
  Clock,
  User as UserIcon,
  Phone,
  Info,
  Heart,
  CreditCard,
  Camera,
  Video
} from "lucide-react";

// Modular Components
import HomeTab from "./components/HomeTab";
import MapTab from "./components/MapTab";
import JoinTab from "./components/JoinTab";
import BookingTab from "./components/BookingTab";
import ChatTab from "./components/ChatTab";
import AboutTab from "./components/AboutTab";
import { PaymentTab } from "./components/PaymentTab";
import SmartAssistant from "./components/SmartAssistant";
import BackdoorDialog from "./components/BackdoorDialog";
import NotificationCenter from "./components/NotificationCenter";
import AdminPanel from "./components/AdminPanel";
import UserProfileDialog from "./components/UserProfileDialog";
import Onboarding from "./components/Onboarding";

export default function App() {
  // Reactive Database States
  const [settings, setSettings] = useState<AppSettings>(db.getSettings());
  const [categories, setCategories] = useState<any[]>(db.getCategories());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [pendingProviders, setPendingProviders] = useState<PendingProvider[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Active Screen states
  const [activeTab, setActiveTab] = useState<"home" | "map" | "join" | "booking" | "chat" | "about" | "payment" | "admin">("home");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState<string>("cash");

  // Star Rating States
  const [userRating, setUserRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [reviewVideo, setReviewVideo] = useState("");

  // Reset rating state when selected provider changes
  useEffect(() => {
    setUserRating(0);
    setRatingSubmitted(false);
    setReviewComment("");
    setReviewImage("");
    setReviewVideo("");
  }, [selectedProvider]);

  // Modals Toggles
  const [backdoorOpen, setBackdoorOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Role switcher password verification states
  const [showRolePasswordModal, setShowRolePasswordModal] = useState(false);
  const [pendingRoleToSwitch, setPendingRoleToSwitch] = useState<string | null>(null);
  const [rolePasswordInput, setRolePasswordInput] = useState("");
  const [rolePasswordError, setRolePasswordError] = useState("");
  const [isRoleVerifying, setIsRoleVerifying] = useState(false);
  const [showPasswordChar, setShowPasswordChar] = useState(false);
  const [showRecoveryOptions, setShowRecoveryOptions] = useState(false);

  // Unified account recovery system states
  const [recoveryPhone, setRecoveryPhone] = useState("");
  const [recoveryUserType, setRecoveryUserType] = useState<"user" | "provider">("user");
  const [enteredRecoveryCode, setEnteredRecoveryCode] = useState("");
  const [newRecoveryPassword, setNewRecoveryPassword] = useState("");
  const [recoveryRequested, setRecoveryRequested] = useState(false);

  // Secret Easter Egg click counter
  const [homeClickCount, setHomeClickCount] = useState(0);

  // Simulation current user role switching (For preview testing)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const raw = localStorage.getItem("wam_current_user");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return {
      id: "guest_visitor",
      name: "زائر مجهول",
      phone: "777000000",
      area: "صنعاء",
      role: "visitor",
      deviceId: "web_device_visitor"
    };
  });

  useEffect(() => {
    localStorage.setItem("wam_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Keep track of the bookings list to detect state changes in real-time
  const [prevBookings, setPrevBookings] = useState<Booking[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (prevBookings.length > 0 && bookings.length > 0) {
      bookings.forEach(currBk => {
        const prevBk = prevBookings.find(pb => pb.id === currBk.id);
        if (prevBk) {
          const isUserBooking = currBk.userId === currentUser.id;
          const statusChanged = prevBk.status === "pending" && (currBk.status === "accepted" || currBk.status === "completed");
          
          if (isUserBooking && statusChanged) {
            const statusLabel = currBk.status === "accepted" ? "مقبول ومؤكد وننتظر البدء ⏳" : "مكتمل بنجاح! شكراً لتعاملك معنا ✨";
            const sound = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav");
            sound.play().catch(() => {});
            
            setToastMessage(`تم تغيير حالة حجزك للخدمة (${currBk.subCategory}) من [قيد الانتظار] إلى [${statusLabel}] فورا!`);
          }
        }
      });
    }
    setPrevBookings(bookings);
  }, [bookings, currentUser.id]);

  // Database Snapshot Synchronization
  useEffect(() => {
    const unsubSettings = db.subscribe("settings", (data) => setSettings(data));
    const unsubCategories = db.subscribe("categories", (data) => setCategories(data));
    const unsubProviders = db.subscribe("providers", (data) => setProviders(data));
    const unsubPending = db.subscribe("pending_providers", (data) => setPendingProviders(data));
    const unsubBookings = db.subscribe("bookings", (data) => setBookings(data));
    const unsubChats = db.subscribe("chats", (data) => setChats(data));
    const unsubMessages = db.subscribe("messages", (data) => setMessages(data));
    const unsubNotifs = db.subscribe("notifications", (data) => setNotifications(data));
    const unsubUsers = db.subscribe("users", (data) => setUsers(data));

    return () => {
      unsubSettings();
      unsubCategories();
      unsubProviders();
      unsubPending();
      unsubBookings();
      unsubChats();
      unsubMessages();
      unsubNotifs();
      unsubUsers();
    };
  }, []);

  // Onboarding Screen State & Trigger effects
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    // Check if user has already onboarded, and if onboarding is enabled in settings
    const hasOnboarded = localStorage.getItem("wam_onboarded");
    if (!hasOnboarded && settings.isOnboardingEnabled !== false) {
      setOnboardingOpen(true);
    }
  }, [settings.isOnboardingEnabled]);

  useEffect(() => {
    // Listen to admin panel manual trigger events
    const handlePreview = () => {
      setOnboardingOpen(true);
    };
    window.addEventListener("trigger-onboarding-preview", handlePreview);
    return () => {
      window.removeEventListener("trigger-onboarding-preview", handlePreview);
    };
  }, []);

  // Handler to record interactive star rating and compute new average
  const handleRateProvider = (providerId: string, ratingValue: number) => {
    if (ratingValue < 1 || ratingValue > 5) return;
    if (!selectedProvider) return;

    // Create a pending review
    const newReview = {
      id: `rev_${Date.now()}`,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      userId: currentUser?.id || "guest",
      userName: currentUser?.name || "عميل مجهول",
      userPhone: currentUser?.phone || "",
      rating: ratingValue,
      comment: reviewComment.trim(),
      imageUrl: reviewImage,
      videoUrl: reviewVideo,
      status: "pending" as const,
      timestamp: Date.now()
    };

    const currentReviews = db.getReviews();
    db.saveReviews([newReview, ...currentReviews]);

    // Send admin notification
    const systemNotifs = db.getNotifications();
    const adminNotif = {
      id: `not_rev_${Date.now()}`,
      title: "تقييم ومراجعة جديدة للموافقة ⭐️",
      body: `قام العميل ${currentUser?.name || "عميل مجهول"} بإضافة مراجعة وتقييم (${ratingValue} نجوم) للفني ${selectedProvider.name}. يرجى مراجعة التعليق والمرفقات والموافقة عليها لتظهر للجميع.`,
      type: "admin" as const,
      targetType: "admins" as const,
      targetId: "",
      targetRole: "admin" as const,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...systemNotifs, adminNotif]);

    setRatingSubmitted(true);
    alert("✅ تم إرسال تقييمك ومراجعتك بنجاح! ستظهر على الملف الشخصي للفني فور موافقة المشرفين.");
  };

  const handleRoleChangeAttempt = (role: string) => {
    if (
      role === "admin" || 
      role === "director" || 
      role === "supervisor" || 
      role === "division_supervisor" || 
      role === "owner" || 
      role === "provider"
    ) {
      setPendingRoleToSwitch(role);
      setRolePasswordInput("");
      setRolePasswordError("");
      setShowRolePasswordModal(true);
    } else {
      let u: User = { id: "guest_visitor", name: "زائر مجهول", phone: "777000000", area: "صنعاء", role: "visitor", deviceId: "web_device_visitor" };
      if (role === "user" || role === "client") {
        u = { id: "user_saeed", name: "أ. سعيد القحطاني", phone: "771222333", area: "صنعاء", role: "client", deviceId: "web_saeed" };
      }
      
      const currentUsers = db.getUsers();
      const savedUser = currentUsers.find(user => user.id === u.id);
      if (savedUser) {
        u = savedUser;
      } else {
        db.saveUsers([...currentUsers, u]);
      }

      setCurrentUser(u);
      setActiveTab("home");
    }
  };

  // Request 6-digit secure recovery code
  const handleRequestRecoveryCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryPhone.trim()) return alert("⚠️ يرجى إدخال رقم الهاتف أولاً.");

    // Check if user/provider exists
    const phoneClean = recoveryPhone.trim();
    let targetName = "";
    let exists = false;

    if (recoveryUserType === "provider") {
      const providersList = db.getProviders();
      const prov = providersList.find(p => p.phone === phoneClean);
      if (prov) {
        exists = true;
        targetName = prov.name;
      }
    } else {
      const usersList = db.getUsers();
      const usr = usersList.find(u => u.phone === phoneClean);
      if (usr) {
        exists = true;
        targetName = usr.name || "عميل";
      }
    }

    if (!exists) {
      alert(`❌ خطأ: لم يتم العثور على أي حساب مسجل برقم الهاتف ${phoneClean} في دليل WAM.`);
      return;
    }

    // Generate 6-digit code
    const randCode = Math.floor(100000 + Math.random() * 900000).toString();
    const secureCode = `WAM_${randCode}`;

    // Store the recovery request in local collection
    const currentRequests = db.getCollection("recovery_requests") || [];
    const newRequest = {
      id: `rec_${Date.now()}`,
      phone: phoneClean,
      userType: recoveryUserType,
      name: targetName,
      code: secureCode,
      status: "pending",
      timestamp: Date.now()
    };
    db.saveCollection("recovery_requests", [newRequest, ...currentRequests]);

    // Send Admin Notification so it appears in Admin Panel
    const systemNotifs = db.getNotifications();
    const recoveryNotif = {
      id: `not_rec_${Date.now()}`,
      title: "🔑 طلب استرداد حساب وكود أمان",
      body: `طلب الفني/العميل ${targetName} (${phoneClean}) استرداد حسابه. كود الأمان المولد يدوياً هو: [ ${secureCode} ]. يرجى تزويده للعميل للتحقق.`,
      type: "admin" as const,
      targetType: "admins" as const,
      targetId: "",
      targetRole: "admin" as const,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...systemNotifs, recoveryNotif]);
    db.addAuditLog("PASSWORD_RECOVERY_REQUESTED", "SYSTEM", `طلب استرداد حساب لـ ${targetName} (${phoneClean})`);

    setRecoveryRequested(true);
    alert(`✅ تم إرسال طلبك بنجاح للمشرف العام!\nيرجى التواصل مع إدارة WAM (777644 أو واتساب) للحصول على كود الأمان المؤقت المكون من 6 أرقام لتغيير كلمة المرور.`);
  };

  // Verify code and reset password
  const handleVerifyAndResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredRecoveryCode.trim()) return alert("⚠️ يرجى إدخال كود الاسترداد المكون من 6 أرقام.");
    if (newRecoveryPassword.trim().length < 6) return alert("⚠️ يجب ألا تقل كلمة المرور الجديدة عن 6 خانات.");

    const phoneClean = recoveryPhone.trim();
    const codeClean = enteredRecoveryCode.trim();
    const newPassEncoded = btoa(newRecoveryPassword.trim());

    // Fetch recovery requests
    const currentRequests = db.getCollection("recovery_requests") || [];
    const matchingReqIndex = currentRequests.findIndex((r: any) => r.phone === phoneClean && r.code === codeClean && r.status === "pending");

    if (matchingReqIndex === -1) {
      alert("❌ كود الاسترداد غير صحيح أو منتهي الصلاحية! يرجى التأكد من الكود الممنوح لك من المشرف العام.");
      return;
    }

    // Code matches! Update the target user's password
    if (recoveryUserType === "provider") {
      const providersList = db.getProviders();
      const updatedProviders = providersList.map(p => {
        if (p.phone === phoneClean) {
          return { ...p, password: newPassEncoded };
        }
        return p;
      });
      db.saveProviders(updatedProviders);
    } else {
      const usersList = db.getUsers();
      const updatedUsers = usersList.map(u => {
        if (u.phone === phoneClean) {
          return { ...u, password: newRecoveryPassword.trim() }; // Users use plain password or encoded depending on db
        }
        return u;
      });
      db.saveUsers(updatedUsers);
    }

    // Mark request as completed
    currentRequests[matchingReqIndex].status = "completed";
    db.saveCollection("recovery_requests", currentRequests);

    db.addAuditLog("PASSWORD_RECOVERY_COMPLETED", "SYSTEM", `تم بنجاح تغيير كلمة مرور الحساب المرتبط بالرقم ${phoneClean}`);
    
    // Reset states
    setRecoveryPhone("");
    setEnteredRecoveryCode("");
    setNewRecoveryPassword("");
    setRecoveryRequested(false);
    setShowRecoveryOptions(false);

    alert("🎉 تهانينا! تم تحديث كلمة المرور الخاصة بحسابك بنجاح. يمكنك الآن تسجيل الدخول بها فوراً.");
  };

  const handleRecoverRolePassword = (method: "whatsapp" | "internal") => {
    const roleName = pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director" ? "مدير عام / رئيسي" : 
                     pendingRoleToSwitch === "supervisor" ? "مشرف عام" : 
                     pendingRoleToSwitch === "division_supervisor" ? "مشرف قسم" : "مقدم خدمة";
                      
    if (method === "whatsapp") {
      const msg = encodeURIComponent(`السلام عليكم، لقد فقدت كلمة المرور الخاصة بحسابي كـ (${roleName}) في تطبيق WAM. يرجى تزويدي ببيانات استرداد الدخول للأهمية.`);
      const phone = settings.supportWhatsapp || "777644";
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      alert("✅ تم تجهيز رسالة الاسترداد! سيتم توجيهك إلى واتساب الدعم الفني لمساعدتك.");
    } else {
      // Create internal notification
      const notifs = db.getNotifications();
      const recoveryNotif: Notification = {
        id: `recovery_${Date.now()}`,
        title: "🔑 طلب استعادة كلمة المرور",
        body: `طلب استرجاع أمني لكلمة مرور حساب (${roleName}) في تمام الساعة ${new Date().toLocaleTimeString("ar")}`,
        type: "admin",
        targetType: "all",
        targetId: "admin",
        targetRole: "admin",
        isRead: false,
        timestamp: Date.now()
      };
      db.saveNotifications([recoveryNotif, ...notifs]);
      db.addAuditLog("PASSWORD_RECOVERY_REQUESTED", "SYSTEM", `طلب استرداد كلمة مرور لـ ${roleName}`);
      alert("📥 تم إرسال طلب استعادة كلمة المرور داخلياً لقسم الأمان بنجاح! سيقوم المشرف بمعالجة طلبك قريباً.");
    }
    setShowRecoveryOptions(false);
  };

  const handleVerifyRolePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingRoleToSwitch) return;

    setIsRoleVerifying(true);
    setRolePasswordError("");

    try {
      const type = (pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director") ? "admin" : "backdoor";
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: rolePasswordInput, type })
      });
      const data = await res.json();
      
      let isSuccess = data && data.success;

      // Local fallback in case of offline/network issues or custom settings passwords
      if (!isSuccess) {
        if (pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director") {
          isSuccess = rolePasswordInput === (settings.adminPassword || "maher736462");
        } else if (pendingRoleToSwitch === "owner") {
          isSuccess = rolePasswordInput === (settings.backdoorPassword || "maher--736462");
        } else if (pendingRoleToSwitch === "supervisor" || pendingRoleToSwitch === "division_supervisor") {
          isSuccess = rolePasswordInput === (settings.adminPassword || "maher736462") || 
                      rolePasswordInput === (settings.backdoorPassword || "maher--736462");
        } else if (pendingRoleToSwitch === "provider") {
          isSuccess = rolePasswordInput === (settings.backdoorPassword || "maher--736462") ||
                      rolePasswordInput === (settings.adminPassword || "maher736462");
        }
      }

      if (isSuccess) {
        let u: User;
        if (pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director") {
          u = { id: "admin_maher", name: "WAM2026 (المدير الرئيسي)", phone: "777644", area: "صنعاء", role: "director", deviceId: "web_maher" };
        } else if (pendingRoleToSwitch === "owner") {
          u = { id: "owner_wam2026", name: "WAM2026", phone: "777644", area: "صنعاء", role: "owner", deviceId: "android_id_owner" };
        } else if (pendingRoleToSwitch === "supervisor") {
          u = { id: "supervisor_wam", name: "المشرف العام لـ WAM", phone: "777644", area: "صنعاء", role: "supervisor", deviceId: "web_supervisor" };
        } else if (pendingRoleToSwitch === "division_supervisor") {
          u = { id: "div_supervisor_wam", name: "مشرف القسم الخدمي", phone: "777644", area: "صنعاء", role: "division_supervisor", deviceId: "web_div_supervisor" };
        } else {
          u = { id: "prov_777123456", name: "م. ماجد صلاح الصنعاني", phone: "777123456", area: "حدة", role: "provider", deviceId: "web_majed" };
        }

        const currentUsers = db.getUsers();
        const savedUser = currentUsers.find(user => user.id === u.id);
        if (savedUser) {
          u = savedUser;
        } else {
          db.saveUsers([...currentUsers, u]);
        }

        setCurrentUser(u);
        setShowRolePasswordModal(false);
        setPendingRoleToSwitch(null);
        setRolePasswordInput("");
        alert(`🔓 تم تسجيل الدخول بنجاح بصلاحية: [${u.name}]`);
      } else {
        setRolePasswordError("❌ كلمة المرور المدخلة غير صحيحة!");
      }
    } catch (err) {
      // Local fallback when offline
      let isSuccess = false;
      if (pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director") {
        isSuccess = rolePasswordInput === (settings.adminPassword || "maher736462");
      } else if (pendingRoleToSwitch === "owner") {
        isSuccess = rolePasswordInput === (settings.backdoorPassword || "maher--736462");
      } else if (pendingRoleToSwitch === "supervisor" || pendingRoleToSwitch === "division_supervisor") {
        isSuccess = rolePasswordInput === (settings.adminPassword || "maher736462") || 
                    rolePasswordInput === (settings.backdoorPassword || "maher--736462");
      } else if (pendingRoleToSwitch === "provider") {
        isSuccess = rolePasswordInput === (settings.backdoorPassword || "maher--736462") ||
                    rolePasswordInput === (settings.adminPassword || "maher736462");
      }

      if (isSuccess) {
        let u: User;
        if (pendingRoleToSwitch === "admin" || pendingRoleToSwitch === "director") {
          u = { id: "admin_maher", name: "WAM2026 (المدير الرئيسي)", phone: "777644", area: "صنعاء", role: "director", deviceId: "web_maher" };
        } else if (pendingRoleToSwitch === "owner") {
          u = { id: "owner_wam2026", name: "WAM2026", phone: "777644", area: "صنعاء", role: "owner", deviceId: "android_id_owner" };
        } else if (pendingRoleToSwitch === "supervisor") {
          u = { id: "supervisor_wam", name: "المشرف العام لـ WAM", phone: "777644", area: "صنعاء", role: "supervisor", deviceId: "web_supervisor" };
        } else if (pendingRoleToSwitch === "division_supervisor") {
          u = { id: "div_supervisor_wam", name: "مشرف القسم الخدمي", phone: "777644", area: "صنعاء", role: "division_supervisor", deviceId: "web_div_supervisor" };
        } else {
          u = { id: "prov_777123456", name: "م. ماجد صلاح الصنعاني", phone: "777123456", area: "حدة", role: "provider", deviceId: "web_majed" };
        }

        const currentUsers = db.getUsers();
        const savedUser = currentUsers.find(user => user.id === u.id);
        if (savedUser) {
          u = savedUser;
        } else {
          db.saveUsers([...currentUsers, u]);
        }

        setCurrentUser(u);
        setShowRolePasswordModal(false);
        setPendingRoleToSwitch(null);
        setRolePasswordInput("");
        alert(`🔓 تم تسجيل الدخول بنجاح بصلاحية: [${u.name}]`);
      } else {
        setRolePasswordError("❌ كلمة المرور المدخلة غير صحيحة!");
      }
    } finally {
      setIsRoleVerifying(false);
    }
  };

  // Toggle favorite provider for the current logged-in user
  const handleToggleFavorite = (providerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentUsers = db.getUsers();
    let userRecord = currentUsers.find(u => u.id === currentUser.id);
    if (!userRecord) {
      userRecord = { ...currentUser, favorites: [] };
    }
    
    const favs = userRecord.favorites || [];
    let updatedFavs: string[];
    if (favs.includes(providerId)) {
      updatedFavs = favs.filter(id => id !== providerId);
    } else {
      updatedFavs = [...favs, providerId];
    }
    
    const updatedUser = { ...userRecord, favorites: updatedFavs };
    const otherUsers = currentUsers.filter(u => u.id !== currentUser.id);
    const newUsers = [...otherUsers, updatedUser];
    db.saveUsers(newUsers);
    setUsers(newUsers);
    setCurrentUser(updatedUser);
  };

  // Handle Home Click Easter Egg: 5 clicks on Home Icon opens Backdoor Dialog
  const handleHomeIconClick = () => {
    setHomeClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setBackdoorOpen(true);
        return 0;
      }
      return next;
    });
    // auto reset counter after 3 seconds
    setTimeout(() => setHomeClickCount(0), 3000);
  };

  // Create booking request helper
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    address: "",
    details: "",
    date: "",
    time: "",
    notes: "",
    isEmergency: false
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProvider) return;

    if (!bookingForm.name.trim() || !bookingForm.phone.trim() || !bookingForm.details.trim()) {
      alert("⚠️ يرجى ملء البيانات المطلوبة لحجز الفني.");
      return;
    }

    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      userId: currentUser.id,
      userName: bookingForm.name,
      userPhone: bookingForm.phone,
      userAddress: bookingForm.address || currentUser.area,
      providerId: bookingProvider.id,
      providerName: bookingProvider.name,
      category: bookingProvider.category,
      subCategory: bookingProvider.subCategory,
      serviceDetails: bookingForm.details,
      preferredDate: bookingForm.date || new Date().toLocaleDateString("ar-YE"),
      preferredTime: bookingForm.time || "في أقرب وقت",
      notes: bookingForm.notes,
      status: "pending",
      progress: 0,
      assignedTo: `prov_${bookingProvider.phone}`,
      rejectionReason: "",
      timestamp: Date.now(),
      completedAt: 0,
      isEmergency: bookingForm.isEmergency,
      paymentMethod: chosenPaymentMethod
    };

    const currentBookings = db.getBookings();
    db.saveBookings([...currentBookings, newBooking]);

    // Send Admin Notification, Client Confirmation Notification, and Client Proactive Reminder Notification (1 Hour Before)
    const systemNotifs = db.getNotifications();
    const adminNotif: any = {
      id: `not_${Date.now()}_book`,
      title: "حجز موعد فني جديد 📅",
      body: `قام العميل ${bookingForm.name} بحجز الفني ${bookingProvider.name} لقسم (${bookingProvider.subCategory}) في موعد ${bookingForm.date}. يرجى تأكيد المباشرة.`,
      type: "booking",
      targetType: "admins",
      targetId: "",
      targetRole: "admin",
      isRead: false,
      timestamp: Date.now()
    };

    // 1. Client receipt confirmation notification
    const clientConfirmNotif: any = {
      id: `not_${Date.now()}_user_confirm`,
      title: "تم استلام طلب حجزك بنجاح 📅",
      body: `عزيزي ${bookingForm.name}، تم تسجيل طلب حجزك للفني ${bookingProvider.name} لموعد يوم ${bookingForm.date || "المحدد"} الساعة ${bookingForm.time || "في أقرب وقت"}. تم إرسال الطلب للفني للتأكيد وتنسيق المباشرة.`,
      type: "booking",
      targetType: "users",
      targetId: currentUser.id,
      targetRole: "user",
      isRead: false,
      timestamp: Date.now()
    };

    // 2. Client Proactive 1-Hour Reminder Notification
    const clientReminderNotif: any = {
      id: `not_${Date.now()}_user_reminder`,
      title: "⏰ تذكير بموعد الخدمة المجدول (قبل ساعة)",
      body: `تذكير استباقي للحجز: عزيزي ${bookingForm.name}، نود تذكيرك بالموعد المجدول مع الفني ${bookingProvider.name} بعد ساعة واحدة من الآن في تمام الساعة ${bookingForm.time || "المحددة"}. يرجى التنسيق معه أو الاستعداد للتواجد في الموقع لتسهيل المباشرة!`,
      type: "booking",
      targetType: "users",
      targetId: currentUser.id,
      targetRole: "user",
      isRead: false,
      timestamp: Date.now() + 500
    };

    db.saveNotifications([...systemNotifs, adminNotif, clientConfirmNotif, clientReminderNotif]);

    // Reset Form
    setBookingForm({
      name: "",
      phone: "",
      address: "",
      details: "",
      date: "",
      time: "",
      notes: "",
      isEmergency: false
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingProvider(null);
    }, 2500);
  };

  // Send message directly to support
  const handleSupportWhatsApp = () => {
    const text = `مرحباً دعم WAM، أحتاج لمساعدة عاجلة في دليلي لمزودي الخدمة في اليمن.`;
    window.open(`https://wa.me/967${settings.supportWhatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Open internal chat room with provider helper
  const handleOpenChat = (provId: string, provName: string) => {
    // Check if chat already exists
    const chatId = `chat_${currentUser.id}_${provId}`;
    const exists = chats.some(c => c.id === chatId);

    if (!exists) {
      const newChat: Chat = {
        id: chatId,
        userId: currentUser.id,
        userName: currentUser.name,
        providerId: provId,
        providerName: provName,
        lastMessage: "بدء المحادثة الفورية",
        lastMessageTime: Date.now(),
        unreadCount: 0,
        isActive: true,
        timestamp: Date.now()
      };
      db.saveChats([...chats, newChat]);
    }

    setActiveTab("chat");
    setSelectedProvider(null);
  };

  // Set the preloaded categories
  const preloadedCategories = categories;

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black antialiased relative"
      style={{ 
        backgroundColor: settings.bgColorHex, 
        fontFamily: settings.selectedFontName 
      }}
    >
      
      {/* Real-time Immediate Notification Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 font-sans animate-bounce" dir="rtl">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl flex items-start gap-3 flex-row-reverse text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-amber-500" />
            <div className="grow space-y-1 pr-2">
              <h4 className="font-extrabold text-amber-400 text-xs sm:text-sm flex items-center gap-1.5 flex-row-reverse">
                <Bell className="w-4 h-4 text-amber-400 animate-swing" />
                تنبيه فوري وتحديث حجز ⚡
              </h4>
              <p className="text-white text-[11px] leading-relaxed">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Maintenance Overlay Screen */}
      {settings.isMaintenanceMode && currentUser.role !== "owner" && currentUser.role !== "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 text-center font-sans">
          <div className="max-w-md space-y-4">
            <Bot className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
            <h2 className="font-extrabold text-white text-xl">{settings.appName} قيد الصيانة 🛠️</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{settings.maintenanceMessage}</p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] space-y-1 text-right">
              <p className="text-slate-500">• هاتف الدعم الفني: <span className="text-white font-mono">{settings.supportPhone}</span></p>
              <p className="text-slate-500">• تواصل واتساب: <span className="text-white font-mono">{settings.supportWhatsapp}</span></p>
            </div>
            <p className="text-[10px] text-slate-650">سنعود لخدمتكم بشكل أفضل وبدقة عالية قريباً جداً.</p>
          </div>
        </div>
      )}

      {/* 1. TOP TESTING CONTROL & BRAND BAR */}
      <div className="sticky top-0 z-40 bg-slate-950 border-b border-slate-850 shadow-md shrink-0 select-none">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-row-reverse">
          
          {/* Circular Branding Logo */}
          <div className="flex items-center gap-2.5 flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center font-extrabold text-black tracking-tighter shadow shadow-amber-500/10">
              {settings.appLogoText || "WAM"}
            </div>
            <div className="text-right">
              <h1 className="font-extrabold text-white text-xs sm:text-sm tracking-tight">{settings.appName}</h1>
              <span className="text-[9px] text-slate-500 font-bold block leading-none">الإصدار 3.0.0 | الدعم: {settings.supportPhone}</span>
            </div>
          </div>

          {/* Role Switcher only */}
          <div className="flex items-center gap-2 flex-row-reverse">
            {/* Simulated Live Role Switcher (For Preview verification) */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 flex-row-reverse">
              <span className="text-[9px] text-slate-500 font-bold">الحساب:</span>
              <select
                value={currentUser.role}
                onChange={(e) => handleRoleChangeAttempt(e.target.value)}
                className="bg-transparent border-0 text-[10px] font-bold text-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="visitor" className="bg-slate-950 text-white">زائر (Visitor)</option>
                <option value="user" className="bg-slate-950 text-white">عميل مسجل (User)</option>
                <option value="provider" className="bg-slate-950 text-white">فني معتمد (Provider)</option>
                <option value="supervisor" className="bg-slate-950 text-white">مشرف البوابة (Supervisor)</option>
                <option value="admin" className="bg-slate-950 text-white">المدير العام (Admin)</option>
                <option value="owner" className="bg-slate-950 text-white">المالك WAM2026 (Owner)</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BODY CONTENT SECTION */}
      <main className="grow max-w-7xl w-full mx-auto p-4 pb-24 md:pb-12">
        {/* Welcome Banner (only shown on Home screen to visitors) */}
        {activeTab === "home" && !selectedProvider && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-5 text-right relative overflow-hidden shadow">
            <div className="absolute top-2 left-2 text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-amber-400" /> WAM 2026
            </div>
            <h2 className="font-extrabold text-white text-base md:text-lg mb-1 leading-tight">{settings.appName}</h2>
            <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">{settings.welcomeMessage}</p>
          </div>
        )}

        {/* Tab switcher renderer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full"
          >
            {(() => {
              if (activeTab === "admin") {
                if (currentUser.role !== "admin" && currentUser.role !== "owner" && currentUser.role !== "supervisor") {
                  return (
                    <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-2xl max-w-md mx-auto space-y-4 my-12" dir="rtl">
                      <p className="text-rose-500 text-lg font-extrabold">⚠️ خطأ في الصلاحيات والمصادقة</p>
                      <p className="text-slate-400 text-xs">ليس لديك صلاحية كافية لعرض لوحة التحكم. يرجى تسجيل الدخول أولاً كمسؤول أو مالك بصلاحية مناسبة.</p>
                      <button 
                        onClick={() => setActiveTab("home")}
                        className="px-4 py-2 bg-slate-900 text-slate-300 hover:text-white rounded-lg text-xs cursor-pointer border border-slate-800"
                      >
                        العودة للدليل الرئيسي
                      </button>
                    </div>
                  );
                }
                return (
                  <AdminPanel
                    settings={settings}
                    providers={providers}
                    pendingProviders={pendingProviders}
                    bookings={bookings}
                    chats={chats}
                    notifications={notifications}
                    users={users}
                    onUpdateSettings={(newSet) => setSettings(newSet)}
                    onRefreshData={() => {
                      setProviders(db.getProviders());
                      setPendingProviders(db.getPendingProviders());
                      setBookings(db.getBookings());
                      setNotifications(db.getNotifications());
                      setChats(db.getChats());
                      setUsers(db.getUsers());
                    }}
                    currentUser={currentUser}
                  />
                );
              }

              switch (activeTab) {
                case "map":
                  return (
                    <MapTab
                      providers={providers}
                      settings={settings}
                      onBookClick={(p) => setBookingProvider(p)}
                      onSelectProvider={(p) => setSelectedProvider(p)}
                    />
                  );
                case "join":
                  return (
                    <JoinTab
                      settings={settings}
                      categories={preloadedCategories}
                      currentUser={currentUser}
                      bookings={bookings}
                      providers={providers}
                      onRegistered={() => {
                        setPendingProviders(db.getPendingProviders());
                        setNotifications(db.getNotifications());
                      }}
                    />
                  );
                case "booking":
                  return (
                    <BookingTab
                      bookings={bookings}
                      settings={settings}
                      currentUser={currentUser}
                      onOpenChat={(id, name) => handleOpenChat(id, name)}
                      onBookingUpdated={() => setBookings(db.getBookings())}
                    />
                  );
                case "chat":
                  return (
                    <ChatTab
                      chats={chats}
                      messages={messages}
                      settings={settings}
                      currentUser={currentUser}
                      activeChatId={chats.length > 0 ? chats[0].id : null}
                      setActiveChatId={() => {}}
                      onNewMessage={() => setMessages(db.getMessages())}
                    />
                  );
                case "about":
                  return (
                    <AboutTab
                      settings={settings}
                    />
                  );
                case "payment":
                  return (
                    <PaymentTab
                      settings={settings}
                      currentUser={currentUser}
                    />
                  );
                default:
                  return (
                    <HomeTab
                      providers={providers}
                      settings={settings}
                      categories={preloadedCategories}
                      banners={db.getBanners()}
                      currentUser={currentUser}
                      onBookClick={(p) => setBookingProvider(p)}
                      onChatClick={(p) => handleOpenChat(p.id, p.name)}
                      onSelectProvider={(p) => setSelectedProvider(p)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
              }
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. DYNAMIC PROFILE DETAIL MODAL */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-right font-sans" dir="rtl">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col">
            <button 
              onClick={() => setSelectedProvider(null)}
              className="absolute top-3 left-3 z-10 p-1.5 rounded-lg bg-black/60 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cover photo */}
            <div className="h-28 bg-slate-950 shrink-0 relative">
              <img 
                src={selectedProvider.coverImageUrl} 
                alt="Cover" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              {/* Profile Avatar overlay */}
              <div className="absolute bottom-[-20px] right-5">
                <img 
                  src={selectedProvider.imageUrl} 
                  alt={selectedProvider.name} 
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-slate-900"
                />
              </div>
            </div>

            {/* Profile body content */}
            <div className="p-5 pt-8 overflow-y-auto grow space-y-4">
              <div className="flex items-center justify-between flex-row-reverse">
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-1 flex-row-reverse">
                    {selectedProvider.name}
                    {selectedProvider.isVerified && <span className="text-emerald-400">✓</span>}
                  </h3>
                  <p className="text-xs text-amber-500 font-bold">{selectedProvider.subCategory} | {selectedProvider.category}</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-amber-400 text-xs bg-amber-400/5 px-2 py-1 rounded border border-amber-400/10 flex-row-reverse">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedProvider.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({selectedProvider.reviewCount})</span>
                </div>
              </div>

              {/* Quick Details Box */}
              <div className="bg-slate-950 p-3 rounded-xl text-xs space-y-1.5 border border-slate-850">
                <p className="text-slate-400 flex items-center gap-1 flex-row-reverse">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>الموقع: <b>{selectedProvider.city} - {selectedProvider.area}</b> ({selectedProvider.address})</span>
                </p>
                <p className="text-slate-400 flex items-center gap-1 flex-row-reverse">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>ساعات العمل: <b>{selectedProvider.workingHours}</b></span>
                </p>
                <p className="text-slate-400 flex items-center gap-1 flex-row-reverse">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>هاتف التواصل: <b className="font-mono text-white">{selectedProvider.phone}</b></span>
                </p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-white text-xs">الوصف والنبذة المهنية:</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                  {selectedProvider.description}
                </p>
              </div>

              {/* Star Rating & Advanced Review Section */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60 space-y-3.5 text-right">
                <h4 className="font-extrabold text-slate-300 text-xs">هل تعاملت مع {selectedProvider.name}؟ شاركنا تقييمك ومراجعتك:</h4>
                
                {ratingSubmitted ? (
                  <p className="text-emerald-400 text-xs font-extrabold text-center animate-pulse py-2">✓ شكراً لك! تم إرسال مراجعتك بنجاح وسوف تظهر بعد مراجعة المشرفين.</p>
                ) : (
                  <div className="space-y-3">
                    {/* Stars Selection */}
                    <div className="flex items-center gap-1.5 justify-center flex-row-reverse">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="p-1 hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              userRating >= star 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-slate-700 hover:text-slate-500"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>

                    {userRating > 0 && (
                      <div className="space-y-3 animate-fade-in">
                        {/* Review text comment */}
                        <div>
                          <label className="block text-slate-400 text-[10px] font-bold mb-1">اكتب تعليقك وتجربتك بالتفصيل (اختياري):</label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="كيف كانت جودة الخدمة، المعاملة والسرعة؟..."
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/50 rounded-lg p-2 text-xs text-white text-right focus:outline-none"
                          />
                        </div>

                        {/* Image/Video attachments */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-400 text-[9px] font-bold mb-1">إضافة صورة عمل صيانة:</label>
                            <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-800 hover:border-amber-500/30 rounded-lg cursor-pointer bg-slate-900 text-slate-400 h-14 text-center">
                              <Camera className="w-4 h-4 text-amber-500 mb-0.5" />
                              <span className="text-[9px] truncate w-full max-w-full px-1">{reviewImage ? "✓ تم إرفاق صورة" : "رفع صورة"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setReviewImage(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div>
                            <label className="block text-slate-400 text-[9px] font-bold mb-1">إضافة فيديو/تأكيد مرئي:</label>
                            <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-800 hover:border-amber-500/30 rounded-lg cursor-pointer bg-slate-900 text-slate-400 h-14 text-center">
                              <Video className="w-4 h-4 text-rose-500 mb-0.5" />
                              <span className="text-[9px] truncate w-full max-w-full px-1">{reviewVideo ? "✓ تم إرفاق فيديو" : "رفع فيديو صيانة"}</span>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setReviewVideo(`video_simulation_${file.name}`);
                                    alert("🎥 تم ضغط وتجهيز الفيديو المرفق للرفع الآمن!");
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          onClick={() => handleRateProvider(selectedProvider.id, userRating)}
                          className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          إرسال المراجعة للمشرفين ⭐️
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Verified Approved Reviews list */}
              <div className="space-y-2 text-right">
                <h4 className="font-extrabold text-white text-xs flex items-center gap-1 flex-row-reverse">
                  <span>المراجعات والتقييمات المعتمدة من المشرفين ({db.getReviews().filter(r => r.providerId === selectedProvider.id && r.status === "approved").length})</span>
                </h4>
                
                {(() => {
                  const approvedReviews = db.getReviews().filter(r => r.providerId === selectedProvider.id && r.status === "approved");
                  if (approvedReviews.length === 0) {
                    return <p className="text-[10px] text-slate-500 leading-relaxed bg-slate-950/20 p-3 rounded-lg border border-slate-850 text-center">لا توجد مراجعات معتمدة لهذا الفني بعد. كن أول من يقيمه!</p>;
                  }
                  return (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {approvedReviews.map((rev) => (
                        <div key={rev.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-850/70 space-y-2">
                          <div className="flex items-center justify-between flex-row-reverse">
                            <span className="font-bold text-white text-[11px]">{rev.userName}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-800"}`}
                                />
                              ))}
                            </div>
                          </div>
                          {rev.comment && <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>}
                          
                          {/* Media attachments inside the review */}
                          {(rev.imageUrl || rev.videoUrl) && (
                            <div className="flex gap-2 flex-wrap pt-1">
                              {rev.imageUrl && (
                                <img
                                  src={rev.imageUrl}
                                  alt="إرفاق مراجعة"
                                  className="w-16 h-16 rounded object-cover border border-slate-800 hover:scale-105 transition-transform"
                                />
                              )}
                              {rev.videoUrl && (
                                <div className="w-16 h-16 rounded bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-[8px] text-rose-400 font-bold">
                                  <Video className="w-5 h-5 text-rose-500" />
                                  <span>فيديو تأكيد</span>
                                </div>
                              )}
                            </div>
                          )}
                          <span className="text-[8px] text-slate-500 block text-left">{new Date(rev.timestamp).toLocaleDateString("ar-YE")}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Services offered list */}
              {selectedProvider.services && selectedProvider.services.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-white text-xs">الخدمات والأشغال المتاحة:</h4>
                  <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    {selectedProvider.services.map((srv, idx) => (
                      <li key={idx} className="bg-slate-950 p-2 rounded border border-slate-850 flex items-center gap-1.5 flex-row-reverse text-right">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions toolbar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setSelectedProvider(null);
                  handleOpenChat(selectedProvider.id, selectedProvider.name);
                }}
                className="w-1/2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                مراسلة تفاوضية
              </button>
              <button
                onClick={() => {
                  setBookingProvider(selectedProvider);
                  setSelectedProvider(null);
                }}
                className="w-1/2 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer"
              >
                حجز موعد عمل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DYNAMIC CREATE BOOKING DIALOG FORM */}
      {bookingProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-right font-sans" dir="rtl">
          <div className="w-full max-w-md bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl overflow-hidden relative">
            
            {/* Header info */}
            <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between flex-row-reverse">
              <h3 className="font-extrabold text-white text-sm">تعبئة مستند الحجز المباشر 📅</h3>
              <button 
                onClick={() => setBookingProvider(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {bookingSuccess ? (
                <div className="py-8 text-center text-slate-300 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-extrabold text-white text-sm">تم إرسال حجز الخدمة بنجاح!</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    لقد تلقى الفني <b>{bookingProvider.name}</b> مستند حجزك وسيقوم بتأكيده والتواصل معك عبر الدردشة الفورية أو الهاتف في أقرب وقت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/10 flex items-center gap-2 flex-row-reverse text-right">
                    <img 
                      src={bookingProvider.imageUrl} 
                      alt={bookingProvider.name} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover border border-slate-800" 
                    />
                    <div>
                      <h4 className="font-bold text-white text-xs">{bookingProvider.name}</h4>
                      <p className="text-[10px] text-amber-500 font-bold">{bookingProvider.subCategory} | {bookingProvider.category}</p>
                    </div>
                  </div>

                  {/* Customer name */}
                  <div>
                    <label className="block text-slate-400 text-[10px] font-bold mb-1">اسمك الثلاثي الكامل:</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="أدخل اسمك بالكامل للتوثيق"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-slate-400 text-[10px] font-bold mb-1">رقم هاتفك اليمني للاتصال:</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="مثال: 777644..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-left font-mono"
                    />
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 text-[10px] font-bold mb-1">تاريخ الموعد المفضل:</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] font-bold mb-1">الوقت المفضل:</label>
                      <input
                        type="text"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        placeholder="مثال: 10:00 صباحاً"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-center"
                      />
                    </div>
                  </div>

                  {/* Detailed Description of Work */}
                  <div>
                    <label className="block text-slate-400 text-[10px] font-bold mb-1">اشرح بالتفصيل العمل المطلوب صيانته:</label>
                    <textarea
                      required
                      value={bookingForm.details}
                      onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
                      rows={2}
                      placeholder="مثال: أريد إصلاح عطل في لوحة التوزيع وتمديد لمبة في المطبخ..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right leading-relaxed animate-none"
                    />
                  </div>

                  {/* Emergency checkbox */}
                  <div className="flex items-center justify-between p-3.5 bg-rose-950/20 border border-rose-900/30 rounded-xl select-none">
                    <div className="text-right">
                      <label className="block text-rose-400 text-xs font-extrabold cursor-pointer" htmlFor="emergency-check">⚠️ تحديد كحالة طوارئ عاجلة جداً</label>
                      <span className="text-[10px] text-slate-400 block mt-0.5">تنبيه الفني وحضور فوري سريع وتلوين الحجز بالأحمر في اللوحات.</span>
                    </div>
                    <input
                      id="emergency-check"
                      type="checkbox"
                      checked={bookingForm.isEmergency || false}
                      onChange={(e) => setBookingForm({ ...bookingForm, isEmergency: e.target.checked })}
                      className="w-4.5 h-4.5 accent-rose-500 cursor-pointer shrink-0"
                    />
                  </div>

                  {/* Payment Option Selector in Booking Form */}
                  {settings.isPaymentEnabled && (
                    <div className="space-y-2 border-t border-slate-800 pt-3 text-right">
                      <label className="block text-amber-500 text-[10px] font-bold mb-1">💳 اختر وسيلة دفع العربون للتأكيد:</label>
                      <div className="space-y-1.5">
                        {/* Cash on Delivery option */}
                        <label className="flex items-center justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg cursor-pointer hover:border-amber-500/50 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-300 font-bold">الدفع كاش عند البدء بالخدمة</span>
                          </div>
                          <input
                            type="radio"
                            name="booking_payment_method"
                            value="cash"
                            checked={chosenPaymentMethod === "cash"}
                            onChange={() => setChosenPaymentMethod("cash")}
                            className="w-3.5 h-3.5 accent-amber-500"
                          />
                        </label>

                        {/* Kuraimi Option */}
                        {settings.paymentMerchantKuraimi && (
                          <label className="flex items-center justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg cursor-pointer hover:border-amber-500/50 select-none">
                            <div className="flex flex-col items-start">
                              <span className="text-[10px] text-slate-300 font-bold">محفظة الكريمي (أم فلوس)</span>
                              <span className="text-[8px] text-slate-500 font-mono">حساب التاجر: {settings.paymentMerchantKuraimi}</span>
                            </div>
                            <input
                              type="radio"
                              name="booking_payment_method"
                              value="kuraimi"
                              checked={chosenPaymentMethod === "kuraimi"}
                              onChange={() => setChosenPaymentMethod("kuraimi")}
                              className="w-3.5 h-3.5 accent-amber-500"
                            />
                          </label>
                        )}

                        {/* MFloos Option */}
                        {settings.paymentMerchantMFloos && (
                          <label className="flex items-center justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg cursor-pointer hover:border-amber-500/50 select-none">
                            <div className="flex flex-col items-start">
                              <span className="text-[10px] text-slate-300 font-bold">محفظة أم فلوس (التضامن)</span>
                              <span className="text-[8px] text-slate-500 font-mono">حساب التاجر: {settings.paymentMerchantMFloos}</span>
                            </div>
                            <input
                              type="radio"
                              name="booking_payment_method"
                              value="mfloos"
                              checked={chosenPaymentMethod === "mfloos"}
                              onChange={() => setChosenPaymentMethod("mfloos")}
                              className="w-3.5 h-3.5 accent-amber-500"
                            />
                          </label>
                        )}

                        {/* Jawwal Pay Option */}
                        {settings.paymentMerchantJawwalPay && (
                          <label className="flex items-center justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg cursor-pointer hover:border-amber-500/50 select-none">
                            <div className="flex flex-col items-start">
                              <span className="text-[10px] text-slate-300 font-bold">جوال بي (كاش جوالي)</span>
                              <span className="text-[8px] text-slate-500 font-mono">حساب التاجر: {settings.paymentMerchantJawwalPay}</span>
                            </div>
                            <input
                              type="radio"
                              name="booking_payment_method"
                              value="jawwalpay"
                              checked={chosenPaymentMethod === "jawwalpay"}
                              onChange={() => setChosenPaymentMethod("jawwalpay")}
                              className="w-3.5 h-3.5 accent-amber-500"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    تأكيد وإرسال مستند الحجز للفني 🚀
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. FLOATING COMPONENT LAUNCHERS (Circular Icon controls) */}
      <div 
        className="fixed z-30 flex flex-col gap-3 select-none"
        style={{ 
          bottom: `${settings.assistantIconYOffset}px`,
          right: "16px" 
        }}
      >
        {/* Support Direct Chat Bubble */}
        {!settings.chatIconHidden && (
          <button
            onClick={handleSupportWhatsApp}
            className="rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all"
            style={{ 
              width: `${settings.chatIconSize}px`, 
              height: `${settings.chatIconSize}px`,
              backgroundColor: settings.chatIconColorHex 
            }}
            title="محادثة الدعم الفني المباشر WAM"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        )}

        {/* WAM AI Intelligent Assistant Bubble */}
        {!settings.assistantIconHidden && (
          <button
            onClick={() => setAssistantOpen(true)}
            className="rounded-full shadow-2xl flex items-center justify-center text-black cursor-pointer hover:scale-110 active:scale-95 transition-all animate-pulse"
            style={{ 
              width: `${settings.assistantIconSize}px`, 
              height: `${settings.assistantIconSize}px`,
              backgroundColor: settings.assistantIconColorHex 
            }}
            title="مساعد ومستشار WAM الذكي"
          >
            <Bot className="w-6 h-6 text-black" />
          </button>
        )}
      </div>

      {/* 6. BOTTOM NAVIGATION BAR (6 or 7 Tabs) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950 border-t border-slate-850 shadow-2xl shrink-0 select-none">
        <div className={`max-w-md mx-auto grid ${settings.isPaymentEnabled ? "grid-cols-7" : "grid-cols-6"} gap-1 py-2 px-1 text-center font-sans`}>
          
          {/* TAB 1: Home/Directory (🏠) with 5-click easter egg */}
          <button
            onClick={() => {
              setActiveTab("home");
              handleHomeIconClick();
            }}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "home" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">الدليل</span>
          </button>

          {/* TAB 2: Maps Radar (🗺️) */}
          <button
            onClick={() => setActiveTab("map")}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "map" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold">الخريطة</span>
          </button>

          {/* TAB 3: Join Vendor Form (👤) */}
          <button
            onClick={() => setActiveTab("join")}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "join" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold">انضمام</span>
          </button>

          {/* TAB 4: Booking center (📅) */}
          <button
            onClick={() => setActiveTab("booking")}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "booking" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold">الحجوزات</span>
          </button>

          {/* TAB 5: Live Chat rooms (💬) */}
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "chat" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-bold">المحادثة</span>
          </button>

          {/* TAB 6: WAM Pay Electronic Payments (💳) (Conditional) */}
          {settings.isPaymentEnabled && (
            <button
              onClick={() => setActiveTab("payment")}
              className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
                activeTab === "payment" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-bold">الدفع</span>
            </button>
          )}

          {/* TAB 7: Information & About (ℹ️) */}
          <button
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center justify-center gap-1 transition-all py-1 rounded-xl cursor-pointer ${
              activeTab === "about" ? "text-amber-500 scale-105" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Info className="w-5 h-5" />
            <span className="text-[10px] font-bold">معلومات</span>
          </button>

        </div>
      </nav>

      {/* Floating Header Notification toggle badge */}
      <button
        onClick={() => setNotificationsOpen(true)}
        className="fixed top-16 left-4 z-30 p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-xl border border-slate-800 shadow-xl cursor-pointer transition-all select-none"
        title="تنبيهات ومستجدات المنصة"
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {notifications.filter(n => !n.isRead).length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center animate-pulse">
              {notifications.filter(n => !n.isRead).length}
            </span>
          )}
        </div>
      </button>

      {/* Extra floating Admin tab trigger if Role is Admin or Owner */}
      {(currentUser.role === "admin" || currentUser.role === "owner" || currentUser.role === "supervisor") && (
        <button
          onClick={() => setActiveTab("admin")}
          className={`fixed top-28 left-4 z-30 p-2 rounded-xl border shadow-xl cursor-pointer transition-all select-none flex items-center gap-1 ${
            activeTab === "admin" 
              ? "bg-amber-500 border-amber-500 text-black font-bold scale-105" 
              : "bg-slate-900/90 border-slate-800 text-slate-300 hover:text-amber-400"
          }`}
          title="دخول لوحة تحكم الإشراف"
        >
          <ShieldCheck className="w-5 h-5" />
        </button>
      )}

      {/* 7. MODALS AND DRAWERS POPUPS SECTION */}
      <BackdoorDialog
        isOpen={backdoorOpen}
        onClose={() => setBackdoorOpen(false)}
        settings={settings}
        onUpdate={(newSet) => setSettings(newSet)}
      />

      <SmartAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        settings={settings}
      />

      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        settings={settings}
        onUpdated={() => setNotifications(db.getNotifications())}
      />

      <UserProfileDialog
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        currentUser={currentUser}
        providers={providers}
        settings={settings}
        onToggleFavorite={handleToggleFavorite}
        onSelectProvider={(p) => setSelectedProvider(p)}
      />

      <Onboarding
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        settings={settings}
      />

      {/* Secure Role Switcher Password Modal */}
      {showRolePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full text-right shadow-2xl relative">
            <h3 className="font-extrabold text-white text-sm mb-2 flex items-center justify-between flex-row-reverse gap-2">
              <span className="flex items-center gap-1.5 flex-row-reverse">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>التحقق من الهوية والصلاحية</span>
              </span>
              <button 
                onClick={() => {
                  setShowRolePasswordModal(false);
                  setPendingRoleToSwitch(null);
                  setRolePasswordInput("");
                  setRolePasswordError("");
                  setShowRecoveryOptions(false);
                }} 
                className="text-slate-500 hover:text-white p-1 hover:bg-slate-850 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </h3>
            
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              يرجى إدخال كلمة المرور الخاصة بحساب {" "}
              <span className="text-amber-500 font-bold">
                {pendingRoleToSwitch === "admin" ? "المدير العام (Admin)" : 
                 pendingRoleToSwitch === "supervisor" ? "المشرف (Supervisor)" : "مقدم الخدمة (Provider)"}
              </span>{" "}
              للمتابعة وتفعيل الصلاحية الأمنية المطلوبة.
            </p>

            <form onSubmit={handleVerifyRolePassword} className="space-y-4">
              <div className="relative">
                <input
                  type={showPasswordChar ? "text" : "password"}
                  placeholder="كلمة المرور الأمنية"
                  value={rolePasswordInput}
                  onChange={(e) => setRolePasswordInput(e.target.value)}
                  disabled={isRoleVerifying}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white text-right font-mono"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordChar(!showPasswordChar)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 hover:text-slate-300"
                >
                  {showPasswordChar ? "إخفاء" : "إظهار"}
                </button>
              </div>

              {rolePasswordError && (
                <p className="text-rose-500 text-[10px] font-bold text-right">{rolePasswordError}</p>
              )}

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowRecoveryOptions(!showRecoveryOptions)}
                  className="text-[10px] font-bold text-amber-500 hover:text-amber-400 underline cursor-pointer focus:outline-none"
                >
                  {showRecoveryOptions ? "إخفاء خيارات استعادة الحساب" : "هل نسيت كلمة المرور؟"}
                </button>
              </div>

              {showRecoveryOptions && (
                <div className="bg-slate-950/90 border border-slate-850 rounded-xl p-4 space-y-3.5 text-right text-[10px]">
                  <h5 className="font-extrabold text-amber-500 text-[11px] border-b border-slate-900 pb-2">🔑 نظام استرداد الحسابات الآمن (أمان WAM):</h5>
                  
                  {!recoveryRequested ? (
                    <div className="space-y-3">
                      <p className="text-slate-400 leading-relaxed">
                        يرجى إدخال رقم هاتفك المسجل وتحديد نوع حسابك لإرسال طلب استرداد مشفر للمشرف العام:
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRecoveryUserType("user")}
                          className={`py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                            recoveryUserType === "user"
                              ? "bg-amber-600/10 text-amber-500 border-amber-500"
                              : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-450"
                          }`}
                        >
                          عميل / مشرف 👤
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecoveryUserType("provider")}
                          className={`py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                            recoveryUserType === "provider"
                              ? "bg-amber-600/10 text-amber-500 border-amber-500"
                              : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-450"
                          }`}
                        >
                          مقدم خدمة / فني 🛠️
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold">رقم الهاتف المسجل:</label>
                        <input
                          type="tel"
                          placeholder="مثال: 777123456"
                          value={recoveryPhone}
                          onChange={(e) => setRecoveryPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleRequestRecoveryCode}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] rounded-lg transition-all cursor-pointer shadow-md"
                      >
                        إرسال طلب كود الاسترداد للمشرف ⏳
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-emerald-400 font-bold leading-relaxed mb-2">
                        ✓ تم تسجيل طلب الاسترداد لـ ({recoveryPhone})!
                        <p className="text-[9px] text-slate-300 mt-1">تواصل مع المشرف العام للحصول على كود الأمان المكون من 6 أرقام (يبدأ بـ WAM_).</p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold">أدخل كود الأمان الممنوح لك:</label>
                        <input
                          type="text"
                          placeholder="مثال: WAM_123456"
                          value={enteredRecoveryCode}
                          onChange={(e) => setEnteredRecoveryCode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-400 text-center font-mono placeholder-slate-650"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold">كلمة المرور الجديدة (6 خانات على الأقل):</label>
                        <input
                          type="password"
                          placeholder="أدخل كلمة المرور الجديدة"
                          value={newRecoveryPassword}
                          onChange={(e) => setNewRecoveryPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setRecoveryRequested(false)}
                          className="w-1/3 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg text-[10px] font-bold border border-slate-800 cursor-pointer"
                        >
                          رجوع
                        </button>
                        <button
                          type="button"
                          onClick={handleVerifyAndResetPassword}
                          className="w-2/3 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold text-[10px] rounded-lg transition-all cursor-pointer shadow-md"
                        >
                          حفظ وتحديث الحساب 💾
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowRolePasswordModal(false);
                    setPendingRoleToSwitch(null);
                    setRolePasswordInput("");
                    setRolePasswordError("");
                    setShowRecoveryOptions(false);
                  }}
                  disabled={isRoleVerifying}
                  className="flex-1 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isRoleVerifying}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isRoleVerifying ? (
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : "تأكيد الدخول"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. HUMBLE LITERAL FOOTER */}
      {settings.footerVisible && (
        <footer 
          className="bg-slate-950/40 text-center py-4 border-t border-slate-900 select-none text-[11px] text-slate-500"
          style={{ 
            opacity: settings.footerOpacity, 
            fontSize: `${settings.footerFontSizePercent}%` 
          }}
        >
          <p className="font-semibold">{settings.footerText || "MAW 777644"}</p>
          <p className="text-[10px] text-slate-650 mt-1">حقوق الطبع محفوظة © 2026. بوابة كل خدمات اليمن (WAM)</p>
        </footer>
      )}

    </div>
  );
}

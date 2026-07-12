import { 
  AppSettings, 
  Provider, 
  PendingProvider, 
  Booking, 
  Chat, 
  Message, 
  Notification, 
  User,
  PresetPalette,
  SubscriptionPlan,
  PaymentSettings,
  ProviderWallet,
  Transaction
} from "../types";
import { 
  collection as fsCollection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs 
} from "firebase/firestore";
import { firestore } from "./firebase";



// Default Palette Presets
const DEFAULT_PRESETS: PresetPalette[] = [
  { name: "🪐 كوزميك سيلفر", primaryHex: "#4B5563", accentHex: "#9CA3AF", bgHex: "#111827", surfaceHex: "#1F2937" },
  { name: "✨ ذهبي فاخر", primaryHex: "#D97706", accentHex: "#FCD34D", bgHex: "#1C1917", surfaceHex: "#292524" },
  { name: "🟢 زمردي راقي", primaryHex: "#059669", accentHex: "#34D399", bgHex: "#064E3B", surfaceHex: "#065F46" },
  { name: "⚫ الأسود الدخاني", primaryHex: "#1F1F1F", accentHex: "#6B7280", bgHex: "#09090b", surfaceHex: "#18181b" },
  { name: "🌸 الزهري الفاتح", primaryHex: "#F9A8D4", accentHex: "#F472B6", bgHex: "#2D1B23", surfaceHex: "#3D2B32" },
  { name: "⚪🟡 الأبيض الذهبي", primaryHex: "#FEF3C7", accentHex: "#FCD34D", bgHex: "#F5F5F5", surfaceHex: "#FFFFFF" },
  { name: "🔵 الأزرق الملكي", primaryHex: "#0A2463", accentHex: "#3A7CA5", bgHex: "#030712", surfaceHex: "#0B1528" },
  { name: "🔴 الأحمر العميق", primaryHex: "#8B0000", accentHex: "#FF4444", bgHex: "#1A0D0D", surfaceHex: "#2A1A1A" },
];

const DEFAULT_SETTINGS: AppSettings = {
  id: "GLOBAL_SETTINGS",
  appName: "كل خدمات اليمن",
  appLogoText: "WAM",
  appLogoUrl: "",
  welcomeMessage: "مرحباً بك في دليل خدمات اليمن - دليلك الشامل ومزود خدماتك الفورية ومحترفي اليمن",
  supportPhone: "777644",
  supportWhatsapp: "777644",
  supportEmail: "maa736462@gmail.com",
  supportShareUrl: "https://yemen-services.com/download",
  isNotificationsEnabled: true,
  notificationTypes: {
    general: true,
    admin: true,
    booking: true,
    registration: true,
    chat: true,
    promotion: true
  },
  isChatEnabled: true,
  chatDisabledMessage: "خدمة الدردشة متوقفة حالياً للصيانة",
  maxMessageLength: 500,
  maxMediaCount: 10,
  maxVideoDuration: 30,
  isAssistantEnabled: true,
  assistantWelcomeMessage: "مرحباً! أنا WAM مساعدك الذكي لخدمات اليمن. كيف يمكنني مساعدتك اليوم؟",
  assistantQuickReplies: [
    "أريد حجز خدمة سباكة ومجاري",
    "أريد مهندس كهربائي منزلي",
    "ما هي المهن المتوفرة؟",
    "كيف يمكنني التسجيل كمقدم خدمة؟"
  ],
  isBookingsEnabled: true,
  bookingRoutingMode: "auto",
  isMapEnabled: true,
  maxSearchRadius: 30,
  isSubscriptionEnabled: true,
  subscriptionPlans: [
    { name: "شهري", durationDays: 30, price: 5000, colorHex: "#D97706" },
    { name: "ربعي", durationDays: 90, price: 12000, colorHex: "#9CA3AF" },
    { name: "سنوي", durationDays: 365, price: 40000, colorHex: "#FF4444" }
  ],
  isLoyaltyEnabled: false, // disabled by default as per request
  loyaltyPointsPerBooking: 10,
  loyaltyPointsPerShare: 5,
  loyaltyPointsValue: 1.0,
  loyaltyRedemptionRate: 100,
  primaryColorHex: "#4B5563",
  accentColorHex: "#D97706",
  bgColorHex: "#111827",
  surfaceColorHex: "#1F2937",
  fontColorHex: "#FFFFFF",
  colorsPresets: DEFAULT_PRESETS,
  selectedFontName: "Cairo",
  fontSizeSmall: 12,
  fontSizeMedium: 14,
  fontSizeLarge: 16,
  footerText: "MAW 777644",
  footerVisible: true,
  footerFontSizePercent: 100,
  footerOpacity: 1.0,
  chatIconSize: 56,
  chatIconColorHex: "#059669",
  chatIconHidden: false,
  assistantIconSize: 56,
  assistantIconColorHex: "#D97706",
  assistantIconHidden: false,
  assistantIconXOffset: 0,
  assistantIconYOffset: 75,
  isMaintenanceMode: false,
  maintenanceMessage: "التطبيق قيد الصيانة والترقية، سنعود قريباً جداً عذراً للإزعاج.",
  adminPassword: "maher736462",
  backdoorPassword: "maher--736462",
  aboutCoverUrl: "",
  aboutTitle: "كل خدمات اليمن",
  aboutDescription: "المنصة الأولى لربط العملاء بالمهنيين والحرفيين المعتمدين في كافة المجالات والمحافظات اليمنية مباشرة وبكل سهولة وأمان.",
  aboutVersion: "v3.0.0",
  aboutEncryptionLevel: "تشفير آمن سحابي",
  aboutDownloadUrl: "https://ais-pre-v5wovkxit3l3v5hw7ej3nn-981585600131.europe-west2.run.app/wam_project_full.zip",
  showProviderStats: true,
  isPaymentEnabled: false,
  paymentMerchantKuraimi: "123456",
  paymentMerchantMFloos: "777644",
  paymentMerchantJawwalPay: "987654",
  aboutTelegram: "https://t.me/wam_services",
  aboutFacebook: "https://facebook.com/wam_services",
  aboutWebsite: "https://yemen-services.com",
  isQuickRegistrationEnabled: true
};

const SEED_CATEGORIES = [
  { id: "construction", name: "البناء والعقارات", description: "مقاولات، تشطيب، دهان، عزل، حدادة، زجاج، بيع وإدارة عقارات وتراخيص", icon: "Building", subCategories: ["مقاولات", "تشطيب", "دهان", "عزل", "حدادة", "زجاج", "بيع عقارات", "إدارة عقارات", "تقييم عقاري", "توثيق عقود", "تراخيص"] },
  { id: "maintenance", name: "الصيانة العامة", description: "صيانة المنازل، الأجهزة الكهربائية، الإلكترونيات، المولدات، الكاميرات والمصاعد", icon: "Wrench", subCategories: ["منازل", "أجهزة كهربائية", "إلكترونيات", "مولدات", "كاميرات", "شبكات", "مصاعد", "بوابات", "أثاث"] },
  { id: "cooking", name: "المأكولات والحلويات والطبخ", description: "طباخون، خبازون، حلويات، كيك، معجنات، مطاعم وتزيين المأكولات", icon: "ChefHat", subCategories: ["طباخون", "خبازون", "حلويات", "كيك", "معجنات", "مطاعم", "مشروبات", "تزيين", "تغذية"] },
  { id: "health", name: "الصحة والتمريض والطب", description: "أطباء، تمريض منزلي، صيدلة، علاج طبيعي، مختبرات ورعاية مسنين وقابلات", icon: "HeartPulse", subCategories: ["أطباء", "تمريض", "صيدلة", "علاج طبيعي", "مختبرات", "إسعافات", "رعاية مسنين", "قابلة", "تركيبات تقويمية"] },
  { id: "education", name: "التعليم والتدريس", description: "مدرسين خصوصيين، تدريب، تحفيظ قرآن، مراجعة اختبارات وتربية خاصة", icon: "GraduationCap", subCategories: ["مدرسين", "تدريب", "تحفيظ قرآن", "مراجعة اختبارات", "تربية خاصة", "إرشاد أكاديمي"] },
  { id: "law", name: "المحاماة والاستشارات القانونية", description: "محاماة، استشارات قانونية، كتابة عدل، تحكيم وإعداد تقارير الخبراء", icon: "Scale", subCategories: ["محامي", "مستشار قانوني", "كاتب عدل", "محكم", "خبير تقارير"] },
  { id: "engineering", name: "الهندسة والاستشارات الفنية", description: "مهندسين، تصميم ديكور، تصميم جرافيك، خبراء سلامة ومساحة أراضي", icon: "Compass", subCategories: ["مهندسين", "مصمم ديكور", "مصمم جرافيك", "خبير سلامة", "استشارات", "مساح أراضي"] },
  { id: "transport", name: "النقل والخدمات اللوجستية", description: "نقل بضائع وعفش، تأجير سيارات ومعدات، توصيل طلبات ونقل ركاب", icon: "Truck", subCategories: ["نقل بضائع", "نقل عفش", "تأجير سيارات", "توصيل طلبات", "شحن", "نقل ركاب", "تأجير معدات", "إدارة أساطيل"] },
  { id: "cleaning", name: "التنظيف والتعقيم ومكافحة الحشرات", description: "تنظيف منازل وتعقيم، مكافحة حشرات وقوارض وحشرات الخشب والمزارع", icon: "Sparkles", subCategories: ["تنظيف", "تعقيم", "مكافحة حشرات", "مكافحة قوارض", "مكافحة حشرات خشب"] },
  { id: "tailoring", name: "الخياطة والتفصيل", description: "خياطة ملابس، تفصيل بدلات وستائر، تطريز وتصليح وحقائب وتنجيد", icon: "Scissors", subCategories: ["خياطة ملابس", "تفصيل بدلات", "تفصيل ستائر", "تطريز", "تصليح", "تفصيل حقائب", "تنجيد"] },
  { id: "it", name: "تقنية المعلومات والبرمجة", description: "برمجة تطبيقات، تصميم مواقع، أمن سيبراني، تسويق وصيانة هواتف وشبكات", icon: "Code", subCategories: ["برمجة تطبيقات", "تصميم مواقع", "تطوير ألعاب", "تصميم جرافيك", "تصوير", "صيانة هواتف", "تركيب شبكات", "أمن سيبراني", "تسويق إلكتروني", "ذكاء اصطناعي"] },
  { id: "flowers", name: "خدمات الزهور والهدايا والتنسيق", description: "تنسيق زهور ومناسبات، باقات هدايا وتنسيق مكاتب وفنادق", icon: "Flower", subCategories: ["تنسيق زهور", "تنسيق مناسبات", "باقات هدايا", "تنسيق مكاتب وفنادق"] },
  { id: "other", name: "أخرى", description: "للخدمات والمهن غير المدرجة في القوائم السابقة", icon: "Grid", subCategories: ["أخرى"] }
];

const SEED_PROVIDERS: Provider[] = [
  {
    id: "prov_777703195",
    name: "أمين الغرباني",
    phone: "777703195",
    password: btoa("123456"),
    category: "الصيانة العامة",
    subCategory: "كهرباء",
    city: "صنعاء",
    area: "منطقة الدائري",
    address: "جوار مدرسة أسماء للبنات",
    description: "فني كهربائي متخصص في صيانة التمديدات المنزلية، الأجهزة الكهربائية والمولدات بخبرة تزيد عن 10 سنوات في صنعاء.",
    rating: 5.0,
    reviewCount: 1,
    isVerified: true,
    isPinned: true,
    isRecommended: true,
    isSubscribed: true,
    imageUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400",
    coverImageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800",
    portfolioImages: [],
    latitude: 15.3533,
    longitude: 44.1952,
    isAvailable: true,
    price: 3000,
    workingHours: "8:00 ص - 10:00 م",
    services: ["صيانة كهرباء منازل", "تركيب مولدات", "صيانة لوحات توزيع الكهرباء"],
    skills: "تمديدات كهربائية، صيانة لوحات تحكم، تركيب أنظمة طاقة شمسية",
    deviceId: "device_amin_777703195",
    gender: "male",
    photoType: "personal",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    bookingsCount: 3,
    viewsCount: 45,
    callsCount: 12,
    totalEarnings: 9000,
    subscriptionEndDate: Date.now() + 1000 * 60 * 60 * 24 * 365
  }
];

const SEED_BANNERS = [
  { id: "banner_1", title: "مرحباً بكم في بوابة اليمن للخدمات", text: "دليلك الشامل لطلب أمهر الفنيين وأطباء المنازل والمدربين في جميع المدن اليمنية.", type: "text", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800" },
  { id: "banner_2", title: "انضم إلينا اليوم مجاناً!", text: "هل أنت سباك، كهربائي، طبيب، أو مدرس في اليمن؟ سجل معنا اليوم واعرض خدماتك لآلاف العملاء في منطقتك.", type: "image", imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d3ad1?w=800" },
  { id: "banner_3", title: "الدعم الفني المباشر لخدمتك WAM", text: "رقم الدعم الفني الموحد لجميع عملائنا ومزودي الخدمة في اليمن هو 777644.", type: "text", imageUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800" }
];

const SEED_FAQS = [
  { q: "ما هو تطبيق وموقع WAM (كل خدمات اليمن)؟", a: "هو بوابة خدمية متكاملة تربط أصحاب المهن والمحترفين الفنيين (كهرباء، سباكة، تعليم، صحة...) بالعملاء والزبائن الباحثين عن خدمات سريعة وموثوقة داخل مختلف المدن اليمنية." },
  { q: "كيف أقوم بحجز فني أو مقدم خدمة؟", a: "ببساطة تصفح دليل المهن، أو ابحث بالمهنة أو المدينة، ثم ادخل على ملف الفني واضغط على زر 'حجز'. قم بملء استمارة الحجز وسيرسل طلبك فوراً لمقدم الخدمة ليقوم بقبوله وبدء العمل." },
  { q: "هل هناك رسوم على التسجيل للعملاء؟", a: "لا، التسجيل والبحث وطلب الحجوزات مجاني تماماً للعملاء. ويتم دفع تكلفة المعاينة والخدمة مباشرة للفني حسب الاتفاق المبرم بينكما." },
  { q: "كيف يسجل الفني حسابه في الدليل؟", a: "اضغط على زر 'الانضمام' في الشريط السفلي، املأ بياناتك وموقعك وصورتك الشخصية أو المهنية، ثم أرسل الطلب. سيقوم المشرف العام بمراجعة هويتك والتحقق من مهنتك ثم تفعيل حسابك مباشرة." }
];

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "not_1",
    title: "مرحباً بك في WAM 🪐",
    body: "تم تفعيل بوابة 'كل خدمات اليمن' المتكاملة، دليلك الذكي ومستشارك في كل المحافظات اليمنية.",
    type: "general",
    targetType: "all",
    targetId: "",
    targetRole: "",
    isRead: false,
    timestamp: Date.now() - 1000 * 60 * 30 // 30 mins ago
  },
  {
    id: "not_2",
    title: "مفتاح الدعم والاتصال الموحد 📞",
    body: "يرجى العلم بأن رقم الدعم الفني والشكاوى المباشر لموقعنا هو 777644 لحمايتكم.",
    type: "promotion",
    targetType: "all",
    targetId: "",
    targetRole: "",
    isRead: false,
    timestamp: Date.now() - 1000 * 60 * 120 // 2 hours ago
  }
];

class ReactiveDB {
  private listeners: Record<string, ((data: any) => void)[]> = {};

  constructor() {
    this.initDatabase();
    this.initFirestoreSync();
    this.seedFirestoreIfEmpty();
  }

  private initDatabase() {
    if (!localStorage.getItem("wam_settings")) {
      localStorage.setItem("wam_settings", JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem("wam_categories")) {
      localStorage.setItem("wam_categories", JSON.stringify(SEED_CATEGORIES));
    }
    if (!localStorage.getItem("wam_providers")) {
      localStorage.setItem("wam_providers", JSON.stringify(SEED_PROVIDERS));
    }
    if (!localStorage.getItem("wam_pending_providers")) {
      localStorage.setItem("wam_pending_providers", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_bookings")) {
      localStorage.setItem("wam_bookings", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_chats")) {
      localStorage.setItem("wam_chats", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_messages")) {
      localStorage.setItem("wam_messages", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_notifications")) {
      localStorage.setItem("wam_notifications", JSON.stringify(SEED_NOTIFICATIONS));
    }
    if (!localStorage.getItem("wam_banners")) {
      localStorage.setItem("wam_banners", JSON.stringify(SEED_BANNERS));
    }
    if (!localStorage.getItem("wam_faqs")) {
      localStorage.setItem("wam_faqs", JSON.stringify(SEED_FAQS));
    }
    if (!localStorage.getItem("wam_reviews")) {
      localStorage.setItem("wam_reviews", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_payment_settings")) {
      const defaultPaymentSettings = {
        isPaymentEnabled: true,
        showPaymentScreen: true,
        linkPaymentToBookings: true,
        walletAccounts: [
          { id: "kuraimi", name: "كريمي", accountNumber: "123456", accountName: "شركة WAM للخدمات", isEnabled: true },
          { id: "jeeb", name: "جيب", accountNumber: "777644", accountName: "مؤسسة WAM اليمن", isEnabled: true },
          { id: "jawwal", name: "جوالي", accountNumber: "987654", accountName: "إدارة WAM", isEnabled: true },
          { id: "mfloos", name: "أم فلوس", accountNumber: "777644", accountName: "كل خدمات اليمن", isEnabled: true }
        ],
        requireAdvancePayment: true,
        advancePaymentPercentage: 15,
        minAdvanceAmount: 500,
        maxAdvanceAmount: 100000,
        autoReleasePayment: true,
        releaseHours: 24,
        enableProviderWallets: true,
        minWithdrawalAmount: 2000,
        withdrawalFeePercentage: 2,
        autoWithdrawal: false,
        showWalletInProviderProfile: true,
        showTransactionHistory: true,
        showPaymentReceipts: true
      };
      localStorage.setItem("wam_payment_settings", JSON.stringify(defaultPaymentSettings));
    }
    if (!localStorage.getItem("wam_provider_wallets")) {
      const defaultWallets = [
        {
          providerId: "prov_777703195",
          providerName: "أمين الغرباني",
          phoneNumber: "777703195",
          currentBalance: 9000,
          totalEarnings: 9000,
          totalWithdrawals: 0,
          status: "active"
        }
      ];
      localStorage.setItem("wam_provider_wallets", JSON.stringify(defaultWallets));
    }
    if (!localStorage.getItem("wam_transactions")) {
      const defaultTransactions = [
        {
          id: "tx_1",
          providerId: "prov_777703195",
          type: "deposit",
          amount: 5000,
          dateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
          status: "completed",
          description: "شحن رصيد البداية - محفظة ترحيبية WAM",
          bookingId: ""
        },
        {
          id: "tx_2",
          providerId: "prov_777703195",
          type: "payment",
          amount: 4000,
          dateTime: Date.now() - 1000 * 60 * 60 * 24,
          status: "completed",
          description: "أرباح حجز خدمة صيانة كهربائية مؤكدة",
          bookingId: "booking_1"
        }
      ];
      localStorage.setItem("wam_transactions", JSON.stringify(defaultTransactions));
    }
    if (!localStorage.getItem("wam_audit_logs")) {
      localStorage.setItem("wam_audit_logs", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_users")) {
      // Create owner as seed user
      const ownerUser: User = {
        id: "owner_wam2026",
        name: "WAM2026",
        phone: "777644",
        area: "صنعاء",
        role: "owner",
        deviceId: "android_id_owner"
      };
      const providerUser: User = {
        id: "prov_777703195",
        name: "أمين الغرباني",
        phone: "777703195",
        area: "منطقة الدائري",
        role: "provider",
        deviceId: "device_amin_777703195"
      };
      localStorage.setItem("wam_users", JSON.stringify([ownerUser, providerUser]));
    }
  }

  // Real-time synchronization with Firestore (Fully active with yemenimaw)
  private initFirestoreSync() {
    if (!firestore) {
      console.log("Firestore is not initialized. Running in local-only offline mode.");
      return;
    }

    console.log("Initializing real-time Firestore synchronization with project yemenimaw...");

    const collectionsToSync = [
      "categories",
      "providers",
      "pending_providers",
      "bookings",
      "chats",
      "messages",
      "notifications",
      "banners",
      "faqs",
      "users",
      "reviews",
      "provider_wallets",
      "transactions",
      "audit_logs",
      "payment_settings"
    ];

    collectionsToSync.forEach((colName) => {
      try {
        onSnapshot(
          fsCollection(firestore, colName),
          (snapshot) => {
            const items: any[] = [];
            snapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() });
            });
            
            // Check if data is actually different to avoid infinite loop triggers
            const localRaw = localStorage.getItem(`wam_${colName}`);
            const localItems = localRaw ? JSON.parse(localRaw) : [];
            
            // CRITICAL PROTECTION: If firestore snapshot is empty, but we have default local seed data,
            // we should UPLOAD our local seed data to Firestore instead of letting it wipe our local state!
            if (snapshot.empty && localItems.length > 0 && 
                ["categories", "banners", "faqs", "notifications", "users"].includes(colName)) {
              console.log(`Firestore collection ${colName} is empty. Uploading default seed data...`);
              this.saveCollection(colName, localItems);
              return;
            }
            
            if (JSON.stringify(items) !== JSON.stringify(localItems)) {
              localStorage.setItem(`wam_${colName}`, JSON.stringify(items));
              this.notify(colName);
            }
          },
          (error) => {
            console.error(`Error syncing collection ${colName} from Firestore:`, error);
          }
        );
      } catch (err) {
        console.error(`Failed to register snapshot listener for ${colName}:`, err);
      }
    });

    // Sync Settings document
    try {
      onSnapshot(
        doc(firestore, "settings", "GLOBAL_SETTINGS"),
        (snapshot) => {
          const localRaw = localStorage.getItem("wam_settings");
          if (snapshot.exists()) {
            const settings = snapshot.data();
            if (JSON.stringify(settings) !== localRaw) {
              localStorage.setItem("wam_settings", JSON.stringify(settings));
              this.notify("settings");
            }
          } else {
            // CRITICAL PROTECTION: If global settings doesn't exist in Firestore, write it from local
            if (localRaw) {
              console.log("Firestore settings document does not exist. Uploading from local...");
              try {
                setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), JSON.parse(localRaw));
              } catch (err) {
                console.error("Failed to seed settings:", err);
              }
            }
          }
        },
        (error) => {
          console.error("Error syncing settings from Firestore:", error);
        }
      );
    } catch (err) {
      console.error("Failed to register settings snapshot listener:", err);
    }
  }

  // Safe, async, one-time Firestore database seeding on startup
  private async seedFirestoreIfEmpty() {
    if (!firestore) return;
    try {
      // Check if categories is empty
      const snapshot = await getDocs(fsCollection(firestore, "categories"));
      if (snapshot.empty) {
        console.log("Firestore database is empty! Seeding default data to the new Firebase project...");
        
        // 1. settings
        await setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), DEFAULT_SETTINGS);

        // 2. categories
        for (const cat of SEED_CATEGORIES) {
          await setDoc(doc(firestore, "categories", cat.id), cat);
        }

        // 3. banners
        for (const banner of SEED_BANNERS) {
          await setDoc(doc(firestore, "banners", banner.id), banner);
        }

        // 4. faqs
        for (const faq of SEED_FAQS) {
          const stableId = `faq_${faq.q.substring(0, 15).replace(/[^a-zA-Z0-9]/g, "_")}`;
          await setDoc(doc(firestore, "faqs", stableId), faq);
        }

        // 5. notifications
        for (const not of SEED_NOTIFICATIONS) {
          await setDoc(doc(firestore, "notifications", not.id), not);
        }

        // 6. seed owner user and Amin Al-Gharbani
        const ownerUser = {
          id: "owner_wam2026",
          name: "WAM2026",
          phone: "777644",
          area: "صنعاء",
          role: "owner",
          deviceId: "android_id_owner"
        };
        await setDoc(doc(firestore, "users", "owner_wam2026"), ownerUser);

        const providerUser = {
          id: "prov_777703195",
          name: "أمين الغرباني",
          phone: "777703195",
          area: "منطقة الدائري",
          role: "provider",
          deviceId: "device_amin_777703195"
        };
        await setDoc(doc(firestore, "users", "prov_777703195"), providerUser);

        // 7. Seed providers (Amin Al-Gharbani)
        for (const prov of SEED_PROVIDERS) {
          await setDoc(doc(firestore, "providers", prov.id), prov);
        }

        // 8. Seed payment_settings
        const defaultPaymentSettings = {
          isPaymentEnabled: true,
          showPaymentScreen: true,
          linkPaymentToBookings: true,
          walletAccounts: [
            { id: "kuraimi", name: "كريمي", accountNumber: "123456", accountName: "شركة WAM للخدمات", isEnabled: true },
            { id: "jeeb", name: "جيب", accountNumber: "777644", accountName: "مؤسسة WAM اليمن", isEnabled: true },
            { id: "jawwal", name: "جوالي", accountNumber: "987654", accountName: "إدارة WAM", isEnabled: true },
            { id: "mfloos", name: "أم فلوس", accountNumber: "777644", accountName: "كل خدمات اليمن", isEnabled: true }
          ],
          requireAdvancePayment: true,
          advancePaymentPercentage: 15,
          minAdvanceAmount: 500,
          maxAdvanceAmount: 100000,
          autoReleasePayment: true,
          releaseHours: 24,
          enableProviderWallets: true,
          minWithdrawalAmount: 2000,
          withdrawalFeePercentage: 2,
          autoWithdrawal: false,
          showWalletInProviderProfile: true,
          showTransactionHistory: true,
          showPaymentReceipts: true
        };
        await setDoc(doc(firestore, "settings", "PAYMENT_SETTINGS"), defaultPaymentSettings);

        // 9. Seed provider_wallets
        const defaultWallet = {
          providerId: "prov_777703195",
          providerName: "أمين الغرباني",
          phoneNumber: "777703195",
          currentBalance: 9000,
          totalEarnings: 9000,
          totalWithdrawals: 0,
          status: "active"
        };
        await setDoc(doc(firestore, "provider_wallets", "prov_777703195"), defaultWallet);

        // 10. Seed transactions
        const tx1 = {
          id: "tx_1",
          providerId: "prov_777703195",
          type: "deposit",
          amount: 5000,
          dateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
          status: "completed",
          description: "شحن رصيد البداية - محفظة ترحيبية WAM",
          bookingId: ""
        };
        const tx2 = {
          id: "tx_2",
          providerId: "prov_777703195",
          type: "payment",
          amount: 4000,
          dateTime: Date.now() - 1000 * 60 * 60 * 24,
          status: "completed",
          description: "أرباح حجز خدمة صيانة كهربائية مؤكدة",
          bookingId: "booking_1"
        };
        await setDoc(doc(firestore, "transactions", "tx_1"), tx1);
        await setDoc(doc(firestore, "transactions", "tx_2"), tx2);

        // 11. Seed audit_logs
        const initLog = {
          id: "log_init",
          action: "DATABASE_INITIALIZED",
          operator: "SYSTEM_AUTO_SEED",
          details: "تم تهيئة قاعدة البيانات وإنشاء كافة المجموعات والتحقق الأمني والمحافظ بنجاح تلقائياً.",
          timestamp: Date.now()
        };
        await setDoc(doc(firestore, "audit_logs", "log_init"), initLog);

        console.log("Firestore successfully seeded with all initial data!");
      } else {
        console.log("Firestore already has data. Seeding skipped.");
      }
    } catch (err) {
      console.error("Failed to seed Firestore:", err);
    }
  }
 
  // Completely force rebuild and seed all collections
  public async forceSeedFirebase(): Promise<{ success: boolean; error?: string; seededCount: number }> {
    if (!firestore) {
      return { success: false, error: "Firebase is not initialized", seededCount: 0 };
    }
    try {
      console.log("Force seeding all collections to Firebase...");
      let seededCount = 0;

      // 1. settings
      await setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), DEFAULT_SETTINGS);
      seededCount++;

      // 2. categories
      for (const cat of SEED_CATEGORIES) {
        await setDoc(doc(firestore, "categories", cat.id), cat);
      }
      seededCount++;

      // 3. banners
      for (const banner of SEED_BANNERS) {
        await setDoc(doc(firestore, "banners", banner.id), banner);
      }
      seededCount++;

      // 4. faqs
      for (const faq of SEED_FAQS) {
        const stableId = `faq_${faq.q.substring(0, 15).replace(/[^a-zA-Z0-9]/g, "_")}`;
        await setDoc(doc(firestore, "faqs", stableId), faq);
      }
      seededCount++;

      // 5. notifications
      for (const not of SEED_NOTIFICATIONS) {
        await setDoc(doc(firestore, "notifications", not.id), not);
      }
      seededCount++;

      // 6. seed owner user
      const ownerUser = {
        id: "owner_wam2026",
        name: "WAM2026",
        phone: "777644",
        area: "صنعاء",
        role: "owner",
        deviceId: "android_id_owner"
      };
      await setDoc(doc(firestore, "users", "owner_wam2026"), ownerUser);
      seededCount++;

      const providerUser = {
        id: "prov_777703195",
        name: "أمين الغرباني",
        phone: "777703195",
        area: "منطقة الدائري",
        role: "provider",
        deviceId: "device_amin_777703195"
      };
      await setDoc(doc(firestore, "users", "prov_777703195"), providerUser);
      seededCount++;

      // 7. providers
      for (const prov of SEED_PROVIDERS) {
        await setDoc(doc(firestore, "providers", prov.id), prov);
      }
      seededCount++;

      // 8. payment_settings
      const defaultPaymentSettings = {
        isPaymentEnabled: true,
        showPaymentScreen: true,
        linkPaymentToBookings: true,
        walletAccounts: [
          { id: "kuraimi", name: "كريمي", accountNumber: "123456", accountName: "شركة WAM للخدمات", isEnabled: true },
          { id: "jeeb", name: "جيب", accountNumber: "777644", accountName: "مؤسسة WAM اليمن", isEnabled: true },
          { id: "jawwal", name: "جوالي", accountNumber: "987654", accountName: "إدارة WAM", isEnabled: true },
          { id: "mfloos", name: "أم فلوس", accountNumber: "777644", accountName: "كل خدمات اليمن", isEnabled: true }
        ],
        requireAdvancePayment: true,
        advancePaymentPercentage: 15,
        minAdvanceAmount: 500,
        maxAdvanceAmount: 100000,
        autoReleasePayment: true,
        releaseHours: 24,
        enableProviderWallets: true,
        minWithdrawalAmount: 2000,
        withdrawalFeePercentage: 2,
        autoWithdrawal: false,
        showWalletInProviderProfile: true,
        showTransactionHistory: true,
        showPaymentReceipts: true
      };
      await setDoc(doc(firestore, "settings", "PAYMENT_SETTINGS"), defaultPaymentSettings);
      seededCount++;

      // 9. provider_wallets
      const defaultWallet = {
        providerId: "prov_777703195",
        providerName: "أمين الغرباني",
        phoneNumber: "777703195",
        currentBalance: 9000,
        totalEarnings: 9000,
        totalWithdrawals: 0,
        status: "active"
      };
      await setDoc(doc(firestore, "provider_wallets", "prov_777703195"), defaultWallet);
      seededCount++;

      // 10. transactions
      const tx1 = {
        id: "tx_1",
        providerId: "prov_777703195",
        type: "deposit",
        amount: 5000,
        dateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
        status: "completed",
        description: "شحن رصيد البداية - محفظة ترحيبية WAM",
        bookingId: ""
      };
      const tx2 = {
        id: "tx_2",
        providerId: "prov_777703195",
        type: "payment",
        amount: 4000,
        dateTime: Date.now() - 1000 * 60 * 60 * 24,
        status: "completed",
        description: "أرباح حجز خدمة صيانة كهربائية مؤكدة",
        bookingId: "booking_1"
      };
      await setDoc(doc(firestore, "transactions", "tx_1"), tx1);
      await setDoc(doc(firestore, "transactions", "tx_2"), tx2);
      seededCount += 2;

      // 11. audit_logs
      const initLog = {
        id: "log_init",
        action: "DATABASE_INITIALIZED",
        operator: "SYSTEM_FORCE_SEED",
        details: "تم فرض إعادة تهيئة سحابية سريعة وتصفير المجموعات المشبوهة بنجاح.",
        timestamp: Date.now()
      };
      await setDoc(doc(firestore, "audit_logs", "log_init"), initLog);
      seededCount++;

      console.log("Force seeding complete!");
      return { success: true, seededCount };
    } catch (err: any) {
      console.error("Force seeding Firebase failed:", err);
      return { success: false, error: err?.message || String(err), seededCount: 0 };
    }
  }

  // Reactive subscription system mirroring Firestore onSnapshot
  public subscribe(collection: string, callback: (data: any) => void): () => void {
    if (!this.listeners[collection]) {
      this.listeners[collection] = [];
    }
    this.listeners[collection].push(callback);
    
    // Call immediately with current data
    const currentData = this.getCollection(collection);
    callback(currentData);

    // Return unsubscribe function
    return () => {
      this.listeners[collection] = this.listeners[collection].filter(l => l !== callback);
    };
  }

  private notify(collection: string) {
    if (this.listeners[collection]) {
      const currentData = this.getCollection(collection);
      this.listeners[collection].forEach(callback => {
        try {
          callback(currentData);
        } catch (e) {
          console.error("Error in snapshot subscriber:", e);
        }
      });
    }
  }

  public getCollection(collection: string): any {
    const raw = localStorage.getItem(`wam_${collection}`);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // Generic collection save and Firestore update with cleanup for deleted items
  public async saveCollection(colName: string, items: any[]) {
    // 1. Update local storage first for instant responsive UI
    localStorage.setItem(`wam_${colName}`, JSON.stringify(items));
    this.notify(colName);

    if (!firestore) return;

    // 2. Upload/Update documents in Firestore
    const promises = items.map((item: any) => {
      const docId = item.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      if (!item.id) {
        item.id = docId;
      }
      return setDoc(doc(firestore, colName, docId), item);
    });

    try {
      await Promise.all(promises);

      // 3. Remove any documents from Firestore that are no longer in the local array
      const snapshot = await getDocs(fsCollection(firestore, colName));
      const deletePromises: Promise<void>[] = [];
      snapshot.forEach((doc) => {
        const exists = items.some((item: any) => item.id === doc.id);
        if (!exists) {
          deletePromises.push(deleteDoc(doc.ref));
        }
      });
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }
    } catch (err) {
      console.error(`Error saving collection '${colName}' to Firestore:`, err);
    }
  }

  // GETTERS & SETTERS FOR COLLECTIONS

  public getSettings(): AppSettings {
    const raw = localStorage.getItem("wam_settings");
    return raw ? JSON.parse(raw) : DEFAULT_SETTINGS;
  }

  public async saveSettings(settings: AppSettings) {
    localStorage.setItem("wam_settings", JSON.stringify(settings));
    this.notify("settings");
    
    if (!firestore) return;
    try {
      await setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), settings);
    } catch (err) {
      console.error("Error saving settings to Firestore:", err);
    }
  }

  public getCategories() {
    return this.getCollection("categories");
  }

  public saveCategories(categories: any[]) {
    this.saveCollection("categories", categories);
  }

  public getProviders(): Provider[] {
    return this.getCollection("providers");
  }

  public saveProviders(providers: Provider[]) {
    this.saveCollection("providers", providers);
  }

  public getPendingProviders(): PendingProvider[] {
    return this.getCollection("pending_providers");
  }

  public savePendingProviders(pending: PendingProvider[]) {
    this.saveCollection("pending_providers", pending);
  }

  public getBookings(): Booking[] {
    return this.getCollection("bookings");
  }

  public saveBookings(bookings: Booking[]) {
    this.saveCollection("bookings", bookings);
  }

  public getChats(): Chat[] {
    return this.getCollection("chats");
  }

  public saveChats(chats: Chat[]) {
    this.saveCollection("chats", chats);
  }

  public getMessages(): Message[] {
    return this.getCollection("messages");
  }

  public saveMessages(messages: Message[]) {
    this.saveCollection("messages", messages);
  }

  public getNotifications(): Notification[] {
    return this.getCollection("notifications");
  }

  public saveNotifications(notifications: Notification[]) {
    this.saveCollection("notifications", notifications);
  }

  public getBanners() {
    return this.getCollection("banners");
  }

  public saveBanners(banners: any[]) {
    this.saveCollection("banners", banners);
  }

  public getFaqs() {
    return this.getCollection("faqs");
  }

  public saveFaqs(faqs: any[]) {
    this.saveCollection("faqs", faqs);
  }

  public getUsers(): User[] {
    return this.getCollection("users");
  }

  public saveUsers(users: User[]) {
    this.saveCollection("users", users);
  }

  public getReviews(): any[] {
    return this.getCollection("reviews");
  }

  public saveReviews(reviews: any[]) {
    this.saveCollection("reviews", reviews);
  }

  // Getters & Setters for Payment Tab / Wallets Screen
  public getPaymentSettings(): PaymentSettings {
    const raw = localStorage.getItem("wam_payment_settings");
    if (!raw) {
      return {
        isPaymentEnabled: true,
        showPaymentScreen: true,
        linkPaymentToBookings: true,
        walletAccounts: [
          { id: "kuraimi", name: "كريمي", accountNumber: "123456", accountName: "شركة WAM للخدمات", isEnabled: true },
          { id: "jeeb", name: "جيب", accountNumber: "777644", accountName: "مؤسسة WAM اليمن", isEnabled: true },
          { id: "jawwal", name: "جوالي", accountNumber: "987654", accountName: "إدارة WAM", isEnabled: true },
          { id: "mfloos", name: "أم فلوس", accountNumber: "777644", accountName: "كل خدمات اليمن", isEnabled: true }
        ],
        requireAdvancePayment: true,
        advancePaymentPercentage: 15,
        minAdvanceAmount: 500,
        maxAdvanceAmount: 100000,
        autoReleasePayment: true,
        releaseHours: 24,
        enableProviderWallets: true,
        minWithdrawalAmount: 2000,
        withdrawalFeePercentage: 2,
        autoWithdrawal: false,
        showWalletInProviderProfile: true,
        showTransactionHistory: true,
        showPaymentReceipts: true
      };
    }
    try {
      return JSON.parse(raw);
    } catch {
      return {} as any;
    }
  }

  public async savePaymentSettings(settings: PaymentSettings) {
    localStorage.setItem("wam_payment_settings", JSON.stringify(settings));
    this.notify("payment_settings");
    if (!firestore) return;
    try {
      await setDoc(doc(firestore, "settings", "PAYMENT_SETTINGS"), settings);
    } catch (err) {
      console.error("Error saving payment settings to Firestore:", err);
    }
  }

  public getProviderWallets(): ProviderWallet[] {
    return this.getCollection("provider_wallets");
  }

  public saveProviderWallets(wallets: ProviderWallet[]) {
    this.saveCollection("provider_wallets", wallets);
  }

  public getTransactions(): Transaction[] {
    return this.getCollection("transactions");
  }

  public saveTransactions(txs: Transaction[]) {
    this.saveCollection("transactions", txs);
  }

  public getAuditLogs(): any[] {
    return this.getCollection("audit_logs");
  }

  public saveAuditLogs(logs: any[]) {
    this.saveCollection("audit_logs", logs);
  }

  public addAuditLog(action: string, operator: string, details: string) {
    const logs = this.getAuditLogs();
    const newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      action,
      operator,
      details,
      timestamp: Date.now()
    };
    this.saveAuditLogs([newLog, ...logs]);
  }

  // Reset selected collections
  public async resetSelectedCollections(selected: {
    categories?: boolean;
    providers?: boolean;
    pending_providers?: boolean;
    bookings?: boolean;
    chats_messages?: boolean;
    notifications?: boolean;
    faqs_banners?: boolean;
    users?: boolean;
    wallets_transactions?: boolean;
  }) {
    if (selected.categories) {
      localStorage.setItem("wam_categories", JSON.stringify(SEED_CATEGORIES));
      this.notify("categories");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "categories"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
          for (const cat of SEED_CATEGORIES) { await setDoc(doc(firestore, "categories", cat.id), cat); }
        } catch (e) { console.error("Error resetting categories:", e); }
      }
    }
    if (selected.providers) {
      localStorage.setItem("wam_providers", JSON.stringify(SEED_PROVIDERS));
      this.notify("providers");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "providers"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
          for (const prov of SEED_PROVIDERS) { await setDoc(doc(firestore, "providers", prov.id), prov); }
        } catch (e) { console.error("Error resetting providers:", e); }
      }
    }
    if (selected.pending_providers) {
      localStorage.setItem("wam_pending_providers", JSON.stringify([]));
      this.notify("pending_providers");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "pending_providers"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
        } catch (e) { console.error("Error resetting pending_providers:", e); }
      }
    }
    if (selected.bookings) {
      localStorage.setItem("wam_bookings", JSON.stringify([]));
      this.notify("bookings");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "bookings"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
        } catch (e) { console.error("Error resetting bookings:", e); }
      }
    }
    if (selected.chats_messages) {
      localStorage.setItem("wam_chats", JSON.stringify([]));
      localStorage.setItem("wam_messages", JSON.stringify([]));
      this.notify("chats");
      this.notify("messages");
      if (firestore) {
        try {
          const snapChats = await getDocs(fsCollection(firestore, "chats"));
          for (const d of snapChats.docs) { await deleteDoc(d.ref); }
          const snapMsgs = await getDocs(fsCollection(firestore, "messages"));
          for (const d of snapMsgs.docs) { await deleteDoc(d.ref); }
        } catch (e) { console.error("Error resetting chats_messages:", e); }
      }
    }
    if (selected.notifications) {
      localStorage.setItem("wam_notifications", JSON.stringify(SEED_NOTIFICATIONS));
      this.notify("notifications");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "notifications"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
          for (const not of SEED_NOTIFICATIONS) { await setDoc(doc(firestore, "notifications", not.id), not); }
        } catch (e) { console.error("Error resetting notifications:", e); }
      }
    }
    if (selected.faqs_banners) {
      localStorage.setItem("wam_faqs", JSON.stringify(SEED_FAQS));
      localStorage.setItem("wam_banners", JSON.stringify(SEED_BANNERS));
      this.notify("faqs");
      this.notify("banners");
      if (firestore) {
        try {
          const snapFaqs = await getDocs(fsCollection(firestore, "faqs"));
          for (const d of snapFaqs.docs) { await deleteDoc(d.ref); }
          for (const faq of SEED_FAQS) {
            const stableId = `faq_${faq.q.substring(0, 15).replace(/[^a-zA-Z0-9]/g, "_")}`;
            await setDoc(doc(firestore, "faqs", stableId), faq);
          }
          const snapBanners = await getDocs(fsCollection(firestore, "banners"));
          for (const d of snapBanners.docs) { await deleteDoc(d.ref); }
          for (const banner of SEED_BANNERS) { await setDoc(doc(firestore, "banners", banner.id), banner); }
        } catch (e) { console.error("Error resetting faqs_banners:", e); }
      }
    }
    if (selected.users) {
      const defaultUsers = [
        { id: "owner_wam2026", name: "WAM2026", phone: "777644", area: "صنعاء", role: "owner", deviceId: "android_id_owner" },
        { id: "prov_777703195", name: "أمين الغرباني", phone: "777703195", area: "منطقة الدائري", role: "provider", deviceId: "device_amin_777703195" }
      ];
      localStorage.setItem("wam_users", JSON.stringify(defaultUsers));
      this.notify("users");
      if (firestore) {
        try {
          const snapshot = await getDocs(fsCollection(firestore, "users"));
          for (const d of snapshot.docs) { await deleteDoc(d.ref); }
          for (const u of defaultUsers) { await setDoc(doc(firestore, "users", u.id), u); }
        } catch (e) { console.error("Error resetting users:", e); }
      }
    }
    if (selected.wallets_transactions) {
      const defaultWallets = [
        { providerId: "prov_777703195", providerName: "أمين الغرباني", phoneNumber: "777703195", currentBalance: 9000, totalEarnings: 9000, totalWithdrawals: 0, status: "active" }
      ];
      const defaultTransactions = [
        { id: "tx_1", providerId: "prov_777703195", type: "deposit", amount: 5000, dateTime: Date.now() - 1000 * 60 * 60 * 24 * 2, status: "completed", description: "شحن رصيد البداية - محفظة ترحيبية WAM", bookingId: "" },
        { id: "tx_2", providerId: "prov_777703195", type: "payment", amount: 4000, dateTime: Date.now() - 1000 * 60 * 60 * 24, status: "completed", description: "أرباح حجز خدمة صيانة كهربائية مؤكدة", bookingId: "booking_1" }
      ];
      localStorage.setItem("wam_provider_wallets", JSON.stringify(defaultWallets));
      localStorage.setItem("wam_transactions", JSON.stringify(defaultTransactions));
      this.notify("provider_wallets");
      this.notify("transactions");
      if (firestore) {
        try {
          const snapWallets = await getDocs(fsCollection(firestore, "provider_wallets"));
          for (const d of snapWallets.docs) { await deleteDoc(d.ref); }
          for (const w of defaultWallets) { await setDoc(doc(firestore, "provider_wallets", w.providerId), w); }
          const snapTxs = await getDocs(fsCollection(firestore, "transactions"));
          for (const d of snapTxs.docs) { await deleteDoc(d.ref); }
          for (const tx of defaultTransactions) { await setDoc(doc(firestore, "transactions", tx.id), tx); }
        } catch (e) { console.error("Error resetting wallets_transactions:", e); }
      }
    }
  }

  // RESET ALL DATA TO SEED VALUES (for emergency recovery)
  public async clearAllData() {
    localStorage.removeItem("wam_settings");
    localStorage.removeItem("wam_categories");
    localStorage.removeItem("wam_providers");
    localStorage.removeItem("wam_pending_providers");
    localStorage.removeItem("wam_bookings");
    localStorage.removeItem("wam_chats");
    localStorage.removeItem("wam_messages");
    localStorage.removeItem("wam_notifications");
    localStorage.removeItem("wam_banners");
    localStorage.removeItem("wam_faqs");
    localStorage.removeItem("wam_users");
    localStorage.removeItem("wam_reviews");
    localStorage.removeItem("wam_payment_settings");
    localStorage.removeItem("wam_provider_wallets");
    localStorage.removeItem("wam_transactions");
    localStorage.removeItem("wam_audit_logs");
    this.initDatabase();
    
    // Notify all listeners
    Object.keys(this.listeners).forEach(collection => {
      this.notify(collection);
    });

    if (firestore) {
      try {
        await setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), DEFAULT_SETTINGS);
        
        const collectionsToClear = [
          "categories",
          "providers",
          "pending_providers",
          "bookings",
          "chats",
          "messages",
          "notifications",
          "banners",
          "faqs",
          "users",
          "reviews",
          "provider_wallets",
          "transactions",
          "audit_logs"
        ];

        for (const colName of collectionsToClear) {
          const snapshot = await getDocs(fsCollection(firestore, colName));
          const deletePromises: Promise<void>[] = [];
          snapshot.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
          });
          if (deletePromises.length > 0) {
            await Promise.all(deletePromises);
          }
        }
      } catch (err) {
        console.error("Error clearing Firestore data:", err);
      }
    }
  }

  // EXPORT BACKUP DATA (to JSON format)
  public exportBackupData(): string {
    const backupObj: Record<string, any> = {};
    const keysToBackup = [
      "settings",
      "categories",
      "providers",
      "pending_providers",
      "bookings",
      "chats",
      "messages",
      "notifications",
      "banners",
      "faqs",
      "users",
      "reviews"
    ];
    
    // Backup settings
    backupObj["settings"] = this.getSettings();
    
    // Backup collections
    keysToBackup.slice(1).forEach(col => {
      backupObj[col] = this.getCollection(col);
    });
    
    return JSON.stringify({
      version: "wam_backup_v1",
      timestamp: Date.now(),
      data: backupObj
    }, null, 2);
  }

  // IMPORT BACKUP DATA (from JSON format)
  public async importBackupData(jsonString: string): Promise<{ success: boolean; error?: string }> {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || parsed.version !== "wam_backup_v1" || !parsed.data) {
        return { success: false, error: "صيغة ملف النسخ الاحتياطي غير صالحة أو غير متوافقة." };
      }
      
      const backupData = parsed.data;
      
      // 1. Save Settings
      if (backupData.settings) {
        await this.saveSettings(backupData.settings);
      }
      
      // 2. Save all other collections
      const collections = [
        "categories",
        "providers",
        "pending_providers",
        "bookings",
        "chats",
        "messages",
        "notifications",
        "banners",
        "faqs",
        "users",
        "reviews"
      ];
      
      for (const col of collections) {
        if (Array.isArray(backupData[col])) {
          await this.saveCollection(col, backupData[col]);
        }
      }
      
      return { success: true };
    } catch (err: any) {
      console.error("Failed to import backup data:", err);
      return { success: false, error: err?.message || String(err) };
    }
  }
}

export const db = new ReactiveDB();

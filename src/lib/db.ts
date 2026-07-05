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
  SubscriptionPlan
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
  supportEmail: "info@yemen-services.com",
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
  aboutDownloadUrl: "https://ais-pre-v5wovkxit3l3v5hw7ej3nn-981585600131.europe-west2.run.app/wam_project_full.zip"
};

const SEED_CATEGORIES = [
  { id: "maintenance", name: "صيانة منزلية", description: "أشغال السباكة، الكهرباء، النجارة، صيانة المكيفات والأجهزة المنزلية", icon: "Home", subCategories: ["سباكة", "كهرباء", "نجارة", "صيانة مكيفات", "تركيب ستلايت"] },
  { id: "health", name: "صحة ورعاية", description: "الأطباء المنزليون، الممرضون والممرضات، العلاج الطبيعي ورعاية كبار السن والأطفال", icon: "HeartPulse", subCategories: ["طبيب منزلي", "ممرض منزلي", "علاج طبيعي", "رعاية أطفال", "رعاية كبار سن"] },
  { id: "education", name: "تعليم وتدريب", description: "مدرسون خصوصيون لجميع المواد والمناهج اليمنية، دورات تقنية، لغات وموسيقى", icon: "GraduationCap", subCategories: ["مدرس لغة عربية", "مدرس رياضيات", "مدرس لغة إنجليزية", "برمجة وحاسوب", "تأسيس أطفال"] },
  { id: "transport", name: "نقل وخدمات", description: "توصيل طرود، نقل عفش وأثاث، وايتات مياه وصهاريج، توصيل طلبات سريعة", icon: "Truck", subCategories: ["نقل عفش وأثاث", "وايت ماء", "توصيل طرود", "سائق تاكسي", "رافعات وسحب"] },
  { id: "tech", name: "خدمات تقنية", description: "صيانة تلفونات وكمبيوترات، تمديد شبكات إنترنت وتفعيل قنوات وبث منزلي", icon: "Cpu", subCategories: ["صيانة جوالات", "صيانة كمبيوتر", "تركيب شبكات", "كاميرات مراقبة", "برمجة وتصميم"] },
  { id: "other", name: "أخرى", description: "الطبخ المنزلي، الخياطة والتطريز، التنظيف والتعقيم، تنسيق الحدائق وغيرها", icon: "Briefcase", subCategories: ["خياطة وتطريز", "طبخ منزلي وتجهيز بوفيه", "تنظيف منازل وتعقيم", "حلاقة رجالي كوافير", "صيانة سيارات متنقلة"] },
];

const SEED_PROVIDERS: Provider[] = [];

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
    } else {
      // Purge mock/fake providers from localStorage
      const mockPhones = ["777123456", "733987654", "711223344", "777556677", "777112233"];
      try {
        const raw = localStorage.getItem("wam_providers");
        const current = raw ? JSON.parse(raw) : [];
        const filtered = current.filter((p: any) => !mockPhones.includes(p.phone));
        localStorage.setItem("wam_providers", JSON.stringify(filtered));
      } catch (e) {}
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
      localStorage.setItem("wam_users", JSON.stringify([ownerUser]));
    }
  }

  // Real-time synchronization with Firestore
  private initFirestoreSync() {
    try {
      console.log("Initializing WAM Firebase Firestore Realtime Sync...");

      // Automatically purge all mock/fake providers from Firestore to clean the database completely
      const mockProviderIds = [
        "prov_777123456",
        "prov_733987654",
        "prov_711223344",
        "prov_777556677",
        "prov_777112233"
      ];
      mockProviderIds.forEach((mId) => {
        deleteDoc(doc(firestore, "providers", mId)).catch((err) => {
          console.error(`Error purging mock provider ${mId} from Firestore:`, err);
        });
      });

      // 1. Sync AppSettings
      onSnapshot(doc(firestore, "settings", "GLOBAL_SETTINGS"), (snapshot) => {
        if (snapshot.exists()) {
          const settingsData = snapshot.data() as AppSettings;
          localStorage.setItem("wam_settings", JSON.stringify(settingsData));
          this.notify("settings");
        } else {
          // If Firestore settings do not exist yet, seed them from local storage
          const localSettings = this.getSettings();
          setDoc(doc(firestore, "settings", "GLOBAL_SETTINGS"), localSettings);
        }
      }, (error) => {
        console.error("Firestore settings snapshot error:", error);
      });

      // 2. Sync all other collections
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
        "users"
      ];

      collectionsToSync.forEach((colName) => {
        onSnapshot(fsCollection(firestore, colName), (snapshot) => {
          if (snapshot.empty) {
            // Seed Firestore with local/default data if it's currently empty
            const localData = this.getCollection(colName);
            if (localData && localData.length > 0) {
              console.log(`Seeding empty Firestore collection '${colName}' with local data...`);
              localData.forEach((item: any) => {
                const docId = item.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
                setDoc(doc(firestore, colName, docId), item).catch(err => {
                  console.error(`Error seeding document ${docId} to Firestore ${colName}:`, err);
                });
              });
            }
          } else {
            const items: any[] = [];
            snapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() });
            });

            // Maintain sorting to keep list orders consistent
            items.sort((a, b) => {
              if (a.timestamp && b.timestamp) return a.timestamp - b.timestamp;
              if (a.id && b.id) return a.id.localeCompare(b.id);
              return 0;
            });

            localStorage.setItem(`wam_${colName}`, JSON.stringify(items));
            this.notify(colName);
          }
        }, (error) => {
          console.error(`Firestore collection '${colName}' snapshot error:`, error);
        });
      });

    } catch (e) {
      console.error("Failed to initialize Firestore real-time sync:", e);
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

  private getCollection(collection: string): any {
    const raw = localStorage.getItem(`wam_${collection}`);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // Generic collection save and Firestore update with cleanup for deleted items
  private async saveCollection(colName: string, items: any[]) {
    // 1. Update local storage first for instant responsive UI
    localStorage.setItem(`wam_${colName}`, JSON.stringify(items));
    this.notify(colName);

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
    this.initDatabase();
    
    // Notify all listeners
    Object.keys(this.listeners).forEach(collection => {
      this.notify(collection);
    });

    // Clean up Firestore settings and collections too
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
        "users"
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

export const db = new ReactiveDB();

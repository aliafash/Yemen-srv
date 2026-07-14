import { AppSettings, Provider, PendingProvider, Booking, Chat, Message, Notification, User, Review, Banner } from "../types";

type CollectionName = 
  | "settings" 
  | "categories" 
  | "providers" 
  | "pending_providers" 
  | "bookings" 
  | "chats" 
  | "messages" 
  | "notifications" 
  | "users" 
  | "reviews" 
  | "banners" 
  | "audit_logs"
  | "recovery_requests";

const defaultSettings: AppSettings = {
  appName: "اليمن للخدمات",
  showProviderStats: true,
  selectedFontName: "sans-serif",
  isMaintenanceMode: false,
  isOnboardingEnabled: true,
  showContactChannels: true,
  telegramLink: "https://t.me/yemen_services",
  facebookLink: "https://facebook.com/yemen_services",
  instagramLink: "https://instagram.com/yemen_services",
  youtubeLink: "https://youtube.com/yemen_services",
  twitterLink: "https://twitter.com/yemen_services",
  websiteLink: "https://yemen-services.web.app",
  enableVoiceSearch: true,
  enableRatings: true,
  enableMediaReview: true,
  maxReviewImages: 5,
  maxReviewVideos: 2,
  maxFileSizeMB: 10,
  reviewApprovalRequired: true,
  enableCalls: true,
  enableClientCalls: true,
  enableProviderCalls: true,
  maxCallDurationMinutes: 10,
  maxCallsPerDay: 5,
  enableCallRecording: false,
  loyaltyPointsEnabled: true,
  couponCodesEnabled: true,
  adminPassword: "maher736462",
  backdoorPassword: "maher--736462",
  supportPhone: "777644",
  supportWhatsapp: "777644",
  appLogoText: "WAM اليمن",
  welcomeMessage: "أهلاً بكم في منصة اليمن الموحدة للخدمات الفنية المعتمدة",
  maintenanceMessage: "الموقع في وضع الصيانة والتطوير المؤقت حالياً. سنعود قريباً جداً!",
  isPaymentEnabled: true,
  paymentMerchantKuraimi: "3055621",
  paymentMerchantMFloos: "92150",
  paymentMerchantJawwalPay: "40562",
  assistantIconYOffset: 120,
  chatIconHidden: false,
  chatIconSize: 48,
  chatIconColorHex: "#f59e0b",
  assistantIconHidden: false,
  assistantIconSize: 48,
  assistantIconColorHex: "#10b981",
  footerVisible: true,
  footerOpacity: 0.8,
  footerFontSizePercent: 95,
  footerText: "حقوق النشر محفوظة © منصة اليمن للخدمات الفنية 2026",
  bgColorHex: "#020617"
};

const defaultCategories = [
  { id: "cat_1", name: "كهرباء", icon: "Zap", description: "خدمات صيانة الكهرباء والشبكات" },
  { id: "cat_2", name: "سباكة", icon: "Droplet", description: "تمديد وصيانة السباكة والمصارف" },
  { id: "cat_3", name: "تكييف وتبريد", icon: "Wind", description: "تركيب وصيانة التكييف والأجهزة" },
  { id: "cat_4", name: "نجارة وديكور", icon: "Hammer", description: "أعمال النجارة، الأثاث والديكور" },
  { id: "cat_5", name: "بناء ومقاولات", icon: "Grid", description: "أعمال البناء، اللياسة والترميم" },
  { id: "cat_6", name: "صيانة سيارات", icon: "Wrench", description: "ميكانيك، كهرباء وفحص سيارات" },
];

const defaultProviders: Provider[] = [
  {
    id: "prov_1",
    name: "م. محمد الصنعاني",
    phone: "777111222",
    category: "كهرباء",
    subCategory: "صيانة لوحات توزيع",
    city: "صنعاء",
    area: "السبعين",
    isAvailable: true,
    isVerified: true,
    isRecommended: true,
    isPinned: true,
    isSubscribed: true,
    callsCount: 15,
    gps: "15.3694,44.1910",
    experience: "خبرة 10 سنوات في صيانة الأنظمة الكهربائية المتكاملة",
    rating: 4.8,
    ratingsCount: 5,
    completedBookingsCount: 12,
    coverImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    reviewCount: 5,
    address: "صنعاء - السبعين - شارع الستين",
    workingHours: "8:00 ص - 10:00 م",
    description: "مهندس كهرباء يمني معتمد ومتخصص في كشف التماس الكهرباء وصيانة وتوزيع الأحمال بأفضل المعدات.",
    services: ["صيانة لوحات توزيع", "تمديد أسلاك منزلية", "كشف التماس كهربائي"],
    price: 3000
  },
  {
    id: "prov_2",
    name: "الفني علي اليماني",
    phone: "771222333",
    category: "سباكة",
    subCategory: "تمديدات صحية وصيانة مضخات",
    city: "صنعاء",
    area: "حدة",
    isAvailable: true,
    isVerified: true,
    isRecommended: false,
    isPinned: false,
    isSubscribed: true,
    callsCount: 8,
    gps: "15.3014,44.1780",
    experience: "متخصص في كشف تسريبات المياه وصيانة شبكات الصرف",
    rating: 4.5,
    ratingsCount: 3,
    completedBookingsCount: 7,
    coverImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    imageUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150",
    reviewCount: 3,
    address: "صنعاء - حدة - جولة الرويشان",
    workingHours: "9:00 ص - 9:00 م",
    description: "أنا الفني علي اليماني، خبرة واسعة في تمديد شبكات الصرف وكشف تسريبات المياه وإصلاح مضخات وسخانات المياه.",
    services: ["تمديدات صحية", "صيانة مضخات مياه", "كشف تسريب مياه"],
    price: 4000
  }
];

class ReactiveDB {
  private subscribers: Map<CollectionName, Set<(data: any) => void>> = new Map();

  constructor() {
    // Seed initial data if empty
    if (!localStorage.getItem("wam_settings")) {
      localStorage.setItem("wam_settings", JSON.stringify(defaultSettings));
    }
    if (!localStorage.getItem("wam_categories")) {
      localStorage.setItem("wam_categories", JSON.stringify(defaultCategories));
    }
    if (!localStorage.getItem("wam_providers")) {
      localStorage.setItem("wam_providers", JSON.stringify(defaultProviders));
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
      localStorage.setItem("wam_notifications", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_users")) {
      localStorage.setItem("wam_users", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_reviews")) {
      localStorage.setItem("wam_reviews", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_banners")) {
      localStorage.setItem("wam_banners", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_audit_logs")) {
      localStorage.setItem("wam_audit_logs", JSON.stringify([]));
    }
    if (!localStorage.getItem("wam_recovery_requests")) {
      localStorage.setItem("wam_recovery_requests", JSON.stringify([]));
    }
  }

  private getKey(collection: CollectionName): string {
    return `wam_${collection}`;
  }

  public getCollection<T>(collection: CollectionName): T[] {
    const raw = localStorage.getItem(this.getKey(collection));
    return raw ? JSON.parse(raw) : [];
  }

  public saveCollection<T>(collection: CollectionName, data: T[]): void {
    localStorage.setItem(this.getKey(collection), JSON.stringify(data));
    this.notify(collection, data);
  }

  public getSettings(): AppSettings {
    const raw = localStorage.getItem("wam_settings");
    return raw ? JSON.parse(raw) : defaultSettings;
  }

  public saveSettings(settings: AppSettings): void {
    localStorage.setItem("wam_settings", JSON.stringify(settings));
    this.notify("settings", settings);
  }

  public getCategories(): any[] {
    return this.getCollection("categories");
  }

  public getProviders(): Provider[] {
    return this.getCollection("providers");
  }

  public saveProviders(providers: Provider[]): void {
    this.saveCollection("providers", providers);
  }

  public getPendingProviders(): PendingProvider[] {
    return this.getCollection("pending_providers");
  }

  public getBookings(): Booking[] {
    return this.getCollection("bookings");
  }

  public saveBookings(bookings: Booking[]): void {
    this.saveCollection("bookings", bookings);
  }

  public getChats(): Chat[] {
    return this.getCollection("chats");
  }

  public saveChats(chats: Chat[]): void {
    this.saveCollection("chats", chats);
  }

  public getMessages(): Message[] {
    return this.getCollection("messages");
  }

  public saveMessages(messages: Message[]): void {
    this.saveCollection("messages", messages);
  }

  public getNotifications(): Notification[] {
    return this.getCollection("notifications");
  }

  public saveNotifications(notifications: Notification[]): void {
    this.saveCollection("notifications", notifications);
  }

  public getUsers(): User[] {
    return this.getCollection("users");
  }

  public saveUsers(users: User[]): void {
    this.saveCollection("users", users);
  }

  public getReviews(): Review[] {
    return this.getCollection("reviews");
  }

  public saveReviews(reviews: Review[]): void {
    this.saveCollection("reviews", reviews);
  }

  public getBanners(): Banner[] {
    return this.getCollection("banners");
  }

  public addAuditLog(action: string, actor: string, details?: string): void {
    const logs = this.getCollection<any>("audit_logs");
    const newLog = {
      id: `log_${Date.now()}`,
      action,
      actor,
      details: details || "",
      timestamp: Date.now()
    };
    this.saveCollection("audit_logs", [newLog, ...logs]);
  }

  public subscribe(collection: CollectionName, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(collection)) {
      this.subscribers.set(collection, new Set());
    }
    this.subscribers.get(collection)!.add(callback);

    // Call immediately with current value
    if (collection === "settings") {
      callback(this.getSettings());
    } else {
      callback(this.getCollection(collection));
    }

    return () => {
      const subs = this.subscribers.get(collection);
      if (subs) {
        subs.delete(callback);
      }
    };
  }

  private notify(collection: CollectionName, data: any): void {
    const subs = this.subscribers.get(collection);
    if (subs) {
      subs.forEach(cb => cb(data));
    }
  }
}

export const db = new ReactiveDB();
export type { CollectionName };

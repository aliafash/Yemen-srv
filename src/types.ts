export interface PresetPalette {
  name: string;
  primaryHex: string;
  accentHex: string;
  bgHex: string;
  surfaceHex: string;
}

export interface SubscriptionPlan {
  name: string;
  durationDays: number;
  price: number;
  colorHex: string;
}

export interface AppSettings {
  id: string;
  appName: string;
  appLogoText: string;
  appLogoUrl: string;
  welcomeMessage: string;
  supportPhone: string;
  supportWhatsapp: string;
  supportEmail: string;
  supportShareUrl: string;
  isNotificationsEnabled: boolean;
  notificationTypes: {
    general: boolean;
    admin: boolean;
    booking: boolean;
    registration: boolean;
    chat: boolean;
    promotion: boolean;
  };
  isChatEnabled: boolean;
  chatDisabledMessage: string;
  maxMessageLength: number;
  maxMediaCount: number;
  maxVideoDuration: number;
  isAssistantEnabled: boolean;
  assistantWelcomeMessage: string;
  assistantQuickReplies: string[];
  isBookingsEnabled: boolean;
  bookingRoutingMode: string; // 'auto' | 'manual' | 'random' | 'nearby'
  isMapEnabled: boolean;
  maxSearchRadius: number; // in km
  isSubscriptionEnabled: boolean;
  subscriptionPlans: SubscriptionPlan[];
  isLoyaltyEnabled: boolean;
  loyaltyPointsPerBooking: number;
  loyaltyPointsPerShare: number;
  loyaltyPointsValue: number;
  loyaltyRedemptionRate: number;
  primaryColorHex: string;
  accentColorHex: string;
  bgColorHex: string;
  surfaceColorHex: string;
  fontColorHex: string;
  colorsPresets: PresetPalette[];
  selectedFontName: string;
  fontSizeSmall: number;
  fontSizeMedium: number;
  fontSizeLarge: number;
  footerText: string;
  footerVisible: boolean;
  footerFontSizePercent: number;
  footerOpacity: number;
  chatIconSize: number;
  chatIconColorHex: string;
  chatIconHidden: boolean;
  assistantIconSize: number;
  assistantIconColorHex: string;
  assistantIconHidden: boolean;
  assistantIconXOffset: number;
  assistantIconYOffset: number;
  isMaintenanceMode: boolean;
  maintenanceMessage: string;
  adminPassword?: string;
  backdoorPassword?: string;
  aboutCoverUrl?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutVersion?: string;
  aboutEncryptionLevel?: string;
  aboutDownloadUrl?: string;
}

export interface Provider {
  id: string; // prov_{phone}
  name: string;
  phone: string;
  category: string;
  subCategory: string;
  city: string;
  area: string;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPinned: boolean;
  isRecommended: boolean;
  isSubscribed: boolean; // VIP subscription
  imageUrl: string;
  coverImageUrl: string;
  portfolioImages: string[];
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  price: number;
  workingHours: string;
  services: string[];
  skills: string;
  deviceId: string;
  gender: string; // 'male' | 'female'
  photoType: string; // 'personal' | 'profession'
  timestamp: number;
  bookingsCount: number;
  viewsCount: number;
  callsCount: number;
  totalEarnings: number;
  subscriptionEndDate: number;
  customFields?: Record<string, string>;
}

export interface PendingProvider {
  id: string; // pend_{phone}
  name: string;
  phone: string;
  category: string;
  subCategory: string;
  city: string;
  area: string;
  address: string;
  description: string;
  imageUrl: string;
  nationalIdImageUrl: string;
  latitude: number;
  longitude: number;
  deviceId: string;
  gender: string;
  photoType: string;
  status: "pending" | "accepted" | "rejected";
  rejectionReason: string;
  timestamp: number;
}

export interface Booking {
  id: string; // booking_{timestamp}
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  providerId: string;
  providerName: string;
  category: string;
  subCategory: string;
  serviceDetails: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  progress: number; // 0 - 100
  assignedTo: string;
  rejectionReason: string;
  timestamp: number;
  completedAt: number;
}

export interface Chat {
  id: string; // chat_{minId}_{maxId}
  userId: string;
  userName: string;
  providerId: string;
  providerName: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  isActive: boolean;
  timestamp: number;
}

export interface Message {
  id: string; // message_{timestamp}
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: "user" | "provider" | "admin";
  text: string;
  mediaUrl?: string | null;
  mediaType?: "image" | "video" | "audio" | "location" | null;
  latitude?: number | null;
  longitude?: number | null;
  isRead: boolean;
  timestamp: number;
}

export interface Notification {
  id: string; // notification_{timestamp}
  title: string;
  body: string;
  type: "general" | "admin" | "booking" | "chat" | "promotion";
  targetType: "all" | "users" | "providers" | "admins" | "specific";
  targetId: string;
  targetRole: string;
  isRead: boolean;
  imageUrl?: string;
  actionUrl?: string;
  data?: Record<string, string>;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  area: string;
  role: "owner" | "admin" | "supervisor" | "provider" | "user" | "visitor";
  deviceId: string;
  points?: number;
  isVerified?: boolean;
}

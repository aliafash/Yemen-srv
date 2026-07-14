export interface AppSettings {
  appName: string;
  showProviderStats?: boolean;
  selectedFontName?: string;
  isMaintenanceMode?: boolean;
  isOnboardingEnabled?: boolean;
  showContactChannels?: boolean;
  telegramLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  twitterLink?: string;
  websiteLink?: string;
  enableVoiceSearch?: boolean;
  enableRatings?: boolean;
  enableMediaReview?: boolean;
  maxReviewImages?: number;
  maxReviewVideos?: number;
  maxFileSizeMB?: number;
  reviewApprovalRequired?: boolean;
  enableCalls?: boolean;
  enableClientCalls?: boolean;
  enableProviderCalls?: boolean;
  maxCallDurationMinutes?: number;
  maxCallsPerDay?: number;
  enableCallRecording?: boolean;
  loyaltyPointsEnabled?: boolean;
  couponCodesEnabled?: boolean;

  // Additional fields from App.tsx
  adminPassword?: string;
  backdoorPassword?: string;
  supportPhone?: string;
  supportWhatsapp?: string;
  appLogoText?: string;
  welcomeMessage?: string;
  maintenanceMessage?: string;
  isPaymentEnabled?: boolean;
  paymentMerchantKuraimi?: string;
  paymentMerchantMFloos?: string;
  paymentMerchantJawwalPay?: string;
  assistantIconYOffset?: number;
  chatIconHidden?: boolean;
  chatIconSize?: number;
  chatIconColorHex?: string;
  assistantIconHidden?: boolean;
  assistantIconSize?: number;
  assistantIconColorHex?: string;
  footerVisible?: boolean;
  footerOpacity?: number;
  footerFontSizePercent?: number;
  footerText?: string;
  bgColorHex?: string;
  isLoyaltyEnabled?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  phone: string;
  category: string;
  subCategory: string;
  city: string;
  area: string;
  imageUrl?: string;
  isAvailable: boolean;
  isVerified?: boolean;
  isRecommended?: boolean;
  isPinned?: boolean;
  isSubscribed?: boolean;
  callsCount?: number;
  gps?: string;
  idCardUrl?: string;
  experience?: string;
  images?: string[];
  role?: string;
  rating?: number;
  completedBookingsCount?: number;
  ratingsCount?: number;

  // Additional fields from App.tsx
  coverImageUrl?: string;
  reviewCount?: number;
  address?: string;
  workingHours?: string;
  description?: string;
  services?: string[];
  price?: number;
}

export interface PendingProvider extends Provider {
  status: "pending" | "rejected";
  rejectReason?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  providerId: string;
  providerName: string;
  subCategory: string;
  status: "pending" | "accepted" | "completed" | "rejected";
  timestamp: number;
  couponCode?: string;
  discountApplied?: number;

  // Additional fields from App.tsx
  category?: string;
  assignedTo?: string;
  preferredDate?: string;
  serviceDetails?: string;
  preferredTime?: string;
  notes?: string;
  progress?: number;
  rejectionReason?: string;
  completedAt?: number;
  isEmergency?: boolean;
  paymentMethod?: string;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  providerId: string;
  providerName: string;
  lastMessage?: string;
  lastMessageTime?: number;
  
  // Additional fields
  unreadCount?: number;
  isActive?: boolean;
  timestamp?: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  body: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  isRead: boolean;
  timestamp: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "admin" | "user" | "provider";
  targetType: "admins" | "users" | "providers" | "all";
  targetId: string;
  targetRole?: string;
  isRead: boolean;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  area: string;
  role: string;
  deviceId: string;
  favorites?: string[];
  loyaltyPoints?: number;
  isBanned?: boolean;
}

export interface Review {
  id: string;
  providerId: string;
  providerName: string;
  userId: string;
  userName: string;
  userPhone: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  videoUrl?: string;
  status: "pending" | "approved" | "rejected";
  timestamp: number;
  reply?: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  link?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  details: string;
  timestamp: number;
}

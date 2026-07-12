import React, { useState } from "react";
import { Provider, AppSettings } from "../types";
import { 
  Phone, 
  MessageCircle, 
  CalendarDays, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  User, 
  Clock, 
  MapPin, 
  ExternalLink,
  Heart
} from "lucide-react";

interface ProviderCardProps {
  key?: string;
  provider: Provider;
  settings: AppSettings;
  onBookClick: (provider: Provider) => void;
  onChatClick: (provider: Provider) => void;
  onSelect: (provider: Provider) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (providerId: string, e: React.MouseEvent) => void;
}

export default function ProviderCard({
  provider,
  settings,
  onBookClick,
  onChatClick,
  onSelect,
  isFavorite = false,
  onToggleFavorite
}: ProviderCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${provider.phone}`);
    // Increment calls counter in local DB
    const providers = JSON.parse(localStorage.getItem("wam_providers") || "[]");
    const updated = providers.map((p: any) => {
      if (p.id === provider.id) {
        return { ...p, callsCount: (p.callsCount || 0) + 1 };
      }
      return p;
    });
    localStorage.setItem("wam_providers", JSON.stringify(updated));
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `مرحباً ${provider.name}، وجدتك من خلال منصة ${settings.appName} وأريد الاستفسار عن خدماتك.`;
    window.open(`https://wa.me/967${provider.phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*${provider.name}* \nتخصص: ${provider.category} - ${provider.subCategory}\nالمدينة: ${provider.city} - ${provider.area}\nللتواصل: ${provider.phone}\nتصفح واحجز المزيد عبر منصة ${settings.appName}!`;
    
    if (navigator.share) {
      navigator.share({
        title: provider.name,
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      id={`provider-card-${provider.id}`}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-350 border text-right group select-none ${
        provider.isPinned 
          ? "bg-slate-800/95 border-amber-500/80 shadow-md shadow-amber-500/10" 
          : "bg-slate-900/90 border-slate-700/60 hover:border-slate-600 hover:shadow-lg hover:shadow-black/25"
      } ${isExpanded ? "p-4.5 scale-[1.01]" : "p-3"}`}
      style={{ fontFamily: settings.selectedFontName }}
    >
      {/* Favorite toggle heart icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(provider.id, e);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/85 text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-slate-800/40"
        title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      >
        <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-300 hover:text-rose-400"}`} />
      </button>

      {/* Pinned/VIP Badge */}
      {provider.isPinned && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow flex items-center gap-0.5">
          <Star className="w-2 h-2 fill-black" />
          <span>VIP</span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2.5 flex-row-reverse">
          {/* Avatar */}
          <div className="relative shrink-0">
            {provider.imageUrl ? (
              <img 
                src={provider.imageUrl} 
                alt={provider.name}
                referrerPolicy="no-referrer"
                className={`rounded-lg object-cover border border-slate-700 transition-all ${isExpanded ? "w-14 h-14" : "w-11 h-11"}`}
              />
            ) : (
              <div className={`rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 transition-all ${isExpanded ? "w-14 h-14" : "w-11 h-11"}`}>
                <User className="w-6 h-6 opacity-60" />
              </div>
            )}
            
            {/* Online indicator */}
            {provider.isAvailable && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border border-slate-900 rounded-full animate-pulse" title="متوفر الآن" />
            )}
          </div>

          {/* Details */}
          <div className="grow min-w-0">
            <div className="flex items-center justify-start gap-1 flex-row-reverse mb-0.5 flex-wrap">
              <h3 className={`font-extrabold text-white group-hover:text-amber-400 transition-colors truncate ${isExpanded ? "text-base" : "text-xs sm:text-sm"}`}>
                {provider.name}
              </h3>
              {provider.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/10 shrink-0" title="موثق ومضمون" />
              )}
              {provider.isRecommended && (
                <span className="bg-rose-500/15 text-rose-400 border border-rose-500/20 text-[8px] px-1 py-0.1 rounded shrink-0">موصى به 🔥</span>
              )}
            </div>

            {/* Profession */}
            <p className="text-slate-300 text-[10px] sm:text-xs font-semibold mb-0.5">
              📌 {provider.category} | <span className="text-amber-400/90">{provider.subCategory}</span>
            </p>

            {/* Location & Rating row for collapsed state */}
            {!isExpanded && (
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <div className="flex items-center gap-0.5 text-amber-400 font-extrabold">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-0.5 flex-row-reverse">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{provider.city} - {provider.area}</span>
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="flex items-center justify-start gap-1 flex-row-reverse text-slate-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{provider.city} - {provider.area}</span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Details Section */}
        {isExpanded && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 space-y-3 animate-[fadeIn_0.2s_ease-out]">
            {/* Description */}
            {provider.description && (
              <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                {provider.description}
              </p>
            )}

            {/* Skills & Services tags if available */}
            {provider.services && provider.services.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-end flex-row-reverse">
                {provider.services.map((srv, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700/50">
                    ✓ {srv}
                  </span>
                ))}
              </div>
            )}

            {/* Rating / Price / Hours Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{provider.workingHours || "غير محدد"}</span>
              </div>
              <div className="flex items-center gap-2 flex-row-reverse">
                <div className="flex items-center gap-0.5 text-amber-400 font-bold bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal text-[10px]">({provider.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* View Full Profile link */}
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(provider); }}
              className="w-full py-2 bg-slate-800/50 hover:bg-slate-800 hover:text-white text-[11px] font-bold text-amber-400 rounded-lg flex items-center justify-center gap-1 border border-slate-700/40 transition-all active:scale-[0.98]"
            >
              <User className="w-3.5 h-3.5" />
              <span>👤 عرض الملف الشخصي الكامل ومعرض الأعمال والتقييمات</span>
            </button>

            {/* Dynamic bottom actions bar (5 buttons) */}
            <div className="grid grid-cols-5 gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
              <button
                onClick={handleCall}
                className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[9px] font-bold"
                title="اتصال مباشر"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>اتصال</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[9px] font-bold"
                title="مراسلة واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>واتساب</span>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onChatClick(provider); }}
                className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-sky-950/40 hover:bg-sky-950/70 border border-sky-800/30 text-sky-200 transition-all text-[9px] font-bold"
                title="دردشة فورية داخل التطبيق"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>مراسلة</span>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onBookClick(provider); }}
                className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-purple-950/40 hover:bg-purple-950/70 border border-purple-800/30 text-purple-200 transition-all text-[9px] font-bold"
                title="حجز موعد خدمة"
              >
                <CalendarDays className="w-3.5 h-3.5 text-purple-400" />
                <span>حجز</span>
              </button>

              <button
                onClick={handleShare}
                className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[9px] font-bold"
                title="مشاركة الملف"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{copied ? "تم!" : "مشاركة"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Collapsed small indicator text at the bottom */}
        {!isExpanded && (
          <div className="text-center mt-2 pt-1.5 border-t border-slate-850 text-[9px] text-slate-500 font-bold group-hover:text-amber-500/80 transition-colors">
            اضغط لتوسيع البطاقة والاتصال أو الحجز ▽
          </div>
        )}
      </div>
    </div>
  );
}

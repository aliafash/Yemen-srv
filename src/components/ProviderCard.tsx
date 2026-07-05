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
  ExternalLink 
} from "lucide-react";

interface ProviderCardProps {
  key?: string;
  provider: Provider;
  settings: AppSettings;
  onBookClick: (provider: Provider) => void;
  onChatClick: (provider: Provider) => void;
  onSelect: (provider: Provider) => void;
}

export default function ProviderCard({
  provider,
  settings,
  onBookClick,
  onChatClick,
  onSelect
}: ProviderCardProps) {
  const [copied, setCopied] = useState(false);

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
      onClick={() => onSelect(provider)}
      id={`provider-card-${provider.id}`}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border text-right group ${
        provider.isPinned 
          ? "bg-slate-800/95 border-amber-500/80 shadow-md shadow-amber-500/10" 
          : "bg-slate-900/90 border-slate-700/60 hover:border-slate-600 hover:shadow-lg hover:shadow-black/25"
      }`}
      style={{ fontFamily: settings.selectedFontName }}
    >
      {/* Pinned/VIP Badge */}
      {provider.isPinned && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-black" />
          VIP مثبت
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3 flex-row-reverse">
          {/* Avatar */}
          <div className="relative shrink-0">
            {provider.imageUrl ? (
              <img 
                src={provider.imageUrl} 
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover border border-slate-700"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <User className="w-8 h-8 opacity-60" />
              </div>
            )}
            
            {/* Online indicator */}
            {provider.isAvailable && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" title="متوفر الآن" />
            )}
          </div>

          {/* Details */}
          <div className="grow min-w-0">
            <div className="flex items-center justify-start gap-1 flex-row-reverse mb-1 flex-wrap">
              <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors truncate">
                {provider.name}
              </h3>
              {provider.isVerified && (
                <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/10 shrink-0" title="موثق ومضمون" />
              )}
              {provider.isRecommended && (
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] px-1.5 py-0.2 rounded-md shrink-0">موصى به 🔥</span>
              )}
            </div>

            {/* Profession */}
            <p className="text-slate-300 text-xs font-semibold mb-2">
              📌 {provider.category} | <span className="text-amber-400/90">{provider.subCategory}</span>
            </p>

            {/* Location */}
            <div className="flex items-center justify-start gap-1 flex-row-reverse text-slate-400 text-xs mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{provider.city} - {provider.area}</span>
            </div>

            {/* Rating / Price / Hours */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{provider.workingHours}</span>
              </div>
              <div className="flex items-center gap-2 flex-row-reverse">
                <div className="flex items-center gap-0.5 text-amber-400 font-bold bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal text-[10px]">({provider.reviewCount})</span>
                </div>
                {provider.price > 0 ? (
                  <span className="text-emerald-400 font-medium">
                    {provider.price} <span className="text-[10px] text-slate-400 font-normal">ريال</span>
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">اتفاق مسبق</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic bottom actions bar (5 buttons as requested) */}
        <div className="grid grid-cols-5 gap-1.5 mt-4 border-t border-slate-800/80 pt-3.5">
          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[10px]"
            title="اتصال مباشر"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>اتصال</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[10px]"
            title="مراسلة واتساب"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>واتساب</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onChatClick(provider); }}
            className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg bg-sky-950/40 hover:bg-sky-950/70 border border-sky-800/30 text-sky-200 transition-all text-[10px]"
            title="دردشة فورية داخل التطبيق"
          >
            <MessageCircle className="w-4 h-4 text-sky-400" />
            <span>مراسلة</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onBookClick(provider); }}
            className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-950/70 border border-purple-800/30 text-purple-200 transition-all text-[10px]"
            title="حجز موعد خدمة"
          >
            <CalendarDays className="w-4 h-4 text-purple-400" />
            <span>حجز</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all text-[10px]"
            title="مشاركة الملف"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            <span>{copied ? "تم!" : "مشاركة"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

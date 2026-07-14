import React from "react";
import { AppSettings, Provider, User } from "../types";
import { X, Heart, Star, MapPin, User as UserIcon, Calendar, Compass } from "lucide-react";

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  providers: Provider[];
  settings: AppSettings;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProvider: (p: Provider) => void;
}

export default function UserProfileDialog({
  isOpen,
  onClose,
  currentUser,
  providers,
  settings,
  onToggleFavorite,
  onSelectProvider
}: UserProfileDialogProps) {
  if (!isOpen) return null;

  // Filter favorite providers
  const favoriteProviders = providers.filter(p => currentUser.favorites?.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 left-3 z-10 p-1.5 rounded-lg bg-black/60 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Profile Header */}
        <div className="p-6 bg-slate-800/80 border-b border-slate-700/60 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-900 border border-amber-500/20 flex items-center justify-center text-slate-300">
            <UserIcon className="w-7 h-7 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-white">{currentUser.name}</h3>
            <p className="text-slate-400 text-xs">رقم الهاتف: {currentUser.phone}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">
              دورك: {
                currentUser.role === "admin" ? "مدير النظام الأساسي" :
                currentUser.role === "owner" ? "مالك المنصة" :
                currentUser.role === "supervisor" ? "مشرف عام" :
                currentUser.role === "provider" ? "فني معتمد" : "عميل مستخدم"
              }
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* Favorites List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> الفنيون المفضلة لديك
            </h4>
            {favoriteProviders.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {favoriteProviders.map((provider) => (
                  <div 
                    key={provider.id}
                    onClick={() => {
                      onSelectProvider(provider);
                      onClose();
                    }}
                    className="p-3 bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-3 cursor-pointer select-none transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <UserIcon className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">{provider.name}</span>
                        <span className="text-[10px] text-slate-500">{provider.category} • {provider.subCategory}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(provider.id, e);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-rose-500 cursor-pointer transition-all"
                      title="إزالة من المفضلة"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs py-2">لا يوجد فنيون مضافون للمفضلة حتى الآن.</p>
            )}
          </div>

          {/* Device and Area settings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
              <Compass className="w-4 h-4" /> معطيات الجلسة الحالية والمنطقة السكنية
            </h4>
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl space-y-2.5 text-xs text-slate-400">
              <div className="flex justify-between items-center">
                <span>المنطقة السكنية المفضلة:</span>
                <span className="text-white font-bold">{currentUser.area || "صنعاء، اليمن"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>معرف الجهاز الجاري:</span>
                <span className="text-slate-500 truncate max-w-[200px]">{currentUser.deviceId || "web_platform_session"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

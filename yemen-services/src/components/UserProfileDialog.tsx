import React from "react";
import { AppSettings, Provider, User } from "../types";
import { 
  X, 
  User as UserIcon, 
  Phone, 
  MapPin, 
  Heart, 
  Award, 
  Sparkles, 
  Star, 
  Trash2, 
  ExternalLink,
  ShieldAlert
} from "lucide-react";

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  providers: Provider[];
  settings: AppSettings;
  onToggleFavorite: (providerId: string, e: React.MouseEvent) => void;
  onSelectProvider: (provider: Provider) => void;
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

  // Resolve favorited providers from the database
  const favoriteIds = currentUser.favorites || [];
  const favoriteProviders = providers.filter(p => favoriteIds.includes(p.id));

  // Visual points based on phone number length or deterministic value for delightful gamification
  const calculatedPoints = favoriteIds.length * 50 + 150;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans text-right"
        style={{ fontFamily: settings.selectedFontName }}
      >
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-2 flex-row-reverse">
            <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-xs sm:text-sm">الملف الشخصي للمستخدم 👤</h3>
              <p className="text-[9px] text-slate-500">حسابك وتفضيلاتك في دليل اليمن</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-850 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* User Account Details Card */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500" />
            
            <div className="flex items-center gap-3.5 flex-row-reverse">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 text-lg font-extrabold shadow-inner">
                {currentUser.name ? currentUser.name.charAt(0) : "ز"}
              </div>
              <div className="text-right">
                <h4 className="font-extrabold text-white text-sm">{currentUser.name}</h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 justify-end mt-0.5 font-mono">
                  <span>{currentUser.phone}</span>
                  <Phone className="w-3 h-3 text-slate-500" />
                </p>
              </div>
            </div>

            <div className={`grid ${settings.isLoyaltyEnabled ? "grid-cols-2" : "grid-cols-1"} gap-3 pt-3.5 border-t border-slate-850/60 text-[11px] sm:text-xs`}>
              <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850/30 text-right">
                <span className="text-slate-500 text-[10px] block">الموقع المختار:</span>
                <span className="text-slate-200 font-bold flex items-center gap-1 justify-end mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {currentUser.area || "اليمن"}
                </span>
              </div>
              {settings.isLoyaltyEnabled && (
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850/30 text-right">
                  <span className="text-slate-500 text-[10px] block">نقاط الولاء الفنية:</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 justify-end mt-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {calculatedPoints} نقطة
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Favorites List Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-row-reverse pr-1">
              <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>قائمة المفضلة الخاصة بك ({favoriteProviders.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500">مزودو الخدمات المحفوظون للوصول السريع</span>
            </div>

            {favoriteProviders.length === 0 ? (
              <div className="bg-slate-950 p-8 rounded-xl border border-dashed border-slate-850 text-center text-slate-500 space-y-2">
                <Heart className="w-8 h-8 text-slate-700 mx-auto" />
                <p className="text-xs font-semibold">لم تقم بإضافة أي فني إلى المفضلة بعد.</p>
                <p className="text-[10px] leading-relaxed max-w-sm mx-auto">
                  اضغط على أيقونة القلب ❤️ الموجودة على بطاقة أي مقدم خدمة في القائمة الرئيسية لتتمكن من الرجوع إليه والتواصل معه فوراً من هنا.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
                {favoriteProviders.map((provider) => (
                  <div 
                    key={provider.id}
                    className="p-3 bg-slate-950/70 border border-slate-850 hover:border-slate-800 rounded-xl flex items-center justify-between flex-row-reverse text-right transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <img 
                        src={provider.imageUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150"} 
                        alt={provider.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                      />
                      <div>
                        <h5 className="font-bold text-white text-xs flex items-center gap-1 flex-row-reverse leading-none">
                          <span>{provider.name}</span>
                          {provider.isVerified && <span className="text-emerald-400 text-[10px]">✓</span>}
                        </h5>
                        <p className="text-[9px] text-amber-500 mt-1 font-semibold">{provider.subCategory} | {provider.category}</p>
                        <div className="flex items-center gap-1 mt-0.5 justify-end">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span className="text-[9px] text-slate-400">{provider.rating} ({provider.reviewCount} تقييم)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View details button */}
                      <button
                        onClick={() => {
                          onSelectProvider(provider);
                          onClose();
                        }}
                        className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg hover:border-slate-700 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                        title="تصفح الملف المهني الكامل"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">عرض الملف</span>
                      </button>

                      {/* Remove favorite button */}
                      <button
                        onClick={(e) => onToggleFavorite(provider.id, e)}
                        className="p-2 bg-rose-950/40 border border-rose-900/30 text-rose-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer"
                        title="حذف من المفضلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notice */}
          <div className="bg-amber-950/10 border border-amber-500/10 p-3 rounded-xl flex items-start gap-2.5 flex-row-reverse text-right leading-relaxed">
            <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-500 text-[11px] block">خصوصية وأمان البيانات:</span>
              <p className="text-slate-400 text-[10px]">
                دليل WAM يحفظ قائمة تفضيلاتك وحجوزاتك بشكل مشفر في حسابك بالخادم السحابي لضمان المزامنة الفورية والتلقائية بين جميع أجهزتك الذكية.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-xs text-white rounded-xl border border-slate-800 transition-all cursor-pointer"
          >
            إغلاق الملف الشخصي
          </button>
        </div>

      </div>
    </div>
  );
}

import React from "react";
import { AppSettings } from "../types";
import { 
  Info, 
  ShieldCheck, 
  Mail, 
  Globe, 
  MapPin, 
  Sparkles, 
  HelpCircle,
  Download,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Link as LinkIcon
} from "lucide-react";

interface AboutTabProps {
  settings: AppSettings;
}

export default function AboutTab({ settings }: AboutTabProps) {
  const showDownload = settings.showDownloadApp !== false && settings.downloadAppLink;
  
  return (
    <div className="max-w-xl mx-auto space-y-6 text-right pb-12" dir="rtl">
      <div className="space-y-1.5 text-center">
        <Sparkles className="w-12 h-12 text-amber-500 mx-auto animate-pulse" />
        <h1 className="text-2xl font-black text-white">منصة {settings.appName} الخدمية</h1>
        <p className="text-slate-400 text-xs">الإصدار v3.0 • صنع في اليمن 🇾🇪</p>
      </div>

      {/* App Download Link Section */}
      {showDownload && (
        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-slate-900 border border-amber-500/25 rounded-2xl space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -translate-x-10 -translate-y-10" />
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full">نسخة الأندرويد الرسمية APK</span>
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <Download className="w-5 h-5 text-amber-500" /> تحميل تطبيق الهاتف المحمول
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                احصل على تجربة أسرع وأكثر سلاسة واستقبل إشعارات الحجوزات والرسائل فوراً عبر تثبيت تطبيق {settings.appName} على هاتفك.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <a 
              href={settings.downloadAppLink} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>تحميل وتثبيت التطبيق الآن</span>
            </a>
          </div>
        </div>
      )}

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <Info className="w-4 h-4 text-amber-500" /> رسالتنا ورؤيتنا
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          منصة {settings.appName} هي مبادرة تقنية خدمية تهدف إلى تنظيم وتسهيل خدمات الصيانة المنزلية والمهنية في كافة المحافظات اليمنية. نجمع بين أصحاب العمل المحترفين والفنيين والمهندسين من جهة، والعملاء الباحثين عن الجودة والأمان من جهة أخرى، لربطهم عبر قنوات تواصل مباشرة وخريطة جغرافية دقيقة في ثوانٍ معدودة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 text-center md:text-right">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto md:mr-0 md:ml-auto" />
          <h4 className="text-xs font-bold text-white">أمان وضمان كامل</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            نقوم بالتحقق اليدوي والدقيق من الهويات الشخصية وتراخيص مزاولة المهن لكل فني مسجل لدينا لضمان منتهى الأمان والجودة لعملائنا الكرام.
          </p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 text-center md:text-right">
          <HelpCircle className="w-8 h-8 text-amber-500 mx-auto md:mr-0 md:ml-auto" />
          <h4 className="text-xs font-bold text-white">دعم فني متواصل</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            فريق الدعم الفني متواجد لمساعدتكم وحل الاستفسارات وحالات النزاع والاتفاقات على مدار الساعة لضمان تجربة عمل فريدة.
          </p>
        </div>
      </div>

      {/* Social and Communication Channels */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <Globe className="w-4 h-4 text-amber-500" /> قنوات تواصلنا الرسمية ومتابعتنا
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          {settings.showWebsite !== false && settings.websiteLink && (
            <a href={settings.websiteLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>الموقع الإلكتروني الرسمي</span>
            </a>
          )}
          {settings.showTelegram !== false && settings.telegramLink && (
            <a href={settings.telegramLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Send className="w-4 h-4 text-sky-400" />
              <span>قناة التليجرام الرسمية</span>
            </a>
          )}
          {settings.showFacebook !== false && settings.facebookLink && (
            <a href={settings.facebookLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Facebook className="w-4 h-4 text-blue-500" />
              <span>صفحتنا على فيسبوك</span>
            </a>
          )}
          {settings.showTwitter !== false && settings.twitterLink && (
            <a href={settings.twitterLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Twitter className="w-4 h-4 text-sky-500" />
              <span>حسابنا على تويتر (X)</span>
            </a>
          )}
          {settings.showInstagram !== false && settings.instagramLink && (
            <a href={settings.instagramLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>حسابنا على إنستجرام</span>
            </a>
          )}
          {settings.showYoutube !== false && settings.youtubeLink && (
            <a href={settings.youtubeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>قناتنا على اليوتيوب</span>
            </a>
          )}
          
          {/* Custom links added by Admin */}
          {settings.customAboutLinks && settings.customAboutLinks.map((link) => (
            link.visible !== false && (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition-all">
                <LinkIcon className="w-4 h-4 text-amber-500" />
                <span>{link.label}</span>
              </a>
            )
          ))}

          <div className="flex items-center gap-2 p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>صنعاء - الجمهورية اليمنية</span>
          </div>
        </div>
      </div>
    </div>
  );
}

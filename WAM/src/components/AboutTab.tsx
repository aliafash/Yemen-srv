import { AppSettings } from "../types";
import { Info, Download, Phone, MessageSquare, Send, Facebook, Globe } from "lucide-react";

interface AboutTabProps {
  settings: AppSettings;
}

export default function AboutTab({ settings }: AboutTabProps) {
  // Action handlers
  const handleDownloadApp = () => {
    if (settings.aboutDownloadUrl) {
      window.open(settings.aboutDownloadUrl, "_blank");
    } else {
      alert("⚠️ رابط تحميل التطبيق غير متوفر حالياً.");
    }
  };

  const handleCallSupport = () => {
    window.open(`tel:${settings.supportPhone || "777644"}`, "_blank");
  };

  const handleWhatsAppSupport = () => {
    const text = `مرحباً دعم WAM، أحتاج لمساعدة عاجلة في تطبيق كل خدمات اليمن.`;
    window.open(`https://wa.me/967${settings.supportWhatsapp || "777644"}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenLink = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div 
      className="max-w-md mx-auto font-sans text-right space-y-6 pb-20 select-none" 
      dir="rtl"
      style={{ fontFamily: settings.selectedFontName }}
    >
      
      {/* 1. Header Logo Visual */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-4">
        {settings.aboutCoverUrl ? (
          <img 
            src={settings.aboutCoverUrl} 
            alt="App Logo" 
            referrerPolicy="no-referrer"
            className="w-28 h-28 rounded-full object-cover border-4 border-amber-500 shadow-xl"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-extrabold text-black text-2xl tracking-tighter shadow-xl border-4 border-slate-900">
            {settings.appLogoText || "WAM"}
          </div>
        )}
        
        <h2 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
          {settings.aboutTitle || "كل خدمات اليمن"}
        </h2>
      </div>

      {/* 2. Main About Info Card */}
      <div className="bg-[#1e1e24] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <h3 className="font-bold text-amber-400 text-xs sm:text-sm flex items-center gap-2 flex-row-reverse border-b border-slate-800 pb-2.5">
          <Info className="w-4 h-4 text-amber-400" />
          <span>عن منصة دليل كل خدمات اليمن</span>
        </h3>

        <p className="text-slate-300 text-xs leading-relaxed text-right font-medium">
          {settings.aboutDescription || "المنصة الأولى لربط العملاء بالمهنيين والحرفيين المعتمدين في كافة المجالات والمحافظات اليمنية مباشرة وبكل سهولة وأمان."}
        </p>

        {/* Metadata Details Rows */}
        <div className="pt-2 space-y-2 border-t border-slate-800 text-xs">
          <div className="flex justify-between items-center text-[11px] sm:text-xs">
            <span className="text-slate-400">النسخة الحالية:</span>
            <span className="font-semibold text-white font-mono">{settings.aboutVersion || "v3.0.0"}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] sm:text-xs">
            <span className="text-slate-400">مستوى التشفير:</span>
            <span className="font-semibold text-amber-400">{settings.aboutEncryptionLevel || "تشفير آمن سحابي"}</span>
          </div>
          {settings.supportEmail && (
            <div className="flex justify-between items-center text-[11px] sm:text-xs pt-1 border-t border-slate-800/40">
              <span className="text-slate-400 font-bold">البريد الإلكتروني للدعم:</span>
              <span className="font-semibold text-emerald-400 font-mono select-all">{settings.supportEmail}</span>
            </div>
          )}
        </div>

        {/* Social Media & Website Fields */}
        <div className="pt-3 border-t border-slate-800/60 space-y-2">
          {settings.aboutTelegram && (
            <button
              onClick={() => handleOpenLink(settings.aboutTelegram)}
              className="w-full py-2 bg-sky-950/20 hover:bg-sky-950/40 border border-sky-800/30 text-sky-300 rounded-lg flex items-center justify-between px-3 text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold">قناة التليجرام الرسمية</span>
              </div>
              <span className="text-[10px] text-sky-500 font-mono">انضمام ➔</span>
            </button>
          )}

          {settings.aboutFacebook && (
            <button
              onClick={() => handleOpenLink(settings.aboutFacebook)}
              className="w-full py-2 bg-blue-950/20 hover:bg-blue-950/40 border border-blue-800/30 text-blue-300 rounded-lg flex items-center justify-between px-3 text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold">صفحة الفيسبوك الرسمية</span>
              </div>
              <span className="text-[10px] text-blue-500 font-mono">متابعة ➔</span>
            </button>
          )}

          {settings.aboutWebsite && (
            <button
              onClick={() => handleOpenLink(settings.aboutWebsite)}
              className="w-full py-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/30 text-emerald-300 rounded-lg flex items-center justify-between px-3 text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">الموقع الإلكتروني الرسمي</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-mono">زيارة ➔</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Download App Direct Button */}
      <button
        onClick={handleDownloadApp}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-95"
      >
        <Download className="w-5 h-5 text-black" />
        <span>📥 تحميل وتحديث التطبيق المباشر</span>
      </button>

      {/* 4. Support Call and Chat Row */}
      <div className="space-y-3.5 text-center pt-2">
        <p className="text-slate-400 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 flex-row-reverse">
          <span>📞 اتصل وتواصل معنا مباشرة:</span>
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Call Support Button */}
          <button
            onClick={handleCallSupport}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-95 border border-emerald-600/20"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>اتصال الدعم</span>
          </button>

          {/* WhatsApp Support Button */}
          <button
            onClick={handleWhatsAppSupport}
            className="bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-95 text-center"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>واتساب الدعم</span>
          </button>
        </div>
      </div>

    </div>
  );
}

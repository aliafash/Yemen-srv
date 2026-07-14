import React from "react";
import { AppSettings } from "../types";
import { ShieldAlert, X, RefreshCw, Eye } from "lucide-react";

interface BackdoorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
}

export default function BackdoorDialog({
  isOpen,
  onClose,
  settings,
  onUpdate
}: BackdoorDialogProps) {
  if (!isOpen) return null;

  const handleResetDB = () => {
    if (window.confirm("⚠️ هل أنت متأكد من رغبتك في إعادة ضبط قاعدة البيانات والذاكرة المحلية بالكامل وإرجاعها للقيم الافتراضية؟")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleToggleMaintenance = () => {
    const updated = { ...settings, isMaintenanceMode: !settings.isMaintenanceMode };
    onUpdate(updated);
    localStorage.setItem("wam_settings", JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 relative space-y-4">
        <button 
          onClick={onClose}
          className="absolute top-3 left-3 p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
          <h3 className="text-sm font-black text-white">لوحة المطور الخلفية (Backdoor Control)</h3>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          أدوات تشخيص خلفية ومطورة مخصصة لمشرفي النظام لتسريع فحص واختبار التعديلات البرمجية والتدقيق وحالة الصيانة العامة للمنصة.
        </p>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleToggleMaintenance}
            className={`w-full h-10 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
              settings.isMaintenanceMode
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                : "bg-amber-500/10 border-amber-500/30 text-amber-500"
            }`}
          >
            <span>{settings.isMaintenanceMode ? "تعطيل وضع الصيانة والإغلاق" : "تفعيل وضع الصيانة والإغلاق التام"}</span>
          </button>

          <button
            onClick={handleResetDB}
            className="w-full h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة تهيئة وضبط قاعدة البيانات بالكامل</span>
          </button>
        </div>
      </div>
    </div>
  );
}

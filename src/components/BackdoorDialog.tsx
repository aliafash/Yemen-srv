import React, { useState } from "react";
import { AppSettings, PresetPalette } from "../types";
import { ShieldAlert, Save, Key, RefreshCw, X } from "lucide-react";
import { db } from "../lib/db";

interface BackdoorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdate: (newSettings: AppSettings) => void;
}

export default function BackdoorDialog({
  isOpen,
  onClose,
  settings,
  onUpdate
}: BackdoorDialogProps) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  // Edit fields
  const [appName, setAppName] = useState(settings.appName);
  const [appLogoText, setAppLogoText] = useState(settings.appLogoText);
  const [welcomeMessage, setWelcomeMessage] = useState(settings.welcomeMessage);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);
  const [supportWhatsapp, setSupportWhatsapp] = useState(settings.supportWhatsapp);
  const [footerText, setFooterText] = useState(settings.footerText);
  const [adminPassword, setAdminPassword] = useState(settings.adminPassword || "maher736462");

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (settings.backdoorPassword || "maher--736462")) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("❌ كلمة مرور البوابة الخلفية غير صحيحة!");
    }
  };

  const handleSave = () => {
    const updated: AppSettings = {
      ...settings,
      appName,
      appLogoText,
      welcomeMessage,
      supportPhone,
      supportWhatsapp,
      footerText,
      adminPassword
    };
    
    db.saveSettings(updated);
    onUpdate(updated);
    onClose();
    setIsAuthorized(false);
    setPassword("");
  };

  const handleApplyPreset = (preset: PresetPalette) => {
    const updated: AppSettings = {
      ...settings,
      primaryColorHex: preset.primaryHex,
      accentColorHex: preset.accentHex,
      bgColorHex: preset.bgHex,
      surfaceColorHex: preset.surfaceHex
    };
    db.saveSettings(updated);
    onUpdate(updated);
  };

  const handleResetDB = () => {
    if (confirm("⚠️ هل أنت متأكد من رغبتك في تصفير جميع قواعد البيانات وإعادتها لقيمها الأساسية؟ سيتم مسح الرسائل والحجوزات وحسابات الفنيين المضافة!")) {
      db.clearAllData();
      alert("✅ تم تصفير جميع البيانات بنجاح!");
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-right font-sans" dir="rtl">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-amber-500/20">
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <h2 className="font-extrabold text-white text-lg">بوابة المالك الخلفية السرية 🔐</h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {!isAuthorized ? (
            <form onSubmit={handleVerify} className="space-y-4">
              <p className="text-amber-500 text-xs font-semibold leading-relaxed">
                ⚠️ هذه البوابة مصممة فقط لمالك النظام ومطوره WAM2026. يرجى إدخال كلمة المرور الخلفية المخصصة للمتابعة.
              </p>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">
                  كلمة المرور الخلفية (السرية):
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-4 py-2.5 text-white placeholder-slate-700 focus:outline-none transition-all pl-10 text-center font-mono"
                    autoFocus
                  />
                  <Key className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-600" />
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-semibold">{error}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-extrabold py-2.5 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow shadow-amber-500/25 cursor-pointer"
              >
                تحقق ودخول
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">اسم الموقع/التطبيق:</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">نص الشعار الدائري:</label>
                  <input
                    type="text"
                    value={appLogoText}
                    onChange={(e) => setAppLogoText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1">رسالة الترحيب الرئيسية:</label>
                <textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">رقم الدعم والمكالمات:</label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">رقم واتساب الدعم:</label>
                  <input
                    type="text"
                    value={supportWhatsapp}
                    onChange={(e) => setSupportWhatsapp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none text-center font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">نص التذييل (Footer):</label>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1">كلمة مرور المدير الرئيسي:</label>
                  <input
                    type="text"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-white text-xs focus:outline-none text-center font-mono"
                  />
                </div>
              </div>

              {/* Instant Color Preset Switcher */}
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-slate-300 text-xs font-bold mb-2">تطبيق سمة لونية سريعة فورياً 🎨</h4>
                <div className="grid grid-cols-4 gap-1.5">
                  {settings.colorsPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      className="px-1 py-1.5 text-[9px] rounded border border-slate-800 hover:border-amber-500 transition-all text-center flex flex-col items-center gap-1 cursor-pointer bg-slate-950"
                    >
                      <div className="flex gap-0.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.primaryHex }} />
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.accentHex }} />
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.bgHex }} />
                      </div>
                      <span className="text-slate-400 leading-none truncate w-full">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Maintenance & Dangerous Operations */}
              <div className="border-t border-slate-800 pt-4 flex gap-2">
                <button
                  onClick={handleResetDB}
                  className="w-1/2 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  تصفير قاعدة البيانات
                </button>
                <button
                  onClick={handleSave}
                  className="w-1/2 py-2 bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  حفظ وتطبيق التغييرات
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

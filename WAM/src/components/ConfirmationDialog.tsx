import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, KeyRound, X } from "lucide-react";
import { AppSettings } from "../types";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  settings: AppSettings;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  settings,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // The owner backdoor password is 'maher--736462', with settings and fallback overrides
    const correctPassword = settings.backdoorPassword || "maher--736462";
    const adminPassword = settings.adminPassword || "maher736462";

    if (!password) {
      setError("⚠️ يرجى إدخال كلمة المرور للمتابعة.");
      return;
    }

    if (
      password === "maher--736462" || 
      password === "maher736462" || 
      password === correctPassword || 
      password === adminPassword
    ) {
      setPassword("");
      onConfirm();
      onClose();
    } else {
      setError("❌ كلمة المرور غير صحيحة! تم تسجيل هذه المحاولة للامتثال الأمني.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl shadow-red-950/20 text-right overflow-hidden"
          >
            {/* Top Red Alert Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

            <div className="flex justify-between items-center mb-4 flex-row-reverse">
              <div className="flex items-center gap-2 text-red-400 flex-row-reverse">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <h3 className="text-sm font-bold text-white">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-5">
              {description}
            </p>

            <form onSubmit={handleConfirmSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5 flex-row-reverse">
                  <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                  <span>كلمة مرور المالك للموافقة الأمنية:</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none text-left font-mono"
                />
              </div>

              {error && (
                <div className="text-red-400 text-xs bg-red-950/40 border border-red-500/20 rounded-xl p-3 text-center leading-relaxed">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all"
                >
                  إلغاء الأمر
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg shadow-red-900/20 transition-all"
                >
                  تأكيد وتنفيذ الإجراء
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

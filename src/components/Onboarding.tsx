import React, { useState } from "react";
import { AppSettings } from "../types";
import { X, Sparkles, Navigation, ShieldCheck, Heart, ArrowLeft, ArrowRight } from "lucide-react";

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export default function Onboarding({
  isOpen,
  onClose,
  settings
}: OnboardingProps) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: `مرحباً بك في منصة ${settings.appName}! 👋`,
      description: "منصتك الخدمية والتقنية الشاملة لربط العملاء بأفضل وأمهر الفنيين وأصحاب الخبرات المهنية في مختلف المحافظات اليمنية بكل سهولة وأمان.",
      icon: <Sparkles className="w-12 h-12 text-amber-500 animate-pulse" />
    },
    {
      title: "تحديد الموقع الدقيق وتتبع المسار 📍",
      description: "استعن بخرائط جوجل التفاعلية وأقمار GPS لتحديد موقع الفنيين المتوفرين حولك والاتصال بهم، أو احجز طلبك وتتبع حركة الفني حتى باب منزلك في الوقت الفعلي.",
      icon: <Navigation className="w-12 h-12 text-blue-500" />
    },
    {
      title: "توثيق، أمان كامل، وتقييم حقيقي 🛡️",
      description: "ندقق هويات الفنيين والشهادات الثبوتية والخبرات المهنية يدوياً لضمان أعلى مستويات الأمان. تصفح التقييمات والمراجعات الحقيقية المدعومة بالصور والفيديو بكل ثقة.",
      icon: <ShieldCheck className="w-12 h-12 text-emerald-500" />
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("wam_onboarded", "true");
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentStepData = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative flex flex-col items-center justify-between min-h-[360px] space-y-4">
        {/* Skip button */}
        <button
          onClick={() => {
            localStorage.setItem("wam_onboarded", "true");
            onClose();
          }}
          className="absolute top-4 left-4 text-xs font-bold text-slate-500 hover:text-white transition-all cursor-pointer"
        >
          تخطي الجولة
        </button>

        {/* Slide details */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 pt-6">
          <div className="p-4 rounded-full bg-slate-950 border border-slate-800/80 shadow-lg shadow-black/40">
            {currentStepData.icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-black text-white">{currentStepData.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{currentStepData.description}</p>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex gap-1.5 justify-center">
          {steps.map((_, i) => (
            <span 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-5 bg-amber-500" : "w-1.5 bg-slate-800"
              }`} 
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center justify-between pt-2">
          {step > 0 ? (
            <button
              onClick={handlePrev}
              className="px-4 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>
          ) : (
            <div className="w-20" />
          )}

          <button
            onClick={handleNext}
            className="px-4 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1 shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <span>{step === steps.length - 1 ? "ابدأ الآن" : "التالي"}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

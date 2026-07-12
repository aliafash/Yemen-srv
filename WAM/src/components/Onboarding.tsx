import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Calendar, 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { AppSettings } from "../types";

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  isPreview?: boolean;
}

export default function Onboarding({
  isOpen,
  onClose,
  settings,
  isPreview = false
}: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "دليل كل خدمات اليمن (WAM)",
      description: "بوابة اليمن الذكية والأولى لربطك فورياً بأمهر الفنيين والمحترفين المعتمدين (السباكة، الكهرباء، التعليم، الصحة، وغيرها) في جميع المدن والمحافظات اليمنية مباشرة.",
      icon: <Sparkles className="w-16 h-16 text-amber-500" />,
      color: "from-amber-600/20 via-slate-900 to-slate-950"
    },
    {
      title: "حجز فوري ومستندات حجز موثقة",
      description: "تصفح ملفات الفنيين المهنية، وقارن تقييماتهم الحقيقية، ثم املأ استمارة الحجز المباشر. كما يمكنك التفاوض مع الفني عبر الدردشة الفورية أو الاتصال الهاتفي السريع.",
      icon: <Calendar className="w-16 h-16 text-rose-500" />,
      color: "from-rose-600/20 via-slate-900 to-slate-950"
    },
    {
      title: "مستشارك ومساعدك الذكي WAM AI",
      description: "مستشار ذكي فوري مدعوم بالكامل بالذكاء الاصطناعي للإجابة على أسئلتك، وتقديم استشارات الصيانة المنزلية، وتوجيهك للفني المناسب بأي وقت وعلى مدار الساعة.",
      icon: <Bot className="w-16 h-16 text-cyan-500" />,
      color: "from-cyan-600/20 via-slate-900 to-slate-950"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    if (!isPreview) {
      localStorage.setItem("wam_onboarded", "true");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md text-right font-sans" dir="rtl">
        <div className="relative w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-slate-950 sm:border sm:border-slate-800 sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between">
          
          {/* Header Action Buttons */}
          <div className="p-4 flex items-center justify-between z-10">
            <button 
              onClick={handleComplete}
              className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer transition-all"
            >
              {isPreview ? "إغلاق المعاينة" : "تخطي العرض"}
            </button>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">مستشار خدمات اليمن WAM 2026</span>
            </div>
          </div>

          {/* Slide Body Content */}
          <div className="grow flex flex-col justify-center px-6 py-4 relative overflow-hidden">
            {/* Animated Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].color} opacity-35 transition-all duration-700 pointer-events-none`} />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm mx-auto">
              {/* Dynamic Animated Icon container */}
              <motion.div
                key={`icon-${currentSlide}`}
                initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.3, rotate: 45, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl"
              >
                {slides[currentSlide].icon}
              </motion.div>

              {/* Slide Text details */}
              <div className="space-y-3.5">
                <motion.h3
                  key={`title-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-extrabold text-white text-lg md:text-xl tracking-tight leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h3>
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-300 text-xs md:text-sm leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Bottom controls and navigation */}
          <div className="p-6 bg-slate-950/80 border-t border-slate-900/60 flex flex-col gap-4">
            {/* Dot bullets indicator */}
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? "w-6 bg-amber-500" : "w-2 bg-slate-700"
                  }`}
                  title={`الشريحة ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next/Back actions toolbar */}
            <div className="flex items-center justify-between">
              {/* Back button */}
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`flex items-center gap-1 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                  currentSlide === 0
                    ? "opacity-0 pointer-events-none"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </button>

              {/* Next/Submit button */}
              <button
                onClick={handleNext}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                {currentSlide === slides.length - 1 ? (
                  <>
                    <span>ابدأ تصفح المنصة 🚀</span>
                  </>
                ) : (
                  <>
                    <span>التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[9px] text-slate-600 text-center font-bold">
              بوابة WAM الخدمية الموحدة في اليمن © 2026. رقم التواصل والدعم: {settings.supportPhone}
            </p>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
}

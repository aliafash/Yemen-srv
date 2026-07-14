import React, { useState, useRef, useEffect } from "react";
import { AppSettings } from "../types";
import { Bot, Send, X, Sparkles, User, UserCheck } from "lucide-react";

interface SmartAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export default function SmartAssistant({
  isOpen,
  onClose,
  settings
}: SmartAssistantProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      id: "as_1",
      sender: "bot",
      text: "مرحباً بك في الخدمة الذكية والآلية! أنا مساعدك الذكي الخاص بمنصة اليمن للخدمات. كيف يمكنني مساعدتك في العثور على الفنيين أو حل المشكلات الصعبة اليوم؟ 🤖✨"
    }
  ]);
  const [typedMsg, setTypedMsg] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMsg.trim()) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: typedMsg.trim()
    };
    setMessages(prev => [...prev, userMsg]);
    setTypedMsg("");
    setIsReplying(true);

    // Call server-side API or mock highly detailed responses
    setTimeout(() => {
      setIsReplying(false);
      let replyText = "أنا هنا لمساعدتك! إذا كنت تبحث عن فني كهرباء أو سباكة متميز في صنعاء، يرجى تصفح 'الصفحة الرئيسية' والفلترة حسب قسم الخدمة والمنطقة السكنية للعثور على أقرب فني متوفر لطلبك فوراً. 🛠️🏡";
      
      const query = userMsg.text.toLowerCase();
      if (query.includes("كهربا") || query.includes("كهربائي")) {
        replyText = "لدينا فنيو كهرباء متميزون في صنعاء والمدن الأخرى! نوصيك بالمهندس 'م. محمد الصنعاني' المتواجد في السبعين، وهو فني ممتاز ذو تقييم 4.8 نجوم ومستعد لتلبية طلبك والاتصال بك عبر الهاتف والواتساب.";
      } else if (query.includes("سباك") || query.includes("مياه")) {
        replyText = "بالتأكيد! نوفر لك أفضل السباكين المعتمدين. يمكنك الاتصال بالفني 'علي اليماني' المتواجد في حدة وهو متخصص بأعمال السباكة وتمديد الشبكات ومصارف المياه والتحقق اليدوي منها.";
      } else if (query.includes("سعر") || query.includes("باقة") || query.includes("اشتراك")) {
        replyText = "توفر منصتنا باقات مجانية ومميزة للفنيين. باقة VIP المخصصة لمزودي الخدمة تبلغ 5,000 ريال يمني فقط شهرياً، وتجلب لك الأولوية في الظهور للعملاء وشارات ممتازة مع توثيق الحساب.";
      }

      setMessages(prev => [...prev, {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: replyText
      }]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative h-[520px] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>المساعد الفني الذكي (AI)</span>
              <span className="inline-block px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-bold">GEMINI</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-950/40 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin bg-slate-950/40">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div 
                key={msg.id}
                className={`flex gap-2 max-w-[85%] ${isBot ? "ml-auto flex-row-reverse" : "mr-auto flex-row"}`}
              >
                {!isBot ? (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-slate-300 font-black text-xs">
                    <User className="w-4 h-4 text-amber-500" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-amber-500/20 shrink-0 flex items-center justify-center">
                    <Bot className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                  </div>
                )}
                <div className={`p-3 rounded-xl text-xs leading-relaxed border ${
                  isBot 
                    ? "bg-slate-900 border-slate-800 text-slate-200 rounded-tr-none" 
                    : "bg-amber-500 border-amber-600 text-black font-semibold rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isReplying && (
            <div className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse items-center">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-amber-500" />
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl rounded-tr-none text-xs text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="اسألني عن أفضل الفنيين أو كيفية الحجز وحل الأعطال..."
            value={typedMsg}
            onChange={(e) => setTypedMsg(e.target.value)}
            className="flex-1 h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <Send className="w-4 h-4 -rotate-90" />
          </button>
        </form>
      </div>
    </div>
  );
}

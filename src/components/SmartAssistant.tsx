import { useState, useEffect, useRef } from "react";
import { AppSettings } from "../types";
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  Sparkles, 
  HelpCircle,
  CornerDownLeft,
  User
} from "lucide-react";

interface SmartAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function SmartAssistant({
  isOpen,
  onClose,
  settings
}: SmartAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "ar-YE"; // Yemeni Arabic dialect code
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setInput(text);
      };
      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    // Set welcome message
    setMessages([
      {
        id: "msg_welcome",
        role: "assistant",
        text: settings.assistantWelcomeMessage || "مرحباً بك! أنا WAM مساعدك الذكي لخدمات اليمن. كيف يمكنني مساعدتك اليوم؟"
      }
    ]);
  }, [settings.assistantWelcomeMessage]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle TTS: Text-to-Speech
  const speakText = (text: string) => {
    if (!speechEnabled) return;
    
    // Stop current speech
    window.speechSynthesis.cancel();

    // Clean markdown bold or list characters for cleaner speech
    const cleanText = text
      .replace(/[\*\_\#\-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ar-SA"; // Standard Arabic
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("⚠️ عذراً، ميزة إدخال الصوت/STT غير مدعومة في متصفحك الحالي.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Stop TTS playing
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      recognitionRef.current.start();
    }
  };

  const handleSend = async (textToSend: string) => {
    const userText = textToSend.trim();
    if (!userText) return;

    setInput("");
    
    // Add user message
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      role: "user",
      text: userText
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            text: m.text
          }))
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now()}_a`,
        role: "assistant",
        text: data.text || "عذراً، لم أستطع معالجة هذا الطلب حالياً."
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
      
      // Auto speak response
      setTimeout(() => {
        speakText(assistantMsg.text);
      }, 100);

    } catch (error) {
      console.error("Assistant Chat Error:", error);
      setIsLoading(false);
      
      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now()}_e`,
        role: "assistant",
        text: "حدث خطأ غير متوقع أثناء الاتصال بخادم الذكاء الاصطناعي. يرجى مراجعة اتصال الإنترنت."
      };
      setMessages(prev => [...prev, assistantMsg]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 bg-black/60 backdrop-blur-sm text-right font-sans" dir="rtl">
      <div className="w-full sm:w-[450px] h-[100dvh] sm:h-[620px] bg-slate-900 sm:rounded-2xl border-t sm:border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                onClose();
              }} 
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-1 rounded-lg hover:bg-slate-900 transition-all ${speechEnabled ? "text-amber-500" : "text-slate-500"}`}
              title={speechEnabled ? "إيقاف نطق المساعد" : "تفعيل نطق المساعد"}
            >
              {speechEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <h3 className="font-extrabold text-white text-sm">مساعد ومستشار WAM 🤖</h3>
              <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 font-semibold">
                نشط ومتصل بالذكاء الاصطناعي
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Bot className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="grow overflow-y-auto p-4 space-y-4 bg-slate-950/20">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.role === "user" ? "mr-auto flex-row" : "ml-auto flex-row-reverse"
              }`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-slate-800" : "bg-amber-600/10 border border-amber-500/20"
              }`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-slate-400" />
                ) : (
                  <Bot className="w-4 h-4 text-amber-500" />
                )}
              </div>

              {/* Text Bubble */}
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user" 
                  ? "bg-slate-800 text-white rounded-tr-none" 
                  : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow"
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2.5 max-w-[85%] ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-amber-500 animate-spin" />
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="p-3 bg-slate-950/40 border-t border-slate-900 flex flex-wrap gap-1.5 shrink-0 select-none">
          {settings.assistantQuickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply)}
              className="text-[10px] text-slate-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/5 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-2.5 h-2.5" />
              {reply}
            </button>
          ))}
        </div>

        {/* Typing Bar */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-900 shrink-0">
          <div className="flex items-center gap-2">
            {/* STT Microphone */}
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all relative cursor-pointer ${
                isListening 
                  ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse" 
                  : "bg-slate-900 hover:bg-slate-800 text-slate-400"
              }`}
              title={isListening ? "إيقاف الاستماع" : "بحث صوتي/STT"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </button>

            {/* Input field */}
            <div className="grow relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder={isListening ? "جاري الاستماع لصوتك..." : "اسأل WAM عن خدمات اليمن..."}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600 transition-all text-right"
                disabled={isListening}
              />
              <span className="absolute left-3 top-3.5 text-[9px] text-slate-600 hidden sm:flex items-center gap-1 select-none">
                إدخال
                <CornerDownLeft className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Send button */}
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black transition-all shadow-md shadow-amber-500/5 cursor-pointer disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Audio waveform visualization when listening */}
          {isListening && (
            <div className="flex items-center justify-center gap-0.5 mt-2.5">
              <span className="text-[10px] text-rose-500 ml-2 animate-pulse">تحدث الآن، اللهجة اليمنية مدعومة 🇾🇪</span>
              <div className="h-3.5 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-duration:0.6s]" />
              <div className="h-5 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-duration:0.4s]" />
              <div className="h-4 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-duration:0.8s]" />
              <div className="h-6 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-duration:0.5s]" />
              <div className="h-3 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-duration:0.7s]" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

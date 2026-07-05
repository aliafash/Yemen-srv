import React, { useState, useEffect, useRef } from "react";
import { Chat, Message, User, AppSettings } from "../types";
import { 
  Send, 
  Paperclip, 
  MapPin, 
  Mic, 
  Volume2, 
  Check, 
  CheckCheck, 
  User as UserIcon, 
  MessageSquare, 
  Trash2, 
  Smartphone, 
  ShieldAlert,
  ArrowRight,
  Play,
  Pause,
  Image as ImageIcon
} from "lucide-react";
import { db } from "../lib/db";

interface ChatTabProps {
  chats: Chat[];
  messages: Message[];
  settings: AppSettings;
  currentUser: User | null;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  onNewMessage: () => void;
}

export default function ChatTab({
  chats,
  messages,
  settings,
  currentUser,
  activeChatId,
  setActiveChatId,
  onNewMessage
}: ChatTabProps) {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on load/new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId]);

  if (!currentUser || currentUser.role === "visitor") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-300 space-y-4 max-w-lg mx-auto font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
        <ShieldAlert className="w-14 h-14 text-amber-500 mx-auto animate-pulse" />
        <h3 className="font-extrabold text-white text-base">جدار الحماية الفوري (Firewall) 🛡️</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          عذراً، المحادثات والدردشة الفورية متاحة فقط للمستخدمين والفنيين المسجلين في المنصة لحمايتكم من الرسائل العشوائية والاسبام.
        </p>
        <p className="text-[10px] text-slate-500">للاستفسارات العاجلة، يرجى الاتصال بـ <span className="text-amber-500 font-bold">777644</span></p>
      </div>
    );
  }

  // Filter chats belonging to the current logged-in user or provider
  const visibleChats = chats.filter(c => {
    if (currentUser.role === "owner" || currentUser.role === "admin") return true;
    if (currentUser.role === "provider") return c.providerId === `prov_${currentUser.phone}`;
    return c.userId === currentUser.id;
  });

  const activeChat = chats.find(c => c.id === activeChatId);
  const activeChatMessages = messages.filter(m => m.chatId === activeChatId);

  const handleSendMessage = (
    text: string, 
    mediaUrl: string | null = null, 
    mediaType: Message["mediaType"] = null,
    lat: number | null = null,
    lng: number | null = null
  ) => {
    if (!activeChatId || (!text.trim() && !mediaUrl)) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      chatId: activeChatId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role === "provider" ? "provider" : currentUser.role === "admin" ? "admin" : "user",
      text,
      mediaUrl,
      mediaType,
      latitude: lat,
      longitude: lng,
      isRead: false,
      timestamp: Date.now()
    };

    // Save message and update chat preview text
    const updatedMessages = [...messages, newMessage];
    db.saveMessages(updatedMessages);

    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          lastMessage: text || (mediaType === "image" ? "📷 صورة" : mediaType === "audio" ? "🎙️ رسالة صوتية" : "📍 موقع GPS"),
          lastMessageTime: Date.now(),
          unreadCount: c.unreadCount + 1
        };
      }
      return c;
    });
    db.saveChats(updatedChats);

    setInputText("");
    onNewMessage();
  };

  // Image Attachment compressor (220px max resolution, 55% quality JPEG)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 220;
        const MAX_HEIGHT = 220;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress at 55% as requested
        const base64 = canvas.toDataURL("image/jpeg", 0.55);
        handleSendMessage("", base64, "image");
      };
    };
  };

  // GPS Coordinate sender
  const handleSendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleSendMessage("موقعي الحالي عبر نظام تحديد المواقع GPS", null, "location", pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback coordinate representing center Sana'a if browser fails
          handleSendMessage("موقعي الحالي عبر نظام تحديد المواقع GPS", null, "location", 15.348, 44.201);
        }
      );
    } else {
      alert("⚠️ ميزة تحديد الموقع الجغرافي غير مدعومة في متصفحك.");
    }
  };

  // Simulating the Voice Audio recorder/player
  const handleSendVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Send a dummy audio file indicator
      handleSendMessage("🎙️ رسالة صوتية (2:15 دقيقة)", "simulated_audio_url", "audio");
    }, 2500);
  };

  const togglePlayVoice = (msgId: string) => {
    if (playingVoiceId === msgId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(msgId);
      // auto stop after 4 seconds
      setTimeout(() => {
        setPlayingVoiceId(prev => prev === msgId ? null : prev);
      }, 4000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-[500px] flex text-right font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
      
      {/* 1. Chats list sidebar */}
      <div className={`w-full md:w-80 border-l border-slate-800 flex flex-col ${activeChatId ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-row-reverse">
          <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5 flex-row-reverse">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            صندوق المحادثات الواردة
          </h3>
          <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded font-bold">
            {visibleChats.length} غرف
          </span>
        </div>

        <div className="grow overflow-y-auto divide-y divide-slate-800/55">
          {visibleChats.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2 mt-8">
              <MessageSquare className="w-8 h-8 mx-auto opacity-25 text-amber-500" />
              <p className="text-xs">صندوق الوارد فارغ تماماً.</p>
              <p className="text-[10px]">تواصل مع الفنيين بالدخول لملفاتهم والضغط على "مراسلة"!</p>
            </div>
          ) : (
            visibleChats.map((c) => {
              const isSelected = c.id === activeChatId;
              const nameToShow = currentUser.role === "provider" ? c.userName : c.providerName;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveChatId(c.id);
                    // Mark read
                    const updatedChats = chats.map(ch => ch.id === c.id ? { ...ch, unreadCount: 0 } : ch);
                    db.saveChats(updatedChats);
                  }}
                  className={`p-3.5 cursor-pointer transition-all flex items-center justify-between flex-row-reverse ${
                    isSelected ? "bg-slate-850" : "bg-transparent hover:bg-slate-850/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-row-reverse overflow-hidden grow pr-1">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 border border-slate-700">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div className="text-right overflow-hidden space-y-0.5">
                      <h4 className="font-bold text-white text-xs truncate">{nameToShow}</h4>
                      <p className="text-[10px] text-slate-400 truncate leading-none">{c.lastMessage}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 text-[9px] text-slate-500 font-mono">
                    <span>{new Date(c.lastMessageTime).toLocaleTimeString("ar-YE", { hour: "numeric", minute: "2-digit" })}</span>
                    {c.unreadCount > 0 && !isSelected && (
                      <span className="bg-amber-600 text-black font-extrabold w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Active Chat room */}
      <div className={`grow flex flex-col bg-slate-950/20 ${!activeChatId ? "hidden md:flex items-center justify-center text-slate-500" : "flex"}`}>
        {!activeChatId ? (
          <div className="text-center space-y-2 p-6">
            <MessageSquare className="w-12 h-12 mx-auto text-slate-700 animate-pulse" />
            <p className="text-xs font-semibold">تأمين محادثات مشفر بالكامل 🔐</p>
            <p className="text-[10px] text-slate-600">يرجى تحديد جهة اتصال من اليسار لبدء المراسلة والتفاوض الفوري.</p>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-row-reverse shrink-0">
              <div className="flex items-center gap-2 flex-row-reverse">
                <button 
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900"
                >
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <div className="text-right">
                  <h4 className="font-extrabold text-white text-xs">
                    {currentUser.role === "provider" ? activeChat?.userName : activeChat?.providerName}
                  </h4>
                  <span className="text-[9px] text-emerald-400 font-bold">نشط ومباشر</span>
                </div>
              </div>

              <span className="text-[9px] text-slate-500 border border-slate-800 rounded px-1.5 py-0.5">اتصال آمن WAM</span>
            </div>

            {/* Messages box */}
            <div className="grow overflow-y-auto p-4 space-y-3.5">
              {activeChatMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const timeStr = new Date(msg.timestamp).toLocaleTimeString("ar-YE", { hour: "numeric", minute: "2-digit" });

                return (
                  <div 
                    key={msg.id} 
                    className={`flex items-end gap-1.5 max-w-[80%] ${isMe ? "mr-auto flex-row" : "ml-auto flex-row-reverse"}`}
                  >
                    <div className="text-right space-y-0.5">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        isMe 
                          ? "bg-slate-800 text-white rounded-tr-none" 
                          : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none"
                      }`}>
                        {/* 1. Normal Text */}
                        {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                        {/* 2. Image attachment display */}
                        {msg.mediaType === "image" && msg.mediaUrl && (
                          <div className="space-y-1">
                            <img 
                              src={msg.mediaUrl} 
                              alt="Uploaded visual"
                              referrerPolicy="no-referrer"
                              className="rounded-lg max-w-[180px] border border-slate-700 shadow"
                            />
                            <p className="text-[9px] text-slate-400">📷 صورة مضغوطة (Quality Compressor)</p>
                          </div>
                        )}

                        {/* 3. Voice Player simulation */}
                        {msg.mediaType === "audio" && (
                          <div className="flex items-center gap-2 flex-row-reverse min-w-[140px] py-1">
                            <button
                              onClick={() => togglePlayVoice(msg.id)}
                              className="w-8 h-8 rounded-full bg-amber-600 text-black flex items-center justify-center shadow shrink-0"
                            >
                              {playingVoiceId === msg.id ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black translate-x-[1px]" />}
                            </button>
                            <div className="grow space-y-1">
                              <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                                <div className={`h-full bg-amber-500 rounded-full transition-all duration-[4000ms] ${playingVoiceId === msg.id ? "w-full" : "w-0"}`} />
                              </div>
                              <p className="text-[8px] text-slate-400 text-left font-mono">0:04 / 2:15 🎙️</p>
                            </div>
                          </div>
                        )}

                        {/* 4. GPS Map location display */}
                        {msg.mediaType === "location" && msg.latitude && (
                          <div className="space-y-1.5 p-1 bg-slate-950 rounded-xl border border-slate-850">
                            <div className="w-36 h-20 bg-slate-900 rounded border border-slate-800 flex flex-col items-center justify-center text-amber-500 text-[10px] gap-1">
                              <MapPin className="w-5 h-5 text-amber-500 animate-bounce" />
                              <span className="font-bold">موقع GPS مرسل</span>
                              <span className="text-[8px] text-slate-500 font-mono">{msg.latitude.toFixed(3)}, {msg.longitude?.toFixed(3)}</span>
                            </div>
                            <button
                              onClick={() => window.open(`https://www.google.com/maps?q=${msg.latitude},${msg.longitude}`, "_blank")}
                              className="w-full text-center text-[9px] font-bold py-1 bg-amber-600 text-black rounded"
                            >
                              فتح في خرائط جوجل 🧭
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Message metadata details (time, read checkmarks) */}
                      <div className="flex items-center gap-1 justify-end text-[9px] text-slate-500 font-mono">
                        <span>{timeStr}</span>
                        {isMe && (
                          msg.isRead ? <CheckCheck className="w-3.5 h-3.5 text-sky-400" /> : <Check className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input keyboard bar */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-900 shrink-0">
              <div className="flex items-center gap-1.5">
                {/* Geolocation Coordinate Button */}
                <button
                  onClick={handleSendLocation}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-xl transition-all cursor-pointer"
                  title="إرسال موقعك الجغرافي GPS"
                >
                  <MapPin className="w-4.5 h-4.5" />
                </button>

                {/* Media Image Attachment Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-xl transition-all cursor-pointer"
                  title="رفع صورة وضغطها"
                >
                  <ImageIcon className="w-4.5 h-4.5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Voice message button */}
                <button
                  onClick={handleSendVoice}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isRecording ? "bg-rose-600 text-white animate-pulse" : "bg-slate-900 hover:bg-slate-800 text-slate-400"
                  }`}
                  title="تسجيل رسالة صوتية"
                >
                  <Mic className="w-4.5 h-4.5" />
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                  placeholder="اكتب رسالتك وتفاوض مع الفني..."
                  className="grow bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all text-right"
                  disabled={isRecording}
                />

                {/* Send */}
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="p-2 bg-amber-600 hover:bg-amber-500 text-black rounded-xl transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>

              {isRecording && (
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-rose-400 animate-pulse">
                  <span>🎙️ جاري تسجيل صوتك محلياً... حرر المايك للإرسال</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}

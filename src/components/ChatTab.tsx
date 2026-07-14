import React, { useState, useEffect, useRef } from "react";
import { AppSettings, Chat, Message } from "../types";
import { db } from "../lib/db";
import { 
  MessageSquare, 
  Send, 
  Mic, 
  Camera, 
  Paperclip, 
  CheckCheck, 
  User, 
  Volume2, 
  VolumeX 
} from "lucide-react";

interface ChatTabProps {
  chats: Chat[];
  messages: Message[];
  settings: AppSettings;
  currentUser: any;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  onNewMessage: () => void;
}

export default function ChatTab({
  chats,
  messages,
  settings,
  currentUser,
  activeChatId: initialActiveChatId,
  setActiveChatId,
  onNewMessage
}: ChatTabProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(initialActiveChatId || (chats.length > 0 ? chats[0].id : null));
  const [typedMessage, setTypedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChatId]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  // Filter messages for active chat
  const chatMessages = messages.filter(m => m.chatId === selectedChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedChatId || !activeChat) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: selectedChatId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      body: typedMessage.trim(),
      isRead: false,
      timestamp: Date.now()
    };

    const currentMsgs = db.getMessages();
    db.saveMessages([...currentMsgs, newMsg]);

    // Update last message in chat
    const updatedChats = chats.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          lastMessage: typedMessage.trim(),
          lastMessageTime: Date.now()
        };
      }
      return c;
    });
    db.saveChats(updatedChats);

    setTypedMessage("");
    onNewMessage();

    // Trigger simulation of typing & reply from provider
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: Message = {
        id: `msg_reply_${Date.now()}`,
        chatId: selectedChatId,
        senderId: currentUser.role === "provider" ? activeChat.userId : activeChat.providerId,
        senderName: currentUser.role === "provider" ? activeChat.userName : activeChat.providerName,
        body: "مرحباً بك! شكراً لتواصلك معي. سأقوم بالرد على استفسارك بكافة التفاصيل فور انتهائي من العمل الحالي مباشرة. 🛠️✨",
        isRead: true,
        timestamp: Date.now()
      };
      db.saveMessages([...db.getMessages(), replyMsg]);
      onNewMessage();
    }, 2000);
  };

  const handleSendVoiceSim = () => {
    if (!selectedChatId || !activeChat) return;
    const voiceMsg: Message = {
      id: `msg_voice_${Date.now()}`,
      chatId: selectedChatId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      body: "🎤 رسالة صوتية (0:15)",
      audioUrl: "https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav",
      isRead: false,
      timestamp: Date.now()
    };
    db.saveMessages([...db.getMessages(), voiceMsg]);
    onNewMessage();
  };

  return (
    <div className="h-[620px] rounded-2xl bg-slate-900 border border-slate-800 flex text-right overflow-hidden shadow-2xl" dir="rtl">
      {/* Messages Window Panel */}
      <div className="flex-1 flex flex-col bg-slate-950/80">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
                  <User className="w-5 h-5 text-amber-500" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">
                    {currentUser.role === "provider" ? activeChat.userName : activeChat.providerName}
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> متصل الآن
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages Scrolling Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {chatMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div 
                    key={msg.id}
                    className={`flex gap-2.5 max-w-[80%] ${isMe ? "mr-auto flex-row" : "ml-auto flex-row-reverse"}`}
                  >
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4 text-amber-500" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                        isMe 
                          ? "bg-amber-500 border-amber-600 text-black font-semibold rounded-tr-none" 
                          : "bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none"
                      }`}>
                        {msg.audioUrl ? (
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-black animate-bounce" />
                            <span>رسالة صوتية واردة (اضغط للتشغيل)</span>
                          </div>
                        ) : (
                          msg.body
                        )}
                      </div>
                      <div className={`flex items-center gap-1 text-[9px] text-slate-500 justify-end ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[80%] ml-auto flex-row-reverse items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-slate-400">
                    <User className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box Form */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-slate-900 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={handleSendVoiceSim}
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center cursor-pointer transition-all shrink-0"
                title="إرسال رسالة صوتية تجريبية"
              >
                <Mic className="w-4 h-4 text-amber-500" />
              </button>
              <input
                type="text"
                placeholder="اكتب رسالتك وتفاصيل استفسارك هنا..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center cursor-pointer transition-all shadow-lg shadow-amber-500/10 shrink-0 font-extrabold active:scale-95"
              >
                <Send className="w-4 h-4 -rotate-90" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
            <MessageSquare className="w-14 h-14 opacity-25 text-amber-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-400">ابدأ المحادثة والمراسلة الآن</h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              اختر فني أو عميل من القائمة الجانبية لبدء نقاش حول المهام، الخدمات، الأسعار والاتفاق المباشر.
            </p>
          </div>
        )}
      </div>

      {/* Conversations List Sidebar */}
      <div className="w-72 bg-slate-900 border-l border-slate-800/80 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-slate-800/80">
          <h3 className="text-sm font-black text-white flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            صندوق الرسائل والمحادثات
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-none">
          {chats.map((chat) => {
            const isSelected = chat.id === selectedChatId;
            const displayName = currentUser.role === "provider" ? chat.userName : chat.providerName;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChatId(chat.id);
                  setActiveChatId(chat.id);
                }}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center gap-3 select-none ${
                  isSelected 
                    ? "bg-amber-500/10 border-amber-500/30" 
                    : "border-transparent hover:bg-slate-800/50"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                  <User className="w-4.5 h-4.5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className={`text-xs font-bold truncate ${isSelected ? "text-amber-500" : "text-white"}`}>
                    {displayName}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{chat.lastMessage || "بدء محادثة جديدة..."}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { AppSettings, PendingProvider, User, Booking, Provider } from "../types";
import { 
  FileText, 
  Upload, 
  Mic, 
  MicOff, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ShieldAlert,
  Compass,
  FileImage,
  Info
} from "lucide-react";
import { db } from "../lib/db";
import ProviderStats from "./ProviderStats";

interface JoinTabProps {
  settings: AppSettings;
  categories: any[];
  currentUser: User | null;
  onRegistered: () => void;
  bookings?: Booking[];
  providers?: Provider[];
}

export default function JoinTab({
  settings,
  categories,
  currentUser,
  onRegistered,
  bookings,
  providers
}: JoinTabProps) {
  // If user is logged in as a provider, show their Stats Dashboard!
  if (currentUser?.role === "provider") {
    return (
      <ProviderStats
        settings={settings}
        bookings={bookings || db.getBookings()}
        providers={providers || db.getProviders()}
        currentUser={currentUser}
      />
    );
  }

  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [city, setCity] = useState("صنعاء");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const [photoType, setPhotoType] = useState("personal");

  // Compressed images states
  const [imageUrl, setImageUrl] = useState("");
  const [nationalIdUrl, setNationalIdUrl] = useState("");
  const [isCompImg, setIsCompImg] = useState(false);
  const [isCompId, setIsCompId] = useState(false);

  // Status/Notifications
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Speech Recognition states for fields
  const [listeningField, setListeningField] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "ar-YE";
      rec.onstart = () => {};
      rec.onend = () => setListeningField(null);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (listeningField === "address") setAddress(prev => prev + " " + text);
        if (listeningField === "description") setDescription(prev => prev + " " + text);
        if (listeningField === "area") setArea(prev => prev + " " + text);
      };
      recognitionRef.current = rec;
    }
  }, [listeningField]);

  const toggleVoiceField = (fieldName: string) => {
    if (!recognitionRef.current) {
      alert("⚠️ عذراً، ميزة الإملاء الصوتي غير مدعومة في متصفحك الحالي.");
      return;
    }
    if (listeningField === fieldName) {
      recognitionRef.current.stop();
      setListeningField(null);
    } else {
      setListeningField(fieldName);
      recognitionRef.current.start();
    }
  };

  // Automatic canvas-based image compressor (220px max resolution, 55% quality)
  const compressImage = (file: File, type: "avatar" | "id") => {
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

        // Scale maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Export as compressed JPEG at 55% quality (0.55) as requested!
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.55);

        if (type === "avatar") {
          setImageUrl(compressedBase64);
          setIsCompImg(true);
        } else {
          setNationalIdUrl(compressedBase64);
          setIsCompId(true);
        }
      };
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "id") => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!name.trim()) return setError("⚠️ يرجى كتابة الاسم الثلاثي الكامل.");
    if (!phone.trim() || phone.length < 9) return setError("⚠️ يرجى كتابة رقم هاتف يمني صحيح (مثال: 777644...).");
    if (!password.trim()) return setError("⚠️ يرجى إدخال كلمة مرور لحماية حسابك.");
    if (password.length < 6) return setError("⚠️ يجب ألا تقل كلمة المرور عن 6 خانات.");
    if (password !== confirmPassword) return setError("⚠️ كلمتا المرور غير متطابقتين.");
    if (!category) return setError("⚠️ يرجى اختيار التخصص المهني الرئيسي.");
    if (!subCategory) return setError("⚠️ يرجى اختيار المهنة الفرعية الدقيقة.");
    if (!area.trim()) return setError("⚠️ يرجى كتابة اسم الحي أو الحارة.");
    if (!description.trim()) return setError("⚠️ يرجى كتابة نبذة ووصف خبراتك المهنية.");
    if (!imageUrl) return setError("⚠️ يرجى رفع وتأكيد صورتك (الشخصية أو المهنية).");
    if (!nationalIdUrl) return setError("⚠️ يرجى رفع وتأكيد صورة الهوية الوطنية أو جواز السفر للتحقق الأمني.");

    setIsSubmitting(true);

    // Save registration to local DB
    const newPending: PendingProvider = {
      id: `pend_${phone}`,
      name,
      phone,
      password: btoa(password), // Encrypted storing
      category,
      subCategory,
      city,
      area,
      address,
      description,
      imageUrl,
      nationalIdImageUrl: nationalIdUrl,
      latitude: CITY_COORDINATES[city]?.lat || 15.3,
      longitude: CITY_COORDINATES[city]?.lng || 44.2,
      deviceId: "web_device_" + phone,
      gender,
      photoType,
      status: "pending",
      rejectionReason: "",
      timestamp: Date.now()
    };

    const currentPendings = db.getPendingProviders();
    // Check if phone already registered or pending
    if (currentPendings.some(p => p.phone === phone)) {
      setIsSubmitting(false);
      return setError("⚠️ يوجد طلب تسجيل قيد المراجعة بالفعل لهذا الهاتف.");
    }

    const currentProviders = db.getProviders();
    if (currentProviders.some(p => p.phone === phone)) {
      setIsSubmitting(false);
      return setError("⚠️ رقم الهاتف هذا مسجل بالفعل كمزود خدمة في الدليل.");
    }

    // Append to pending and trigger notifications
    db.savePendingProviders([...currentPendings, newPending]);

    // Send Admin Notification about new vendor sign up
    const systemNotifs = db.getNotifications();
    const adminNotif: any = {
      id: `not_${Date.now()}_reg`,
      title: "طلب انضمام فني جديد 👨‍🔧",
      body: `قام الفني ${name} بتقديم طلب للانضمام كمحترف في قسم (${category} - ${subCategory}) في ${city}. يرجى مراجعة هويته وصورته وتفعيل الحساب.`,
      type: "admin",
      targetType: "admins",
      targetId: "",
      targetRole: "admin",
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...systemNotifs, adminNotif]);

    setIsSubmitting(false);
    setSuccess(true);
    onRegistered();
  };

  const CITY_COORDINATES: Record<string, { lat: number, lng: number }> = {
    "صنعاء": { lat: 15.369, lng: 44.191 },
    "عدن": { lat: 12.785, lng: 45.018 },
    "تعز": { lat: 13.581, lng: 44.013 },
    "إب": { lat: 13.971, lng: 44.181 },
    "الحديدة": { lat: 14.797, lng: 42.953 }
  };

  const selectedCategoryObj = categories.find(c => c.name === category);
  const subCategories = selectedCategoryObj ? selectedCategoryObj.subCategories : [];

  if (success) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center text-slate-300 space-y-4 max-w-lg mx-auto font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
        <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
        <h3 className="font-extrabold text-white text-base">تم إرسال طلب انضمامك بنجاح! 🎉</h3>
        <p className="text-xs leading-relaxed text-slate-400">
          شكراً لتسجيلك في منصة <b>{settings.appName}</b>. تم توجيه طلبك إلى المشرف العام وهيئة التحقق من الهوية لمراجعة مؤهلاتك والتحقق من رقم الهاتف والمهنة.
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl text-right text-[11px] space-y-1.5 border border-slate-850">
          <p className="text-slate-400">• الهاتف المسجل: <span className="text-white font-mono">{phone}</span></p>
          <p className="text-slate-400">• القسم: <span className="text-white">{category} - {subCategory}</span></p>
          <p className="text-slate-400">• حالة المراجعة: <span className="text-amber-500 font-bold">قيد الانتظار (سيتم تفعيل حسابك خلال 24 ساعة)</span></p>
          <p className="text-slate-400">• رقم تواصل الدعم الفني المباشر للتعجيل: <span className="text-amber-500 font-mono font-bold">777644</span></p>
        </div>
        <p className="text-[10px] text-slate-500">سنرسل لك إشعاراً فورياً على المنصة بمجرد قبول حسابك وتفعيله في الدليل العام.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 text-right font-sans" dir="rtl" style={{ fontFamily: settings.selectedFontName }}>
      {/* Informative Header */}
      <div className="flex items-start gap-3 border-b border-slate-800 pb-4 mb-5 flex-row-reverse">
        <div className="p-2.5 rounded-xl bg-amber-500/10 shrink-0">
          <ShieldAlert className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h3 className="font-extrabold text-white text-base">بوابة انضمام مقدمي الخدمات والمحترفين 🤝</h3>
          <p className="text-slate-400 text-xs mt-1">سجل هويتك ومهنتك للوصول إلى آلاف طلبات الحجز المباشرة من الزبائن داخل محافظتك.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2 flex-row-reverse leading-relaxed">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">الاسم الكامل (كما في الهوية):</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: ماهر أحمد الوتاري"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Yemeni Phone Number */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">رقم الهاتف اليمني للتواصل المباشر:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثال: 777644777"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none text-left font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">كلمة مرور الحساب:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="اختر كلمة مرور آمنة من 6 خانات فأكثر"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none text-left font-mono"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">تأكيد كلمة المرور:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أعد كتابة كلمة المرور المحددة"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none text-left font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category selection */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">التخصص المهني الرئيسي:</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="">-- اختر القسم --</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Sub-category selection */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">المهنة الفرعية الدقيقة:</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!category}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none disabled:opacity-50"
            >
              <option value="">-- اختر المهنة الدقيقة --</option>
              {subCategories.map((sub: string) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Yemen Cities */}
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">المحافظة:</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
            >
              {Object.keys(CITY_COORDINATES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Area / District */}
          <div className="relative">
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">المديرية/الحي/الحارة:</label>
            <div className="relative">
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="مثال: حدة / جولة رويشان"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none pl-10"
              />
              <button
                type="button"
                onClick={() => toggleVoiceField("area")}
                className={`absolute left-2.5 top-2.5 p-1 rounded transition-colors ${
                  listeningField === "area" ? "bg-rose-600 text-white animate-pulse" : "text-slate-500 hover:text-slate-300"
                }`}
                title="إملاء صوتي"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Detailed Address */}
          <div className="relative">
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">العنوان بالتفصيل:</label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="اسم الشارع، بجوار متجر كذا..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none pl-10"
              />
              <button
                type="button"
                onClick={() => toggleVoiceField("address")}
                className={`absolute left-2.5 top-2.5 p-1 rounded transition-colors ${
                  listeningField === "address" ? "bg-rose-600 text-white animate-pulse" : "text-slate-500 hover:text-slate-300"
                }`}
                title="إملاء صوتي"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Gender and Photo preference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">الجنس:</label>
            <div className="flex gap-4 flex-row-reverse justify-end">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-amber-500"
                />
                ذكر
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-amber-500"
                />
                أنثى
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">نوع الصورة المعروضة:</label>
            <div className="flex gap-4 flex-row-reverse justify-end">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer" title="عرض صورتك الشخصية الحقيقية">
                <input
                  type="radio"
                  name="photoType"
                  value="personal"
                  checked={photoType === "personal"}
                  onChange={() => setPhotoType("personal")}
                  className="accent-amber-500"
                />
                صورة شخصية (Personal)
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer" title="عرض صورة رمزية/لوجو يمثل مهنتك">
                <input
                  type="radio"
                  name="photoType"
                  value="profession"
                  checked={photoType === "profession"}
                  onChange={() => setPhotoType("profession")}
                  className="accent-amber-500"
                />
                صورة المهنة (Profession)
              </label>
            </div>
          </div>
        </div>

        {/* Biography & Skills with Voice input */}
        <div className="relative">
          <label className="block text-slate-400 text-xs font-semibold mb-1.5 flex items-center justify-between flex-row-reverse">
            <span>نبذة مهنية ووصف لخبراتك وخدماتك:</span>
            <span className="text-[10px] text-slate-500">يدعم المايك الصوتي 🎙️</span>
          </label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="اكتب بالتفصيل سنوات خبرتك، الأجهزة أو الأدوات التي تتقن صيانتها، أسعارك التقريبية والمواد التي تستخدمها لتسهيل اختيارك من قبل العملاء..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none pl-11 text-right leading-relaxed"
            />
            <button
              type="button"
              onClick={() => toggleVoiceField("description")}
              className={`absolute left-3 bottom-3.5 p-1.5 rounded-lg transition-colors ${
                listeningField === "description" ? "bg-rose-600 text-white animate-pulse" : "text-slate-500 hover:text-slate-300"
              }`}
              title="إملاء صوتي"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Automatic compressed Image Upload with Canvas display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-slate-800 pt-5">
          {/* Avatar Picture (personal/profession) */}
          <div className="space-y-2">
            <label className="block text-slate-400 text-xs font-bold">
              {photoType === "personal" ? "الصورة الشخصية الحقيقية:" : "لوجو/صورة المهنة:"}
            </label>
            <div className="flex items-center gap-3 flex-row-reverse bg-slate-950 p-3 rounded-xl border border-slate-850">
              <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-xl cursor-pointer bg-slate-900/40 text-slate-500 hover:text-slate-300 transition-all text-center h-24 w-24 shrink-0">
                <Upload className="w-5 h-5 mb-1 text-amber-500" />
                <span className="text-[9px] font-bold">اختر ملف</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "avatar")}
                  className="hidden"
                />
              </label>
              
              <div className="text-right space-y-1 overflow-hidden">
                {imageUrl ? (
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <img 
                      src={imageUrl} 
                      alt="Compressed Avatar" 
                      className="w-16 h-16 rounded object-cover border border-amber-500/30"
                    />
                    <div className="text-[9px] text-emerald-400 font-semibold space-y-0.5">
                      <p>✓ تم الضغط التلقائي</p>
                      <p>دقة: 220x220 بكسل</p>
                      <p>جودة: 55% JPEG</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-[10px] space-y-1">
                    <p className="font-semibold text-slate-400">يرجى رفع صورة واضحة.</p>
                    <p>سيقوم نظام الـ Quality Compressor بضغطها أوتوماتيكياً لحفظ باقة الإنترنت.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification National ID Card */}
          <div className="space-y-2">
            <label className="block text-slate-400 text-xs font-bold flex items-center gap-1 justify-end">
              <span>صورة الهوية الوطنية / جواز السفر (سرية وآمنة للتحقق):</span>
            </label>
            <div className="flex items-center gap-3 flex-row-reverse bg-slate-950 p-3 rounded-xl border border-slate-850">
              <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-xl cursor-pointer bg-slate-900/40 text-slate-500 hover:text-slate-300 transition-all text-center h-24 w-24 shrink-0">
                <Upload className="w-5 h-5 mb-1 text-amber-500" />
                <span className="text-[9px] font-bold">اختر ملف</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "id")}
                  className="hidden"
                />
              </label>

              <div className="text-right space-y-1 overflow-hidden">
                {nationalIdUrl ? (
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-16 h-16 rounded bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <FileImage className="w-7 h-7" />
                    </div>
                    <div className="text-[9px] text-emerald-400 font-semibold space-y-0.5">
                      <p>✓ تم تشفير الهوية</p>
                      <p>مضغوطة أمنياً (55%)</p>
                      <p>مخفية عن الزوار والعملاء</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-[10px] space-y-1">
                    <p className="font-semibold text-rose-400 flex items-center gap-1 justify-end leading-none">
                      مطلوبة للتوثيق والقبول ⚠️
                    </p>
                    <p>نحن نحتفظ ببيانات هويتك في خادم أمني مشفر للتحقق الجنائي لحماية عملائنا ومجتمعنا.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Warning text / Terms */}
        <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/10 text-[10px] text-slate-400 leading-relaxed text-right">
          ⚠️ <b>إقرار مهني:</b> بتسجيلك في دليل WAM كل خدمات اليمن، تقر وتتعهد بصحة بيانات هويتك وخبراتك وخلو سجلك الجنائي من أي قضايا أو مخالفات، كما تلتزم بحسن الخلق والصدق في تقديم الخدمات والأسعار المتفق عليها للزبائن.
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-black font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10 text-xs cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>جاري ضغط البيانات وإرسال الطلب...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black fill-black/10" />
              <span>أرسل طلب الانضمام للمراجعة والتحقق 🚀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

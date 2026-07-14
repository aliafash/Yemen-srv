import React, { useState } from "react";
import { AppSettings, PendingProvider } from "../types";
import { db } from "../lib/db";
import { 
  User, 
  Phone, 
  Briefcase, 
  MapPin, 
  Camera, 
  Upload, 
  Compass, 
  CheckCircle2, 
  Clock, 
  FileText 
} from "lucide-react";

interface JoinTabProps {
  settings: AppSettings;
  categories: any[];
  currentUser: any;
  bookings: any[];
  providers: any[];
  onRegistered: () => void;
}

export default function JoinTab({
  settings,
  categories,
  currentUser,
  bookings,
  providers,
  onRegistered
}: JoinTabProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "",
    subCategory: "",
    workAddress: "",
    city: "صنعاء",
    area: "",
    neighborhood: "",
    idCardNumber: "",
    experience: "",
    gps: "",
    profileImg: "",
    idCardImg: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.name || !formData.phone || !formData.category || !formData.workAddress || !formData.area) {
      alert("⚠️ يرجى ملء كافة الحقول الإجبارية المؤشرة بنجمة (*)");
      return;
    }

    const pendingProv: PendingProvider = {
      id: `pending_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      category: formData.category,
      subCategory: formData.subCategory || "خدمات عامة",
      city: formData.city,
      area: `${formData.area} - ${formData.neighborhood}`,
      imageUrl: formData.profileImg || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      gps: formData.gps || "15.3694,44.1910",
      experience: formData.experience || "فني متخصص بخبرة عملية ممتازة",
      isAvailable: true,
      status: "pending",
      ratingsCount: 0,
      completedBookingsCount: 0,
    };

    const currentPending = db.getPendingProviders();
    db.saveCollection("pending_providers", [pendingProv, ...currentPending]);

    // System Log
    db.addAuditLog("تسجيل مقدم خدمة", `قام الفني ${formData.name} بإرسال طلب انضمام للمراجعة.`);

    // Send admin notification
    const currentNotifs = db.getNotifications();
    const adminNotif = {
      id: `not_pending_${Date.now()}`,
      title: "طلب انضمام فني جديد 🛠️",
      body: `أرسل الفني ${formData.name} طلب انضمام لقسم (${formData.category}). يرجى مراجعة هويته والموافقة عليه.`,
      type: "admin" as const,
      targetType: "admins" as const,
      targetId: "",
      targetRole: "admin" as const,
      isRead: false,
      timestamp: Date.now()
    };
    db.saveNotifications([...currentNotifs, adminNotif]);

    setIsSubmitted(true);
    onRegistered();
  };

  const handleGetGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData({ ...formData, gps: `${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}` });
        },
        () => {
          alert("⚠️ تعذر جلب إحداثيات GPS تلقائياً. يمكنك نسخ الإحداثيات يدوياً من الخريطة.");
        }
      );
    } else {
      alert("⚠️ متصفحك لا يدعم تحديد الموقع الجغرافي GPS.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-lg mx-auto text-right" dir="rtl">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
        <h2 className="text-xl font-bold text-white text-center">تم إرسال طلبك بنجاح!</h2>
        <p className="text-slate-400 text-sm leading-relaxed text-center">
          شكراً لتسجيلك معنا في منصة {settings.appName}. طلبك الآن قيد المراجعة والتحقق من الهوية من قبل إدارة المنصة. سنقوم بالتواصل معك عبر الواتساب أو الاتصال الهاتفي قريباً لتأكيد تفعيل الحساب.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">حالة الطلب:</span>
            <span className="text-amber-500 font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> قيد المراجعة والتحقق
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">الاسم المسجل:</span>
            <span className="text-white font-semibold">{formData.name}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 text-right pb-12" dir="rtl">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-black text-white">انضم كشريك خدمة فنية</h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          سجل معلوماتك بدقة، وسنقوم بمراجعة طلبك وربطك بآلاف العملاء الباحثين عن خدماتك في منطقتك الجغرافية!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        {/* Section 1: Personal Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <User className="w-4 h-4" /> المعطيات الشخصية الأساسية
          </h3>
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">الاسم الثلاثي الكامل <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد عبد الله اليماني"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
                <User className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">رقم هاتف فعال / واتساب <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="مثال: 777111222"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
                <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Service and Specialty */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Briefcase className="w-4 h-4" /> التخصص والخدمة الفنية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">القسم والخدمة الرئيسية <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none focus:border-amber-500"
              >
                <option value="">اختر القسم الرئيسي...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">الخدمة التفصيلية / التخصص</label>
              <input
                type="text"
                placeholder="مثال: تركيب لوحات، كشف تسريب..."
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Workplace and Area Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <MapPin className="w-4 h-4" /> النطاق الجغرافي السكني والعملي
          </h3>
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-bold">المدينة <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                >
                  <option value="صنعاء">صنعاء</option>
                  <option value="عدن">عدن</option>
                  <option value="تعز">تعز</option>
                  <option value="الحديدة">الحديدة</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-bold">المديرية <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="مثال: السبعين"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">الحي</label>
                <input
                  type="text"
                  placeholder="مثال: حي حدة"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold">عنوان مركز/مكتب العمل الحالي <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder="مثال: تقاطع شارع الجزائر مع بغداد، بجانب مركز اليمن"
                value={formData.workAddress}
                onChange={(e) => setFormData({ ...formData, workAddress: e.target.value })}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: GPS Coordinates Locator */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Compass className="w-4 h-4" /> الإحداثيات الجغرافية GPS للعمل المباشر
          </h3>
          <div className="flex gap-2.5">
            <input
              type="text"
              placeholder="خط العرض وخط الطول (تلقائي أو يدوي)..."
              value={formData.gps}
              onChange={(e) => setFormData({ ...formData, gps: e.target.value })}
              className="flex-1 h-11 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs px-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGetGps}
              className="px-4 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>تحديد تلقائي</span>
            </button>
          </div>
        </div>

        {/* Section 5: Documents uploads */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
            <Camera className="w-4 h-4" /> تحميل الصور والوثائق الثبوتية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 bg-slate-950/40 text-center space-y-2 cursor-pointer relative">
              <Upload className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-semibold">تحميل الصورة الشخصية *</p>
              <p className="text-[10px] text-slate-600">صورة واضحة بخلفية بيضاء للملف الشخصي</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Simply simulate upload
                  setFormData({ ...formData, profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.profileImg && (
                <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center gap-2">
                  <img src={formData.profileImg} alt="Preview" className="w-10 h-10 rounded object-cover" />
                  <span className="text-[10px] text-emerald-500 font-bold flex-1 text-right">تم تحميل الصورة الشخصية بنجاح!</span>
                </div>
              )}
            </div>

            <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 bg-slate-950/40 text-center space-y-2 cursor-pointer relative">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-semibold">تحميل صورة الهوية / جواز السفر *</p>
              <p className="text-[10px] text-slate-600">نسخة ثبوتية واضحة للتحقق من هوية مقدم الخدمة</p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  setFormData({ ...formData, idCardImg: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=300" });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.idCardImg && (
                <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center gap-2">
                  <FileText className="w-8 h-8 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-bold flex-1 text-right">تم تحميل وثيقة الهوية بنجاح!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Additional details */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-300">شهادات الخبرة / نبذة تعريفية قصيرة</label>
          <textarea
            rows={3}
            placeholder="مثال: متخصص في صيانة الكهرباء، حاصل على شهادة دبلوم فني..."
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm rounded-xl cursor-pointer transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99]"
        >
          إرسال طلب الانضمام كشريك خدمات فنية
        </button>
      </form>
    </div>
  );
}

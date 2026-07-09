import React, { useState, useEffect, useRef } from "react";
import { AppSettings, Provider, User } from "../types";
import { 
  Search, 
  Mic, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Volume2, 
  HelpCircle,
  Clock,
  Briefcase,
  Home,
  HeartPulse,
  GraduationCap,
  Cpu,
  Truck
} from "lucide-react";
import ProviderCard from "./ProviderCard";

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return Home;
    case "HeartPulse":
      return HeartPulse;
    case "GraduationCap":
      return GraduationCap;
    case "Truck":
      return Truck;
    case "Cpu":
      return Cpu;
    case "Briefcase":
    default:
      return Briefcase;
  }
};

interface HomeTabProps {
  providers: Provider[];
  settings: AppSettings;
  categories: any[];
  banners: any[];
  currentUser: User | null;
  onBookClick: (provider: Provider) => void;
  onChatClick: (provider: Provider) => void;
  onSelectProvider: (provider: Provider) => void;
  onToggleFavorite?: (providerId: string, e: React.MouseEvent) => void;
}

export default function HomeTab({
  providers,
  settings,
  categories,
  banners,
  currentUser,
  onBookClick,
  onChatClick,
  onSelectProvider,
  onToggleFavorite
}: HomeTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [categoryBackStack, setCategoryBackStack] = useState<any[]>([]);
  const [currentLevelCategory, setCurrentLevelCategory] = useState<any | null>(null);

  const handleCategoryClick = (cat: any) => {
    setCategoryBackStack([...categoryBackStack, currentLevelCategory]);
    setCurrentLevelCategory(cat);
    setSelectedCategory(cat.name);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subName: string) => {
    if (selectedSubCategory === subName) {
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(subName);
    }
  };

  const handleGoBackCategory = () => {
    if (categoryBackStack.length === 0) return;
    const prev = categoryBackStack[categoryBackStack.length - 1];
    const newStack = categoryBackStack.slice(0, -1);
    
    setCategoryBackStack(newStack);
    setCurrentLevelCategory(prev);
    
    if (prev === null) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(prev.name);
      setSelectedSubCategory(null);
    }
  };

  const [selectedCity, setSelectedCity] = useState<string>("الكل");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Voice search
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Banner slideshow
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Autocomplete suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Banner slideshow effect
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIdx(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "ar-YE";
      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setSearchQuery(text);
      };
      recognitionRef.current = rec;
    }
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const hints = new Set<string>();

    providers.forEach(p => {
      if (p.name.toLowerCase().includes(q)) hints.add(p.name);
      if (p.subCategory.toLowerCase().includes(q)) hints.add(p.subCategory);
      if (p.category.toLowerCase().includes(q)) hints.add(p.category);
      if (p.city.toLowerCase().includes(q)) hints.add(p.city);
    });

    setSuggestions(Array.from(hints).slice(0, 5));
  }, [searchQuery, providers]);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("⚠️ عذراً، ميزة البحث الصوتي غير مدعومة في متصفحك الحالي.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Filter logic
  const filteredProviders = providers.filter(p => {
    // Search query matching
    const matchesSearch = searchQuery.trim() === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching
    const matchesCategory = 
      (!selectedCategory || p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
      (!selectedSubCategory || p.subCategory.trim().toLowerCase() === selectedSubCategory.trim().toLowerCase());

    // City matching
    const matchesCity = selectedCity === "الكل" || p.city === selectedCity;

    // Rating matching
    const matchesRating = p.rating >= selectedRating;

    return matchesSearch && matchesCategory && matchesCity && matchesRating;
  });

  // Split VIP (pinned) and Standard
  const vipProviders = filteredProviders.filter(p => p.isPinned);
  const standardProviders = filteredProviders.filter(p => !p.isPinned);

  const CITIES_YEMEN = [
    "الكل", 
    "صنعاء", "عدن", "تعز", "إب", "الحديدة", "حضرموت", 
    "المكلا", "سيئون", "ذمار", "البيضاء", "مأرب", "الجوف", 
    "صعدة", "حجة", "المحويت", "عمران", "الضالع", "لحج", 
    "أبين", "شبوة", "سقطرى"
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: settings.selectedFontName }}>
      {/* Banner Slideshow */}
      {banners.length > 0 && (
        <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-lg border border-slate-800/80 bg-slate-950 select-none">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 flex flex-col justify-end p-5 text-right ${
                idx === currentBannerIdx ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95 pointer-events-none"
              }`}
            >
              {/* Overlay shading for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 z-0" />
              {banner.imageUrl && (
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-40 blur-[1px]"
                />
              )}
              
              <div className="relative z-10 space-y-1 max-w-xl">
                <span className="bg-amber-600 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full inline-block mb-1">
                  إعلان WAM هام 📢
                </span>
                <h3 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                  {banner.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed max-w-lg truncate-3-lines">
                  {banner.text}
                </p>
              </div>
            </div>
          ))}

          {/* Dots Indicator */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 left-4 z-10 flex gap-1.5 flex-row-reverse">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBannerIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentBannerIdx ? "bg-amber-500 w-4" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Intelligent Search Section */}
      <div className="space-y-2 relative">
        <div className="flex gap-2">
          {/* Filters Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center cursor-pointer shrink-0 ${
              showFilters || selectedCategory || selectedCity !== "الكل" || selectedRating > 0
                ? "bg-amber-500 text-black border-amber-500 shadow shadow-amber-500/10"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
            title="تصفية متقدمة"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Search Input Bar */}
          <div className="grow relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="ابحث بالاسم، المهنة، الهاتف، أو المدن اليمنية..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-slate-500 transition-all text-right pr-11 pl-12"
            />
            <Search className="absolute right-4 top-3.5 w-4.5 h-4.5 text-slate-500" />
            
            {/* Microphone search button */}
            <button
              onClick={handleVoiceSearch}
              className={`absolute left-3 top-2 p-1.5 rounded-lg transition-all ${
                isListening 
                  ? "bg-rose-600 text-white animate-pulse" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
              title="بحث صوتي سريع"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Autocomplete Suggestions Popup */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute right-0 left-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-30 divide-y divide-slate-800/60">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onMouseDown={() => {
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-2.5 text-right text-xs text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-all flex items-center justify-between"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </div>
        )}

        {/* Floating audio waveform indicator when listening */}
        {isListening && (
          <div className="bg-rose-950/80 border border-rose-500/30 rounded-xl p-2 px-4 flex items-center justify-between flex-row-reverse text-xs text-rose-300">
            <span className="font-semibold">جاري الاستماع لصوتك... تكلم الآن 🇾🇪</span>
            <div className="flex gap-0.5">
              <span className="w-0.5 h-3 bg-rose-500 rounded animate-bounce [animation-duration:0.4s]" />
              <span className="w-0.5 h-4 bg-rose-500 rounded animate-bounce [animation-duration:0.6s]" />
              <span className="w-0.5 h-5 bg-rose-500 rounded animate-bounce [animation-duration:0.5s]" />
            </div>
          </div>
        )}

        {/* Filters Panel Dropdown */}
        {showFilters && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl text-xs text-right">
            <div className="grid grid-cols-2 gap-4">
              {/* City Selection */}
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">المدينة والمنطقة:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {CITIES_YEMEN.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Rating Star Selection */}
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">الحد الأدنى للتقييم:</label>
                <div className="flex items-center gap-1 flex-row-reverse">
                  {[0, 3, 4, 4.5].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setSelectedRating(stars)}
                      className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedRating === stars
                          ? "bg-amber-500/15 border-amber-500 text-amber-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {stars === 0 ? "الكل" : `${stars} ★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filters indicators */}
            <div className="flex gap-2 justify-end flex-wrap">
              {(selectedCategory || selectedSubCategory || selectedCity !== "الكل" || selectedRating > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedSubCategory(null);
                    setCategoryBackStack([]);
                    setCurrentLevelCategory(null);
                    setSelectedCity("الكل");
                    setSelectedRating(0);
                  }}
                  className="text-rose-400 hover:text-rose-300 font-semibold"
                >
                  مسح جميع الفلاتر ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick categories horizontal bar / Drilldown */}
      <div className="space-y-2">
        <div className="flex justify-between items-center flex-row-reverse mb-1">
          <h3 className="font-extrabold text-white text-xs">
            {currentLevelCategory ? `تصفح أقسام: ${currentLevelCategory.name}` : "أقسام الخدمات السريعة 🛠️"}
          </h3>
          {currentLevelCategory && (
            <button
              onClick={handleGoBackCategory}
              className="text-[10px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 flex-row-reverse focus:outline-none cursor-pointer"
            >
              <span>الرجوع للخلف ↩️</span>
            </button>
          )}
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 flex-row-reverse no-scrollbar">
          {!currentLevelCategory ? (
            // Render 13 Main Categories
            categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              const IconComponent = getCategoryIcon(cat.icon);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all shrink-0 w-24 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/10 scale-105"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="p-1.5 rounded-xl bg-slate-950/30 mb-1.5">
                    <IconComponent className={`w-4 h-4 ${isSelected ? "text-black" : "text-amber-500"}`} />
                  </div>
                  <span className="text-[9px] font-extrabold tracking-tight text-center truncate w-full leading-none">
                    {cat.name}
                  </span>
                </button>
              );
            })
          ) : (
            // Render sub-categories of the current selected main category
            currentLevelCategory.subCategories.map((sub: string) => {
              const isSelected = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryClick(sub)}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/10 font-black"
                      : "bg-slate-900/95 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold"
                  }`}
                >
                  <span className="text-[10px] leading-none">
                    {sub}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Providers list display split by VIP */}
      <div className="space-y-6">
        {/* Elite VIP Section */}
        {vipProviders.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-row-reverse">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
                <h3 className="font-extrabold text-white text-xs">مقدمو خدمات النخبة والـ VIP ⭐</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">موصى بهم رسمياً</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vipProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  settings={settings}
                  onBookClick={onBookClick}
                  onChatClick={onChatClick}
                  onSelect={onSelectProvider}
                  isFavorite={currentUser?.favorites?.includes(provider.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-row-reverse">
            <h3 className="font-extrabold text-white text-xs">
              {selectedCategory ? `فنيّو ومزودو قسم ${selectedCategory}` : "جميع الفنيين المتوفرين في اليمن 👨‍🔧"}
            </h3>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-800/60 px-2 py-0.5 rounded">
              {filteredProviders.length} متوفر
            </span>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="p-10 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 space-y-2">
              <Briefcase className="w-8 h-8 mx-auto opacity-30 text-amber-500" />
              <p className="text-xs font-semibold">لا يوجد فنيين مطابقين لمعايير البحث في مدينتك حالياً.</p>
              <p className="text-[10px]">يمكنك تصفير الفلاتر أو التسجيل كمزود في قسم الانضمام!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  settings={settings}
                  onBookClick={onBookClick}
                  onChatClick={onChatClick}
                  onSelect={onSelectProvider}
                  isFavorite={currentUser?.favorites?.includes(provider.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

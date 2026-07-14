import React, { useState, useEffect } from "react";
import { Provider, AppSettings } from "../types";
import ProviderCard from "./ProviderCard";
import { Search, Mic, Sparkles, Star, MapPin, SlidersHorizontal, Eye, X } from "lucide-react";

interface HomeTabProps {
  providers: Provider[];
  settings: AppSettings;
  categories: any[];
  banners: any[];
  currentUser: any;
  onBookClick: (p: Provider) => void;
  onChatClick: (p: Provider) => void;
  onSelectProvider: (p: Provider) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
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
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Filter providers
  const filteredProviders = providers.filter(provider => {
    // 1. Text Search
    const textMatch = searchQuery.trim() === "" ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.area.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Filter
    const catMatch = !selectedCategory || provider.category === selectedCategory;

    // 3. City Filter
    const cityMatch = !selectedCity || provider.city === selectedCity;

    // 4. Area Filter
    const areaMatch = !selectedArea || provider.area === selectedArea;

    return textMatch && catMatch && cityMatch && areaMatch;
  });

  // VIP / Pinned providers
  const pinnedProviders = filteredProviders.filter(p => p.isPinned);
  const regularProviders = filteredProviders.filter(p => !p.isPinned);

  // Web Speech API Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ متصفحك لا يدعم البحث الصوتي.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-YE";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setSearchQuery(speechToText);
    };

    recognition.start();
  };

  return (
    <div className="space-y-6 text-right pb-12" dir="rtl">
      {/* Banner Carousel (Mocked / Styled beautifully) */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-3 max-w-lg">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            منصة الخدمات الفنية الأولى في اليمن
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            ابحث عن أفضل الفنيين الموثوقين لخدمتك فوراً!
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            كهرباء، سباكة، تكييف والمزيد... فنيون محترفون تم التحقق من هوياتهم وخبراتهم لضمان جودة العمل والأمان الكامل.
          </p>
        </div>
        <div className="shrink-0 w-36 h-36 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-amber-500 animate-pulse" />
        </div>
      </div>

      {/* Advanced Search Bar with Voice */}
      <div className="space-y-3">
        <div className="flex gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ابحث عن كهربائي، سباك، تكييف، أو منطقة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pr-11 pl-12 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
            />
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
            <button
              onClick={handleVoiceSearch}
              className={`absolute left-3 top-2.5 p-1 rounded-lg transition-all cursor-pointer ${
                isListening ? "bg-red-500/20 text-red-500 animate-bounce" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              title="بحث صوتي"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-xl border flex items-center gap-2 text-sm transition-all cursor-pointer ${
              showFilters || selectedCity || selectedArea
                ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>فلترة</span>
          </button>
        </div>

        {/* Sliders / Advanced Filters Drawer */}
        {showFilters && (
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">المدينة</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedArea("");
                }}
                className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 focus:outline-none"
              >
                <option value="">كل المدن</option>
                <option value="صنعاء">صنعاء</option>
                <option value="عدن">عدن</option>
                <option value="تعز">تعز</option>
                <option value="الحديدة">الحديدة</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">المديرية / الحي</label>
              <input
                type="text"
                placeholder="مثال: حدة، السبعين..."
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Categories Horizontal Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          تصفح حسب الأقسام الرئيسية
        </h2>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 h-10 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
              !selectedCategory
                ? "bg-amber-500 border-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            الكل ({providers.length})
          </button>
          {categories.map((cat) => {
            const count = providers.filter(p => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 h-10 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? "bg-amber-500 border-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned VIP Providers Carousel / Grid */}
      {pinnedProviders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            الفنيون المميزون (VIP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedProviders.map((provider) => (
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

      {/* Regular Providers List */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-emerald-500" />
          {selectedCategory ? `فنيو قسم: ${selectedCategory}` : "كل الفنيين المتاحين بالقرب منك"}
        </h2>
        {regularProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularProviders.map((provider) => (
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
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-500 space-y-2">
            <Search className="w-10 h-10 mx-auto opacity-30" />
            <p className="text-sm">لا يوجد فنيون يطابقون خيارات البحث الحالية.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Provider, AppSettings } from "../types";
import { MapPin, Navigation, Eye, CalendarDays, Star, Compass, Phone } from "lucide-react";

interface MapTabProps {
  providers: Provider[];
  settings: AppSettings;
  onBookClick: (p: Provider) => void;
  onSelectProvider: (p: Provider) => void;
}

export default function MapTab({
  providers,
  settings,
  onBookClick,
  onSelectProvider
}: MapTabProps) {
  const [selectedPin, setSelectedPin] = useState<Provider | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 15.3694, lng: 44.1910, name: "موقعك الحالي (صنعاء)" });

  // Filter providers with GPS cords
  const providersWithGps = providers.filter(p => p.gps);

  // Generate random or parsed lat/lng
  const pins = providersWithGps.map(p => {
    const parts = p.gps!.split(",");
    return {
      provider: p,
      lat: parseFloat(parts[0]) || 15.3694,
      lng: parseFloat(parts[1]) || 44.1910
    };
  });

  return (
    <div className="space-y-4 text-right pb-12" dir="rtl">
      {/* Map Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" />
            خرائط الفنيين التفاعلية (صنعاء، اليمن)
          </h2>
          <p className="text-slate-400 text-xs">
            تصفح الفنيين القريبين منك واطلب الخدمة وتتبع مسار الحركة في الوقت الفعلي.
          </p>
        </div>
        <button
          onClick={() => setShowRoute(!showRoute)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border cursor-pointer ${
            showRoute 
              ? "bg-amber-500 border-amber-500 text-black font-bold" 
              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>تتبع المسار</span>
        </button>
      </div>

      {/* Main Map Box */}
      <div className="relative h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center shadow-inner">
        {/* Mock Dark-Styled Interactive Map Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* City landmarks */}
        <div className="absolute top-1/4 right-1/4 text-[10px] text-slate-700 font-bold select-none">منطقة السبعين</div>
        <div className="absolute bottom-1/3 left-1/3 text-[10px] text-slate-700 font-bold select-none">حي حدة</div>
        <div className="absolute top-1/3 left-1/2 text-[10px] text-slate-700 font-bold select-none">شارع الجزائر</div>
        
        {/* User Marker Pin */}
        <div 
          className="absolute z-10 flex flex-col items-center cursor-pointer group"
          style={{ top: "45%", left: "48%" }}
        >
          <div className="bg-blue-500 text-white rounded-full p-1.5 shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/10">
            <Navigation className="w-4 h-4 rotate-45" />
          </div>
          <span className="mt-1 bg-slate-900 border border-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">موقعك</span>
        </div>

        {/* Dynamic Route Line SVG */}
        {showRoute && selectedPin && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <path
              d="M 380 240 Q 450 200, 480 280 T 520 180"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeDasharray="8,8"
              className="animate-[dash_2s_linear_infinite]"
            />
          </svg>
        )}

        {/* Providers Pins */}
        {pins.map((pin, i) => {
          // Compute pseudo-random display coords relative to map center
          const topPercent = 30 + (i * 20) % 50;
          const leftPercent = 25 + (i * 35) % 60;
          const isSelected = selectedPin?.id === pin.provider.id;

          return (
            <div
              key={pin.provider.id}
              onClick={() => setSelectedPin(pin.provider)}
              className="absolute z-20 flex flex-col items-center cursor-pointer group"
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
            >
              <div className={`p-1.5 rounded-full shadow-lg transition-all border ${
                isSelected 
                  ? "bg-amber-500 border-amber-600 scale-125 ring-4 ring-amber-500/20" 
                  : "bg-slate-900 border-slate-700 hover:bg-slate-800 hover:scale-115"
              }`}>
                <MapPin className={`w-4 h-4 ${isSelected ? "text-black" : "text-amber-500"}`} />
              </div>
              <span className={`mt-1 text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap font-semibold border transition-all ${
                isSelected
                  ? "bg-amber-500 border-amber-600 text-black font-bold"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}>
                {pin.provider.name}
              </span>
            </div>
          );
        })}

        {/* Floating selected Pin Details Drawer */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 z-30 p-4 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-slide-up">
            <div className="flex items-center gap-3">
              {selectedPin.imageUrl ? (
                <img src={selectedPin.imageUrl} alt={selectedPin.name} className="w-12 h-12 rounded-lg object-cover border border-slate-800" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{selectedPin.name}</h4>
                <p className="text-[11px] text-slate-400">{selectedPin.category} • {selectedPin.subCategory}</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{selectedPin.rating || "4.5"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectProvider(selectedPin)}
                className="px-3 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>الملف الشخصي</span>
              </button>
              <button
                onClick={() => onBookClick(selectedPin)}
                className="px-3 h-9 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer flex items-center gap-1 shadow-lg shadow-amber-500/10"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>احجز الآن</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Provider, AppSettings } from "../types";
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Star, 
  Phone, 
  Sliders, 
  User, 
  Locate, 
  Info,
  ExternalLink
} from "lucide-react";

interface MapTabProps {
  providers: Provider[];
  settings: AppSettings;
  onBookClick: (provider: Provider) => void;
  onSelectProvider: (provider: Provider) => void;
}

// Coordinate mappings for major Yemeni cities to center the radar on
const CITY_COORDINATES: Record<string, { lat: number, lng: number }> = {
  "صنعاء": { lat: 15.369, lng: 44.191 },
  "عدن": { lat: 12.785, lng: 45.018 },
  "تعز": { lat: 13.581, lng: 44.013 },
  "إب": { lat: 13.971, lng: 44.181 },
  "الحديدة": { lat: 14.797, lng: 42.953 }
};

export default function MapTab({
  providers,
  settings,
  onBookClick,
  onSelectProvider
}: MapTabProps) {
  const [currentCity, setCurrentCity] = useState<string>("صنعاء");
  const [searchRadius, setSearchRadius] = useState<number>(20); // default 20km
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const centerCoords = CITY_COORDINATES[currentCity] || CITY_COORDINATES["صنعاء"];

  // Helper: Haversine distance in km
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate distance for all providers based on selected center coordinates
  const providersWithDistance = providers.map(p => {
    // If provider doesn't have lat/lng, generate mock coords close to the center for visual fun
    let lat = p.latitude;
    let lng = p.longitude;
    if (!lat || !lng) {
      // Create seedable deterministic offsets close to city center
      const offset = (parseInt(p.phone.slice(-3)) || 50) / 1000 - 0.05;
      const offset2 = (parseInt(p.phone.slice(-2)) || 20) / 1000 - 0.05;
      lat = centerCoords.lat + offset;
      lng = centerCoords.lng + offset2;
    }

    const dist = getDistance(centerCoords.lat, centerCoords.lng, lat, lng);
    return { ...p, distance: dist, lat, lng };
  });

  // Filter based on search radius
  const nearbyProviders = providersWithDistance
    .filter(p => p.distance <= searchRadius)
    .sort((a, b) => a.distance - b.distance);

  // SVG dimensions for map rendering
  const MAP_SIZE = 350;
  const CENTER = MAP_SIZE / 2;

  // Convert GPS coordinates to local SVG X,Y coordinates relative to the center
  const getSVGCoordinates = (lat: number, lng: number) => {
    // scale factor to fit within circle based on searchRadius
    const scaleFactor = (CENTER - 30) / searchRadius;
    const dLat = lat - centerCoords.lat;
    const dLng = lng - centerCoords.lng;

    // Convert to pixels (1 degree latitude is approx 111km, longitude is approx 107km in Yemen)
    const kmX = dLng * 107;
    const kmY = dLat * 111;

    // SVG coordinates (Invert Y as SVG starts from top)
    const x = CENTER + kmX * scaleFactor;
    const y = CENTER - kmY * scaleFactor;

    return { x, y };
  };

  return (
    <div className="space-y-6" style={{ fontFamily: settings.selectedFontName }} dir="rtl">
      {/* Search parameters bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-right space-y-4 shadow-lg">
        <div className="flex items-center gap-2 justify-end">
          <Compass className="w-5 h-5 text-amber-500 animate-spin-slow" />
          <h3 className="font-extrabold text-white text-sm">البحث بنصف القطر الراداري 🗺️</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">اختر المحافظة المركزية:</label>
            <select
              value={currentCity}
              onChange={(e) => {
                setCurrentCity(e.target.value);
                setSelectedProvider(null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
            >
              {Object.keys(CITY_COORDINATES).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-1.5">
              نصف قطر البحث الحالي: <span className="text-amber-400 font-bold">{searchRadius} كم</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Vector Radar Map */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner relative overflow-hidden h-[390px]">
          {/* Subtle radar scan effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.02)_0%,transparent_70%)] pointer-events-none animate-pulse" />
          
          <svg width="100%" height="100%" viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} className="max-w-[340px] relative z-10">
            {/* Concentric radar circles */}
            <circle cx={CENTER} cy={CENTER} r={CENTER - 10} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx={CENTER} cy={CENTER} r={(CENTER - 10) * 0.7} fill="none" stroke="#1e293b" strokeWidth="1" />
            <circle cx={CENTER} cy={CENTER} r={(CENTER - 10) * 0.4} fill="none" stroke="#1e293b" strokeWidth="1" />
            
            {/* Axis Lines */}
            <line x1={10} y1={CENTER} x2={MAP_SIZE - 10} y2={CENTER} stroke="#1e293b" strokeWidth="0.5" />
            <line x1={CENTER} y1={10} x2={CENTER} y2={MAP_SIZE - 10} stroke="#1e293b" strokeWidth="0.5" />

            {/* Radar Sweep Effect (decorative) */}
            <circle cx={CENTER} cy={CENTER} r={CENTER - 10} fill="rgba(245,158,11,0.015)" />

            {/* Line connecting to selected provider */}
            {selectedProvider && (() => {
              const p = providersWithDistance.find(pw => pw.id === selectedProvider.id);
              if (p) {
                const { x, y } = getSVGCoordinates(p.lat, p.lng);
                return (
                  <line 
                    x1={CENTER} 
                    y1={CENTER} 
                    x2={x} 
                    y2={y} 
                    stroke="#D97706" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4" 
                    className="animate-pulse"
                  />
                );
              }
              return null;
            })()}

            {/* User current location marker (center) */}
            <circle cx={CENTER} cy={CENTER} r="6" fill="#D97706" className="animate-ping opacity-75" />
            <circle cx={CENTER} cy={CENTER} r="4" fill="#D97706" stroke="#ffffff" strokeWidth="1.5" />

            {/* Providers Marker Pins */}
            {nearbyProviders.map((p) => {
              const { x, y } = getSVGCoordinates(p.lat, p.lng);
              const isSelected = selectedProvider?.id === p.id;
              
              // Prevent pins from going outside the visual radar bounds
              if (x < 15 || x > MAP_SIZE - 15 || y < 15 || y > MAP_SIZE - 15) return null;

              return (
                <g 
                  key={p.id} 
                  onClick={() => setSelectedProvider(p)} 
                  className="cursor-pointer group"
                >
                  {/* Glowing halo for VIPs */}
                  {p.isPinned && (
                    <circle cx={x} cy={y} r="10" fill="rgba(217,119,6,0.15)" className="animate-pulse" />
                  )}

                  {/* Marker Pin */}
                  <path 
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                    transform={`translate(${x - 12}, ${y - 22})`}
                    fill={isSelected ? "#FF4444" : p.isPinned ? "#D97706" : "#38BDF8"}
                    stroke="#0f172a"
                    strokeWidth="1"
                    className="transition-transform duration-300 group-hover:scale-125"
                  />
                  
                  {/* Professional label text on hover/select */}
                  {(isSelected || p.isPinned) && (
                    <text 
                      x={x} 
                      y={y - 25} 
                      textAnchor="middle" 
                      fill="#ffffff" 
                      fontSize="8" 
                      fontWeight="bold"
                      className="bg-slate-900 px-1 py-0.5 rounded shadow"
                    >
                      {p.name.split(" ")[1] || p.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map legend */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-slate-500 z-10">
            <span>قطر الرادار: {searchRadius * 2} كم</span>
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> VIP</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> فني عادي</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> أنت</span>
            </div>
          </div>
        </div>

        {/* Sidebar displaying list & selected detail */}
        <div className="lg:col-span-6 space-y-4">
          {/* Selected Provider Card Detail */}
          {selectedProvider ? (
            <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-4 text-right shadow-xl relative animate-fade-in">
              <button 
                onClick={() => setSelectedProvider(null)}
                className="absolute top-2 left-2 text-slate-400 hover:text-white text-[10px] border border-slate-800 rounded px-1.5 py-0.5"
              >
                رجوع للقائمة ✕
              </button>

              <div className="flex items-start gap-3 flex-row-reverse">
                <img 
                  src={selectedProvider.imageUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150"} 
                  alt={selectedProvider.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-1 flex-row-reverse">
                    {selectedProvider.name}
                    {selectedProvider.isVerified && <span className="text-emerald-400">✓</span>}
                  </h4>
                  <p className="text-xs text-amber-400 font-semibold">{selectedProvider.subCategory} | {selectedProvider.category}</p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 flex-row-reverse">
                    <Navigation className="w-3 h-3 text-amber-500" />
                    يبعد عنك بـ <span className="font-bold text-white">{(selectedProvider as any).distance.toFixed(1)} كم</span>
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 mt-3 leading-relaxed truncate-2-lines">
                {selectedProvider.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onBookClick(selectedProvider)}
                  className="w-1/2 py-2 bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs rounded-xl shadow cursor-pointer transition-all"
                >
                  احجز الخدمة فوراً
                </button>
                <button
                  onClick={() => onSelectProvider(selectedProvider)}
                  className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer transition-all"
                >
                  عرض الملف الكامل
                </button>
              </div>
            </div>
          ) : (
            /* Nearby providers list */
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col h-[390px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 shrink-0 flex-row-reverse">
                <h4 className="font-extrabold text-white text-xs">الفنيون القريبون منك ({nearbyProviders.length})</h4>
                <span className="text-[10px] text-slate-500">الأقرب مسافة أولاً</span>
              </div>

              {nearbyProviders.length === 0 ? (
                <div className="grow flex flex-col items-center justify-center text-center p-4 text-slate-500">
                  <Compass className="w-10 h-10 text-slate-700 animate-pulse mb-2" />
                  <p className="text-xs font-semibold">لا يوجد فنيون قريبون داخل هذا النطاق.</p>
                  <p className="text-[10px] text-slate-600 mt-1">يرجى زيادة قيمة نصف قطر البحث بالمنزلق أعلاه.</p>
                </div>
              ) : (
                <div className="grow overflow-y-auto space-y-2.5 pr-1">
                  {nearbyProviders.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProvider(p)}
                      className="p-3 bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between flex-row-reverse group"
                    >
                      <div className="flex items-center gap-2.5 flex-row-reverse">
                        <img 
                          src={p.imageUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150"} 
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                        />
                        <div className="text-right">
                          <h5 className="font-bold text-white text-xs group-hover:text-amber-400 transition-colors">
                            {p.name}
                          </h5>
                          <span className="text-[10px] text-slate-400">{p.subCategory} | {p.city}</span>
                        </div>
                      </div>

                      <div className="text-left font-mono">
                        <span className="text-[10px] text-amber-500 font-extrabold bg-amber-500/5 border border-amber-500/10 rounded px-1.5 py-0.5">
                          {p.distance.toFixed(1)} كم
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

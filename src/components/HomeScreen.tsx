import React, { useState, useEffect } from 'react';
import { TabType, ServiceItem, Society } from '../types';
import { POPULAR_SERVICES, REVIEWS } from '../data';
import { NetNivasLogo } from './NetNivasLogo';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  onBookService: (service: ServiceItem) => void;
  unreadCount: number;
  currentSociety: Society;
  onSwitchSociety: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onBookService,
  unreadCount,
  currentSociety,
  onSwitchSociety,
}) => {
  // Animated search placeholder
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search for 'Deep Cleaning'");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const suggestions = [
      "Search for 'Deep Cleaning'...",
      "Search for 'Electrician'...",
      "Search for 'AC Repair'...",
      "Search for 'Pest Control'...",
      "Search for 'Plumber'...",
      "Search for 'Women\\'s Salon'...",
    ];
    let sIdx = 0;
    let cIdx = 0;
    let isDel = false;
    let timer: any;

    const tick = () => {
      const current = suggestions[sIdx];
      if (isDel) {
        setSearchPlaceholder(current.substring(0, cIdx - 1));
        cIdx--;
        if (cIdx <= 0) {
          isDel = false;
          sIdx = (sIdx + 1) % suggestions.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 45);
      } else {
        setSearchPlaceholder(current.substring(0, cIdx + 1));
        cIdx++;
        if (cIdx >= current.length) {
          isDel = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 90);
      }
    };

    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  const fullHomeCleaning = POPULAR_SERVICES.find((s) => s.id === 'srv-full-home-cleaning') || POPULAR_SERVICES[3];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-md relative pb-28 md:pb-12 text-slate-900 font-sans">
      {/* Top Header */}
      <header className="px-5 pt-3.5 pb-2 bg-white sticky top-0 z-30 border-b border-slate-100">
        {/* Brand & Actions Row */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100/80">
          <NetNivasLogo size={32} showTagline={true} />
          
          <div className="flex items-center space-x-1.5">
            {/* Profile Button */}
            <button
              onClick={() => onNavigate('profile')}
              aria-label="User Profile"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Notification Bell Button */}
            <button
              onClick={() => onNavigate('notifications')}
              aria-label="Notifications"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Location & Society Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={onSwitchSociety}
            className="flex items-center space-x-1.5 cursor-pointer hover:bg-slate-50 px-2 py-1 -ml-2 rounded-lg transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-rose-500 text-[18px]">location_on</span>
            <span className="text-sm font-bold text-slate-800 tracking-tight">
              {currentSociety.location}, {currentSociety.city}
            </span>
            <span className="material-symbols-outlined text-slate-500 text-[16px]">expand_more</span>
          </button>

          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Cooperative
          </span>
        </div>

        {/* Welcome Greeting */}
        <div className="mt-4 mb-3">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
            Good afternoon, Rushi<br />
            {currentSociety.name} <span className="inline-block origin-bottom-right">👋</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-2">
          <div className="relative flex items-center bg-blue-50/70 border-2 border-blue-200/90 rounded-2xl shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <div className="pl-4 pr-2.5 flex items-center pointer-events-none text-blue-600">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onNavigate('services');
              }}
              placeholder={searchPlaceholder}
              className="w-full py-3 pr-10 bg-transparent border-0 text-sm font-semibold text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-0"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center space-x-1.5 text-slate-400">
              <button
                onClick={() => onNavigate('services')}
                aria-label="Voice Search"
                className="p-1 hover:text-blue-600 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-3">
        {/* Services Grid (Matches Reference Screen 22 exactly) */}
        <section className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-xs">
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {/* Category 1: Women's Salon & Spa */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-1.5 shadow-sm border border-emerald-100/60 group-hover:border-emerald-200">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <path d="M20 18C20 9 25 6 32 6C39 6 44 9 44 18V24H20V18Z" fill="#F8FAFC" />
                  <ellipse cx="32" cy="12" fill="#FFFFFF" rx="11" ry="6" />
                  <circle cx="32" cy="28" fill="#F8D3B0" r="13" />
                  <path d="M22 26C22 21 26 19 32 19C38 19 42 21 42 26C42 32 38 37 32 37C26 37 22 32 22 26Z" fill="#86EFAC" />
                  <ellipse cx="32" cy="33" fill="#F43F5E" rx="2.5" ry="1.2" />
                  <path d="M20 42C20 38 24 37 32 37C40 37 44 38 44 42V54H20V42Z" fill="#F1F5F9" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Women's<br />Salon &amp; Spa
              </span>
            </button>

            {/* Category 2: Deep Cleaning */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center p-1.5 shadow-sm border border-red-100/60 group-hover:border-red-200">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <ellipse cx="42" cy="38" fill="#E11D48" rx="14" ry="12" />
                  <ellipse cx="42" cy="35" fill="#F43F5E" rx="10" ry="7" />
                  <circle cx="44" cy="42" fill="#1E293B" r="6" />
                  <path d="M30 38C22 38 18 30 18 20" stroke="#334155" strokeLinecap="round" strokeWidth="3" />
                  <path d="M18 20L15 48" stroke="#64748B" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M10 49H20L22 52H8L10 49Z" fill="#1E293B" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Deep<br />Cleaning
              </span>
            </button>

            {/* Category 3: Pest Control */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-1.5 shadow-sm border border-amber-200/80 group-hover:border-amber-300">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <path d="M32 10L46 16V30C46 41 39 49 32 52C25 49 18 41 18 30V16L32 10Z" fill="#F59E0B" opacity="0.9" />
                  <path d="M32 13L43 18V29C43 38 38 45 32 48C26 45 21 38 21 29V18L32 13Z" fill="#FDE68A" />
                  <ellipse cx="32" cy="30" fill="#92400E" rx="5" ry="6" />
                  <circle cx="32" cy="22" fill="#92400E" r="3" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Pest<br />Control
              </span>
            </button>

            {/* Category 4: Painting & Water-proofing */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-1.5 shadow-sm border border-amber-100/60 group-hover:border-amber-200">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <rect fill="#FACC15" height="12" rx="4" width="28" x="18" y="16" />
                  <ellipse cx="18" cy="22" fill="#EAB308" rx="2" ry="6" />
                  <ellipse cx="46" cy="22" fill="#CA8A04" rx="2" ry="6" />
                  <path d="M46 22H51V32H33V37" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <rect fill="#D97706" height="15" rx="2" width="6" x="30" y="37" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Painting &amp;<br />Water-proofing
              </span>
            </button>

            {/* Category 5: AC & Appliance */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-1.5 shadow-sm border border-sky-100/60 group-hover:border-sky-200">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <rect fill="#E2E8F0" height="18" rx="3" width="40" x="12" y="24" />
                  <path d="M12 26C12 24.8954 12.8954 24 14 24H50C51.1046 24 52 24.8954 52 26V32H12V26Z" fill="#F8FAFC" />
                  <line stroke="#94A3B8" strokeLinecap="round" strokeWidth="1.5" x1="16" x2="48" y1="37" y2="37" />
                  <circle cx="45" cy="28" fill="#0284C7" r="1" />
                  <path d="M18 45C22 47 26 47 28 45" opacity="0.8" stroke="#38BDF8" strokeLinecap="round" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                AC &amp;<br />Appliance
              </span>
            </button>

            {/* Category 6: Electrician */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-1.5 shadow-sm border border-yellow-200 group-hover:border-yellow-300">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" fill="#FEF3C7" r="19" />
                  <path d="M34 14L22 33H33L29 50L43 29H32L34 14Z" fill="#D97706" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Electrician
              </span>
            </button>

            {/* Category 7: Plumber */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center p-1.5 shadow-sm border border-cyan-200 group-hover:border-cyan-300">
                <svg className="w-full h-full drop-shadow-sm" fill="none" viewBox="0 0 64 64">
                  <path d="M32 12C32 12 44 26 44 35C44 41.6 38.6 47 32 47C25.4 47 20 41.6 20 35C20 26 32 12 32 12Z" fill="#0284C7" />
                  <path d="M19 46L31 34M28 31L34 37" stroke="#475569" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                Plumber
              </span>
            </button>

            {/* Category 8: All services */}
            <button
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center p-2 shadow-sm border border-slate-200/90 group-hover:bg-slate-100 transition-colors">
                <div className="grid grid-cols-3 gap-1.5 p-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  ))}
                </div>
              </div>
              <span className="mt-1.5 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                All services
              </span>
            </button>
          </div>
        </section>

        {/* Trending Services */}
        <section className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Trending Services</h2>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View All
            </button>
          </div>

          <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="relative h-44 w-full bg-slate-100">
              <img
                src={fullHomeCleaning.image}
                alt="Professional Cleaning"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-bold text-slate-800 shadow-xs">
                Society Bestseller
              </div>
            </div>
            <div className="p-3.5">
              <h3 className="text-base font-bold text-slate-900 leading-snug">{fullHomeCleaning.title}</h3>
              <div className="flex items-center space-x-1.5 mt-1 text-xs text-slate-600">
                <span className="text-amber-500 font-bold flex items-center">
                  ★ <span className="ml-0.5 text-slate-800 font-semibold">{fullHomeCleaning.rating}</span>
                </span>
                <span className="text-slate-400 font-medium">({fullHomeCleaning.reviewCount})</span>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-base font-extrabold text-slate-900">₹{fullHomeCleaning.price}</span>
                  {fullHomeCleaning.originalPrice && (
                    <span className="text-xs text-slate-400 line-through ml-1.5">
                      ₹{fullHomeCleaning.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onBookService(fullHomeCleaning)}
                  className="px-5 py-1.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all"
                >
                  Book
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Society Events & Camps */}
        <section className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Society Events &amp; Camps</h2>
            <button
              onClick={() => onNavigate('community')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-secondary/40 transition-colors">
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex-shrink-0 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[26px]">self_improvement</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Basileo Society Yoga Meetup
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Sunday, 8 AM • Clubhouse</p>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('event-detail')}
                    className="px-4 py-1.5 bg-secondary hover:bg-on-secondary-container text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all"
                  >
                    Join Event
                  </button>
                  <span className="text-xs font-semibold text-slate-600">12 joining</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mt-7 mb-6">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mb-3">Customer Reviews</h2>
          <div className="space-y-3">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center space-x-3 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {rev.avatarInitial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {rev.author} <span className="text-xs font-normal text-slate-500">({rev.tower})</span>
                    </h4>
                    <div className="flex items-center text-amber-400 text-xs mt-0.5 space-x-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

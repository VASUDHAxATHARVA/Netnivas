import React, { useState } from 'react';
import { TabType, Society, ServiceCamp } from '../types';
import { SERVICE_CAMPS } from '../data';

interface CommunityScreenProps {
  currentSociety: Society;
  onSwitchSociety: () => void;
  onNavigate: (tab: TabType) => void;
  onJoinCamp: (camp: ServiceCamp) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  currentSociety,
  onSwitchSociety,
  onNavigate,
  onJoinCamp,
}) => {
  const [camps, setCamps] = useState<ServiceCamp[]>(SERVICE_CAMPS);
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestCategory, setNewRequestCategory] = useState('RO Water Purifier Service');
  const [newRequestMinHouses, setNewRequestMinHouses] = useState('5');
  const [joinedCamps, setJoinedCamps] = useState<Record<string, boolean>>({});
  const [showJoinedToast, setShowJoinedToast] = useState<string | null>(null);

  const handleJoin = (camp: ServiceCamp) => {
    if (joinedCamps[camp.id]) {
      // Toggle unjoin
      setJoinedCamps((prev) => ({ ...prev, [camp.id]: false }));
      setCamps((prev) =>
        prev.map((c) => (c.id === camp.id ? { ...c, joinedCount: c.joinedCount - 1 } : c))
      );
    } else {
      setJoinedCamps((prev) => ({ ...prev, [camp.id]: true }));
      setCamps((prev) =>
        prev.map((c) => (c.id === camp.id ? { ...c, joinedCount: c.joinedCount + 1 } : c))
      );
      setShowJoinedToast(`You joined ${camp.title}! Neighbors notified.`);
      setTimeout(() => setShowJoinedToast(null), 3500);
    }
    onJoinCamp(camp);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestTitle.trim()) return;

    const newCamp: ServiceCamp = {
      id: `camp-${Date.now()}`,
      category: newRequestCategory,
      title: newRequestTitle,
      dateStr: 'Coming Saturday, 10 AM',
      priceInfo: 'Special Group Discount',
      joinedCount: 1,
      targetCount: parseInt(newRequestMinHouses, 10) || 5,
      badgeClass: 'bg-secondary-container text-on-secondary-container',
      borderAccentColor: 'bg-secondary',
    };

    setCamps([newCamp, ...camps]);
    setJoinedCamps((prev) => ({ ...prev, [newCamp.id]: true }));
    setShowCreateRequestModal(false);
    setNewRequestTitle('');
    setShowJoinedToast(`Collective request published to ${currentSociety.name}!`);
    setTimeout(() => setShowJoinedToast(null), 3500);
  };

  return (
    <div className="w-full max-w-md md:max-w-4xl mx-auto min-h-screen bg-background pb-28 md:pb-12 text-on-background">
      {/* Toast */}
      {showJoinedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          {showJoinedToast}
        </div>
      )}

      {/* Top Header */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="h-10 w-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <h1 className="font-bold text-lg text-primary truncate">Community</h1>
          <button
            onClick={() => onNavigate('profile')}
            className="h-10 w-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Section 1: Your Society */}
        <section>
          <h2 className="font-bold text-lg mb-3 text-on-surface">Your Society</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center overflow-hidden shrink-0 border border-outline-variant">
              <img
                src={currentSociety.image}
                alt={currentSociety.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-on-surface truncate">{currentSociety.name}</h3>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                {currentSociety.location}, {currentSociety.city}
              </p>
              <span className="text-[11px] text-secondary font-semibold mt-1 inline-block">
                {currentSociety.flatsCount} Resident Apartments Connected
              </span>
            </div>
            <button
              onClick={onSwitchSociety}
              className="px-5 py-2 rounded-lg border border-primary text-primary font-semibold text-xs hover:bg-primary/5 transition-colors h-10 flex items-center justify-center w-full sm:w-auto active:scale-95 shrink-0"
            >
              Switch
            </button>
          </div>
        </section>

        {/* Section 2: Active Service Camps */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="font-bold text-lg text-on-surface">Active Service Camps</h2>
            <button
              onClick={() => setShowCreateRequestModal(true)}
              className="text-xs font-bold text-primary hover:underline"
            >
              + Propose New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {camps.map((camp) => {
              const hasJoined = !!joinedCamps[camp.id];
              return (
                <div
                  key={camp.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${camp.borderAccentColor}`} />

                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold mb-1.5 ${camp.badgeClass}`}>
                        {camp.category}
                      </span>
                      <h3 className="font-bold text-base text-on-surface leading-tight">{camp.title}</h3>
                    </div>
                    <div className="bg-surface-container px-2.5 py-1 rounded-full flex items-center gap-1 border border-outline-variant shrink-0">
                      <span className="material-symbols-outlined text-[15px] text-primary">group</span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        {camp.joinedCount} joined
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                      <span>{camp.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
                      <span className="font-semibold text-on-surface">{camp.priceInfo}</span>
                    </div>
                  </div>

                  {/* Progress Bar towards minimum threshold */}
                  <div className="mt-1">
                    <div className="flex justify-between text-[11px] text-on-surface-variant mb-1">
                      <span>Society goal: {camp.targetCount} flats</span>
                      <span className="font-semibold text-primary">
                        {Math.round((camp.joinedCount / camp.targetCount) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-300"
                        style={{ width: `${Math.min(100, (camp.joinedCount / camp.targetCount) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-2 border-t border-outline-variant">
                    <button
                      onClick={() => handleJoin(camp)}
                      className={`w-full font-semibold text-xs h-10 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-98 ${
                        hasJoined
                          ? 'bg-secondary text-white'
                          : 'bg-primary hover:bg-primary-container text-on-primary shadow-xs'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {hasJoined ? 'check_circle' : 'group_add'}
                      </span>
                      {hasJoined ? 'Joined (Cancel)' : 'View & Join'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Need a service for multiple homes banner */}
        <section>
          <div className="bg-primary-container text-on-primary-container rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 justify-between border border-outline-variant shadow-xs">
            <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '160px' }}>hub</span>
            </div>
            <div className="relative z-10 text-center md:text-left flex-1">
              <h2 className="font-bold text-lg md:text-xl mb-1 text-white">
                Need a service for multiple homes?
              </h2>
              <p className="text-xs md:text-sm opacity-90 max-w-lg text-white/90">
                Group requests lower prices and save time. Start a collective request and invite your neighbors to join.
              </p>
            </div>
            <button
              onClick={() => setShowCreateRequestModal(true)}
              className="relative z-10 bg-white text-primary font-bold text-xs px-5 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all shrink-0 shadow-sm w-full md:w-auto active:scale-95"
            >
              <span className="material-symbols-outlined mr-1.5 text-[18px]">add_circle</span>
              Create Community Request
            </button>
          </div>
        </section>

        {/* Highlighted Society Meetups (Links to Screen 5 Event Detail) */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-on-surface">Upcoming Society Circles</h2>
            <span className="text-xs font-semibold text-secondary">Free For Residents</span>
          </div>

          <div
            onClick={() => onNavigate('event-detail')}
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 shadow-xs hover:border-primary hover:shadow-md cursor-pointer transition-all relative overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-28 h-24 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG6yB0qNgkhrgUO6e6tvj4OYNHqv4abM0_aZlEEADHtoNz9oBHqOEp7JfWUHbSnmnLJmSPqkYs61XWQosGugRFc-i8GsCXKIppvP0SlnRhv5T1Qwu3LarV9UUG1MvSH_xC-tBeuqMcvS-ujSqIicBHequmJ0v3htKVpi-jd5xnMvwB2tHHayZyOTa8RV18l-Guuq5niTjnUyRLAaJthoSK-7j4M2GXJ3rcVF4QXnMhgXsoXspWOAMD"
                  alt="Yoga Meetup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full">
                    Wellness Circle
                  </span>
                  <span className="text-xs text-on-surface-variant">Sunday, 8:00 AM</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                  Basileo Society Yoga Meetup
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                  Sunday Morning Flow &amp; Guided Breathwork • Clubhouse Lawn
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    View Details &amp; RSVP
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">12 going</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Society Impact */}
        <section className="mb-4">
          <h2 className="font-bold text-lg mb-3 text-on-surface">Society Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
              <span className="font-black text-2xl text-on-surface">124</span>
              <span className="text-xs text-on-surface-variant mt-1">services completed this month</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 rounded-full bg-primary-container text-white flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[22px]">savings</span>
              </div>
              <span className="font-black text-2xl text-on-surface">₹45,000</span>
              <span className="text-xs text-on-surface-variant mt-1">saved by residents</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
              </div>
              <span className="font-black text-2xl text-on-surface">98%</span>
              <span className="text-xs text-on-surface-variant mt-1">satisfaction rate</span>
            </div>
          </div>
        </section>
      </main>

      {/* Create Community Request Modal */}
      {showCreateRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-surface-container">
              <h3 className="font-bold text-base text-on-surface">Propose Collective Service</h3>
              <button
                onClick={() => setShowCreateRequestModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={newRequestTitle}
                  onChange={(e) => setNewRequestTitle(e.target.value)}
                  placeholder="e.g. Society Car Wash Drive, RO Filter Replacement"
                  className="w-full p-2.5 rounded-xl border border-outline-variant text-xs text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Category
                </label>
                <select
                  value={newRequestCategory}
                  onChange={(e) => setNewRequestCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant text-xs text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Appliances">Appliances &amp; Electronics</option>
                  <option value="Plumbing">Plumbing &amp; Water Systems</option>
                  <option value="Cleaning">Deep Cleaning &amp; Sanitization</option>
                  <option value="Pest Control">Pest Control Drive</option>
                  <option value="Carpentry">Carpentry &amp; Woodwork</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Minimum Flats Required to Unlock Discount
                </label>
                <input
                  type="number"
                  min="3"
                  max="50"
                  value={newRequestMinHouses}
                  onChange={(e) => setNewRequestMinHouses(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant text-xs text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="p-3 bg-secondary-container/30 rounded-xl text-[11px] text-on-secondary-container">
                💡 Group requests automatically alert nearby society residents to join. When 5+ flats join, cooperative labor rates decrease by 25-40%!
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateRequestModal(false)}
                  className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-semibold text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold"
                >
                  Publish Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

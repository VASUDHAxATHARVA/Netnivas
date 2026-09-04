import React from 'react';
import { TabType } from '../types';
import { NetNivasLogo } from './NetNivasLogo';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
}

export const BottomNav: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'services', label: 'Services', icon: 'grid_view' },
    { id: 'bookings', label: 'Bookings', icon: 'event_available' },
    { id: 'community', label: 'Community', icon: 'groups' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/60 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:hidden">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold scale-100'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] leading-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const DesktopSidebar: React.FC<NavigationProps> = ({ currentTab, onSelectTab, unreadCount }) => {
  const tabs: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'services', label: 'Services', icon: 'grid_view' },
    { id: 'bookings', label: 'Bookings', icon: 'event_available' },
    { id: 'community', label: 'Community', icon: 'groups' },
    { id: 'notifications', label: 'Activity & Alerts', icon: 'notifications', badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant min-h-screen sticky top-0 p-4 shrink-0 shadow-sm">
      {/* Brand Header with NetNivas Logo */}
      <div className="px-2 py-3 mb-4 border-b border-surface-container">
        <NetNivasLogo size={42} showTagline={true} />
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150 text-left font-label-md ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </div>
              {tab.badge && tab.badge > 0 ? (
                <span className="w-5 h-5 rounded-full bg-error text-on-error text-[11px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Society Quick Card */}
      <div className="mt-auto pt-4 border-t border-surface-container">
        <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">apartment</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-on-surface truncate">Basileo Society</p>
            <p className="text-[11px] text-on-surface-variant truncate">Flat B-402 • Pune</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

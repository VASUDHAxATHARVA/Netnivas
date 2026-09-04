import React, { useState } from 'react';
import { Society, TabType } from '../types';
import { NetNivasLogo } from './NetNivasLogo';

interface ProfileScreenProps {
  currentSociety: Society;
  onBack: () => void;
  onNavigate: (tab: TabType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentSociety, onBack }) => {
  const [activeModal, setActiveModal] = useState<
    'personal' | 'addresses' | 'payments' | 'membership' | 'support' | 'logout' | null
  >(null);
  const [userName, setUserName] = useState('Rushi Patil');
  const [userFlat, setUserFlat] = useState('Flat B-402');
  const [userPhone, setUserPhone] = useState('+91 98224 51092');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full max-w-md md:max-w-3xl mx-auto min-h-screen bg-surface pb-28 md:pb-12 text-on-surface font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toast}
        </div>
      )}

      {/* Top Header */}
      <header className="w-full sticky top-0 bg-surface border-b border-outline-variant flex items-center justify-between px-4 h-14 z-30 shadow-xs">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-primary">Profile</h1>
        <button
          onClick={() => setActiveModal('personal')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 flex flex-col gap-6">
        {/* Profile Summary Section */}
        <section className="flex flex-col items-center text-center gap-2 mt-2">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4wxDXIG3tKvliqXH14VPeQu3A1LgCkZLgo0HplXZmIYJQfa93j7jafLi37_b8JPVxUKWHEywnVldG23Eiej2pJH_pYio5FXEg6KQ25OQHNJsPgAQk4CcYMBUHYwid0KkrC0acC7enQdacSss3ams0V2cC0YZDizqPPoEZexI4iJTWwm_o1iskuwQDU3gYA4uW0iZz67WaHZewYtrLB1D8uyu7zskmjRvzKZO9bDwF287-i6MbQpre"
              alt="Rushi Patil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
            />
            <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1 border-2 border-white shadow-xs flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-1">
            <h2 className="text-2xl font-black text-on-surface tracking-tight">{userName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-secondary-container text-on-secondary-container text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                Verified Member
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">
              {currentSociety.name} • {userFlat}
            </p>
            <p className="text-[11px] text-outline mt-0.5">Joined Oct 2023</p>
          </div>
        </section>

        {/* Menu List */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xs overflow-hidden">
          <nav className="flex flex-col divide-y divide-outline-variant/60">
            {/* 1. Personal Information */}
            <button
              onClick={() => setActiveModal('personal')}
              className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">person_outline</span>
                <span className="text-sm font-semibold text-on-surface">Personal Information</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* 2. Saved Addresses */}
            <button
              onClick={() => setActiveModal('addresses')}
              className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">location_on</span>
                <span className="text-sm font-semibold text-on-surface">Saved Addresses</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* 3. Payment Methods */}
            <button
              onClick={() => setActiveModal('payments')}
              className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">payments</span>
                <span className="text-sm font-semibold text-on-surface">Payment Methods</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* 4. Cooperative Membership Status (Highlighted in Reference Screen 7) */}
            <button
              onClick={() => setActiveModal('membership')}
              className="flex items-center justify-between p-4 bg-primary-fixed/20 hover:bg-primary-fixed/30 transition-colors text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">groups</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    Cooperative Membership Status
                  </span>
                  <span className="text-xs font-semibold text-primary">Active Contributor</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </button>

            {/* 5. Help & Support */}
            <button
              onClick={() => setActiveModal('support')}
              className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">help_outline</span>
                <span className="text-sm font-semibold text-on-surface">Help &amp; Support</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>
          </nav>
        </section>

        {/* Logout Button */}
        <section className="flex justify-center pt-2">
          <button
            onClick={() => setActiveModal('logout')}
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl border border-outline-variant text-error hover:bg-error-container/40 transition-colors w-full md:w-auto text-sm font-semibold active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </section>

        {/* Brand Footer with NetNivas Logo */}
        <section className="flex flex-col items-center justify-center py-6 text-center border-t border-slate-200 mt-2">
          <NetNivasLogo orientation="vertical" size={54} showTagline={true} />
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Version 2.4.0 • Cooperative Housing Society Network
          </p>
        </section>
      </main>

      {/* Sub-modal: Personal Information */}
      {activeModal === 'personal' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-base text-on-surface mb-3">Personal Information</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-outline font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium"
                />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Apartment Flat</label>
                <input
                  type="text"
                  value={userFlat}
                  onChange={(e) => setUserFlat(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium"
                />
              </div>
              <div>
                <label className="block text-outline font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  showToast('Profile information updated successfully!');
                }}
                className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-modal: Saved Addresses */}
      {activeModal === 'addresses' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-base text-on-surface mb-3">Saved Addresses</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl border border-primary bg-primary-fixed/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary">Primary Residence (Current)</span>
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded">Default</span>
                </div>
                <p className="font-semibold text-on-surface">{userFlat}, {currentSociety.name}</p>
                <p className="text-on-surface-variant">{currentSociety.location}, {currentSociety.city}</p>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant bg-surface-container-lowest">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-on-surface">Parents Residence</span>
                </div>
                <p className="font-semibold text-on-surface">Flat 102, Mayur Colony</p>
                <p className="text-on-surface-variant">Kothrud, Pune</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2 bg-primary text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-modal: Payment Methods */}
      {activeModal === 'payments' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-base text-on-surface mb-3">Payment Methods</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-secondary-container/40 border border-secondary/30 flex justify-between items-center">
                <div>
                  <span className="font-bold text-on-secondary-container">Cooperative Wallet Credits</span>
                  <p className="text-xs text-secondary font-bold mt-0.5">₹450.00 available</p>
                </div>
                <span className="text-xs font-bold text-secondary">Auto-applied</span>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                  <div>
                    <p className="font-bold text-on-surface">UPI ID (Google Pay)</p>
                    <p className="text-on-surface-variant">rushi.patil@okhdfcbank</p>
                  </div>
                </div>
                <span className="text-secondary font-bold">✓</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2 bg-primary text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-modal: Cooperative Membership */}
      {activeModal === 'membership' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface">Cooperative Membership</h3>
            <span className="text-xs font-bold text-secondary">Active Contributor Tier</span>

            <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
              Unlike commercial gig platforms charging 25-35% middleman cuts, NetNivas is owned collectively by resident societies and service workers.
            </p>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Zero commission extracted from local electricians &amp; cleaners</span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Society bulk rate camps save 20–40% per home</span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>100% verified KYC &amp; Society Resident background check</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full mt-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Sub-modal: Help & Support */}
      {activeModal === 'support' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-base text-on-surface mb-3">Help &amp; Support</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-error-container/40 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-error-container">Emergency Society Helpline</p>
                  <p className="text-on-error-container/80">+91 20 6712 9000</p>
                </div>
                <button
                  onClick={() => showToast('Connecting to Society Control Room...')}
                  className="px-3 py-1 bg-error text-white rounded-lg text-xs font-bold"
                >
                  Call
                </button>
              </div>

              <div className="p-3 bg-surface-container-lowest border border-outline-variant rounded-xl">
                <p className="font-bold text-on-surface">Basileo Society Helpdesk</p>
                <p className="text-on-surface-variant">Gate A &amp; Tower C Office (8 AM - 8 PM)</p>
              </div>

              <div className="p-3 bg-surface-container-lowest border border-outline-variant rounded-xl">
                <p className="font-bold text-on-surface">Dispute &amp; Service Guarantee</p>
                <p className="text-on-surface-variant">Free re-work within 7 days if not 100% satisfied.</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2 bg-primary text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-modal: Logout Confirmation */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-xs rounded-2xl p-5 shadow-2xl text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">logout</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Logout of NetNivas?</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              You will need to sign in again to access society services.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  showToast('Logged out successfully (Demo reset)');
                }}
                className="flex-1 py-2 bg-error text-white rounded-xl text-xs font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

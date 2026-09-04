import React, { useState } from 'react';

interface EventDetailScreenProps {
  onBack: () => void;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ onBack }) => {
  const [isRsvpd, setIsRsvpd] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [plusOneCount, setPlusOneCount] = useState(0);
  const [showMessageHost, setShowMessageHost] = useState(false);
  const [hostMessage, setHostMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const baseAttendees = 12;
  const currentAttendees = baseAttendees + (isRsvpd ? 1 : 0) + plusOneCount;
  const totalSlots = 20;
  const remainingSlots = Math.max(0, totalSlots - currentAttendees);

  const handleRsvpToggle = () => {
    setIsRsvpd(!isRsvpd);
    if (!isRsvpd) {
      setToastMessage('RSVP Confirmed! See you Sunday 8:00 AM at Clubhouse Lawn.');
    } else {
      setToastMessage('RSVP cancelled for this session.');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePlusOne = () => {
    setPlusOneCount((prev) => prev + 1);
    setToastMessage('Neighbor guest pass added for your flat!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage('Event link copied to clipboard!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-md md:max-w-3xl mx-auto min-h-screen bg-surface pb-32 md:pb-20 text-on-surface">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">info</span>
          {toastMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 pt-3 space-y-4">
        {/* Sub-Header Navigation Bar */}
        <div className="flex items-center justify-between py-2">
          <button
            onClick={onBack}
            aria-label="Back to Community"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-1">
            <span className="text-xs uppercase tracking-wider text-secondary font-semibold bg-secondary-container/40 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">spa</span>
              Wellness Circle
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              aria-label="Share event"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                setToastMessage(isSaved ? 'Removed from saved events' : 'Saved to your events list');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              aria-label="Save event"
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low transition-colors active:scale-95 ${
                isSaved ? 'text-primary' : 'text-on-surface hover:bg-surface-container'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
          </div>
        </div>

        {/* Hero Media Card */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-surface-container aspect-[16/10]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG6yB0qNgkhrgUO6e6tvj4OYNHqv4abM0_aZlEEADHtoNz9oBHqOEp7JfWUHbSnmnLJmSPqkYs61XWQosGugRFc-i8GsCXKIppvP0SlnRhv5T1Qwu3LarV9UUG1MvSH_xC-tBeuqMcvS-ujSqIicBHequmJ0v3htKVpi-jd5xnMvwB2tHHayZyOTa8RV18l-Guuq5niTjnUyRLAaJthoSK-7j4M2GXJ3rcVF4QXnMhgXsoXspWOAMD"
            alt="Basileo Society morning yoga meetup on the lush clubhouse lawn"
            className="w-full h-full object-cover"
          />

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-white shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Free Event
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface/90 backdrop-blur-md text-on-surface shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">park</span>
              Clubhouse Lawn
            </span>
          </div>

          {/* Bottom Scrim Badge */}
          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-secondary-fixed">wb_sunny</span>
            Clear morning: 23°C
          </div>
        </div>

        {/* Event Header Section */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex flex-col gap-1 border border-outline-variant/60">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="text-[11px] font-bold tracking-wider uppercase">Basileo Community Verified</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface leading-snug">Basileo Society Yoga Meetup</h2>
          <p className="text-sm text-on-surface-variant">Sunday Morning Flow &amp; Guided Breathwork</p>

          {/* Host Details Strip */}
          <div className="mt-2 pt-3 border-t border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary-fixed shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf1H_OfQeZo9oXMHPyHjyDvTCe_c1YCNBsbQxXix8IrxmqHvqkQ2i8QufvOrZ0DqRDoUViXU77UiaRss5cro-PpOS6uZ0DfHRVTslK6QB2_lquD2s-1OUKscbwfdELwuUfM4eK6Vlx2q-2PdcbDclMhWMYC4DueuLe-Gh_hA6ePmdYyAu-HiPpmzEjvAO-ZRUDRyeTahB8TQLio1wrCVGsGGR7dRjw8TajrSUgg4-TskYwiZYnXTy_"
                  alt="Priya Deshmukh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-on-surface truncate">Priya Deshmukh</span>
                  <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                </div>
                <span className="text-xs text-on-surface-variant truncate">Certified Instructor • Flat B-402</span>
              </div>
            </div>
            <button
              onClick={() => setShowMessageHost(true)}
              className="text-xs text-primary font-semibold hover:underline shrink-0 px-2 py-1"
              type="button"
            >
              Message Host
            </button>
          </div>
        </div>

        {/* Key Logistics Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Time Card */}
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-outline-variant/60 flex flex-col gap-1">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-0.5">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
            <span className="text-xs text-on-surface-variant">Date &amp; Time</span>
            <span className="text-sm font-semibold text-on-surface">Sun, 8:00 - 9:15 AM</span>
            <span className="text-xs text-secondary font-medium">75 mins session</span>
          </div>

          {/* Location Card */}
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-outline-variant/60 flex flex-col gap-1">
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-container mb-0.5">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
            </div>
            <span className="text-xs text-on-surface-variant">Location</span>
            <span className="text-sm font-semibold text-on-surface">Clubhouse Lawn</span>
            <span className="text-xs text-on-surface-variant truncate">Near Tower C Gazebo</span>
          </div>

          {/* Level Card */}
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-outline-variant/60 flex flex-col gap-1">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container mb-0.5">
              <span className="material-symbols-outlined text-[18px]">self_improvement</span>
            </div>
            <span className="text-xs text-on-surface-variant">Experience</span>
            <span className="text-sm font-semibold text-on-surface">All Levels</span>
            <span className="text-xs text-on-surface-variant">Beginner-friendly</span>
          </div>

          {/* Gear Card */}
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-outline-variant/60 flex flex-col gap-1">
            <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface mb-0.5">
              <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            </div>
            <span className="text-xs text-on-surface-variant">What to Bring</span>
            <span className="text-sm font-semibold text-on-surface">Mat &amp; Bottle</span>
            <span className="text-xs text-on-surface-variant">Spare mats at desk</span>
          </div>
        </div>

        {/* Attendees & Social Proof Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
              <span className="text-base font-bold text-on-surface">
                {currentAttendees} Neighbors Going
              </span>
            </div>
            <span className="text-xs font-semibold bg-secondary-fixed/50 text-on-secondary-container px-2.5 py-0.5 rounded-full">
              {remainingSlots} slots open
            </span>
          </div>

          {/* Avatar Stack */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV1YWmT2YwrpUiJBoVeK9_ESHlcB-pkmHDDAyVbvnVaZsGH8JgW7oIByOgwtwmAo0KlFvY4omt7tSpZ-XPTPxX0L56mQOi_8I10aLK6jaopp8PzZHVMLILqSlirnSP5F1EUDf3lBuq4U3g0EpEHmYu2t86ez0U_wdEeEj0lQF1e4NSi-jNbLGFG-c-P90hdeSMlN_xBwhjEAVcgS1lySJDrc-P2tx6W5E9F8gx_tt5vnKH_7_1wlRn"
                  alt="Sneha M"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__6ho0Z9H9zljUy4Iq0MYGN0Ol_yf0ZppCNwlJ-vWAT5hNhzZFv_DreYgzxG1ojoeHeWYxatE8RJsDQ3IZHqbw6mJGI2QUqquhVNrgotOas9WyJCtodTadU71toN5ZqWJBrAea2XSc24Lv2oT4M4GEo2WBUHe_qieIAp93otLeF2366Rm7aqt46DsLmuMiA6_iSuRxBb3h7eVgvSqJC-_iXlAgiWN_0Q6taI2W2DRX3PLD1c_fKK2"
                  alt="Rahul P"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuT6HF_bEawNBx3XYIRT7vA0PzTYn0Y1wJW8tWgOyU0nhyZCor-RwteqzLiYltTpM9LzW_WTTaLfQwvZW6caA2zkR7uz99gPY2g2UAZzGwJ8xlRo3kwUk1xRZMsw2mjnMkVBcdIzbGRJEec0EH6yi-Tt8JrfMaDtXYItCpUHR559J6NKzbVGHXGy4zZ3cp69GN_KMQNq1pOzDJwb17El2lcAUIdf80ih9Yf4AfvbMswd4PVYmUJ1wr"
                  alt="Amit K"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-primary text-on-primary items-center justify-center text-xs font-bold">
                +{currentAttendees - 3}
              </div>
            </div>
            <span className="text-xs text-on-surface-variant ml-1">
              Sneha, Rahul, Amit &amp; {currentAttendees - 3} more
            </span>
          </div>

          {/* Resident Quote */}
          <div className="bg-surface-container-low rounded-xl p-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
              format_quote
            </span>
            <div className="flex flex-col">
              <p className="text-xs text-on-surface italic leading-relaxed">
                "Can't wait! Last month's session on the lawn was so refreshing and calm."
              </p>
              <span className="text-[11px] font-semibold text-on-surface-variant mt-1">
                — Sneha M. (Tower A-204)
              </span>
            </div>
          </div>
        </div>

        {/* Session Flow (Timeline) */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/60">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
            <h3 className="text-base font-bold text-on-surface">Session Flow</h3>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-highest">
            {/* Item 1 */}
            <div className="relative flex flex-col gap-0.5">
              <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface">Pranayama &amp; Breathwork</span>
                <span className="text-xs font-medium text-primary">08:00 AM</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Gentle diaphragmatic breathing and grounding to start the day.
              </p>
            </div>

            {/* Item 2 */}
            <div className="relative flex flex-col gap-0.5">
              <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface">Surya Namaskar &amp; Flow</span>
                <span className="text-xs font-medium text-primary">08:15 AM</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Gentle classical sun salutations with variations for all flexibilities.
              </p>
            </div>

            {/* Item 3 */}
            <div className="relative flex flex-col gap-0.5">
              <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface">Shavasana &amp; Herbal Chai</span>
                <span className="text-xs font-semibold text-secondary">08:50 AM</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Guided corpse pose relaxation followed by neighbor meet &amp; warm tea.
              </p>
            </div>
          </div>
        </div>

        {/* Community Perks */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/60 flex flex-col gap-3">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">workspace_premium</span>
            Included for Residents
          </h3>

          <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_cafe</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Complimentary Herbal Chai</span>
              <span className="text-[11px] text-on-surface-variant">
                Fresh lemongrass and ginger brew served right after class.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined text-[18px]">forum</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Resident Circle Networking</span>
              <span className="text-[11px] text-on-surface-variant">
                Get to know fellow wing neighbors in a relaxed setting.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky RSVP Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/60 px-4 py-3 pb-safe">
        <div className="max-w-md md:max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Price and Remaining Slots */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface">Free</span>
              <span className="text-xs text-on-surface-variant">/ resident</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-secondary font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {remainingSlots} spots remaining
            </div>
          </div>

          {/* Action Buttons Group */}
          <div className="flex flex-col items-end gap-1 flex-1 max-w-[210px]">
            <button
              onClick={handleRsvpToggle}
              className={`w-full h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all ${
                isRsvpd
                  ? 'bg-secondary text-white'
                  : 'bg-primary hover:bg-primary-container text-white'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isRsvpd ? 'done_all' : 'check'}
              </span>
              <span>{isRsvpd ? 'RSVP Confirmed!' : 'Confirm RSVP'}</span>
            </button>
            <button
              onClick={handlePlusOne}
              className="text-[11px] text-primary font-semibold hover:underline flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">person_add</span>
              <span>Add +1 Neighbor {plusOneCount > 0 ? `(${plusOneCount})` : ''}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Host Modal */}
      {showMessageHost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-surface-container">
              <h3 className="font-bold text-base text-on-surface">Message Priya Deshmukh</h3>
              <button
                onClick={() => setShowMessageHost(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Your question or request
              </label>
              <textarea
                rows={3}
                value={hostMessage}
                onChange={(e) => setHostMessage(e.target.value)}
                placeholder="e.g. Can I bring my 10-year-old child? Are there extra yoga mats available?"
                className="w-full p-2.5 rounded-xl border border-outline-variant text-xs text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowMessageHost(false)}
                className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-semibold text-on-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowMessageHost(false);
                  setHostMessage('');
                  setToastMessage('Message sent to Priya Deshmukh (Flat B-402)!');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Booking, TabType } from '../types';

interface BookingsScreenProps {
  bookings: Booking[];
  onBack: () => void;
  onNavigate: (tab: TabType) => void;
  onReschedule: (bookingId: string, newTime: string) => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  onBack,
  onNavigate,
  onReschedule,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedBookingForTrack, setSelectedBookingForTrack] = useState<Booking | null>(null);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState('Tomorrow, 02:00 PM');
  const [chatWorker, setChatWorker] = useState<Booking | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hello Rushi sir! I have entered the Basileo Society main gate.',
    'Coming up to Tower B Flat 402 in 5 minutes.',
  ]);
  const [chatInput, setChatInput] = useState('');
  const [callWorker, setCallWorker] = useState<Booking | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="w-full max-w-md md:max-w-3xl mx-auto min-h-screen bg-background pb-28 md:pb-12 text-on-background">
      {/* Top Header */}
      <header className="w-full h-14 bg-surface border-b border-outline-variant flex items-center px-4 sticky top-0 z-30">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 flex items-center justify-center -ml-2 text-on-surface hover:bg-surface-container rounded-full active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-on-surface">Bookings</h1>
        <button
          onClick={() => onNavigate('notifications')}
          aria-label="More options"
          className="w-10 h-10 flex items-center justify-center -mr-2 text-on-surface hover:bg-surface-container rounded-full active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">more_vert</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="px-4 pt-4 flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex border-b border-surface-container-highest w-full bg-surface-container-lowest rounded-t-xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 border-b-2 font-semibold text-sm text-center transition-all ${
              activeTab === 'upcoming'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 border-b-2 font-semibold text-sm text-center transition-all ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            History ({pastBookings.length})
          </button>
        </div>

        {/* Upcoming View */}
        {activeTab === 'upcoming' && (
          <div className="flex flex-col gap-4">
            {upcomingBookings.map((b) => {
              const isOnTheWay = b.status === 'on_the_way';
              return (
                <article
                  key={b.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs relative overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Top colored accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${isOnTheWay ? 'bg-secondary' : 'bg-primary'}`} />

                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      {isOnTheWay ? (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />
                          On the way
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-1.5">
                          Worker Assigned
                        </div>
                      )}

                      <h2 className="text-lg font-bold text-on-surface">{b.serviceTitle}</h2>
                      <p className="text-sm text-on-surface-variant flex items-center mt-1">
                        <span className="material-symbols-outlined text-[18px] mr-1 text-primary">
                          {isOnTheWay ? 'schedule' : 'event'}
                        </span>
                        {isOnTheWay ? `ETA: ${b.etaMinutes || 12} min` : b.scheduledTime}
                      </p>
                    </div>

                    {b.workerPhoto && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container shadow-xs shrink-0">
                        <img
                          src={b.workerPhoto}
                          alt={b.workerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Worker row */}
                  {b.workerName && (
                    <div className="flex items-center py-2.5 border-t border-surface-container mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-on-surface-variant">Technician</p>
                        <p className="text-sm font-semibold text-on-surface truncate">
                          {b.workerName} ★ {b.workerRating}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCallWorker(b)}
                          aria-label="Call Worker"
                          className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">call</span>
                        </button>
                        <button
                          onClick={() => setChatWorker(b)}
                          aria-label="Message Worker"
                          className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">chat</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  {isOnTheWay ? (
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={() => setSelectedBookingForTrack(b)}
                        className="flex-1 min-h-[44px] bg-primary hover:bg-primary-container text-on-primary rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 active:scale-98 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">near_me</span>
                        Track Service
                      </button>
                      <button
                        onClick={() => setSelectedBookingForDetails(b)}
                        className="flex-1 min-h-[44px] border border-primary text-primary hover:bg-primary/5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center active:scale-98"
                      >
                        View Details
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end pt-2 border-t border-surface-container">
                      <button
                        onClick={() => setReschedulingBooking(b)}
                        className="min-h-[40px] px-5 border border-outline-variant text-on-surface-variant hover:text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container transition-colors active:scale-95"
                      >
                        Reschedule
                      </button>
                    </div>
                  )}
                </article>
              );
            })}

            {upcomingBookings.length === 0 && (
              <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-outline-variant">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
                <p className="text-sm font-semibold text-on-surface">No upcoming bookings</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-3 px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container"
                >
                  Book a Service
                </button>
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-4">
            {pastBookings.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-outline-variant flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-outline mb-2">history</span>
                <p className="text-base font-semibold text-on-surface">No past services found</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Completed services and invoices will be archived here.
                </p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-4 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              pastBookings.map((b) => (
                <article
                  key={b.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold text-secondary bg-secondary-container px-2 py-0.5 rounded">
                        Completed
                      </span>
                      <h3 className="text-base font-bold text-on-surface mt-1">{b.serviceTitle}</h3>
                      <p className="text-xs text-on-surface-variant">{b.scheduledTime}</p>
                    </div>
                    <span className="text-sm font-bold text-on-surface">₹{b.price}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-container mt-2">
                    <span className="text-xs text-on-surface-variant">By {b.workerName}</span>
                    <button
                      onClick={() => setSelectedBookingForDetails(b)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View Invoice
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </main>

      {/* Live Track Service Modal */}
      {selectedBookingForTrack && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary animate-ping" />
                <h3 className="font-bold text-base text-on-surface">Live Tracking Technician</h3>
              </div>
              <button
                onClick={() => setSelectedBookingForTrack(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Simulated Live Map */}
            <div className="mt-4 relative w-full h-44 rounded-xl overflow-hidden bg-slate-200 border border-outline-variant flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              {/* Society complex marker */}
              <div className="absolute right-12 top-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-primary/20">
                  <span className="material-symbols-outlined text-[20px]">apartment</span>
                </div>
                <span className="bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">
                  Basileo Gate
                </span>
              </div>

              {/* Worker bike marker */}
              <div className="absolute left-16 bottom-8 flex flex-col items-center animate-bounce">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg ring-4 ring-secondary/30">
                  <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                </div>
                <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">
                  Rahul (12 min)
                </span>
              </div>

              {/* Connecting dashed route */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="80"
                  y1="130"
                  x2="350"
                  y2="60"
                  stroke="#006c4a"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>

            {/* Verification OTP Box */}
            <div className="mt-4 bg-primary-fixed/30 border border-primary/30 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">Start Service Code</p>
                <p className="text-xs text-on-surface-variant">Share this OTP with technician upon arrival</p>
              </div>
              <div className="px-4 py-1.5 bg-primary text-white font-mono font-bold text-xl rounded-lg tracking-widest shadow-xs">
                {selectedBookingForTrack.otp}
              </div>
            </div>

            {/* Worker contact */}
            <div className="mt-4 flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBookingForTrack.workerPhoto}
                  alt={selectedBookingForTrack.workerName}
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{selectedBookingForTrack.workerName}</h4>
                  <p className="text-xs text-on-surface-variant">
                    Verified Society Partner • ★ {selectedBookingForTrack.workerRating}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCallWorker(selectedBookingForTrack)}
                  className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBookingForTrack(null);
                    setChatWorker(selectedBookingForTrack);
                  }}
                  className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </button>
              </div>
            </div>

            {/* Status Steps */}
            <div className="mt-4 space-y-3 pl-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[12px]">✓</span>
                <span className="font-semibold text-on-surface">11:15 AM - Booking Confirmed &amp; Dispatched</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[12px]">✓</span>
                <span className="font-semibold text-on-surface">11:18 AM - Rahul picked tools &amp; departed workshop</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[12px] animate-pulse">●</span>
                <span className="font-semibold text-primary">Now - Approaching Pimple Gurav junction (1.2 km away)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl p-5 shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-surface-container">
              <h3 className="font-bold text-lg text-on-surface">Booking Details</h3>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Booking ID</span>
                <span className="font-mono font-semibold text-on-surface">{selectedBookingForDetails.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Service</span>
                <span className="font-semibold text-on-surface">{selectedBookingForDetails.serviceTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Scheduled Time</span>
                <span className="font-semibold text-on-surface">{selectedBookingForDetails.scheduledTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Service Address</span>
                <span className="font-semibold text-on-surface text-right max-w-[200px]">
                  {selectedBookingForDetails.address}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Technician</span>
                <span className="font-semibold text-on-surface">{selectedBookingForDetails.workerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container text-base font-bold">
                <span className="text-on-surface">Total Amount</span>
                <span className="text-primary">₹{selectedBookingForDetails.price}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="w-full py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-lg text-on-surface">Reschedule Service</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Select a new preferred time slot for {reschedulingBooking.serviceTitle}.
            </p>

            <div className="mt-4 space-y-2">
              {[
                'Tomorrow, 10:00 AM',
                'Tomorrow, 02:00 PM',
                'Tomorrow, 05:00 PM',
                'Day After, 11:00 AM',
              ].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setNewTimeSlot(slot)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    newTimeSlot === slot
                      ? 'bg-primary-fixed/40 border-primary text-primary'
                      : 'border-outline-variant hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setReschedulingBooking(null)}
                className="flex-1 py-2 border border-outline-variant text-on-surface rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReschedule(reschedulingBooking.id, newTimeSlot);
                  setReschedulingBooking(null);
                }}
                className="flex-1 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat with Worker Modal */}
      {chatWorker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <img
                  src={chatWorker.workerPhoto}
                  alt={chatWorker.workerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{chatWorker.workerName}</h4>
                  <span className="text-[11px] text-secondary font-semibold">Online • In Transit</span>
                </div>
              </div>
              <button
                onClick={() => setChatWorker(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chat message history */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {chatMessages.map((msg, i) => (
                <div key={i} className="flex flex-col items-start">
                  <div className="max-w-[80%] bg-surface-container-lowest border border-outline-variant text-on-surface p-3 rounded-2xl rounded-tl-xs text-xs shadow-xs">
                    {msg}
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-0.5 ml-1">Just now</span>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="pt-2 border-t border-surface-container flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    setChatMessages([...chatMessages, chatInput.trim()]);
                    setChatInput('');
                  }
                }}
                placeholder="Type a message to technician..."
                className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => {
                  if (chatInput.trim()) {
                    setChatMessages([...chatMessages, chatInput.trim()]);
                    setChatInput('');
                  }
                }}
                className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Call Modal */}
      {callWorker && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-xs rounded-2xl p-6 text-center shadow-2xl flex flex-col items-center">
            <img
              src={callWorker.workerPhoto}
              alt={callWorker.workerName}
              className="w-20 h-20 rounded-full object-cover border-2 border-secondary mb-3 shadow-lg"
            />
            <h4 className="font-bold text-lg">{callWorker.workerName}</h4>
            <p className="text-xs text-slate-300 mb-1">{callWorker.workerPhone}</p>
            <p className="text-xs text-secondary font-semibold animate-pulse mb-6">Calling technician...</p>

            <button
              onClick={() => setCallWorker(null)}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[24px]">call_end</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ServiceItem, Society } from '../types';

interface BookingModalProps {
  service: ServiceItem | null;
  currentSociety: Society;
  onClose: () => void;
  onConfirm: (bookingDetails: {
    service: ServiceItem;
    scheduledTime: string;
    flat: string;
    notes: string;
    paymentMethod: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  currentSociety,
  onClose,
  onConfirm,
}) => {
  if (!service) return null;

  const [dateOption, setDateOption] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [flat, setFlat] = useState('Flat B-402');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay After Service Completion');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      service,
      scheduledTime: `${dateOption}, ${timeSlot}`,
      flat: `${flat}, ${currentSociety.name}`,
      notes,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 text-on-surface">
        <div className="flex justify-between items-center pb-3 border-b border-surface-container">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Book Cooperative Gig</span>
            <h3 className="font-bold text-base text-on-surface">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Service Snapshot */}
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
            <img
              src={service.image}
              alt={service.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-on-surface truncate">{service.title}</h4>
              <p className="text-xs text-on-surface-variant">{service.duration}</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-primary">₹{service.price}</span>
                {service.originalPrice && (
                  <span className="text-[11px] text-slate-400 line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
                <span className="text-[10px] text-secondary font-semibold bg-secondary-container/50 px-1.5 py-0.5 rounded">
                  Society Price
                </span>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block font-semibold text-on-surface mb-1.5">Select Day</label>
            <div className="grid grid-cols-3 gap-2">
              {['Today', 'Tomorrow', 'This Weekend'].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDateOption(d)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    dateOption === d
                      ? 'bg-primary-fixed/40 border-primary text-primary font-bold'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block font-semibold text-on-surface mb-1.5">Select Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTimeSlot(t)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    timeSlot === t
                      ? 'bg-primary-fixed/40 border-primary text-primary font-bold'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Apartment Flat Address */}
          <div>
            <label className="block font-semibold text-on-surface mb-1">
              Apartment / Flat ({currentSociety.name})
            </label>
            <input
              type="text"
              required
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              placeholder="e.g. Flat B-402, Tower B"
              className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-on-surface mb-1">
              Instructions for Technician (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please bring extra 15A socket; doorbell is broken"
              className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block font-semibold text-on-surface mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Pay After Service Completion">Pay After Service (Cash / UPI on spot)</option>
              <option value="Cooperative Wallet Credits">Cooperative Wallet Credits (₹450 available)</option>
              <option value="UPI / Online">Online UPI Payment</option>
            </select>
          </div>

          {/* Pricing breakdown */}
          <div className="p-3 bg-surface-container-lowest border border-outline-variant rounded-xl space-y-1 text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Standard Service Fee</span>
              <span>₹{service.originalPrice || service.price + 150}</span>
            </div>
            <div className="flex justify-between text-secondary font-semibold">
              <span>Basileo Resident Cooperative Discount</span>
              <span>-₹{(service.originalPrice || service.price + 150) - service.price}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-on-surface pt-1 border-t border-surface-container">
              <span>Final Payable</span>
              <span className="text-primary">₹{service.price}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-outline-variant rounded-xl font-semibold text-on-surface hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl font-semibold shadow-xs"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

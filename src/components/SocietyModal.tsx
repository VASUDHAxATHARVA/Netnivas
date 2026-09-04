import React from 'react';
import { Society } from '../types';
import { INITIAL_SOCIETIES } from '../data';
import { NetNivasEmblem } from './NetNivasLogo';

interface SocietyModalProps {
  isOpen: boolean;
  currentSociety: Society;
  onClose: () => void;
  onSelectSociety: (society: Society) => void;
}

export const SocietyModal: React.FC<SocietyModalProps> = ({
  isOpen,
  currentSociety,
  onClose,
  onSelectSociety,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 text-on-surface">
        <div className="flex justify-between items-center pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <NetNivasEmblem size={24} />
            <h3 className="font-bold text-base text-on-surface">Select Society</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {INITIAL_SOCIETIES.map((soc) => {
            const isSelected = soc.id === currentSociety.id;
            return (
              <div
                key={soc.id}
                onClick={() => {
                  onSelectSociety(soc);
                  onClose();
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary-fixed/20 ring-1 ring-primary'
                    : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container'
                }`}
              >
                <img
                  src={soc.image}
                  alt={soc.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface truncate">{soc.name}</h4>
                  <p className="text-xs text-on-surface-variant">{soc.location}, {soc.city}</p>
                  <span className="text-[10px] text-secondary font-semibold">
                    {soc.flatsCount} Connected Homes
                  </span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    check_circle
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 border border-outline-variant text-on-surface rounded-xl text-xs font-semibold hover:bg-surface-container"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

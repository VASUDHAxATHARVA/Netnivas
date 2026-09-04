import React from 'react';

interface NetNivasLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  showTagline?: boolean;
  orientation?: 'horizontal' | 'vertical';
  taglineColor?: string;
  textColor?: string;
}

export const NetNivasEmblem: React.FC<{ size?: number | string; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 800 800"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <filter id="emblem-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#0066d6" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Soft circular background badge */}
      <circle cx="400" cy="365" r="215" fill="#F0F6FF" filter="url(#emblem-shadow)" />

      {/* Outer Blue Chevron Roof */}
      <path
        d="M 255 330 L 400 185 L 545 330"
        stroke="#0066D6"
        strokeWidth="36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Apex and Left Joint Nodes (Darker Blue) */}
      <circle cx="400" cy="185" r="18" fill="#0048A0" />
      <circle cx="255" cy="330" r="18" fill="#0048A0" />

      {/* Emerald Green Accent Dots on Roof Arms */}
      <circle cx="328" cy="258" r="8" fill="#00B875" />
      <circle cx="472" cy="258" r="8" fill="#00B875" />

      {/* Emerald Green Shelter Loop (House body with open left entrance) */}
      <path
        d="M 300 360 L 400 260 L 505 365 C 532 392 536 430 514 462 C 496 488 466 525 435 525 C 418 525 400 515 385 500 L 300 415"
        stroke="#00A86B"
        strokeWidth="36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Blue Donut Ring (Community Core) */}
      <circle cx="400" cy="355" r="34" fill="#0066D6" />
      <circle cx="400" cy="355" r="14" fill="#FFFFFF" />
    </svg>
  );
};

export const NetNivasLogo: React.FC<NetNivasLogoProps> = ({
  className = '',
  size = 44,
  showText = true,
  showTagline = true,
  orientation = 'horizontal',
  taglineColor = 'text-slate-500',
  textColor = 'text-slate-900',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <NetNivasEmblem size={size || 110} />
        {showText && (
          <div className="mt-3 flex flex-col items-center select-none">
            <div className="text-3xl font-black tracking-tight leading-none">
              <span className={textColor}>Net</span>
              <span className="text-[#0066D6]">Nivas</span>
            </div>
            {showTagline && (
              <span
                className={`text-[9.5px] font-bold tracking-[0.25em] uppercase mt-1.5 ${taglineColor}`}
              >
                COMMUNITY &amp; SERVICES
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <NetNivasEmblem size={size || 40} />
      {showText && (
        <div className="flex flex-col leading-none select-none">
          <div className="text-lg font-black tracking-tight">
            <span className={textColor}>Net</span>
            <span className="text-[#0066D6]">Nivas</span>
          </div>
          {showTagline && (
            <span
              className={`text-[7.5px] font-bold tracking-[0.2em] uppercase mt-0.5 ${taglineColor}`}
            >
              COMMUNITY &amp; SERVICES
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NetNivasLogo;

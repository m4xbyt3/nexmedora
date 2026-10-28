import React from 'react';

export interface NexmedoraLogoProps {
  className?: string;
  alt?: string;
  variant?: 'header' | 'footer' | 'drawer' | 'preloader' | 'modal';
}

const LOGO_SRC = '/assets/aistudio/PNG_21df99bb.png';
const LOGO_ALT = 'Nexmedora Healthcare Solutions logo';

export const NexmedoraLogo: React.FC<NexmedoraLogoProps> = ({
  className = '',
  alt = LOGO_ALT,
  variant = 'header',
}) => {
  // Footer: placed on a small white rounded badge (white background, 12px radius, 10px padding, soft shadow)
  // about 48px tall on desktop and 40px on mobile
  if (variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white rounded-[12px] p-[10px] shadow-sm select-none shrink-0 ${className}`}
      >
        <img
          src={LOGO_SRC}
          alt={alt}
          className="h-[40px] sm:h-[48px] w-auto max-h-[40px] sm:max-h-[48px] object-contain object-left pointer-events-none"
        />
      </div>
    );
  }

  // Preloader: centered on a white rounded badge, about 64px tall, with no effects on the logo itself
  if (variant === 'preloader') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white rounded-2xl px-6 py-4 shadow-md select-none shrink-0 ${className}`}
      >
        <img
          src={LOGO_SRC}
          alt={alt}
          className="h-[64px] w-auto max-h-[64px] object-contain object-center pointer-events-none"
        />
      </div>
    );
  }

  // Mobile drawer: top of the drawer, about 40px tall
  if (variant === 'drawer') {
    return (
      <div className={`relative inline-flex items-center select-none ${className}`}>
        <img
          src={LOGO_SRC}
          alt={alt}
          className="h-[40px] w-auto max-h-[40px] object-contain object-left pointer-events-none"
        />
      </div>
    );
  }

  // Modal variant (e.g. Audit modal or AskNexmedora AI modal): about 36px - 40px tall
  if (variant === 'modal') {
    return (
      <div className={`relative inline-flex items-center select-none ${className}`}>
        <img
          src={LOGO_SRC}
          alt={alt}
          className="h-[36px] sm:h-[40px] w-auto max-h-[36px] sm:max-h-[40px] object-contain object-left pointer-events-none"
        />
      </div>
    );
  }

  // Default / Header (white background):
  // left side, about 48px tall on desktop and 40px on mobile. Keep header height comfortable.
  return (
    <div
      className={`relative inline-flex items-center select-none transition-opacity duration-300 ${className}`}
    >
      <img
        src={LOGO_SRC}
        alt={alt}
        className="h-[40px] md:h-[48px] w-auto max-h-[40px] md:max-h-[48px] object-contain object-left pointer-events-none"
      />
    </div>
  );
};

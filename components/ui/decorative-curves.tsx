export function DecorativeCurves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full decorative-curve"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Golden flowing curves */}
      <path
        d="M0 400 Q 300 200, 600 400 T 1200 400"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M0 500 Q 350 300, 700 500 T 1400 500"
        stroke="url(#gradient2)"
        strokeWidth="4"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M-100 300 Q 250 100, 550 300 T 1100 300"
        stroke="url(#gradient3)"
        strokeWidth="2"
        fill="none"
        opacity="0.25"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFB347" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DecorativeCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle - top right */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full
                      bg-gradient-to-br from-brand-orange-500/10 to-brand-gold-500/5
                      blur-3xl"
      />
      {/* Medium circle - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full
                      bg-gradient-to-tr from-brand-gold-500/10 to-brand-orange-500/5
                      blur-3xl"
      />
      {/* Small circle - middle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-64 h-64 rounded-full
                      bg-gradient-to-br from-brand-orange-400/5 to-transparent
                      blur-2xl animate-pulse"
      />
    </div>
  );
}

export function WankyMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#FF4D94" />
        </linearGradient>
      </defs>
      {/* Precision Cloud Path - Simplified for high-end feel */}
      <path
        d="M32.5 75C22.8 75 15 67.2 15 57.5C15 48.9 21.2 41.7 29.5 40.2C31.4 28.6 41.5 20 53.5 20C63.8 20 72.7 26.4 76.1 35.6C84.2 37.1 90.5 44.2 90.5 52.8C90.5 62.5 82.7 70.3 73 70.3H32.5V75Z"
        fill="url(#pinkGradient)"
      />
    </svg>
  );
}
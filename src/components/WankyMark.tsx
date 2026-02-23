export function WankyMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Wanky"
    >
      <defs>
        <radialGradient id="bg" cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#FFD1EA" />
          <stop offset="60%" stopColor="#FF7AC8" />
          <stop offset="100%" stopColor="#FF62BE" />
        </radialGradient>
        <radialGradient id="glass" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.90" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {/* Rounded background tile for icon consistency */}
      <rect width="512" height="512" rx="120" fill="url(#bg)" />

      {/* Cloud */}
      <path
        d="M170 354C118 354 76 320 76 276C76 238 104 206 145 198C160 152 202 120 252 120C309 120 356 161 360 214C402 219 436 252 436 294C436 328 407 354 370 354H170Z"
        fill="white"
        opacity="0.96"
      />

      {/* Abstract “flow” mark (no letters) */}
      <path
        d="M246 170C286 170 318 194 318 226C318 253 296 276 266 276C242 276 224 261 224 240C224 221 239 206 259 206C271 206 281 212 288 224C286 205 269 194 246 194C216 194 194 214 194 242C194 281 227 308 268 308C315 308 352 274 352 226C352 175 306 146 246 146C205 146 172 162 152 190C170 176 204 170 226 170H246Z"
        fill="url(#glass)"
      />

      <circle cx="210" cy="220" r="14" fill="#FFFFFF" opacity="0.55" />
    </svg>
  );
}
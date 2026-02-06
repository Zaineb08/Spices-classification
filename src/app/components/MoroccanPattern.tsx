export function MoroccanPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="moroccan-pattern"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Zellige-inspired tile pattern */}
          <g opacity="0.04">
            {/* Center octagon */}
            <path
              d="M100 40 L130 55 L145 85 L145 115 L130 145 L100 160 L70 145 L55 115 L55 85 L70 55 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            
            {/* Corner elements */}
            <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="170" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="170" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="170" cy="170" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Connecting lines */}
            <path
              d="M45 30 L70 55 M130 55 L155 30 M45 170 L70 145 M130 145 L155 170"
              stroke="currentColor"
              strokeWidth="1"
            />
            
            {/* Inner diamond */}
            <path
              d="M100 60 L120 100 L100 140 L80 100 Z"
              fill="currentColor"
              opacity="0.3"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
    </svg>
  );
}
interface LogoProps {
  className?: string
  isWhite?: boolean
}

export function Logo({ className, isWhite = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        <rect width="40" height="40" rx="8" fill={isWhite ? "white" : "hsl(220, 54%, 20%)"} />
        <path
          d="M12 10C12 9.44772 12.4477 9 13 9H27C27.5523 9 28 9.44772 28 10V22C28 22.5523 27.5523 23 27 23H13C12.4477 23 12 22.5523 12 22V10Z"
          fill={isWhite ? "hsl(220, 54%, 20%)" : "white"}
        />
        <rect x="16" y="23" width="8" height="8" fill={isWhite ? "hsl(36, 60%, 60%)" : "hsl(36, 60%, 60%)"} />
        <path d="M20 9V31" stroke={isWhite ? "hsl(220, 54%, 20%)" : "white"} strokeWidth="2" />
      </svg>
      <div>
        <span className={`font-serif font-bold text-xl ${isWhite ? "text-white" : "text-decant-blue"}`}>
          Decant<span className="text-decant-gold">AQP</span>
        </span>
        <div className={`text-xs ${isWhite ? "text-white/80" : "text-gray-600"}`}>Perfumes Exclusivos</div>
      </div>
    </div>
  )
}


import React from 'react'

export default function AnimatedChicken() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 bg-[#FAF5EC]">
      <style>{`
        /* Animation Classes */
        .chicken-move {
          animation: moveForward 6s ease-in-out infinite;
        }
        
        .chicken-bounce {
          animation: bounceWalk 6s linear infinite;
        }
        
        .sit-down-body {
          animation: sitBody 6s ease-in-out infinite;
          transform-origin: center;
        }
        
        .hide-legs {
          animation: hideLegs 6s ease-in-out infinite;
          transform-origin: top;
        }
        
        .leg-left {
          animation: walkLegs 6s linear infinite;
        }
        
        .leg-right {
          animation: walkLegs 6s linear infinite;
          animation-delay: -0.2s; /* Offset for realistic walking */
        }

        /* Keyframes for Moving Forward */
        @keyframes moveForward {
          0% { transform: translateX(-100px); }
          50% { transform: translateX(250px); }
          90% { transform: translateX(250px); }
          100% { transform: translateX(-100px); opacity: 0; }
        }

        /* Keyframes for Bobbing Up & Down while Walking */
        @keyframes bounceWalk {
          0%, 10%, 20%, 30%, 40%, 50% { transform: translateY(0); }
          5%, 15%, 25%, 35%, 45% { transform: translateY(-12px); }
          51%, 100% { transform: translateY(0); }
        }

        /* Keyframes for Leg Swinging */
        @keyframes walkLegs {
          0% { transform: rotate(0deg); }
          5%, 15%, 25%, 35%, 45% { transform: rotate(20deg); }
          10%, 20%, 30%, 40% { transform: rotate(-20deg); }
          50%, 100% { transform: rotate(0deg); }
        }

        /* Keyframes for Body Sitting Down */
        @keyframes sitBody {
          0%, 50% { transform: translateY(0); }
          55%, 90% { transform: translateY(35px); }
          95%, 100% { transform: translateY(0); }
        }

        /* Keyframes for Hiding/Folding Legs */
        @keyframes hideLegs {
          0%, 50% { opacity: 1; transform: scaleY(1); }
          53%, 90% { opacity: 0; transform: scaleY(0); }
          95%, 100% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>

      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 sm:p-6 overflow-hidden flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#261711] mb-2 font-handwriting">
          Animated Walking &amp; Sitting Chicken
        </h2>

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 800 400"
          className="w-full h-auto"
        >
          {/* Gradients for Glossy 3D Look */}
          <defs>
            <radialGradient id="bodyGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFF04D" />
              <stop offset="70%" stopColor="#FFC107" />
              <stop offset="100%" stopColor="#FF9800" />
            </radialGradient>
            
            <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>

            <linearGradient id="tailTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#3E2723" />
            </linearGradient>

            <linearGradient id="tailMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#795548" />
              <stop offset="100%" stopColor="#4E342E" />
            </linearGradient>

            <linearGradient id="tailBot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A1887F" />
              <stop offset="100%" stopColor="#5D4037" />
            </linearGradient>
          </defs>

          {/* Ground Line */}
          <line x1="50" y1="330" x2="750" y2="330" stroke="#E0E0E0" strokeWidth="4" strokeLinecap="round"/>

          {/* Entire Chicken Group Moving */}
          <g className="chicken-move">
            {/* Shadow (Expands and contracts) */}
            <ellipse cx="200" cy="330" rx="65" ry="8" fill="rgba(0,0,0,0.15)" />

            {/* Wobbling Group for Walking */}
            <g className="chicken-bounce">
              
              {/* Sitting down transformation */}
              <g className="sit-down-body">
                
                {/* Tail Feathers */}
                <g transform="translate(40, 150)">
                  <path d="M 60 50 C 20 0, 40 -50, 90 50 Z" fill="url(#tailTop)"/>
                  <path d="M 70 60 C 10 30, 20 -10, 80 70 Z" fill="url(#tailMid)"/>
                  <path d="M 80 80 C 30 80, 30 40, 90 90 Z" fill="url(#tailBot)"/>
                </g>

                {/* Legs Group (Hides when sitting) */}
                <g className="hide-legs">
                  {/* Left Leg */}
                  <g transform="translate(170, 280)">
                    <g className="leg-left">
                      <line x1="0" y1="0" x2="-10" y2="40" stroke="#FF7043" strokeWidth="7" strokeLinecap="round"/>
                      <line x1="-10" y1="40" x2="-25" y2="45" stroke="#FF7043" strokeWidth="6" strokeLinecap="round"/>
                      <line x1="-10" y1="40" x2="0" y2="48" stroke="#FF7043" strokeWidth="6" strokeLinecap="round"/>
                    </g>
                  </g>
                  {/* Right Leg */}
                  <g transform="translate(210, 280)">
                    <g className="leg-right">
                      <line x1="0" y1="0" x2="-10" y2="40" stroke="#FF7043" strokeWidth="7" strokeLinecap="round"/>
                      <line x1="-10" y1="40" x2="-25" y2="45" stroke="#FF7043" strokeWidth="6" strokeLinecap="round"/>
                      <line x1="-10" y1="40" x2="0" y2="48" stroke="#FF7043" strokeWidth="6" strokeLinecap="round"/>
                    </g>
                  </g>
                </g>

                {/* Main Body */}
                <path d="M 110 200 C 110 130, 150 140, 180 140 C 240 140, 290 190, 280 250 C 270 290, 200 310, 150 280 C 120 260, 110 230, 110 200 Z" fill="url(#bodyGrad)" />
                
                {/* Head */}
                <circle cx="250" cy="120" r="50" fill="url(#bodyGrad)" />
                <path d="M 200 130 Q 250 170 280 130 L 280 100 L 200 100 Z" fill="url(#bodyGrad)" />

                {/* Orange Wing */}
                <ellipse cx="185" cy="220" rx="55" ry="35" fill="url(#wingGrad)" transform="rotate(-10 185 220)" />
                <path d="M 140 220 Q 185 260 230 220" stroke="#BF360C" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.3"/>

                {/* Red Comb (Head) */}
                <circle cx="230" cy="65" r="14" fill="#F44336" />
                <circle cx="255" cy="55" r="18" fill="#D32F2F" />
                <circle cx="280" cy="75" r="15" fill="#F44336" />

                {/* Wattle (Below beak) */}
                <ellipse cx="295" cy="165" rx="12" ry="18" fill="#D32F2F" />

                {/* Beak */}
                <polygon points="295,115 340,130 295,140" fill="#FF9800" />
                <polygon points="295,115 340,130 295,125" fill="#FFA726" />
                <line x1="295" y1="128" x2="330" y2="130" stroke="#E65100" strokeWidth="2" />

                {/* Eye */}
                <circle cx="265" cy="105" r="10" fill="#FFFFFF" />
                <circle cx="268" cy="105" r="5" fill="#000000" />
                <circle cx="269" cy="103" r="2" fill="#FFFFFF" />
                
                {/* Blush on cheek */}
                <ellipse cx="275" cy="125" rx="8" ry="5" fill="#FF5252" opacity="0.4" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}


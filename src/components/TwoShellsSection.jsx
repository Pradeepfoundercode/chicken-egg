import ampersandImg from '../assets/Glossy Orange 3D Ampersand.png'

export default function TwoShellsSection({
  sec2BrownRef,
  sec2WhiteRef,
  scrollProgress = 0,
}) {
  // Elements progressively appear as eggs travel from Hero into Section 2, and gracefully exit into Section 3
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
  const showAmpersand = isMobile
    ? scrollProgress >= 0.12 && scrollProgress <= 0.65
    : scrollProgress >= 0.12 && scrollProgress <= 0.46

  const showCards = isMobile
    ? scrollProgress >= 0.04 && scrollProgress <= 0.65
    : scrollProgress >= 0.18 && scrollProgress <= 0.46

  const showCallouts = isMobile
    ? scrollProgress >= 0.06 && scrollProgress <= 0.65
    : scrollProgress >= 0.20 && scrollProgress <= 0.42

  return (
    <section
      id="our-eggs"
      className="relative w-full bg-[#F6E39D] mt-0 pt-12 sm:pt-16 lg:pt-18 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-12 overflow-visible z-20"
    >
      {/* Top Organic Wavy Curve Divider that rises UP into Hero - Solid Yellow (#F6E39D) */}
      <div className="absolute -top-7 sm:-top-11 md:-top-13 left-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-14"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,75 Q150,25 300,70 T600,60 T900,75 T1200,55 L1200,120 Z"
            fill="#F6E39D"
          />
        </svg>
      </div>

      {/* Top Header */}
      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Eyebrow */}
        <p className="font-handwriting text-lg sm:text-xl text-[#7E6A48] tracking-wider mb-1 select-none">
          ~ meet the eggs ~
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#261711] tracking-tight leading-tight">
          Two shells.{' '}
          <span className="relative inline-block">
            Same
            {/* Hand-drawn curved underline under "Same" */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#F5A623] overflow-visible"
              viewBox="0 0 100 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 9C28 2 72 2 98 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          good egg.
        </h2>

        {/* Subtitle */}
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-[#6A5A3C] max-w-xl mx-auto leading-relaxed">
          The shell colour is just the breed of hen. The goodness inside is the same.
        </p>
      </div>

      {/* Main Stage with Destination Anchors & Annotations */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="relative min-h-[460px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 xl:gap-8">

          {/* ========================================================
              LEFT SIDE: Brown Egg Annotations (Desktop only)
             ======================================================== */}
          <div
            className={`hidden lg:flex flex-col justify-between py-1 w-64 xl:w-76 h-[270px] sm:h-[290px] xl:h-[310px] shrink-0 z-20 text-right -translate-y-8 sm:-translate-y-10 xl:-translate-y-12 transition-all duration-700 ${
              showCallouts
                ? 'opacity-100 translate-x-1 lg:translate-x-2 xl:translate-x-3'
                : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}
          >
            {/* 1. Warm rich shell */}
            <div className="relative group">
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Warm, rich shell
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                That warm colour is all down to the brown hens. Calcium-rich and strong.
              </p>
              {/* Curved Arrow pointing down-right to egg */}
              <svg
                className="absolute -right-9 xl:-right-11 -top-1 w-10 h-9 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 50"
                fill="none"
              >
                <path
                  d="M5 10 C 25 10, 45 20, 52 42"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="54,45 46,39 55,36" fill="currentColor" />
              </svg>
            </div>

            {/* 2. Natural freckles */}
            <div className="relative group">
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Natural freckles
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                Tiny speckles of pigment – nature’s own signature of a truly free-range egg.
              </p>
              {/* Curved Arrow pointing right to egg */}
              <svg
                className="absolute -right-9 xl:-right-11 top-1.5 w-10 h-7 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 30"
                fill="none"
              >
                <path
                  d="M5 15 C 25 15, 45 15, 52 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="56,15 48,10 48,20" fill="currentColor" />
              </svg>
            </div>

            {/* 3. Sunny yolk inside */}
            <div className="relative group">
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Sunny yolk inside
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                Rich and deep golden yellow, packed with vitamin D.
              </p>
              {/* Curved Arrow pointing up-right to egg */}
              <svg
                className="absolute -right-9 xl:-right-11 -bottom-1 w-10 h-9 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 50"
                fill="none"
              >
                <path
                  d="M5 40 C 25 40, 45 30, 52 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="54,7 55,16 46,13" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* ========================================================
              CENTER STAGE: Anchors for Traveling Eggs + Ampersand
              Small Devices: Vertical order (White Egg -> Card -> Desc -> & -> Brown Egg -> Card -> Desc)
              Large Devices: Parallel horizontal order (Brown Egg ... & ... White Egg)
             ======================================================== */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 sm:gap-10 lg:gap-24 xl:gap-28 shrink-0 z-10 w-full lg:w-auto">
            
            {/* 1. White Egg Unit: 1st on mobile (order-1), 2nd on desktop (lg:order-2) */}
            <div className="flex flex-col items-center order-1 lg:order-2 w-full lg:w-auto">
              {/* Anchor element measured by AnimatedEggsScene */}
              <div
                ref={sec2WhiteRef}
                className="w-48 sm:w-54 lg:w-62 h-58 sm:h-66 lg:h-74 pointer-events-none"
              />

              {/* Card: "The White One" */}
              <div
                className={`mt-6 sm:mt-8 bg-white/95 backdrop-blur-xs border border-[#E8DDBC] rounded-2xl px-6 py-3.5 text-center shadow-xs transition-all duration-700 relative z-10 w-full max-w-[260px] sm:max-w-[280px] ${
                  showCards
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                {/* Yellow accent tab */}
                <div className="w-10 h-1.5 bg-[#F5A623] rounded-full mx-auto mb-2" />
                <h3 className="text-sm sm:text-base font-extrabold text-[#261711] leading-tight">
                  The White One
                </h3>
                <p className="text-[11px] sm:text-xs text-[#82725A] font-medium mt-0.5">
                  laid by our white feathered hens
                </p>
              </div>

              {/* White Egg Description (Mobile / Small screens only) */}
              <div
                className={`mt-5 w-full max-w-[340px] sm:max-w-[380px] bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-[#E8DDBC] space-y-3.5 lg:hidden text-left shadow-xs transition-all duration-700 ${
                  showCallouts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A08852]">The White Egg</span>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Classic white shell</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">Clean, bright and spotless – the egg you grew up with.</p>
                </div>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Smooth as can be</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">A baker’s best friend and the perfect canvas for egg dyeing.</p>
                </div>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Same good stuff</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">Brown or white, the goodness inside is just the same.</p>
                </div>
              </div>
            </div>

            {/* 2. Glossy Orange 3D Ampersand: 2nd on mobile (order-2), centered absolute on desktop */}
            <div
              className={`order-2 my-2 sm:my-3 lg:my-0 lg:absolute lg:left-1/2 lg:top-28 sm:lg:top-32 md:lg:top-36 lg:top-40 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 transition-all duration-700 ease-out flex items-center justify-center ${
                showAmpersand
                  ? 'scale-100 opacity-100'
                  : 'scale-50 opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={ampersandImg}
                alt="&"
                className="w-10 sm:w-12 md:w-16 lg:w-20 xl:w-22 h-auto object-contain drop-shadow-md select-none pointer-events-none"
              />
            </div>

            {/* 3. Brown Egg Unit: 3rd on mobile (order-3), 1st on desktop (lg:order-1) */}
            <div className="flex flex-col items-center order-3 lg:order-1 w-full lg:w-auto">
              {/* Anchor element measured by AnimatedEggsScene */}
              <div
                ref={sec2BrownRef}
                className="w-48 sm:w-54 lg:w-62 h-58 sm:h-66 lg:h-74 pointer-events-none"
              />

              {/* Card: "The Brown One" */}
              <div
                className={`mt-6 sm:mt-8 bg-white/95 backdrop-blur-xs border border-[#E8DDBC] rounded-2xl px-6 py-3.5 text-center shadow-xs transition-all duration-700 relative z-10 w-full max-w-[260px] sm:max-w-[280px] ${
                  showCards
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                {/* Yellow accent tab */}
                <div className="w-10 h-1.5 bg-[#F5A623] rounded-full mx-auto mb-2" />
                <h3 className="text-sm sm:text-base font-extrabold text-[#261711] leading-tight">
                  The Brown One
                </h3>
                <p className="text-[11px] sm:text-xs text-[#82725A] font-medium mt-0.5">
                  laid by our brown feathered hens
                </p>
              </div>

              {/* Brown Egg Description (Mobile / Small screens only) */}
              <div
                className={`mt-5 w-full max-w-[340px] sm:max-w-[380px] bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-[#E8DDBC] space-y-3.5 lg:hidden text-left shadow-xs transition-all duration-700 ${
                  showCallouts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A08852]">The Brown Egg</span>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Warm, rich shell</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">That warm colour is all down to the brown hens. Calcium-rich and strong.</p>
                </div>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Natural freckles</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">Tiny speckles of pigment – nature’s own signature of a truly free-range egg.</p>
                </div>
                <div>
                  <h4 className="font-handwriting text-lg font-bold text-[#261711]">Sunny yolk inside</h4>
                  <p className="text-xs text-[#6A5A3C] mt-0.5">Rich and deep golden yellow, packed with vitamin D.</p>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================
              RIGHT SIDE: White Egg Annotations (Desktop only)
             ======================================================== */}
          <div
            className={`hidden lg:flex flex-col justify-between py-1 w-64 xl:w-76 h-[270px] sm:h-[290px] xl:h-[310px] shrink-0 z-20 text-left -translate-y-8 sm:-translate-y-10 xl:-translate-y-12 transition-all duration-700 ${
              showCallouts
                ? 'opacity-100 -translate-x-1 lg:-translate-x-2 xl:-translate-x-3'
                : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            {/* 1. Classic white shell */}
            <div className="relative group">
              {/* Curved Arrow pointing down-left to egg */}
              <svg
                className="absolute -left-9 xl:-left-11 -top-1 w-10 h-9 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 50"
                fill="none"
              >
                <path
                  d="M55 10 C 35 10, 15 20, 8 42"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="6,45 14,39 5,36" fill="currentColor" />
              </svg>
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Classic white shell
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                Clean, bright and spotless – the egg you grew up with.
              </p>
            </div>

            {/* 2. Smooth as can be */}
            <div className="relative group">
              {/* Curved Arrow pointing left to egg */}
              <svg
                className="absolute -left-9 xl:-left-11 top-1.5 w-10 h-7 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 30"
                fill="none"
              >
                <path
                  d="M55 15 C 35 15, 15 15, 8 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="4,15 12,10 12,20" fill="currentColor" />
              </svg>
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Smooth as can be
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                A baker’s best friend and the perfect canvas for egg dyeing.
              </p>
            </div>

            {/* 3. Same good stuff */}
            <div className="relative group">
              {/* Curved Arrow pointing up-left to egg */}
              <svg
                className="absolute -left-9 xl:-left-11 -bottom-1 w-10 h-9 text-[#6A5A3C] pointer-events-none hidden xl:block"
                viewBox="0 0 60 50"
                fill="none"
              >
                <path
                  d="M55 40 C 35 40, 15 30, 8 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="6,7 5,16 14,13" fill="currentColor" />
              </svg>
              <h4 className="font-handwriting text-xl xl:text-2xl font-bold text-[#261711] leading-tight">
                Same good stuff
              </h4>
              <p className="text-xs xl:text-[13px] text-[#6A5A3C] mt-1 leading-snug">
                Brown or white, the goodness inside is just the same.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Organic Wavy Curve Divider into Section 3 (#FAF5EC) - Identical style to Brown section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-14"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,75 Q150,25 300,70 T600,60 T900,75 T1200,55 L1200,120 Z"
            fill="#FAF5EC"
          />
        </svg>
      </div>
    </section>
  )
}

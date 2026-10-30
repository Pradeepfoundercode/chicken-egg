import ampersandImg from '../assets/Glossy Orange 3D Ampersand.png'

export default function TwoShellsSection({
  sec2BrownRef,
  sec2WhiteRef,
  scrollProgress = 0,
}) {
  // Elements progressively appear as eggs travel from Hero into Section 2, and gracefully exit into Section 3
  const showAmpersand = scrollProgress >= 0.12 && scrollProgress <= 0.46
  const showCards = scrollProgress >= 0.18 && scrollProgress <= 0.46
  const showCallouts = scrollProgress >= 0.20 && scrollProgress <= 0.42

  return (
    <section
      id="our-eggs"
      className="relative w-full bg-[#F6E39D] pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
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
        <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center lg:justify-between gap-4 xl:gap-8">

          {/* ========================================================
              LEFT SIDE: Brown Egg Annotations (Fade & slide in)
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
             ======================================================== */}
          <div className="relative flex items-start justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28 shrink-0 z-10">
            
            {/* Left Destination Slot: Brown Egg */}
            <div className="flex flex-col items-center">
              {/* Anchor element measured by AnimatedEggsScene */}
              <div
                ref={sec2BrownRef}
                className="w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 pointer-events-none"
              />

              {/* Bottom Card: "The Brown One" with distinct gap from egg */}
              <div
                className={`mt-6 sm:mt-8 bg-white/95 backdrop-blur-xs border border-[#E8DDBC] rounded-2xl px-6 py-3.5 text-center shadow-xs transition-all duration-700 relative z-10 ${
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
            </div>

            {/* Glossy Orange 3D Ampersand in the Center */}
            <div
              className={`absolute left-1/2 top-28 sm:top-32 md:top-36 lg:top-40 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 ease-out ${
                showAmpersand
                  ? 'scale-100 opacity-100'
                  : 'scale-50 opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={ampersandImg}
                alt="&"
                className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-22 h-auto object-contain drop-shadow-md select-none pointer-events-none"
              />
            </div>

            {/* Right Destination Slot: White Egg */}
            <div className="flex flex-col items-center">
              {/* Anchor element measured by AnimatedEggsScene */}
              <div
                ref={sec2WhiteRef}
                className="w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 pointer-events-none"
              />

              {/* Bottom Card: "The White One" with distinct gap from egg */}
              <div
                className={`mt-6 sm:mt-8 bg-white/95 backdrop-blur-xs border border-[#E8DDBC] rounded-2xl px-6 py-3.5 text-center shadow-xs transition-all duration-700 relative z-10 ${
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
            </div>

          </div>

          {/* ========================================================
              RIGHT SIDE: White Egg Annotations (Fade & slide in)
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

        {/* Mobile / Small Screens Annotations Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 lg:hidden px-4 transition-all duration-700 ${
            showCallouts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-[#E8DDBC] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A08852]">The Brown Egg</span>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Warm, rich shell</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">That warm colour is all down to the brown hens. Calcium-rich and strong.</p>
            </div>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Natural freckles</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">Tiny speckles of pigment – nature’s own signature of a truly free-range egg.</p>
            </div>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Sunny yolk inside</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">Rich and deep golden yellow, packed with vitamin D.</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-[#E8DDBC] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A08852]">The White Egg</span>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Classic white shell</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">Clean, bright and spotless – the egg you grew up with.</p>
            </div>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Smooth as can be</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">A baker’s best friend and the perfect canvas for egg dyeing.</p>
            </div>
            <div>
              <h4 className="font-handwriting text-xl font-bold text-[#261711]">Same good stuff</h4>
              <p className="text-xs text-[#6A5A3C] mt-0.5">Brown or white, the goodness inside is just the same.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Gentle Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-10 preserve-3d"
        >
          <path
            d="M0 24C240 38 480 44 720 28C960 12 1200 18 1440 24V48H0V24Z"
            fill="#FAF5EC"
          />
        </svg>
      </div>
    </section>
  )
}

import nestLogoImg from '../assets/Glossy Yolk & Co. Nest Logo.png'

export default function Footer() {
  const handlePrevent = (e) => {
    e.preventDefault()
  }

  return (
    <footer className="relative w-full bg-[#FAF5EC] text-[#261711] select-none">
      
      {/* ========================================================
          MAIN FOOTER CONTENT (4 Columns)
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-14 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ================= COLUMN 1: Brand & Socials (Span 4) ================= */}
          <div className="lg:col-span-4 flex flex-col items-start">
            
            {/* Logo: Glossy Yolk & Co. Nest Logo (Non-clickable / static) */}
            <div
              className="cursor-default select-none"
              onClick={handlePrevent}
            >
              <img
                src={nestLogoImg}
                alt="Yolk & Co. Logo"
                className="w-22 sm:w-26 md:w-[82px] h-11 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)] pointer-events-none"
              />
            </div>

            {/* Handwritten Tagline */}
            <p className="font-handwriting text-xl sm:text-2xl text-[#261711] font-bold mt-3.5 sm:mt-4 tracking-wide">
              Good eggs. Better mornings.
            </p>

            {/* Subtext description */}
            <p className="text-[#6D5C50] text-sm sm:text-base mt-2 max-w-xs leading-relaxed font-normal">
              Fresh brown and white eggs from our own flock.
            </p>

            {/* Social Media Circular Buttons (Click does nothing) */}
            <div className="flex items-center gap-3 mt-5">
              
              {/* Instagram */}
              <button
                type="button"
                onClick={handlePrevent}
                aria-label="Instagram"
                className="w-9 sm:w-9.5 h-9 sm:h-9.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#EBE3D5] flex items-center justify-center text-[#261711] hover:bg-[#F5A623] hover:border-[#F5A623] hover:scale-105 transition-all duration-200 cursor-default"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={handlePrevent}
                aria-label="Facebook"
                className="w-9 sm:w-9.5 h-9 sm:h-9.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#EBE3D5] flex items-center justify-center text-[#261711] hover:bg-[#F5A623] hover:border-[#F5A623] hover:scale-105 transition-all duration-200 cursor-default"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>

              {/* YouTube */}
              <button
                type="button"
                onClick={handlePrevent}
                aria-label="YouTube"
                className="w-9 sm:w-9.5 h-9 sm:h-9.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#EBE3D5] flex items-center justify-center text-[#261711] hover:bg-[#F5A623] hover:border-[#F5A623] hover:scale-105 transition-all duration-200 cursor-default"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </button>

            </div>
          </div>

          {/* ================= COLUMN 2: Shop Links (Span 2) ================= */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col items-start">
            <h4 className="text-base sm:text-lg font-bold text-[#261711] tracking-tight mb-3 sm:mb-3.5 select-none">
              Shop
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-[#6D5C50]">
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  Brown eggs
                </span>
              </li>
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  White eggs
                </span>
              </li>
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  Packs of 6, 10 &amp; 12
                </span>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 3: Explore Links (Span 2) ================= */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-base sm:text-lg font-bold text-[#261711] tracking-tight mb-3 sm:mb-3.5 select-none">
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-[#6D5C50]">
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  Meet the eggs
                </span>
              </li>
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  Our poultry
                </span>
              </li>
              <li>
                <span
                  onClick={handlePrevent}
                  className="block hover:text-[#261711] transition-colors cursor-default select-none"
                >
                  Back to top
                </span>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: Say Hello & CTA (Span 3) ================= */}
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col items-start">
            <h4 className="text-base sm:text-lg font-bold text-[#261711] tracking-tight mb-3 sm:mb-3.5 select-none">
              Say hello
            </h4>
            <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-[#6D5C50] select-none">
              <span className="block hover:text-[#261711] transition-colors cursor-default">
                hello@example.com
              </span>
              <span className="block hover:text-[#261711] transition-colors cursor-default">
                +91 00000 00000
              </span>
              <p className="text-[#6D5C50]">
                Farm address, City, State
              </p>
            </div>

            {/* Golden "Order eggs" Pill Button (Click does nothing) */}
            <div className="mt-4 sm:mt-5">
              <button
                type="button"
                onClick={handlePrevent}
                className="bg-[#F5A623] hover:bg-[#E29517] active:scale-95 text-[#261711] font-bold text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-[0_3px_10px_rgba(245,166,35,0.3)] transition-all duration-200 cursor-default"
              >
                Order eggs
              </button>
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}

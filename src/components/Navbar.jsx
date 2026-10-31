import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full relative z-30 bg-[#f1f1f1]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-7 pb-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-amber-100/90 flex items-center justify-center p-1.5 shadow-xs transition-transform group-hover:scale-105">
            {/* Egg & Yolk Icon */}
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Outer Eggshell Brown */}
              <path
                d="M20 5C13 5 8 13.5 8 23.5C8 31 13.5 35 20 35C26.5 35 32 31 32 23.5C32 13.5 27 5 20 5Z"
                fill="#C68A4C"
              />
              {/* Egg White */}
              <ellipse cx="20" cy="24" rx="9" ry="8" fill="#FFF9ED" />
              {/* Egg Yolk Golden */}
              <circle cx="20" cy="24" r="5.5" fill="#F6A828" />
              <circle cx="18" cy="22" r="1.5" fill="#FFE29D" opacity="0.8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-[#241711] leading-none">
              Yolk <span className="text-[#F6A828]">&</span> Co.
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8C7A6B] mt-0.5">
              Pure Free Range
            </span>
          </div>
        </a>

        {/* Center Pill Menu (Desktop) */}
        <nav className="hidden md:flex items-center bg-white/70 backdrop-blur-md border border-[#E9DFD1] rounded-full px-6 py-2 shadow-xs">
          <ul className="flex items-center gap-7 text-[15px] font-medium text-[#46382E]">
            <li>
              <a
                href="#our-eggs"
                className="hover:text-[#F6A828] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F6A828] hover:after:w-full after:transition-all"
              >
                Our eggs
              </a>
            </li>
            <li>
              <a
                href="#shop"
                className="hover:text-[#F6A828] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F6A828] hover:after:w-full after:transition-all"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#our-poultry"
                className="hover:text-[#F6A828] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F6A828] hover:after:w-full after:transition-all"
              >
                Our Poultry
              </a>
            </li>
          </ul>
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#order"
            className="inline-flex items-center justify-center bg-[#241711] hover:bg-[#38241b] text-[#FAF5EC] font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Order eggs
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#241711] hover:bg-stone-200/50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-6 mt-2 p-5 bg-white/95 backdrop-blur-md border border-[#E9DFD1] rounded-2xl shadow-lg flex flex-col gap-4 text-center">
          <a
            href="#our-eggs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#46382E] hover:text-[#F6A828] py-1"
          >
            Our eggs
          </a>
          <a
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#46382E] hover:text-[#F6A828] py-1"
          >
            Shop
          </a>
          <a
            href="#our-poultry"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#46382E] hover:text-[#F6A828] py-1"
          >
            Our Poultry
          </a>
          <a
            href="#order"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#241711] hover:bg-[#38241b] text-white font-semibold text-sm py-3 rounded-full shadow-sm mt-2"
          >
            Order eggs
          </a>
        </div>
      )}
    </header>
  )
}

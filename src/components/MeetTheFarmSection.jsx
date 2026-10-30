import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import barnOutsideImg from '../assets/Golden-Hour Commercial Poultry Barn.png'
import barnInsideImg from '../assets/Sunrise in a Modern Egg Farm.png'

export default function MeetTheFarmSection() {
  const [activePhoto, setActivePhoto] = useState(null)
  const [isPlayingTour, setIsPlayingTour] = useState(false)

  // Scroll tracking ke liye reference
  const containerRef = useRef(null)

  // Container ke scroll position ko track karna
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"] 
    // "start end": Jab section screen me enter kare
    // "center center": Jab section screen ke center me aaye tab width 100% ho jaye
  })

  // useSpring se scroll movement ko buttery smooth aur soft momentum dete hain
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.6,
    restDelta: 0.001,
  })

  // Width ko smoothProgress ke basis par animate karna (15% se 100%)
  const cardWidth = useTransform(smoothProgress, [0, 1], ["15%", "100%"])

  return (
    <section 
      id="meet-the-farm"
      ref={containerRef} 
      className="relative w-full bg-[#D7BA62] pt-18 sm:pt-22 pb-24 sm:pb-32 px-3 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      
      {/* Subtle Warm Sunlight Radial Glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-[#FFEBB0]/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[350px] bg-[#C49E3F]/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto relative z-10">
        
        {/* ========================================================
            HEADER: Eyebrow + Headline + Subtitle
           ======================================================== */}
        <div className="text-center flex flex-col items-center">
          
          <div className="inline-flex flex-col items-center">
            <span className="font-handwriting text-2xl sm:text-[28px] text-[#3A2415] tracking-wide font-bold">
              our practice
            </span>
            <svg
              className="w-20 sm:w-24 h-2 text-[#3A2415] -mt-0.5 opacity-85 overflow-visible"
              viewBox="0 0 90 8"
              fill="none"
            >
              <path
                d="M2 5C10 2 18 2 26 5C34 8 42 8 50 5C58 2 66 2 74 5C82 8 88 7 90 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-[#261711] tracking-tight leading-[1.08] mt-3 sm:mt-4">
            Meet the{' '}
            <span className="inline-flex items-center px-3 sm:px-4 py-0.5 rounded-xl bg-[#EBE7DF] text-[#261711] shadow-xs align-middle">
              farm
              <span className="text-[#DE3B2B] text-3xl sm:text-4xl leading-none ml-0.5 font-black">
                .
              </span>
            </span>
            <br />
            behind the eggs.
          </h2>

          <p className="mt-4 sm:mt-5 text-[#3D2817]/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            A peek at the open barns &amp; sheds where every egg begins.
          </p>
        </div>

        {/* ========================================================
            PHOTO CARDS COLLAGE: "Our farm" & "Inside the barn"
           ======================================================== */}
        <div className="relative mt-10 sm:mt-14 w-full max-w-[1500px] mx-auto px-1 sm:px-3 overflow-visible">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7 lg:gap-8 items-stretch">
            
            {/* ----------------- LEFT CARD: Outside Farm ----------------- */}
            <motion.div
              style={{ width: cardWidth, marginRight: 'auto', marginLeft: 0, willChange: 'width' }}
              onMouseEnter={() => setActivePhoto('outside')}
              onMouseLeave={() => setActivePhoto(null)}
              className="relative justify-self-start mr-auto flex-none group cursor-pointer transition-shadow duration-500 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(40,24,10,0.25)] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[490px] bg-stone-200"
            >
              <img
                src={barnOutsideImg}
                alt="Golden-Hour Commercial Poultry Barn - Our Farm"
                className="w-full h-full object-cover object-left transition-transform duration-700 ease-out group-hover:scale-106"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20">
                <div className="relative -rotate-3 bg-[#FAF5EB]/95 backdrop-blur-xs px-3.5 py-1 rounded-sm shadow-[0_3px_10px_rgba(0,0,0,0.18)] border border-[#E2D2B5]">
                  <span className="font-handwriting text-lg sm:text-xl font-bold text-[#2E1C11] tracking-wide select-none whitespace-nowrap">
                    Our farm
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ----------------- RIGHT CARD: Inside the Barn ----------------- */}
            <motion.div
              style={{ width: cardWidth, marginLeft: 'auto', marginRight: 0, willChange: 'width' }}
              onMouseEnter={() => setActivePhoto('inside')}
              onMouseLeave={() => setActivePhoto(null)}
              className="relative justify-self-end ml-auto flex-none group cursor-pointer transition-shadow duration-500 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(40,24,10,0.25)] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[490px] bg-stone-200"
            >
              <img
                src={barnInsideImg}
                alt="Sunrise in a Modern Egg Farm - Inside the barn"
                className="w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-106"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20">
                <div className="relative rotate-2 bg-[#FAF5EB]/95 backdrop-blur-xs px-3.5 py-1 rounded-sm shadow-[0_3px_10px_rgba(0,0,0,0.18)] border border-[#E2D2B5]">
                  <span className="font-handwriting text-lg sm:text-xl font-bold text-[#2E1C11] tracking-wide select-none whitespace-nowrap">
                    Inside the barn
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================
              FLOATING ACTION BADGE: "Take the quick day tour"
             ======================================================== */}
          <div className="flex justify-center -mt-6 sm:-mt-7 relative z-30">
            <button
              type="button"
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className="inline-flex items-center gap-3 bg-[#E8AE38] hover:bg-[#DCA128] text-[#241711] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(40,24,14,0.3)] border-2 border-[#FFE195]/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-[#241711] text-[#E8AE38] flex items-center justify-center text-[10px] pl-0.5 shadow-xs">
                ▶
              </span>
              <span>Take the quick day tour</span>
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================
          BOTTOM TORN PAPER DECKLE EDGE DIVIDER
         ======================================================== */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-[#FAF5EC] preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C45 16 92 32 138 26C185 20 231 8 277 15C324 22 370 38 416 32C463 26 509 10 555 18C602 26 648 44 694 36C741 28 787 12 833 20C880 28 926 46 972 38C1019 30 1065 14 1111 22C1158 30 1204 46 1250 38C1297 30 1343 14 1389 20C1412 23 1428 26 1440 28V48H0V24Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  )
}
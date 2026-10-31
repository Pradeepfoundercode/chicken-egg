import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emptyCarton6Img from '../assets/eggbox/Open Empty Six-Egg Carton.png'
import emptyCarton10Img from '../assets/eggbox/Open Ten-Egg Recycled Pulp Carton.png'
import emptyCarton12Img from '../assets/eggbox/Open Empty 12-Egg Pulp Carton.png'
import brownEggImg from '../assets/Realistic Brown Egg Cutout.png'
import whiteEggImg from '../assets/Isolated White Egg.png'

gsap.registerPlugin(ScrollTrigger)

// Exact percentage positions & dimensions of each egg inside its empty carton image
export const PACKS_CONFIG = [
  {
    id: 'pack-6',
    size: 6,
    aspect: '1182/1331',
    eggW: 25.5,
    eggH: 26.5,
    image: emptyCarton6Img, // Empty 6-egg carton base
    isEmptyBase: true,
    subtitle: 'Perfect for couples or casual breakfast lovers',
    priceBrown: 84,
    priceWhite: 78,
    eggs: [
      // Row 1 (Back row)
      { x: 25, y: 47, row: 1 },
      { x: 50.3, y: 47, row: 1 },
      { x: 76, y: 47, row: 1 },
      // Row 2 (Front row)
      { x: 24, y: 62, row: 2 },
      { x: 50, y: 62, row: 2 },
      { x: 77, y: 62, row: 2 },
    ],
  },
  {
    id: 'pack-10',
    size: 10,
    aspect: '1312/1199',
    eggW: 24.0,
    eggH: 24.5,
    image: emptyCarton10Img, // Empty 10-egg carton base
    isEmptyBase: true,
    subtitle: 'Our most popular everyday family box',
    popular: true,
    priceBrown: 135,
    priceWhite: 125,
    eggs: [
      // Row 1 (Back row)
      { x: 13, y: 51, row: 1 },
      { x: 31, y: 51, row: 1 },
      { x: 49.5, y: 51, row: 1 },
      { x: 67, y: 51, row: 1 },
      { x: 86, y: 51, row: 1 },
      // Row 2 (Front row)
      { x: 12, y: 66, row: 2 },
      { x: 31, y: 66, row: 2 },
      { x: 50, y: 66, row: 2 },
      { x: 68.0, y: 66, row: 2 },
      { x: 87.0, y: 66, row: 2 },
    ],
  },
  {
    id: 'pack-12',
    size: 12,
    aspect: '1455/1081',
    eggW: 23.5,
    eggH: 24.5,
    image: emptyCarton12Img, // Empty 12-egg carton base
    isEmptyBase: true,
    subtitle: 'Best value for avid bakers and athletes',
    priceBrown: 158,
    priceWhite: 148,
    eggs: [
      // Row 1 (Back row)
      { x: 12.0, y: 51.5, row: 1 },
      { x: 27, y: 51, row: 1 },
      { x: 41, y: 51, row: 1 },
      { x: 56.2, y: 51, row: 1 },
      { x: 73.2, y: 51, row: 1 },
      { x: 88.0, y: 51, row: 1 },
      // Row 2 (Front row)
      { x: 11, y: 66, row: 2 },
      { x: 27.0, y: 66, row: 2 },
      { x: 42, y: 66, row: 2 },
      { x: 58, y: 66, row: 2 },
      { x: 73.5, y: 66, row: 2 },
      { x: 89.0, y: 66, row: 2 },
    ],
  },
]

export default function PickYourPackSection({
  sec3SectionRef,
  sec3BrownRef,
  sec3WhiteRef,
  sec3DockEggRef,
  sec3SelectedCartonRef,
  scrollProgress = 0,
  selectedType = 'brown',
  setSelectedType,
  selectedPackId = 'pack-10',
  setSelectedPackId,
}) {
  const [addedItem, setAddedItem] = useState(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Small screens target pack of 6 (center egg: eggIdx 4); Large screens target pack of 10 (center egg: eggIdx 7)
  const targetDockSize = isMobile ? 6 : 10
  const targetDockEggIdx = isMobile ? 4 : 7

  const toggleBtnRef = useRef(null)
  const cardsGridRef = useRef(null)
  const isFirstRender = useRef(true)

  // Cards pehle se show nahi honge - jab egg land hone wala hoga tabhi reveal honge
  const showCards = scrollProgress >= 0.96

  // Jab user Brown ya White button click kare, to box me eggs upar se gir kar cup me bounce honge!
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const cards = cardsGridRef.current?.querySelectorAll('.pack-card')
    if (cards && cards.length) {
      // Teeno boxes (Pack of 6, 10, 12) me ek sath parallel drop hoga
      cards.forEach((card) => {
        const cardEggs = card.querySelectorAll('.active-egg-drop')
        if (cardEggs.length) {
          gsap.fromTo(
            cardEggs,
            {
              y: -48,
              opacity: 1,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.42,
              ease: 'bounce.out',
              stagger: 0.012,
              clearProps: 'transform',
            }
          )
        }
      })
    }
  }, [selectedType])

  // GSAP ScrollTrigger: Triggers Brown/White toggle button when user arrives in Section 3
  useEffect(() => {
    const sectionEl = sec3SectionRef?.current
    if (!sectionEl || !toggleBtnRef.current) return

    const ctx = gsap.context(() => {
      // Set initial hidden state for toggle button
      gsap.set(toggleBtnRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.95,
      })

      // ScrollTrigger: fires when user enters third section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 38%',
          toggleActions: 'play reverse play reverse',
        },
      })

      // Animate Brown / White toggle button in smoothly
      tl.to(toggleBtnRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
      })
    }, sec3SectionRef)

    return () => {
      ctx.revert()
    }
  }, [sec3SectionRef])

  const handleBuy = (pack) => {
    const title = `${selectedType === 'brown' ? 'Brown' : 'White'} Eggs, Pack of ${pack.size}`
    setAddedItem(title)
    setTimeout(() => {
      setAddedItem(null)
    }, 2400)
  }

  return (
    <section
      ref={sec3SectionRef}
      id="shop"
      className="relative w-full bg-[#FAF5EC] pt-14 sm:pt-18 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Toast Notification on Add to Cart */}
      {addedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#261711] text-[#FAF5EC] px-5 py-3 rounded-2xl shadow-xl border border-amber-900/30 flex items-center gap-3 animate-bounce">
          <span className="text-xl">🥚</span>
          <div>
            <p className="text-xs font-semibold text-amber-300">Added to cart</p>
            <p className="text-sm font-bold">{addedItem}</p>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#261711] tracking-tight leading-tight">
          Pick your{' '}
          <span className="relative inline-block bg-[#F5A623] px-3.5 sm:px-4 py-0.5 rounded-2xl text-[#261711] shadow-xs">
            pack.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#6D5C50] max-w-xl mx-auto leading-relaxed">
          Brown or white in boxes of 6, 10 or 12, packed fresh from our flock.
        </p>

        {/* Brown / White Interactive Toggle Selector */}
        <div ref={toggleBtnRef} className="mt-7 sm:mt-8 inline-flex flex-col items-center">
          <div className="bg-white/90 backdrop-blur-xs p-1.5 rounded-full border border-[#E7DDCE] shadow-xs inline-flex items-center gap-1.5">
            {/* Brown Egg Button */}
            <button
              type="button"
              onClick={() => setSelectedType('brown')}
              className={`group flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer active:scale-95 ${
                selectedType === 'brown'
                  ? 'bg-[#2D1B11] text-white shadow-xs scale-102'
                  : 'text-[#6D5C50] hover:text-[#261711] hover:bg-black/5'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-[#C68A4C] inline-block shadow-xs transition-transform duration-300 ${
                  selectedType === 'brown' ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              <span>Brown</span>
            </button>

            {/* White Egg Button */}
            <button
              type="button"
              onClick={() => setSelectedType('white')}
              className={`group flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer active:scale-95 ${
                selectedType === 'white'
                  ? 'bg-[#2D1B11] text-white shadow-xs scale-102'
                  : 'text-[#6D5C50] hover:text-[#261711] hover:bg-black/5'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-[#FFF9ED] border border-[#DDD0BC] inline-block shadow-xs transition-transform duration-300 ${
                  selectedType === 'white' ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              <span>White</span>
            </button>
          </div>

          {/* Handwriting Hint */}
          <p className="font-handwriting text-sm sm:text-base text-[#8C7A6B] mt-2 select-none">
            ~ select your egg ~
          </p>
        </div>
      </div>

      {/* Product Cards Grid - Pehle se show nahi hoga, egg land hone par hi show hoga */}
      <div
        ref={cardsGridRef}
        className={`max-w-6xl mx-auto mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10 transition-opacity duration-300 ease-out ${
          showCards
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {PACKS_CONFIG.map((pack, packIdx) => {
          const isSelected = selectedPackId === pack.id
          const title = `${selectedType === 'brown' ? 'Brown' : 'White'} Eggs, Pack of ${pack.size}`
          const price = selectedType === 'brown' ? pack.priceBrown : pack.priceWhite
          const isWhite = selectedType === 'white'

          return (
            <div
              key={pack.id}
              onClick={() => setSelectedPackId && setSelectedPackId(pack.id)}
              className={`pack-card bg-white rounded-3xl p-5 sm:p-6 border transition-[border-color] duration-150 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-[#F5A623] ring-2 ring-[#F5A623]'
                  : 'border-[#EADBCE]/80 hover:border-[#D5C2AF]'
              }`}
            >
              {/* Top Image Showcase Box */}
              <div className="relative bg-[#FAF3E5] rounded-2xl p-3 sm:p-4 flex items-center justify-center overflow-hidden h-56 sm:h-64">
                {/* Active Selection Badge */}
                {isSelected && (
                  <div className="absolute top-3 left-3 bg-[#261711] text-[#F5A623] text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider z-20 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Selected
                  </div>
                )}

                {pack.popular && (
                  <div className="absolute top-3 right-3 bg-[#F5A623] text-[#261711] text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider z-20">
                    Popular
                  </div>
                )}

                {/* Carton Container with exact aspect ratio to lock egg positions */}
                <div
                  ref={(el) => {
                    if (isSelected && sec3SelectedCartonRef) {
                      sec3SelectedCartonRef.current = el
                    }
                    if (pack.size === targetDockSize && sec3BrownRef) {
                      sec3BrownRef.current = el
                    }
                  }}
                  className="relative select-none flex items-center justify-center mx-auto"
                  style={{
                    height: '100%',
                    maxWidth: '100%',
                    aspectRatio: pack.aspect,
                  }}
                >
                  {/* Carton Base Image (No shadow) */}
                  <img
                    src={pack.image}
                    alt={title}
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />

                  {/* Egg Rendering Layer */}
                  {pack.eggs.map((egg, eggIdx) => {
                    const zIndex = egg.row === 2 ? 14 : 8
                    const eggW = egg.row === 1 ? pack.eggW * 0.94 : pack.eggW
                    const eggH = egg.row === 1 ? pack.eggH * 0.94 : pack.eggH
                    const isDockSlot = pack.size === targetDockSize && eggIdx === targetDockEggIdx
                    // Traveling egg box me pura settle hone ke baad hi dock slot ka egg reveal hoga (no double egg overlap)
                    const brownEggOpacity = isDockSlot && !isWhite && scrollProgress < 0.999 ? 0 : !isWhite ? 1 : 0
                    const whiteEggOpacity = isDockSlot && isWhite && scrollProgress < 0.999 ? 0 : isWhite ? 1 : 0

                    return (
                      <div
                        key={eggIdx}
                        ref={isDockSlot ? sec3DockEggRef : null}
                        className="absolute pointer-events-none flex items-center justify-center"
                        style={{
                          left: `${egg.x}%`,
                          top: `${egg.y}%`,
                          width: `${eggW}%`,
                          height: `${eggH}%`,
                          zIndex,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* Empty Carton: Render Brown Egg from code (No shadow) */}
                        {pack.isEmptyBase && (
                          <div
                            className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none ${
                              !isWhite ? 'active-egg-drop' : ''
                            }`}
                            style={{
                              opacity: brownEggOpacity,
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            <img
                              src={brownEggImg}
                              alt=""
                              className="w-full h-full object-contain pointer-events-none select-none"
                            />
                          </div>
                        )}

                        {/* White Egg Overlay (No shadow, 100% sharp) */}
                        <div
                          className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none ${
                            isWhite ? 'active-egg-drop' : ''
                          }`}
                          style={{
                            opacity: whiteEggOpacity,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                        >
                          <img
                            src={whiteEggImg}
                            alt=""
                            className="w-full h-full object-contain pointer-events-none select-none"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Info Details */}
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#261711] leading-tight transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-[#7A6B5C] mt-1 leading-snug">
                    {pack.subtitle}
                  </p>
                </div>

                {/* Price & CTA Row */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#F2E8D8]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#261711] transition-all">
                      ₹{price}
                    </span>
                    <span className="text-xs text-[#9B8978] font-medium">/ box</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPackId && setSelectedPackId(pack.id)
                      handleBuy(pack)
                    }}
                    className={`font-bold text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#261711] text-[#F5A623] hover:bg-[#1a0e08]'
                        : 'bg-[#F5A623] hover:bg-[#e69818] active:scale-95 text-[#261711]'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Buy now'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import chickenVideo from '../assets/WhatsApp Video 2026-10-29 at 3.15.15 PM.mp4'

export default function Hero({ heroBrownRef, heroWhiteRef, onVideoEnded, areEggsLanded }) {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const videoRef = useRef(null)
  const hasRevealedTextRef = useRef(false)
  const hasTriggeredEndRef = useRef(false)

  // Turant eggs drop trigger karein (video khatm hote hi ya murgi ke baithte hi bina kisi delay ke)
  const triggerEggDropNow = () => {
    if (hasTriggeredEndRef.current) return
    hasTriggeredEndRef.current = true
    if (onVideoEnded) onVideoEnded()
  }

  // Reveal text ONLY after the eggs have dropped, bounced & landed on the ground
  const triggerTextReveal = () => {
    if (hasRevealedTextRef.current) return
    hasRevealedTextRef.current = true

    const tl = gsap.timeline()

    // 1. Line 1: "Good eggs." lines up with spring
    if (line1Ref.current) {
      tl.fromTo(
        line1Ref.current,
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.4)' },
        0.08
      )
    }

    // 3. Line 2 & 3: "Better mornings." staggered
    if (line2Ref.current) {
      tl.fromTo(
        line2Ref.current,
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.4)' },
        0.20
      )
    }
    if (line3Ref.current) {
      tl.fromTo(
        line3Ref.current,
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.4)' },
        0.26
      )
    }

    // 4. Subtitle slides in
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        0.38
      )
    }

    // 5. CTA button springs in
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { scale: 0.85, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' },
        0.48
      )
    }
  }

  // Trigger text reveal as soon as eggs finish landing
  useEffect(() => {
    if (areEggsLanded) {
      triggerTextReveal()
    }
  }, [areEggsLanded])

  useEffect(() => {
    // Initially hide all text lines so video plays first and eggs drop first
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 45,
    })

    // Safety fallback: in case video fails or gets blocked
    const fallbackTimer = setTimeout(() => {
      triggerEggDropNow()
      setTimeout(triggerTextReveal, 1100)
    }, 3800)

    return () => clearTimeout(fallbackTimer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF5EC] pt-6 md:pt-9 pb-28 sm:pb-36 lg:pb-35 min-h-[580px] sm:min-h-[640px]">
      {/* Full Hero Section Video (Plays once; onTimeUpdate / onEnded triggers egg drop immediately) */}
      <video
        ref={videoRef}
        src={chickenVideo}
        autoPlay
        muted
        playsInline
        onTimeUpdate={(e) => {
          const v = e.currentTarget
          // Video ke aakhiri pal me murgi baithte hi turnt egg drop trigger
          if (v.duration && v.currentTime >= Math.max(0.5, v.duration - 0.25)) {
            triggerEggDropNow()
          }
        }}
        onEnded={triggerEggDropNow}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 mix-blend-multiply"
      />

      {/* Decorative 4-point Golden Sparkle 1 (Top Center-Left) */}
      <div className="absolute top-12 left-1/2 -translate-x-36 sm:-translate-x-24 pointer-events-none opacity-80 z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623">
          <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline, Subtitle & CTA (Staggered entrance when hen sits down) */}
          <div className="lg:col-span-6 z-20 flex flex-col items-start pt-2 md:pt-4 lg:pt-5 will-change-transform">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] font-black text-[#261711] tracking-tight leading-[1.08] overflow-hidden">
              <div ref={line1Ref} className="flex items-center flex-wrap gap-x-3.5 gap-y-2 will-change-transform">
                <span>Good</span>
                <span className="inline-block bg-[#F5A623] text-[#261711] px-3.5 sm:px-4 py-0.5 rounded-xl shadow-xs">
                  eggs.
                </span>
              </div>
              <div ref={line2Ref} className="mt-1 sm:mt-2 will-change-transform">
                <span>Better</span>
              </div>
              <div ref={line3Ref} className="mt-1 sm:mt-2 will-change-transform">
                <span className="inline-block bg-[#F5A623] text-[#261711] px-3.5 sm:px-4 py-0.5 rounded-xl shadow-xs">
                  mornings.
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#6D5C50] font-normal leading-relaxed max-w-lg will-change-transform">
              Fresh brown and white eggs, from our flock to your plate.
            </p>

            {/* CTA Button */}
            <div ref={ctaRef} className="mt-8 sm:mt-10 will-change-transform">
              <a
                href="#our-eggs"
                className="group inline-flex items-center gap-3.5 bg-[#F5A623] hover:bg-[#e69818] active:scale-95 text-[#261711] font-bold text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-md shadow-amber-900/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Meet the eggs</span>
                <span className="text-xl font-extrabold group-hover:translate-y-0.5 transition-transform leading-none">
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Animated Hen Video + Egg Anchors */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-4 lg:mt-0 -translate-y-2 sm:-translate-y-3">
            <div className="relative w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] h-[400px] sm:h-[450px] md:h-[490px] flex items-end justify-center select-none">

              {/* Sparkle 2 (Above Chicken) */}
              <div className="absolute top-12 right-2 sm:right-4 z-20 pointer-events-none opacity-85">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5A623">
                  <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
                </svg>
              </div>

              {/* 2. Anchor target for Brown Egg (Equal size & level with white egg) */}
              <div
                ref={heroBrownRef}
                className="absolute z-20 left-0 sm:left-4 md:left-6 -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 pointer-events-none"
              />

              {/* 3. Anchor target for White Egg (Exact same size & baseline level) */}
              <div
                ref={heroWhiteRef}
                className="absolute z-30 left-26 sm:left-34 md:left-42 lg:left-48 -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 pointer-events-none"
              />

              {/* Hen Footprints Trail */}
              <div className="absolute -bottom-2 sm:-bottom-4 right-4 sm:right-16 z-30 pointer-events-none opacity-40 hidden sm:flex items-center gap-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A826B" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v14M12 16l-7-7M12 16l7-7" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A826B" strokeWidth="2.5" strokeLinecap="round" className="transform rotate-12">
                  <path d="M12 2v14M12 16l-7-7M12 16l7-7" />
                </svg>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A826B" strokeWidth="2.5" strokeLinecap="round" className="transform -rotate-6">
                  <path d="M12 2v14M12 16l-7-7M12 16l7-7" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A826B" strokeWidth="2.5" strokeLinecap="round" className="transform rotate-6">
                  <path d="M12 2v14M12 16l-7-7M12 16l7-7" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Warm Ground Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 lg:h-14 preserve-3d"
        >
          <path
            d="M0 32C180 50 360 56 540 40C720 24 900 12 1080 26C1260 40 1380 48 1440 44V64H0V32Z"
            fill="#F6E39D"
            opacity="0.95"
          />
        </svg>
      </div>
    </section>
  )
}

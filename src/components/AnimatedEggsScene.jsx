import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import brownEggImg from '../assets/Realistic Brown Egg Cutout.png'
import whiteEggImg from '../assets/Isolated White Egg.png'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedEggsScene({
  heroBrownRef,
  heroWhiteRef,
  sec2BrownRef,
  sec2WhiteRef,
  sec3BrownRef,
  sec3WhiteRef,
  sec3SectionRef,
  sec3DockEggRef,
  selectedType = 'brown',
  selectedPackId = 'pack-10',
  isIntroComplete = false,
  onEggsLanded,
  onProgressChange,
}) {
  const containerRef = useRef(null)
  const brownEggRef = useRef(null)
  const whiteEggRef = useRef(null)
  const brownShadowRef = useRef(null)
  const whiteShadowRef = useRef(null)
  const heroPosRef = useRef(null)
  const hasBouncedRef = useRef(false)

  // Trigger drop and bounce animation for eggs (from above navbar, 100% sharp & opaque)
  const triggerBounce = (hBrown, hWhite) => {
    if (hasBouncedRef.current) return
    if (!brownEggRef.current || !whiteEggRef.current) return
    hasBouncedRef.current = true

    // Make visible and set 100% opacity immediately before dropping (completely solid & crystal clear)
    gsap.set([brownEggRef.current, whiteEggRef.current], {
      visibility: 'visible',
      opacity: 1,
    })

    // Brown Egg: Drops straight down from above the navbar (-240px) over the navbar with 100% opacity & bounces
    gsap.fromTo(
      brownEggRef.current,
      {
        x: hBrown.x,
        y: -240, // Above navbar & top edge of screen
        rotation: -14,
        scale: 1,
        opacity: 1,
      },
      {
        y: hBrown.y,
        rotation: -4,
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'bounce.out',
      }
    )

    if (brownShadowRef.current) {
      gsap.fromTo(
        brownShadowRef.current,
        { scale: 0.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
      )
    }

    // White Egg: Drops straight down from above the navbar (-260px) over the navbar with 100% opacity & bounces
    gsap.fromTo(
      whiteEggRef.current,
      {
        x: hWhite.x,
        y: -260, // Above navbar & top edge of screen
        rotation: 12,
        scale: 1,
        opacity: 1,
      },
      {
        y: hWhite.y,
        rotation: 2,
        scale: 1,
        opacity: 1,
        duration: 0.94,
        delay: 0.04,
        ease: 'bounce.out',
        onComplete: () => {
          // Eggs have finished dropping, bouncing, and settled!
          if (onEggsLanded) {
            onEggsLanded()
          }
        },
      }
    )

    if (whiteShadowRef.current) {
      gsap.fromTo(
        whiteShadowRef.current,
        { scale: 0.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.94, delay: 0.04, ease: 'power2.out' }
      )
    }
  }

  useEffect(() => {
    let ctx = null

    const initAnimation = () => {
      if (
        !heroBrownRef.current ||
        !heroWhiteRef.current ||
        !sec2BrownRef.current ||
        !sec2WhiteRef.current ||
        !brownEggRef.current ||
        !whiteEggRef.current
      ) {
        return
      }

      ctx = gsap.context(() => {
        const getRelativePos = (el) => {
          if (!containerRef.current || !el) return { x: 0, y: 0, width: 0, height: 0 }
          const containerRect = containerRef.current.getBoundingClientRect()
          const rect = el.getBoundingClientRect()
          return {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
          }
        }

        const hBrown = getRelativePos(heroBrownRef.current)
        const hWhite = getRelativePos(heroWhiteRef.current)
        const sBrown = getRelativePos(sec2BrownRef.current)
        const sWhite = getRelativePos(sec2WhiteRef.current)

        if (!hBrown.width || !sBrown.width) return

        const s3Brown = sec3BrownRef?.current ? getRelativePos(sec3BrownRef.current) : null
        const dock = sec3DockEggRef?.current ? getRelativePos(sec3DockEggRef.current) : null

        // Gentle, subtle scale up as eggs travel to Section 2 (e.g. ~1.08x)
        const targetScale = window.innerWidth < 640 ? 1.05 : 1.08

        // Scale egg down to match carton container egg size (kinchi sa aur bada: 0.94 -> 0.98)
        // dock.height is the exact pixel height of the carton egg slot
        const s3Scale =
          dock && dock.height && sBrown.height
            ? (dock.height / sBrown.height) * 0.98
            : 0.20

        // S3 Target: Exact center of that specific egg slot, stopping 1px before touching (-1px)
        const s3BrownX =
          dock && dock.width
            ? dock.x + dock.width / 2 - sBrown.width / 2
            : s3Brown && s3Brown.width
            ? s3Brown.x + (s3Brown.width - sBrown.width) / 2
            : sBrown.x

        const s3BrownY =
          dock && dock.height
            ? dock.y + dock.height / 2 - sBrown.height / 2 - 1
            : s3Brown && s3Brown.height
            ? s3Brown.y + (s3Brown.height - sBrown.height) / 2
            : sBrown.y + 850

        heroPosRef.current = { hBrown, hWhite }

        if (isIntroComplete && !hasBouncedRef.current) {
          triggerBounce(hBrown, hWhite)
        } else if (!hasBouncedRef.current) {
          // Set initial positions in Hero (Positioned above navbar & hidden before video ends)
          gsap.set(brownEggRef.current, {
            x: hBrown.x,
            y: -240,
            rotation: -14,
            scale: 1,
            opacity: 0,
            visibility: 'hidden',
          })
          gsap.set(whiteEggRef.current, {
            x: hWhite.x,
            y: -260,
            rotation: 12,
            scale: 1,
            opacity: 0,
            visibility: 'hidden',
          })
          if (brownShadowRef.current) gsap.set(brownShadowRef.current, { scale: 0.1, opacity: 0 })
          if (whiteShadowRef.current) gsap.set(whiteShadowRef.current, { scale: 0.1, opacity: 0 })
        } else {
          gsap.set(brownEggRef.current, {
            x: hBrown.x,
            y: hBrown.y,
            rotation: -4,
            scale: 1,
            opacity: 1,
            visibility: 'visible',
          })
          gsap.set(whiteEggRef.current, {
            x: hWhite.x,
            y: hWhite.y,
            rotation: 2,
            scale: 1,
            opacity: 1,
            visibility: 'visible',
          })
          if (brownShadowRef.current) gsap.set(brownShadowRef.current, { scale: 1, opacity: 1 })
          if (whiteShadowRef.current) gsap.set(whiteShadowRef.current, { scale: 1, opacity: 1 })
        }

        const isMobile = window.innerWidth < 1024

        // Master 3-Section GSAP ScrollTrigger timeline
        const endTriggerEl =
          sec3BrownRef?.current || sec3SectionRef?.current || sec2BrownRef.current

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: isMobile ? (document.body || containerRef.current) : heroBrownRef.current,
            start: isMobile ? 'top top' : 'top 20%', // Mobile starts instantly on scroll from top of the page; Desktop stays at 'top 20%'
            endTrigger: endTriggerEl,
            end: sec3BrownRef?.current ? 'center 52%' : 'top 20%',
            scrub: isMobile ? 0.1 : 0.7, // Ultra-responsive real-time tracking on mobile
            onUpdate: (self) => {
              if (onProgressChange) {
                onProgressChange(self.progress)
              }
            },
          },
        })

        if (isMobile) {
          // ============================================================
          // MOBILE: Synchronous Vertical Flow
          // 1. Both eggs start moving down together right from scroll 0.00!
          // 2. White egg travels to its top Section 2 slot sWhite (0.00 to 0.22)
          // 3. Brown egg (layered in front: z-30) travels down to sBrown below white egg (0.00 to 0.34)
          // 4. Showcase pause together in Section 2 (0.34 to 0.44)
          // 5. Glide down to Section 3 box (0.44 to 0.74)
          // ============================================================
          tl.fromTo(
            brownEggRef.current,
            {
              x: hBrown.x,
              y: hBrown.y,
              rotation: -4,
              scale: 1,
              opacity: 1,
            },
            {
              x: sBrown.x,
              y: sBrown.y,
              rotation: -3,
              scale: targetScale,
              opacity: 1,
              ease: 'power1.out',
              duration: 0.34,
              immediateRender: false,
            },
            0
          )

          // White egg also moves down together with Brown egg right from 0.00
          tl.fromTo(
            whiteEggRef.current,
            {
              x: hWhite.x,
              y: hWhite.y,
              rotation: 2,
              scale: 1,
              opacity: 1,
            },
            {
              x: sWhite.x,
              y: sWhite.y,
              rotation: 2,
              scale: targetScale,
              opacity: 1,
              ease: 'power1.out',
              duration: 0.22,
              immediateRender: false,
            },
            0
          )

          // White egg holds locked at sWhite while Brown egg arrives below it
          tl.to(
            whiteEggRef.current,
            {
              duration: 0.22,
              ease: 'none',
            },
            0.22
          )

          // Both eggs hold positions in Section 2
          tl.to(
            [brownEggRef.current, whiteEggRef.current],
            {
              duration: 0.10,
              ease: 'none',
            },
            0.34
          )

          // Mobile Glide to Section 3 Box
          if (selectedType === 'white') {
            tl.to(
              brownEggRef.current,
              {
                opacity: 0,
                duration: 0.06,
                ease: 'power1.out',
              },
              0.44
            )

            if (whiteShadowRef.current) {
              tl.to(
                whiteShadowRef.current,
                {
                  opacity: 0,
                  duration: 0.05,
                  ease: 'power1.out',
                },
                0.45
              )
            }

            tl.to(
              whiteEggRef.current,
              {
                x: s3BrownX,
                y: s3BrownY,
                rotation: 2,
                scale: s3Scale,
                ease: 'sine.inOut',
                duration: 0.30,
              },
              0.46
            )

            tl.set(
              whiteEggRef.current,
              {
                opacity: 0,
              },
              0.76
            )
          } else {
            tl.to(
              whiteEggRef.current,
              {
                opacity: 0,
                duration: 0.06,
                ease: 'power1.out',
              },
              0.44
            )

            if (brownShadowRef.current) {
              tl.to(
                brownShadowRef.current,
                {
                  opacity: 0,
                  duration: 0.05,
                  ease: 'power1.out',
                },
                0.45
              )
            }

            tl.to(
              brownEggRef.current,
              {
                x: s3BrownX,
                y: s3BrownY,
                rotation: -2,
                scale: s3Scale,
                ease: 'sine.inOut',
                duration: 0.30,
              },
              0.46
            )

            tl.set(
              brownEggRef.current,
              {
                opacity: 0,
              },
              0.76
            )
          }
        } else {
          // ============================================================
          // DESKTOP (lg:): Parallel side-by-side animation (100% Intact)
          // ============================================================
          tl.fromTo(
            brownEggRef.current,
            {
              x: hBrown.x,
              y: hBrown.y,
              rotation: -4,
              scale: 1,
              opacity: 1,
            },
            {
              x: sBrown.x,
              y: sBrown.y,
              rotation: -3,
              scale: targetScale,
              opacity: 1,
              ease: 'power2.inOut',
              duration: 0.28,
              immediateRender: false,
            },
            0
          )

          tl.fromTo(
            whiteEggRef.current,
            {
              x: hWhite.x,
              y: hWhite.y,
              rotation: 2,
              scale: 1,
              opacity: 1,
            },
            {
              x: sWhite.x,
              y: sWhite.y,
              rotation: 2,
              scale: targetScale,
              opacity: 1,
              ease: 'power2.inOut',
              duration: 0.28,
              immediateRender: false,
            },
            0
          )

          tl.to(
            [brownEggRef.current, whiteEggRef.current],
            {
              duration: 0.04,
              ease: 'none',
            },
            0.28
          )

          if (selectedType === 'white') {
            tl.to(
              brownEggRef.current,
              {
                opacity: 0,
                duration: 0.06,
                ease: 'power1.out',
              },
              0.30
            )

            if (whiteShadowRef.current) {
              tl.to(
                whiteShadowRef.current,
                {
                  opacity: 0,
                  duration: 0.05,
                  ease: 'power1.out',
                },
                0.31
              )
            }

            tl.to(
              whiteEggRef.current,
              {
                x: s3BrownX,
                y: s3BrownY,
                rotation: 2,
                scale: s3Scale,
                ease: 'sine.inOut',
                duration: 0.30,
              },
              0.32
            )

            tl.set(
              whiteEggRef.current,
              {
                opacity: 0,
              },
              0.62
            )
          } else {
            tl.to(
              whiteEggRef.current,
              {
                opacity: 0,
                duration: 0.06,
                ease: 'power1.out',
              },
              0.30
            )

            if (brownShadowRef.current) {
              tl.to(
                brownShadowRef.current,
                {
                  opacity: 0,
                  duration: 0.05,
                  ease: 'power1.out',
                },
                0.31
              )
            }

            tl.to(
              brownEggRef.current,
              {
                x: s3BrownX,
                y: s3BrownY,
                rotation: -2,
                scale: s3Scale,
                ease: 'sine.inOut',
                duration: 0.30,
              },
              0.32
            )

            tl.set(
              brownEggRef.current,
              {
                opacity: 0,
              },
              0.62
            )
          }
        }
      })
    }

    const timer = setTimeout(initAnimation, 140)

    const handleResize = () => {
      ScrollTrigger.refresh()
      if (ctx) ctx.revert()
      initAnimation()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      if (ctx) ctx.revert()
    }
  }, [
    heroBrownRef,
    heroWhiteRef,
    sec2BrownRef,
    sec2WhiteRef,
    sec3BrownRef,
    sec3WhiteRef,
    sec3SectionRef,
    sec3DockEggRef,
    selectedType,
    selectedPackId,
    onProgressChange,
  ])

  // When video completes and hen sits down, eggs drop from above & bounce into place immediately!
  useEffect(() => {
    if (!isIntroComplete || hasBouncedRef.current) return

    if (heroPosRef.current) {
      const { hBrown, hWhite } = heroPosRef.current
      triggerBounce(hBrown, hWhite)
    } else if (heroBrownRef?.current && heroWhiteRef?.current && containerRef?.current) {
      // Calculate coordinates immediately so there's literally 0ms delay
      const containerRect = containerRef.current.getBoundingClientRect()
      const bRect = heroBrownRef.current.getBoundingClientRect()
      const wRect = heroWhiteRef.current.getBoundingClientRect()
      const hBrown = {
        x: bRect.left - containerRect.left,
        y: bRect.top - containerRect.top,
        width: bRect.width,
        height: bRect.height,
      }
      const hWhite = {
        x: wRect.left - containerRect.left,
        y: wRect.top - containerRect.top,
        width: wRect.width,
        height: wRect.height,
      }
      heroPosRef.current = { hBrown, hWhite }
      triggerBounce(hBrown, hWhite)
    }
  }, [isIntroComplete])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-50 overflow-visible"
    >
      {/* 1. Traveling White Egg (Layered behind: z-20) */}
      <div
        ref={whiteEggRef}
        className="absolute top-0 left-0 will-change-transform z-20"
        style={{ transformOrigin: 'center center', visibility: 'hidden', opacity: 0 }}
      >
        <div className="relative w-48 sm:w-54 lg:w-62 h-58 sm:h-66 lg:h-74 flex flex-col items-center justify-end select-none pointer-events-auto cursor-pointer group">
          {/* Ground Contact Shadow */}
          <div
            ref={whiteShadowRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 sm:w-40 lg:w-46 h-4 sm:h-4.5 lg:h-5 bg-[#261711]/25 rounded-full blur-[4px] sm:blur-[5px] transition-transform group-hover:scale-110 opacity-0"
          />
          {/* Realistic White Egg Image */}
          <img
            src={whiteEggImg}
            alt="Fresh White Egg"
            className="max-w-full max-h-full object-contain drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. Traveling Brown Egg (Layered in front: z-30, renders on top of White Egg) */}
      <div
        ref={brownEggRef}
        className="absolute top-0 left-0 will-change-transform z-30"
        style={{ transformOrigin: 'center center', visibility: 'hidden', opacity: 0 }}
      >
        <div className="relative w-48 sm:w-54 lg:w-62 h-58 sm:h-66 lg:h-74 flex flex-col items-center justify-end select-none pointer-events-auto cursor-pointer group">
          {/* Ground Contact Shadow */}
          <div
            ref={brownShadowRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 sm:w-40 lg:w-46 h-4 sm:h-4.5 lg:h-5 bg-[#261711]/25 rounded-full blur-[4px] sm:blur-[5px] transition-transform group-hover:scale-110 opacity-0"
          />
          {/* Realistic Brown Egg Image */}
          <img
            src={brownEggImg}
            alt="Fresh Brown Egg"
            className="max-w-full max-h-full object-contain drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

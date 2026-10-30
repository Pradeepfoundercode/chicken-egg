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

        // Master 3-Section GSAP ScrollTrigger timeline
        const endTriggerEl =
          sec3BrownRef?.current || sec3SectionRef?.current || sec2BrownRef.current

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroBrownRef.current,
            start: 'top 20%',
            endTrigger: endTriggerEl,
            end: sec3BrownRef?.current ? 'center 52%' : 'top 20%',
            scrub: 0.7, // Balanced & smooth physical scrolling
            onUpdate: (self) => {
              if (onProgressChange) {
                onProgressChange(self.progress)
              }
            },
          },
        })

        // ============================================================
        // SEGMENT 1: Hero -> Section 2 (0.00 to 0.28)
        // Eggs separate from Hero to both sides of the 3D Ampersand
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

        // ============================================================
        // SEGMENT 2: Section 2 Balanced Showcase (0.28 to 0.32)
        // Yahan ande comfortable time ke liye Section 2 me stay karte hain
        // ============================================================
        tl.to(
          [brownEggRef.current, whiteEggRef.current],
          {
            duration: 0.04,
            ease: 'none',
          },
          0.28
        )

        // ============================================================
        // SEGMENT 3: Section 2 -> Section 3 Glide (Starts at 0.32)
        // Section 2 showcase complete hone ke baad natural timing se descent shuru hota hai
        // ============================================================
        if (selectedType === 'white') {
          // Brown egg fades out gracefully as descent starts
          tl.to(
            brownEggRef.current,
            {
              opacity: 0,
              duration: 0.06,
              ease: 'power1.out',
            },
            0.30
          )

          // Floor shadow fades out as white egg lifts into flight
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

          // White egg glides down smoothly to Section 3 box
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

          // 1px pehle hi container ke upar aate aate achanak se gayab
          tl.set(
            whiteEggRef.current,
            {
              opacity: 0,
            },
            0.62
          )
        } else {
          // White egg fades out gracefully as descent starts
          tl.to(
            whiteEggRef.current,
            {
              opacity: 0,
              duration: 0.06,
              ease: 'power1.out',
            },
            0.30
          )

          // Floor shadow fades out as brown egg lifts into flight
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

          // Brown egg glides down smoothly to Section 3 box
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

          // 1px pehle hi container ke upar aate aate achanak se gayab
          tl.set(
            brownEggRef.current,
            {
              opacity: 0,
            },
            0.62
          )
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
      {/* 1. Traveling Brown Egg (Hidden by default; drops from above navbar & bounces) */}
      <div
        ref={brownEggRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transformOrigin: 'center center', visibility: 'hidden', opacity: 0 }}
      >
        <div className="relative w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 flex flex-col items-center justify-end select-none pointer-events-auto cursor-pointer group">
          {/* Ground Contact Shadow */}
          <div
            ref={brownShadowRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-34 sm:w-42 md:w-46 h-5 bg-[#261711]/25 rounded-full blur-[5px] transition-transform group-hover:scale-110 opacity-0"
          />
          {/* Realistic Brown Egg Image */}
          <img
            src={brownEggImg}
            alt="Fresh Brown Egg"
            className="max-w-full max-h-full object-contain drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. Traveling White Egg (Hidden by default; drops from above navbar & bounces) */}
      <div
        ref={whiteEggRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transformOrigin: 'center center', visibility: 'hidden', opacity: 0 }}
      >
        <div className="relative w-44 sm:w-52 md:w-58 lg:w-62 h-54 sm:h-62 md:h-68 lg:h-74 flex flex-col items-center justify-end select-none pointer-events-auto cursor-pointer group">
          {/* Ground Contact Shadow */}
          <div
            ref={whiteShadowRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-34 sm:w-42 md:w-46 h-5 bg-[#261711]/25 rounded-full blur-[5px] transition-transform group-hover:scale-110 opacity-0"
          />
          {/* Realistic White Egg Image */}
          <img
            src={whiteEggImg}
            alt="Fresh White Egg"
            className="max-w-full max-h-full object-contain drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

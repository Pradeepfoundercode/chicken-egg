import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PACKS_CONFIG } from './PickYourPackSection'
import brownEggImg from '../assets/Realistic Brown Egg Cutout.png'
import whiteEggImg from '../assets/Isolated White Egg.png'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedCartonScene({
  sec3SelectedCartonRef,
  sec4CartonTargetRef,
  sec4SectionRef,
  selectedPackId = 'pack-10',
  selectedType = 'brown',
}) {
  const containerRef = useRef(null)
  const cartonBoxRef = useRef(null)

  const currentPack =
    PACKS_CONFIG.find((p) => p.id === selectedPackId) || PACKS_CONFIG[1] // fallback to pack-10

  useEffect(() => {
    let ctx = null

    const initAnimation = () => {
      if (
        !sec3SelectedCartonRef?.current ||
        !sec4CartonTargetRef?.current ||
        !sec4SectionRef?.current ||
        !cartonBoxRef?.current ||
        !containerRef?.current
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

        const startBox = getRelativePos(sec3SelectedCartonRef.current)
        const endBox = getRelativePos(sec4CartonTargetRef.current)

        if (!startBox.width || !endBox.width) {
          const retryTimer = setTimeout(initAnimation, 80)
          return () => clearTimeout(retryTimer)
        }

        // Set dimensions of the carton box container to match startBox size directly
        // So at liftoff, it is 100% pixel-for-pixel identical to the card (Scale 1.0, zero blur)
        cartonBoxRef.current.style.width = `${startBox.width}px`
        cartonBoxRef.current.style.height = `${startBox.height}px`

        const scaleEnd = endBox.width / startBox.width
        const startX = startBox.x
        const startY = startBox.y
        const targetX = endBox.x + (endBox.width - startBox.width) / 2
        const targetY = endBox.y + (endBox.height - startBox.height) / 2

        // Initial setup: box positioned directly on the Section 3 selected card, hidden until scroll starts
        gsap.set(cartonBoxRef.current, {
          x: startX,
          y: startY,
          scale: 1,
          opacity: 0,
          visibility: 'hidden',
          transformOrigin: 'center center',
        })

        // Ensure selected card's carton is visible initially
        if (sec3SelectedCartonRef?.current) {
          gsap.set(sec3SelectedCartonRef.current, { opacity: 1 })
        }

        const isMobile = window.innerWidth < 1024

        // Master ScrollTrigger Timeline: Drives box travel from Section 3 to Section 4 on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: isMobile ? sec3SelectedCartonRef.current : sec4SectionRef.current,
            start: isMobile ? 'top 20%' : 'top 75%', // Starts when user scrolls past the selected box on mobile, or when Section 4 arrives on desktop
            endTrigger: sec4SectionRef.current,
            end: 'top 20%',   // Finishes when Section 4 settles in place
            scrub: 0.6,       // Smooth physical scroll scrubbing
          },
        })

        // 1. Instantaneous handoff at scroll start: cartonBoxRef shows at scale 1, card box hides (zero crossfade blur!)
        tl.set(
          cartonBoxRef.current,
          {
            x: startX,
            y: startY,
            scale: 1,
            opacity: 1,
            visibility: 'visible',
            immediateRender: false,
          },
          0
        )

        if (sec3SelectedCartonRef?.current) {
          tl.set(
            sec3SelectedCartonRef.current,
            {
              opacity: 0,
              immediateRender: false,
            },
            0
          )
        }

        // 2. Glides smoothly down the page from Section 3 into Section 4's destination slot (scaling up smoothly)
        tl.fromTo(
          cartonBoxRef.current,
          {
            x: startX,
            y: startY,
            scale: 1,
          },
          {
            x: targetX,
            y: targetY,
            scale: scaleEnd,
            ease: 'power1.inOut',
            duration: 1.0,
            immediateRender: false,
          },
          0
        )
      })

      ScrollTrigger.refresh()
    }

    const timer = setTimeout(initAnimation, 120)

    const handleResize = () => {
      ScrollTrigger.refresh()
      if (ctx) ctx.revert()
      initAnimation()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
      if (sec3SelectedCartonRef?.current) {
        gsap.set(sec3SelectedCartonRef.current, { opacity: 1 })
      }
      if (ctx) ctx.revert()
    }
  }, [
    sec3SelectedCartonRef,
    sec4CartonTargetRef,
    sec4SectionRef,
    selectedPackId,
  ])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-30 overflow-visible"
    >
      {/* Traveling Box with Eggs Element */}
      <div
        ref={cartonBoxRef}
        className="absolute top-0 left-0 will-change-transform flex flex-col items-center"
        style={{
          visibility: 'hidden',
          opacity: 0,
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Aspect Ratio Box Container */}
        <div
          className="relative w-full h-full select-none"
          style={{ aspectRatio: currentPack.aspect }}
        >
          {/* Base Carton Image (No shadow) */}
          <img
            src={currentPack.image}
            alt={currentPack.subtitle}
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* Eggs Layer */}
          {currentPack.eggs.map((egg, eggIdx) => {
            const zIndex = egg.row === 2 ? 14 : 8
            const eggW = egg.row === 1 ? currentPack.eggW * 0.94 : currentPack.eggW
            const eggH = egg.row === 1 ? currentPack.eggH * 0.94 : currentPack.eggH

            return (
              <div
                key={eggIdx}
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
                {/* Brown Egg Layer (No shadow) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
                  style={{
                    opacity: selectedType === 'brown' ? 1 : 0,
                  }}
                >
                  <img
                    src={brownEggImg}
                    alt=""
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>

                {/* White Egg Layer (No shadow) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
                  style={{
                    opacity: selectedType === 'white' ? 1 : 0,
                  }}
                >
                  <img
                    src={whiteEggImg}
                    alt=""
                    className="w-full h-full object-contain scale-y-[0.94] pointer-events-none select-none"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

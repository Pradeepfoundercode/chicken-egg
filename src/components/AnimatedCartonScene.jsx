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

        // Set dimensions of the carton box container to match destination size directly on element
        cartonBoxRef.current.style.width = `${endBox.width}px`
        cartonBoxRef.current.style.height = `${endBox.height}px`

        const scaleStart = startBox.width / endBox.width
        const startX = startBox.x + (startBox.width - endBox.width) / 2
        const startY = startBox.y + (startBox.height - endBox.height) / 2
        const endX = endBox.x
        const endY = endBox.y

        // Initial setup: box positioned directly on the Section 3 selected card, hidden until scroll starts
        gsap.set(cartonBoxRef.current, {
          x: startX,
          y: startY,
          scale: scaleStart,
          opacity: 0,
          visibility: 'hidden',
          transformOrigin: 'center center',
        })

        // Ensure selected card's carton is visible initially
        if (sec3SelectedCartonRef?.current) {
          gsap.set(sec3SelectedCartonRef.current, { opacity: 1 })
        }

        // Master ScrollTrigger Timeline: Drives box travel from Section 3 to Section 4 on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec4SectionRef.current,
            start: 'top 75%', // Starts when user scrolls past Section 3 and Section 4 begins entering
            end: 'top 20%',   // Finishes when Section 4 settles in place
            scrub: 0.6,       // Smooth physical scroll scrubbing
          },
        })

        // 1. Reveal the traveling box immediately as user begins scrolling past Section 3
        tl.fromTo(
          cartonBoxRef.current,
          {
            x: startX,
            y: startY,
            scale: scaleStart,
            opacity: 0,
            visibility: 'hidden',
          },
          {
            opacity: 1,
            visibility: 'visible',
            duration: 0.04,
            ease: 'none',
            immediateRender: false,
          },
          0
        )

        // As the box lifts off the card, hide the box in the card so no duplicate remains
        if (sec3SelectedCartonRef?.current) {
          tl.to(
            sec3SelectedCartonRef.current,
            {
              opacity: 0,
              duration: 0.04,
              ease: 'power1.out',
              immediateRender: false,
            },
            0
          )
        }

        // 2. Glides smoothly down the page from Section 3 into Section 4's destination slot
        tl.fromTo(
          cartonBoxRef.current,
          {
            x: startX,
            y: startY,
            scale: scaleStart,
          },
          {
            x: endX,
            y: endY,
            scale: 1,
            ease: 'power1.inOut',
            duration: 0.95,
            immediateRender: false,
          },
          0.05
        )
      })
    }

    const timer = setTimeout(initAnimation, 150)

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
        }}
      >
        {/* Aspect Ratio Box Container */}
        <div
          className="relative w-full h-full select-none"
          style={{ aspectRatio: currentPack.aspect }}
        >
          {/* Base Carton Image */}
          <img
            src={currentPack.image}
            alt={currentPack.subtitle}
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
          />

          {/* Eggs Layer */}
          {currentPack.eggs.map((egg, eggIdx) => {
            const zIndex = egg.row === 2 ? 14 : 8
            const eggW = egg.row === 1 ? currentPack.eggW * 0.94 : currentPack.eggW
            const eggH = egg.row === 1 ? currentPack.eggH * 0.94 : currentPack.eggH
            const delayMs = eggIdx * 35

            return (
              <div
                key={eggIdx}
                className="absolute pointer-events-none flex items-center justify-center will-change-transform"
                style={{
                  left: `${egg.x}%`,
                  top: `${egg.y}%`,
                  width: `${eggW}%`,
                  height: `${eggH}%`,
                  zIndex,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Brown Egg Layer */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                  style={{
                    transition:
                      'opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
                    transitionDelay: `${delayMs}ms`,
                    opacity: selectedType === 'brown' ? 1 : 0,
                    transform: selectedType === 'brown' ? 'scale(1)' : 'scale(0.85)',
                  }}
                >
                  <img
                    src={brownEggImg}
                    alt=""
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* White Egg Layer */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                  style={{
                    transition:
                      'opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
                    transitionDelay: `${delayMs}ms`,
                    opacity: selectedType === 'white' ? 1 : 0,
                    transform: selectedType === 'white' ? 'scale(1)' : 'scale(0.85)',
                  }}
                >
                  <img
                    src={whiteEggImg}
                    alt=""
                    className="w-full h-full object-contain scale-y-[0.94] pointer-events-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Floor Shadow */}
        <div className="w-4/5 mx-auto h-5 bg-black/50 rounded-full blur-[14px] -mt-2 pointer-events-none" />
      </div>
    </div>
  )
}

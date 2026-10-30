import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PACKS_CONFIG } from './PickYourPackSection'

gsap.registerPlugin(ScrollTrigger)

export default function BoxedWithCareSection({
  sec4SectionRef,
  sec4CartonTargetRef,
  selectedPackId = 'pack-10',
  setSelectedPackId,
  selectedType = 'brown',
  setSelectedType,
}) {
  const [activeStep, setActiveStep] = useState(1)

  const currentPack =
    PACKS_CONFIG.find((p) => p.id === selectedPackId) || PACKS_CONFIG[1] // fallback to pack-10

  useEffect(() => {
    if (!sec4SectionRef?.current) return

    const ctx = gsap.context(() => {
      // Step indicator (1 -> 2 -> 3) auto-advances on scroll
      ScrollTrigger.create({
        trigger: sec4SectionRef.current,
        start: 'top 35%',
        end: 'bottom 90%',
        onUpdate: (self) => {
          if (self.progress < 0.35) {
            setActiveStep(1)
          } else if (self.progress < 0.70) {
            setActiveStep(2)
          } else {
            setActiveStep(3)
          }
        },
      })
    }, sec4SectionRef)

    return () => {
      ctx.revert()
    }
  }, [sec4SectionRef])

  const stepTitle1 =
    currentPack.size === 6
      ? 'Six good eggs'
      : currentPack.size === 12
      ? 'Twelve good eggs'
      : 'Ten good eggs'

  const steps = [
    {
      num: 1,
      title: stepTitle1,
      desc: 'Your pick of the flock, each one nestled in its own cup.',
    },
    {
      num: 2,
      title: 'Closed up snug',
      desc: 'Moulded pulp cushions every drop all the way to your door.',
    },
    {
      num: 3,
      title: 'Sealed with our sticker',
      desc: "Every box arrives labelled so you know it's fresh from our farm.",
    },
  ]

  const handleToggleType = (type) => {
    if (setSelectedType) {
      setSelectedType(type)
    }
  }

  const maxWClass =
    currentPack.size === 6
      ? 'max-w-[290px] sm:max-w-[320px] lg:max-w-[350px]'
      : currentPack.size === 10
      ? 'max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]'
      : 'max-w-[420px] sm:max-w-[470px] lg:max-w-[520px]'

  return (
    <section
      ref={sec4SectionRef}
      id="boxed-with-care"
      className="relative w-full bg-[#1F120A] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-visible select-none z-20"
    >
      {/* Top Organic Wavy Curve Divider separating Section 3 (#FAF5EC) and Section 4 (#1F120A) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-14"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L0,45 Q150,95 300,50 T600,60 T900,45 T1200,65 L1200,0 Z"
            fill="#FAF5EC"
          />
        </svg>
      </div>

      {/* Subtle Ambient Radial Glow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#F5A623]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Header, Paragraph, Type Toggle & Steps List
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Eyebrow with Wavy Doodle Underline */}
            <div className="flex flex-col items-start">
              <span className="font-handwriting text-xl sm:text-2xl text-[#E5A83B] tracking-wide select-none">
                what you'll receive
              </span>
              {/* Hand-drawn Wavy Squiggle */}
              <svg
                className="w-20 sm:w-24 h-2 text-[#E5A83B] -mt-0.5 opacity-90 overflow-visible"
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

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.08] mt-4 tracking-tight">
              Your eggs, <br />
              <span className="text-[#F5A623]">boxed with care.</span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-[#A39284] text-sm sm:text-base leading-relaxed mt-4 max-w-md">
              Every order is packed in our moulded-pulp carton and sealed with our sticker. This is what lands on your doorstep.
            </p>

            {/* Brown / White Toggle Pill */}
            <div className="inline-flex items-center bg-[#140B06] p-1.5 rounded-full mt-7 border border-[#382419] shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleType('brown')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedType === 'brown'
                    ? 'bg-[#F5A623] text-[#241711] shadow-md scale-102'
                    : 'text-[#8C7A6B] hover:text-[#CBBBB0]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-black/20 ${
                    selectedType === 'brown' ? 'bg-[#915423]' : 'bg-[#7D461B]'
                  }`}
                />
                Brown
              </button>

              <button
                type="button"
                onClick={() => handleToggleType('white')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedType === 'white'
                    ? 'bg-[#F5A623] text-[#241711] shadow-md scale-102'
                    : 'text-[#8C7A6B] hover:text-[#CBBBB0]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-black/20 ${
                    selectedType === 'white' ? 'bg-white shadow-xs' : 'bg-stone-300'
                  }`}
                />
                White
              </button>
            </div>

            {/* Numbered Feature Steps List (1, 2, 3) */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-5 sm:gap-6 w-full max-w-md">
              {steps.map((step) => {
                const isActive = activeStep === step.num

                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    className="flex items-start gap-4 cursor-pointer group transition-all"
                  >
                    {/* Number Badge */}
                    <span
                      className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full text-xs sm:text-sm font-black flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'bg-[#F5A623] text-[#241711] shadow-sm'
                          : 'bg-[#29170D] text-[#8C7A6B] border border-[#442A1D]'
                      }`}
                    >
                      {step.num}
                    </span>

                    {/* Content */}
                    <div className="flex flex-col">
                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-[#B8A696] group-hover:text-white'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[#7D6B5D] text-xs sm:text-sm leading-snug mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Destination Target for Traveling Box
              (Directly empty/invisible so box only appears by traveling on scroll)
             ======================================================== */}
          <div className="lg:col-span-7 relative flex items-center justify-center mt-6 lg:mt-0">
            <div className={`relative w-full ${maxWClass} flex flex-col items-center`}>
              {/* Invisible Target Anchor that maintains exact layout dimensions for measuring */}
              <div
                ref={sec4CartonTargetRef}
                className="relative w-full select-none invisible pointer-events-none"
                style={{ aspectRatio: currentPack.aspect }}
              >
                <img
                  src={currentPack.image}
                  alt=""
                  className="w-full h-full object-contain invisible"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

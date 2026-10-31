import { useRef, useState, useCallback, useEffect } from 'react'
import Hero from '../components/Hero'
import TwoShellsSection from '../components/TwoShellsSection'
import PickYourPackSection from '../components/PickYourPackSection'
import BoxedWithCareSection from '../components/BoxedWithCareSection'
import MeetTheFarmSection from '../components/MeetTheFarmSection'
import Footer from '../components/Footer'
import AnimatedEggsScene from '../components/AnimatedEggsScene'
import AnimatedCartonScene from '../components/AnimatedCartonScene'

export default function Home() {
  const heroBrownRef = useRef(null)
  const heroWhiteRef = useRef(null)
  const sec2BrownRef = useRef(null)
  const sec2WhiteRef = useRef(null)
  const sec3BrownRef = useRef(null)
  const sec3WhiteRef = useRef(null)
  const sec3SectionRef = useRef(null)
  const sec3DockEggRef = useRef(null)
  const sec3SelectedCartonRef = useRef(null)
  const sec4SectionRef = useRef(null)
  const sec4CartonTargetRef = useRef(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedType, setSelectedType] = useState('brown') // 'brown' | 'white'
  // Small devices = pack-12 (default), Large devices = pack-10
  const [selectedPackId, setSelectedPackId] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'pack-12'
    }
    return 'pack-10'
  })
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [areEggsLanded, setAreEggsLanded] = useState(false)

  // Auto-switch pack based on screen size (small devices: pack-12, large devices: pack-10)
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024
      setSelectedPackId((prev) => {
        if (isMobile && prev === 'pack-10') return 'pack-12'
        if (!isMobile && prev === 'pack-12') return 'pack-10'
        return prev
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Use callback to avoid excessive re-renders during high-frequency scroll
  const handleProgressChange = useCallback((progress) => {
    // Only trigger React state change when discrete threshold steps change,
    // plus immediate updates at critical animation boundaries (e.g., 0.96 cards reveal when egg lands, 0.98 dock switch)
    setScrollProgress((prev) => {
      const crossedThreshold =
        (prev < 0.96 && progress >= 0.96) ||
        (prev >= 0.96 && progress < 0.96) ||
        (prev < 0.999 && progress >= 0.999) ||
        (prev >= 0.999 && progress < 0.999) ||
        (prev < 0.18 && progress >= 0.18) ||
        (prev >= 0.18 && progress < 0.18)

      if (crossedThreshold || Math.abs(prev - progress) > 0.02 || progress === 0 || progress >= 0.999) {
        return progress
      }
      return prev
    })
  }, [])

  return (
    <div className="relative w-full overflow-x-clip overflow-y-visible">
      {/* 1. Hero Section with Murgi and Start Egg Anchors */}
      <Hero
        heroBrownRef={heroBrownRef}
        heroWhiteRef={heroWhiteRef}
        onVideoEnded={() => setIsIntroComplete(true)}
        areEggsLanded={areEggsLanded}
      />

      {/* 2. Next Section: "Two shells. Same good egg." with End Anchors & Details */}
      <TwoShellsSection
        sec2BrownRef={sec2BrownRef}
        sec2WhiteRef={sec2WhiteRef}
        scrollProgress={scrollProgress}
      />

      {/* 3. Pick Your Pack Section with Egg Cartons */}
      <PickYourPackSection
        sec3SectionRef={sec3SectionRef}
        sec3BrownRef={sec3BrownRef}
        sec3WhiteRef={sec3WhiteRef}
        sec3DockEggRef={sec3DockEggRef}
        sec3SelectedCartonRef={sec3SelectedCartonRef}
        scrollProgress={scrollProgress}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedPackId={selectedPackId}
        setSelectedPackId={setSelectedPackId}
      />

      {/* 4. Boxed With Care / What You'll Receive Section */}
      <BoxedWithCareSection
        sec4SectionRef={sec4SectionRef}
        sec4CartonTargetRef={sec4CartonTargetRef}
        selectedPackId={selectedPackId}
        setSelectedPackId={setSelectedPackId}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* 5. Meet The Farm / Behind the Eggs Section */}
      <MeetTheFarmSection />

      {/* 6. Footer Section */}
      <Footer />

      {/* 3-Section Continuous Traveling Eggs Scene (Hero -> Section 2 -> Section 3) */}
      <AnimatedEggsScene
        heroBrownRef={heroBrownRef}
        heroWhiteRef={heroWhiteRef}
        sec2BrownRef={sec2BrownRef}
        sec2WhiteRef={sec2WhiteRef}
        sec3BrownRef={sec3BrownRef}
        sec3WhiteRef={sec3WhiteRef}
        sec3SectionRef={sec3SectionRef}
        sec3DockEggRef={sec3DockEggRef}
        selectedType={selectedType}
        selectedPackId={selectedPackId}
        isIntroComplete={isIntroComplete}
        onEggsLanded={() => setAreEggsLanded(true)}
        onProgressChange={handleProgressChange}
      />

      {/* 2-Section Traveling Carton Scene (Section 3 -> Section 4 on scroll) */}
      <AnimatedCartonScene
        sec3SelectedCartonRef={sec3SelectedCartonRef}
        sec4CartonTargetRef={sec4CartonTargetRef}
        sec4SectionRef={sec4SectionRef}
        selectedPackId={selectedPackId}
        selectedType={selectedType}
      />
    </div>
  )
}

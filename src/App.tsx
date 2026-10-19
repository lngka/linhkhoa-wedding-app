import { useRef, useState } from 'react'
import { content } from './content'
import { Icon } from './fx/Ornaments'
import { useSmoothScroll } from './fx/useScrollAnim'
import { Countdown } from './sections/Countdown'
import { DressCode } from './sections/DressCode'
import { Families } from './sections/Families'
import { Footer } from './sections/Footer'
import { Gate } from './sections/Gate'
import { Gifts } from './sections/Gifts'
import { Hero } from './sections/Hero'
import { Program } from './sections/Program'
import { ScratchReveal } from './sections/ScratchReveal'
import { Travel } from './sections/Travel'
import { Venue } from './sections/Venue'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)
  const s = content.sections
  useSmoothScroll()

  const onOpen = () => {
    setOpened(true)
    audio.current?.play().then(() => setPlaying(true), () => {})
  }

  const toggleMusic = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true), () => {})
    else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <Gate onOpen={onOpen} />
      <main className="page">
        <Hero opened={opened} />
        {s.countdown && <Countdown />}
        {s.scratch && <ScratchReveal />}
        {s.families && <Families />}
        {s.venue && <Venue />}
        {s.program && <Program />}
        {s.dressCode && <DressCode />}
        {s.gifts && <Gifts />}
        {s.travel && <Travel />}
        <Footer />
      </main>

      {content.music && (
        <>
          <audio ref={audio} src={content.music} loop preload="none" />
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
            className={`fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-cream/90 text-navy shadow-lg backdrop-blur transition-opacity duration-700 ${opened ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <Icon name={playing ? 'music-on' : 'music-off'} className={`h-5 w-5 ${playing ? 'animate-[spin_6s_linear_infinite]' : ''}`} />
          </button>
        </>
      )}
    </>
  )
}

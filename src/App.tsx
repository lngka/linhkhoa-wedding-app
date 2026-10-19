import { useRef, useState } from 'react'
import { LangSwitch } from './fx/LangSwitch'
import { MusicControl, type MusicControlHandle } from './fx/MusicControl'
import { useContent } from './i18n'
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
  const music = useRef<MusicControlHandle>(null)
  const s = useContent().sections
  useSmoothScroll()

  const onOpen = () => {
    setOpened(true)
    music.current?.play()
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

      <MusicControl ref={music} opened={opened} />
      <LangSwitch />
    </>
  )
}

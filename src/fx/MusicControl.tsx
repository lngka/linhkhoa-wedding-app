import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from 'react'
import { useContent } from '../i18n'
import { Icon } from './Ornaments'

const DEFAULT_VOLUME = 0.45

export type MusicControlHandle = { play: () => void }

/** Floating speaker. Music starts with the door tap; the button opens mute + volume. */
export const MusicControl = forwardRef<MusicControlHandle, { opened: boolean }>(function MusicControl({ opened }, ref) {
  const content = useContent()
  const audio = useRef<HTMLAudioElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const volumeRef = useRef(DEFAULT_VOLUME)
  const mutedRef = useRef(false)
  const [open, setOpen] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)

  volumeRef.current = volume
  mutedRef.current = muted

  useImperativeHandle(ref, () => ({
    play() {
      const a = audio.current
      if (!a) return
      a.volume = volumeRef.current
      a.muted = mutedRef.current
      a.play().then(() => setPlaying(true), () => setPlaying(false))
    },
  }))

  useEffect(() => {
    const a = audio.current
    if (!a) return
    a.volume = volume
    a.muted = muted
  }, [volume, muted])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!content.music) return null

  const silent = muted || volume === 0
  const icon = silent ? 'speaker-off' : volume < 0.5 ? 'speaker-low' : 'speaker'
  const shown = silent ? 0 : volume

  const toggleMute = () => {
    if (muted || volume === 0) {
      setMuted(false)
      if (volume === 0) setVolume(DEFAULT_VOLUME)
      audio.current?.play().then(() => setPlaying(true), () => {})
    } else {
      setMuted(true)
    }
  }

  const onVolume = (value: number) => {
    if (value === 0) setMuted(true)
    else {
      setVolume(value)
      setMuted(false)
      if (audio.current?.paused) audio.current.play().then(() => setPlaying(true), () => {})
    }
  }

  return (
    <>
      <audio ref={audio} src={content.music} loop preload="auto" />
      <div
        className={`pointer-events-none fixed inset-x-0 z-40 flex justify-center transition-opacity duration-700 ${opened ? 'opacity-100' : 'opacity-0'}`}
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex w-full max-w-[480px] justify-end px-2">
          <div
            ref={root}
            className={`pointer-events-auto flex items-center rounded-full border border-gold/60 bg-cream/92 text-navy shadow-[0_10px_28px_-12px_rgb(31_47_107/0.75)] backdrop-blur-md ${opened ? '' : 'pointer-events-none'}`}
          >
            <div
              className="grid transition-[grid-template-columns] duration-300 ease-out"
              style={{ gridTemplateColumns: open ? '1fr' : '0fr' }}
            >
              <div className="min-w-0 overflow-hidden" inert={!open}>
                <div className="flex w-max items-center gap-2 py-1 pr-1 pl-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={silent ? content.ui.musicOn : content.ui.musicOff}
                    aria-pressed={silent}
                    className="grid h-7 w-7 place-items-center text-navy/80"
                  >
                    <Icon name={silent ? 'speaker-off' : 'speaker'} className="h-4 w-4" />
                  </button>
                  <input
                    type="range"
                    className="vol-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={shown}
                    aria-label={content.ui.volume}
                    style={{ '--fill': `${shown * 100}%` } as CSSProperties}
                    onChange={(e) => onVolume(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen((v) => !v)
                if (audio.current?.paused && !mutedRef.current) {
                  audio.current.play().then(() => setPlaying(true), () => {})
                }
              }}
              aria-expanded={open}
              aria-label={open ? content.ui.volumeClose : content.ui.volumeOpen}
              className="m-1 grid h-9 w-9 place-items-center rounded-full bg-navy text-cream"
            >
              <Icon name={icon} className={`h-[18px] w-[18px] ${playing && !silent ? 'speaker-live' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
})

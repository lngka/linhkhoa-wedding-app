import { content } from '../content'

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const title = `Đám cưới ${content.groom.short} & ${content.bride.short}`
const location = `${content.venue.name}, ${content.venue.city}`
const details = [...content.program.items.map((i) => `${i.time} ${i.title}`), content.footer.closing].join('\n')

export const googleCalendarUrl = () => {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${stamp(content.date.start)}/${stamp(content.date.end)}`,
    location,
    details,
    ctz: 'Asia/Ho_Chi_Minh',
  })
  return `https://calendar.google.com/calendar/render?${p}`
}

const esc = (s: string) => s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')

export const downloadIcs = () => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//KhoaLinh//Wedding//VI',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:khoa-linh-20261222@wedding`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(content.date.start)}`,
    `DTEND:${stamp(content.date.end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(details)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'khoa-linh-22-12-2026.ics'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

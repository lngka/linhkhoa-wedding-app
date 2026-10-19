// All invitation text and settings. Edit here; components only read from this file (via `useContent()`).
// `vi` is the full content; `en` only overrides the text, everything else (dates, links, photos, toggles) is shared.
// Items marked "TẠM" are placeholders that still need real information.

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

const vi = {
  lang: 'vi',

  monogram: { left: 'K', right: 'L' },

  groom: { full: 'Nguyễn Võ Công Khoa', short: 'Công Khoa' },
  bride: { full: 'Nguyễn Phương Linh', short: 'Phương Linh' },

  families: {
    groom: { label: 'Nhà trai', parents: ['Nguyễn Văn Phụng', 'Võ Lệ Thu'] },
    bride: { label: 'Nhà gái', parents: ['Nguyễn Kim Minh', 'Dương Minh Nguyệt'] },
  },

  invitationLines: ['Trân trọng kính mời', 'quý khách và gia đình', 'đến dự lễ thành hôn của hai con'],

  date: {
    display: '22.12.2026',
    weekday: 'Thứ Ba',
    long: 'Thứ Ba, ngày 22 tháng 12 năm 2026',
    // Guest arrival, Vietnam time.
    start: '2026-12-22T15:30:00+07:00',
    end: '2026-12-22T21:30:00+07:00',
  },

  venue: {
    title: 'Lễ cưới & Tiệc',
    subtitle: 'Nơi hẹn ước trăm năm',
    name: 'Flamingo Cát Bà Resort',
    area: 'Vịnh Lan Hạ',
    city: 'Cát Bà, Hải Phòng',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flamingo+Cat+Ba+Resort',
  },

  // Loops after the guest opens the invitation. null hides the control.
  music: asset('nocturne-waltz.mp3') as string | null,

  hero: {
    button: 'Mở thiệp',
  },

  gate: { hint: 'Chạm để mở thiệp' },

  countdown: { title: 'Đếm ngược', subtitle: 'tới ngày chung đôi', units: ['Ngày', 'Giờ', 'Phút', 'Giây'] },

  scratch: {
    title: 'Thật hạnh phúc khi có bạn cùng chung vui',
    text: ['Sự hiện diện của bạn là món quà ý nghĩa nhất.', 'Chúng mình rất mong được gặp bạn!'],
    hint: 'Cào để xem',
    help: 'Dùng ngón tay cào lên khung kính',
    // TẠM: thay bằng ảnh cưới thật (ảnh dọc, khoảng 640x850).
    photo: asset('couple.webp'),
  },

  welcome: {
    title: 'Thư mời',
    body: 'Chúng mình hân hạnh mời bạn đến chung vui trong ngày trọng đại, nơi biển xanh vịnh Lan Hạ chứng giám cho lời hẹn ước trăm năm.',
  },

  program: {
    title: 'Chương trình',
    subtitle: 'Lịch trình trong ngày',
    items: [
      { time: '15:30', title: 'Đón khách', note: 'Check-in & chụp ảnh lưu niệm', icon: 'welcome' },
      { time: '16:45', title: 'Lễ thành hôn', note: 'Nghi lễ bên bờ vịnh', icon: 'rings' },
      { time: '17:30', title: 'Tiệc buffet', note: 'Cùng ngắm hoàng hôn trên biển', icon: 'dinner' },
      // TẠM: xác nhận hoặc xoá.
      { time: '19:30', title: 'Giao lưu & khiêu vũ', note: 'Âm nhạc và những điều bất ngờ', icon: 'music' },
    ],
  },

  dressCode: {
    title: 'Trang phục',
    style: 'Thanh lịch · Sắc màu biển',
    // TẠM
    body: 'Chúng mình rất vui nếu bạn chọn trang phục thanh lịch với gam màu của biển cả: xanh navy, xanh ngọc, kem hoặc trắng.',
    swatches: ['#1F2F6B', '#5E9EA8', '#A9D3D0', '#F7F1E8', '#FFFFFF'],
  },

  gifts: {
    title: 'Mừng cưới',
    subtitle: 'Sự hiện diện của bạn là món quà quý nhất',
    body: 'Nếu bạn muốn gửi lời chúc phúc từ xa, chúng mình xin trân trọng đón nhận qua thông tin dưới đây.',
    roles: ['Chú rể', 'Cô dâu'],
    copy: 'Chạm để sao chép',
    copied: 'Đã sao chép ♡',
    // TẠM: điền thông tin thật, hoặc tắt section này ở `sections`.
    accounts: [
      { owner: 'Nguyễn Võ Công Khoa', bank: 'Ngân hàng ...', number: '0000 000 000', qr: null as string | null },
      { owner: 'Nguyễn Phương Linh', bank: 'Ngân hàng ...', number: '0000 000 000', qr: null as string | null },
    ],
  },

  travel: {
    title: 'Di chuyển & Lưu trú',
    // TẠM: kiểm tra lại lịch trình cụ thể.
    route: [
      { label: 'Từ Hà Nội', text: 'Xe limousine đến Cát Bà khoảng 3 – 3,5 giờ, qua cầu Tân Vũ – Lạch Huyện và phà Gót – Cái Viềng.' },
      { label: 'Từ Hải Phòng', text: 'Khoảng 1,5 giờ qua cầu Tân Vũ – Lạch Huyện, đi phà sang đảo.' },
    ],
    stay: {
      label: 'Lưu trú',
      name: 'Flamingo Cát Bà Resort',
      lines: ['Nghỉ dưỡng tại resort view biển', 'Full pension + Buffet', 'Thời gian bên nhau và nhiều kỷ niệm đẹp'],
      datesLabel: 'Thời gian',
      dates: '21 – 23.12.2026', // TẠM
    },
  },

  footer: {
    closing: 'Rất hân hạnh được đón tiếp!',
    thanks: 'Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.',
    bayAlt: 'Vịnh Lan Hạ',
  },

  calendarTitle: 'Đám cưới Công Khoa & Phương Linh',

  ui: {
    directions: 'Chỉ đường',
    addToCalendar: 'Thêm vào lịch',
    musicOn: 'Bật nhạc',
    musicOff: 'Tắt nhạc',
    volume: 'Âm lượng',
    volumeOpen: 'Chỉnh âm lượng',
    volumeClose: 'Đóng chỉnh âm lượng',
    language: 'Ngôn ngữ',
  },

  // Turn sections on/off.
  sections: {
    countdown: true,
    scratch: true,
    families: true,
    venue: true,
    program: true,
    dressCode: true,
    gifts: false,
    travel: true,
  },
}

export type Content = typeof vi
export type Lang = 'vi' | 'en'
export type ProgramIcon = Content['program']['items'][number]['icon']

type DeepPartial<T> = T extends readonly (infer U)[] ? DeepPartial<U>[] : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

/** Deep-merges `over` onto `base`; arrays merge item by item so only the translated fields need listing. */
function merge<T>(base: T, over: DeepPartial<T>): T {
  if (Array.isArray(base)) return base.map((b, i) => (i in (over as unknown[]) ? merge(b, (over as DeepPartial<typeof b>[])[i]) : b)) as T
  if (base && typeof base === 'object') {
    const out = { ...base } as Record<string, unknown>
    for (const [k, v] of Object.entries(over as object)) out[k] = merge((base as Record<string, unknown>)[k], v as never)
    return out as T
  }
  return (over ?? base) as T
}

const en = merge<Content>(vi, {
  lang: 'en',

  families: {
    groom: { label: "Groom's family" },
    bride: { label: "Bride's family" },
  },

  invitationLines: ['We joyfully invite', 'you and your family', 'to celebrate the wedding of'],

  date: {
    weekday: 'Tuesday',
    long: 'Tuesday, 22 December 2026',
  },

  venue: {
    title: 'Ceremony & Reception',
    subtitle: 'Where we say "I do"',
    area: 'Lan Ha Bay',
    city: 'Cat Ba, Hai Phong',
  },

  hero: { button: 'Open' },

  gate: { hint: 'Tap to open' },

  countdown: { title: 'Countdown', subtitle: 'until our big day', units: ['Days', 'Hours', 'Minutes', 'Seconds'] },

  scratch: {
    title: 'So happy to celebrate with you',
    text: ['Your presence is the most meaningful gift.', "We can't wait to see you!"],
    hint: 'Scratch me',
    help: 'Scratch the glass with your finger',
  },

  welcome: {
    title: 'Invitation',
    body: 'We would be honoured to have you with us on our special day, with the blue waters of Lan Ha Bay as witness to our vows.',
  },

  program: {
    title: 'Programme',
    subtitle: 'Schedule of the day',
    items: [
      { title: 'Guest arrival', note: 'Check-in & photos' },
      { title: 'Wedding ceremony', note: 'By the bay' },
      { title: 'Buffet dinner', note: 'Sunset over the sea' },
      { title: 'Music & dancing', note: 'And a few surprises' },
    ],
  },

  dressCode: {
    title: 'Dress code',
    style: 'Elegant · Colours of the sea',
    body: "We'd love to see you in elegant attire in the colours of the sea: navy, turquoise, cream or white.",
  },

  gifts: {
    title: 'Wedding gifts',
    subtitle: 'Your presence is the greatest gift',
    body: 'If you would like to send your wishes from afar, we gratefully welcome them via the details below.',
    roles: ['Groom', 'Bride'],
    copy: 'Tap to copy',
    copied: 'Copied ♡',
  },

  travel: {
    title: 'Travel & Stay',
    route: [
      { label: 'From Hanoi', text: 'Limousine bus to Cat Ba, about 3 – 3.5 hours, via Tan Vu – Lach Huyen bridge and the Got – Cai Vieng ferry.' },
      { label: 'From Hai Phong', text: 'About 1.5 hours via Tan Vu – Lach Huyen bridge, then the ferry to the island.' },
    ],
    stay: {
      label: 'Stay',
      lines: ['Sea-view resort stay', 'Full board + buffet', 'Time together and lots of lovely memories'],
      datesLabel: 'Dates',
    },
  },

  footer: {
    closing: 'We look forward to welcoming you!',
    thanks: 'Thank you for being part of our story.',
    bayAlt: 'Lan Ha Bay',
  },

  calendarTitle: 'Wedding of Công Khoa & Phương Linh',

  ui: {
    directions: 'Directions',
    addToCalendar: 'Add to calendar',
    musicOn: 'Play music',
    musicOff: 'Mute music',
    volume: 'Volume',
    volumeOpen: 'Adjust volume',
    volumeClose: 'Close volume',
    language: 'Language',
  },
})

export const contents: Record<Lang, Content> = { vi, en }

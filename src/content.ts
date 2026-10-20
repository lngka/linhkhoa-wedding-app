// All invitation text and settings. Edit here; components only read from this file (via `useContent()`).
// `vi` is the full content; `en` only overrides the text, everything else (dates, links, photos, toggles) is shared.
// Items marked "TẠM" are placeholders that still need real information.

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

const vi = {
  lang: 'vi',

  monogram: { left: 'L', right: 'K' },

  groom: { full: 'Nguyễn Võ Công Khoa', short: 'Công Khoa' },
  bride: { full: 'Nguyễn Phương Linh', short: 'Phương Linh' },

  families: {
    groom: { label: 'Nhà trai', parents: ['Võ Lệ Thu', 'Nguyễn Văn Phụng'] },
    bride: { label: 'Nhà gái', parents: ['Dương Minh Nguyệt', 'Nguyễn Kim Minh'] },
  },

  invitationLines: ['Trân trọng kính mời', 'quý khách và gia đình', 'đến dự lễ thành hôn của hai con'],

  date: {
    display: '22.12.2026',
    weekday: 'Thứ Ba',
    long: 'Thứ Ba, ngày 22 tháng 12 năm 2026',
    // Early room check-in, Vietnam time. Ceremony is later the same day.
    start: '2026-12-22T12:00:00+07:00',
    end: '2026-12-22T21:30:00+07:00',
  },

  venue: {
    title: 'Địa điểm',
    subtitle: 'Nơi hẹn ước trăm năm',
    name: 'Flamingo Cát Bà Resort',
    area: 'Vịnh Lan Hạ',
    city: 'Cát Bà, Hải Phòng',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flamingo+Cat+Ba+Resort',
    stay: {
      title: 'Kỳ nghỉ tại resort',
      intro: 'Chúng mình chuẩn bị một đêm tại resort tặng cho mọi người. Từ lúc nhận phòng ngày 22 đến trước khi trả phòng ngày 23, bạn được sử dụng những dịch vụ dưới đây.',
      gifts: [
        {
          icon: 'dinner' as const,
          title: 'Bữa ăn',
          text: 'Ngày nhận phòng có suất ăn trưa, sau đó trà chiều và tiệc cưới. Hôm sau là bữa sáng và bữa trưa trước khi trả phòng, tại nhà hàng resort.',
        },
        {
          icon: 'onsen' as const,
          title: 'Onsen',
          text: 'Tặng onsen theo tiêu chuẩn phòng.',
        },
        {
          icon: 'token' as const,
          title: 'Khu vui chơi',
          text: 'Tặng 10 xèng game.',
        },
      ],
      includedLabel: 'Trong gói phòng',
      included: [
        { icon: 'tea' as const, text: 'Trà, cà phê, nước suối trong phòng' },
        { icon: 'pool' as const, text: 'Bể bơi' },
        { icon: 'fitness' as const, text: 'Phòng tập' },
        { icon: 'kids' as const, text: 'Kid Club' },
        { icon: 'wifi' as const, text: 'Internet và truyền hình' },
        { icon: 'shuttle' as const, text: 'Xe điện trong khu, 6:00-22:00' },
      ],
      perksLabel: 'Ưu đãi thêm',
      perks: [
        'Massage và tắm khoáng giảm 20%',
        'Làm đẹp giảm 15% - chăm sóc da, gội đầu, móng tay và móng chân',
        'Karaoke giảm 200.000đ khi hóa đơn từ 800.000đ',
      ],
    },
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
    photo: asset('wedding-jack.webp'),
  },

  welcome: {
    title: 'Thư mời',
  },

  program: {
    title: 'Chương trình',
    subtitle: 'Lịch trình trong ngày',
    items: [
      { time: '12:00', title: 'Nhận phòng', note: 'Sớm nếu phòng sẵn sàng', icon: 'hotel' },
      { time: '15:30', title: 'Đón khách', note: 'Chụp ảnh lưu niệm', icon: 'welcome' },
      { time: '16:45', title: 'Lễ thành hôn', note: 'Nghi lễ bên bờ vịnh', icon: 'rings' },
      { time: '17:30', title: 'Tiệc buffet', note: 'Cùng ngắm hoàng hôn trên biển', icon: 'dinner' },
      { time: '19:30', title: 'Sinh hoạt tự do', note: 'Giao lưu, hoạt động tự chọn', icon: 'leisure' },
    ],
  },

  dressCode: {
    title: 'Trang phục',
    body: 'Bạn cứ mặc thanh lịch, thoải mái theo cách mình thích.',
    highlight: 'Màu nào cũng được.',
    hint: 'Những sắc màu dưới đây chỉ là gợi ý',
    replay: 'Mở lại quạt màu',
    swatches: [
      { hex: '#1F2F6B', name: 'Xanh navy' },
      { hex: '#5E9EA8', name: 'Xanh ngọc' },
      { hex: '#A9D3D0', name: 'Xanh biển' },
      { hex: '#F7F1E8', name: 'Kem' },
      { hex: '#FFFFFF', name: 'Trắng' },
      { hex: '#2B2B2B', name: 'Đen' },
      { hex: '#E04B4B', name: 'Đỏ' },
      { hex: '#F4A6C4', name: 'Hồng' },
      { hex: '#F3D36B', name: 'Vàng' },
      { hex: '#67B36A', name: 'Xanh lá' },
    ],
  },

  gifts: {
    title: 'Mừng cưới',
    subtitle: 'Sự hiện diện của bạn là món quà quý nhất',
    body: 'Nếu bạn muốn gửi lời chúc phúc từ xa, chúng mình xin trân trọng đón nhận qua thông tin dưới đây.',
    roles: ['Cô dâu', 'Chú rể'],
    copy: 'Chạm để sao chép',
    copied: 'Đã sao chép ♡',
    // TẠM: điền thông tin thật, hoặc tắt section này ở `sections`.
    accounts: [
      { owner: 'Nguyễn Phương Linh', bank: 'Ngân hàng ...', number: '0000 000 000', qr: null as string | null },
      { owner: 'Nguyễn Võ Công Khoa', bank: 'Ngân hàng ...', number: '0000 000 000', qr: null as string | null },
    ],
  },

  travel: {
    title: 'Di chuyển & Lưu trú',
    // TẠM: kiểm tra lại lịch trình cụ thể.
    route: [
      { label: 'Từ Hà Nội', text: 'Xe limousine đến Cát Bà khoảng 3 - 3,5 giờ, qua cầu Tân Vũ - Lạch Huyện và phà Gót - Cái Viềng.' },
      { label: 'Từ Hải Phòng', text: 'Khoảng 1,5 giờ qua cầu Tân Vũ - Lạch Huyện, đi phà sang đảo.' },
    ],
    stay: {
      label: 'Lưu trú',
      name: 'Flamingo Cát Bà Resort',
      lines: ['Nghỉ dưỡng tại resort view biển', 'Các bữa ăn trong thời gian lưu trú', 'Thời gian bên nhau và nhiều kỷ niệm đẹp'],
      datesLabel: 'Thời gian',
      dates: '22 - 23.12.2026',
    },
  },

  footer: {
    closing: 'Rất hân hạnh được đón tiếp!',
    thanks: 'Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.',
    bayAlt: 'Vịnh Lan Hạ',
    install: 'Cài thiệp',
    close: 'Đóng thiệp',
    contact: 'Liên hệ',
    creditEmail: 'ck@ck-nguyen.com',
  },

  calendarTitle: 'Đám cưới Phương Linh & Công Khoa',

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
    travel: false,
  },
}

export type Content = typeof vi
export type Lang = 'vi' | 'en'
export type ProgramIcon = Content['program']['items'][number]['icon']
export type VenueIcon =
  | Content['venue']['stay']['gifts'][number]['icon']
  | Content['venue']['stay']['included'][number]['icon']

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
    title: 'The venue',
    subtitle: 'Where we say "I do"',
    area: 'Lan Ha Bay',
    city: 'Cat Ba, Hai Phong',
    stay: {
      title: 'Your stay at the resort',
      intro: 'Your stay is our gift — the room is on us. From check-in on the 22nd until checkout on the 23rd, the services below are yours to enjoy.',
      gifts: [
        {
          title: 'Meals',
          text: 'On arrival, lunch is included, followed by afternoon tea and the wedding banquet. The next day brings breakfast, then lunch before checkout, all at the resort restaurant.',
        },
        {
          title: 'Onsen',
          text: 'Complimentary onsen with your room.',
        },
        {
          title: 'Games',
          text: 'Ten game tokens on us.',
        },
      ],
      includedLabel: 'In your room package',
      included: [
        { text: 'Tea, coffee and bottled water in the room' },
        { text: 'Swimming pool' },
        { text: 'Fitness centre' },
        { text: 'Kid Club' },
        { text: 'Wi‑Fi and cable TV' },
        { text: 'Resort shuttle, 6:00-22:00' },
      ],
      perksLabel: 'Extra perks',
      perks: [
        '20% off massage and mineral baths',
        '15% off beauty - facials, hair wash, manicure and pedicure',
        'VND 200,000 off karaoke when the bill is VND 800,000 or more',
      ],
    },
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
  },

  program: {
    title: 'Programme',
    subtitle: 'Schedule of the day',
    items: [
      { title: 'Room check-in', note: 'Early if the room is ready' },
      { title: 'Guest arrival', note: 'Photos together' },
      { title: 'Wedding ceremony', note: 'By the bay' },
      { title: 'Buffet dinner', note: 'Sunset over the sea' },
      { title: 'Free time', note: 'Mingle, optional activities' },
    ],
  },

  dressCode: {
    title: 'Dress code',
    body: 'Dress elegantly and comfortably, however you like.',
    highlight: 'Any colour is welcome.',
    hint: 'The shades below are only suggestions',
    replay: 'Open the fan again',
    swatches: [
      { name: 'Navy' },
      { name: 'Teal' },
      { name: 'Aqua' },
      { name: 'Cream' },
      { name: 'White' },
      { name: 'Black' },
      { name: 'Red' },
      { name: 'Pink' },
      { name: 'Yellow' },
      { name: 'Green' },
    ],
  },

  gifts: {
    title: 'Wedding gifts',
    subtitle: 'Your presence is the greatest gift',
    body: 'If you would like to send your wishes from afar, we gratefully welcome them via the details below.',
    roles: ['Bride', 'Groom'],
    copy: 'Tap to copy',
    copied: 'Copied ♡',
  },

  travel: {
    title: 'Travel & Stay',
    route: [
      { label: 'From Hanoi', text: 'Limousine bus to Cat Ba, about 3 - 3.5 hours, via Tan Vu - Lach Huyen bridge and the Got - Cai Vieng ferry.' },
      { label: 'From Hai Phong', text: 'About 1.5 hours via Tan Vu - Lach Huyen bridge, then the ferry to the island.' },
    ],
    stay: {
      label: 'Stay',
      lines: ['Sea-view resort stay', 'Meals throughout your stay', 'Time together and lots of lovely memories'],
      datesLabel: 'Dates',
    },
  },

  footer: {
    closing: 'We look forward to welcoming you!',
    thanks: 'Thank you for being part of our story.',
    bayAlt: 'Lan Ha Bay',
    install: 'Install invite',
    close: 'Close invite',
    contact: 'Contact',
  },

  calendarTitle: 'Wedding of Phương Linh & Công Khoa',

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

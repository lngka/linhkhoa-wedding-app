// All invitation text and settings. Edit here; components only read from this file.
// Items marked "TẠM" are placeholders that still need real information.

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

export const content = {
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
    name: 'Flamingo Cát Bà Resort',
    area: 'Vịnh Lan Hạ',
    city: 'Cát Bà, Hải Phòng',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flamingo+Cat+Ba+Resort',
  },

  // Loops after the guest opens the invitation. null hides the control.
  music: asset('nocturne-waltz.mp3') as string | null,

  hero: {
    pretitle: 'Save the date',
    button: 'Mở thiệp',
  },

  gate: { hint: 'Chạm để mở thiệp' },

  countdown: { title: 'Đếm ngược', subtitle: 'tới ngày chung đôi' },

  scratch: {
    title: 'Thật hạnh phúc khi có bạn cùng chung vui',
    text: ['Sự hiện diện của bạn là món quà ý nghĩa nhất.', 'Chúng mình rất mong được gặp bạn!'],
    hint: 'Cào để xem',
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
      name: 'Flamingo Cát Bà Resort',
      lines: ['Nghỉ dưỡng tại resort view biển', 'Full pension + Buffet', 'Thời gian bên nhau và nhiều kỷ niệm đẹp'],
      dates: '21 – 23.12.2026', // TẠM
    },
  },

  footer: {
    closing: 'Rất hân hạnh được đón tiếp!',
    thanks: 'Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.',
  },

  // Turn sections on/off.
  sections: {
    countdown: true,
    scratch: true,
    families: true,
    venue: true,
    program: true,
    dressCode: true,
    gifts: true,
    travel: true,
  },
}

export type ProgramIcon = (typeof content.program.items)[number]['icon']

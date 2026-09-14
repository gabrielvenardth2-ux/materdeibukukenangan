import { BoardMessage } from '../types';

// Helper clean handwritten SVG data URLs for realistic initial signatures
const makeSignatureSvg = (text: string, strokeColor = '#1e293b') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="240" height="70">
    <path d="M15,45 Q40,15 65,42 T110,25 Q130,55 160,35 Q190,15 220,40" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M40,52 Q90,56 180,50" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" />
    <text x="35" y="42" font-family="cursive, 'Caveat', sans-serif" font-size="28" font-style="italic" fill="${strokeColor}">${text}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_MESSAGES: BoardMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Gabriel Venardth S.',
    senderClass: 'Ketua Kelas XII MIPA 1',
    recipientName: 'Semua Sahabat Angkatan 2026',
    text: 'Makasih buat 3 tahun yang penuh drama, tawa, dan perjuangan. Dari yang tadinya duduk kaku pas MPLS sampai jadi keluarga yang saling jaga. Sukses di kampus dan jalan impian masing-masing ya rek! Jangan sombong kalo udah jadi orang sukses!',
    signatureDataUrl: makeSignatureSvg('Gabriel V.', '#1e1b4b'),
    createdAt: '14 Mei 2026, 10:15 WIB',
    tapeColor: 'orange',
    sticker: '⭐',
    reactions: {
      heart: 38,
      party: 25,
      laugh: 14,
      tear: 9,
      fire: 20
    }
  },
  {
    id: 'msg-2',
    senderName: 'Maria Angelica',
    senderClass: 'Sie Mading & Publikasi',
    recipientName: 'Geng Pojokan Kelas',
    text: 'Makasih udah selalu jadi orang pertama yang ketawa pas lawakanku garing. Jangan lupa janji kita ya: 5 tahun lagi harus kumpul lengkap di alun-alun Probolinggo sambil makan rawon Nguling!',
    signatureDataUrl: makeSignatureSvg('Maria A.', '#831843'),
    createdAt: '14 Mei 2026, 11:40 WIB',
    tapeColor: 'pink',
    sticker: '🌸',
    reactions: {
      heart: 42,
      party: 19,
      laugh: 28,
      tear: 17,
      fire: 8
    }
  },
  {
    id: 'msg-3',
    senderName: 'Stefanus Kevin Pratama',
    senderClass: 'MD Tigers Basketball',
    recipientName: 'Squad Olahraga & Suporter MD',
    text: 'Buat kalian yang selalu teriak sampai suara abis di tribun DBL: piala kemarin piala kita bareng! Bakal kangen lari keliling lapangan pas dihukum Pak Bambang karena telat upacara wkwk.',
    signatureDataUrl: makeSignatureSvg('Kevin P.', '#0369a1'),
    createdAt: '14 Mei 2026, 13:05 WIB',
    tapeColor: 'blue',
    sticker: '🏆',
    reactions: {
      heart: 31,
      party: 36,
      laugh: 22,
      tear: 6,
      fire: 41
    }
  },
  {
    id: 'msg-4',
    senderName: 'Clara Natasha',
    senderClass: 'MD Choir',
    recipientName: 'Seluruh Bapak/Ibu Guru Tercinta',
    text: 'Terima kasih tak terhingga untuk kesabaran Bapak Ibu guru SMAK Mater Dei yang mendidik kami dengan cinta kasih tulus. Nasihat kalian akan kami bawa ke mana pun kaki ini melangkah.',
    signatureDataUrl: makeSignatureSvg('Clara N.', '#b45309'),
    createdAt: '14 Mei 2026, 14:20 WIB',
    tapeColor: 'yellow',
    sticker: '🕊️',
    reactions: {
      heart: 56,
      party: 14,
      laugh: 3,
      tear: 35,
      fire: 12
    }
  },
  {
    id: 'msg-5',
    senderName: 'Michael Aditya',
    senderClass: 'Anak Pojokan Belakang',
    recipientName: 'Kantin Mbak Sri & Pak Satpam',
    text: 'Terima kasih Mbak Sri buat gorengan yang selalu hangat dan es teh manis jumbo penyelamat jam istirahat. Pak Satpam, terima kasih sering bukain pintu pas saya datang jam 06.59!',
    signatureDataUrl: makeSignatureSvg('Mike A.', '#4c1d95'),
    createdAt: '14 Mei 2026, 15:10 WIB',
    tapeColor: 'orange',
    sticker: '☕',
    reactions: {
      heart: 29,
      party: 22,
      laugh: 49,
      tear: 5,
      fire: 18
    }
  }
];

import { SuperlativeCategory } from '../types';

export const INITIAL_SUPERLATIVES: SuperlativeCategory[] = [
  {
    id: 'sup-1',
    title: 'Paling Woles Saat Ujian',
    description: 'Bocah yang tetap santai minum es teh waktu seisi kelas lagi panik bolak-balik kertas ujian.',
    iconName: 'Coffee',
    accentColor: 'from-amber-500 to-orange-500',
    votes: {
      'm-1': 14,
      'm-7': 18,
      'm-3': 9,
      'm-9': 6,
    }
  },
  {
    id: 'sup-2',
    title: 'Paling Rame di Pojokan Kelas',
    description: 'Pusat gempa keramaian kelas, sumber tawa, plesetan receh, dan pembuat suara ketawa menular.',
    iconName: 'Volume2',
    accentColor: 'from-fuchsia-500 to-rose-500',
    votes: {
      'm-7': 24,
      'm-4': 15,
      'm-1': 12,
      'm-11': 8,
    }
  },
  {
    id: 'sup-3',
    title: 'Master Penyelamat PR Kelas',
    description: 'Tempat berkonsultasi sejuta umat jam 06.45 pagi. Tulisan tangannya paling sering difoto anak-anak.',
    iconName: 'Sparkles',
    accentColor: 'from-sky-500 to-blue-600',
    votes: {
      'm-2': 22,
      'm-5': 19,
      'm-8': 11,
      'm-10': 7,
    }
  },
  {
    id: 'sup-4',
    title: 'Paling Sering Telat Tapi Nilai Bagus',
    description: 'Datang pas satpam udah pegang gembok gerbang, tapi pas pembagian rapot tetep nangkring di atas.',
    iconName: 'Clock',
    accentColor: 'from-violet-500 to-purple-600',
    votes: {
      'm-1': 21,
      'm-3': 11,
      'm-7': 13,
      'm-9': 5,
    }
  },
  {
    id: 'sup-5',
    title: 'Musisi & Kurator Playlist Kelas',
    description: 'Kalo speaker bluetooth kelas mati, dia yang langsung colok gitar akustik atau nyetel lagu nostalgia.',
    iconName: 'Music',
    accentColor: 'from-pink-500 to-rose-600',
    votes: {
      'm-1': 17,
      'm-6': 23,
      'm-7': 14,
      'm-11': 6,
    }
  },
  {
    id: 'sup-6',
    title: 'Calon CEO Masa Depan',
    description: 'Udah jago bisnis dari jualan risol sampai pitching ide projek. Auranya aura bos besar santun.',
    iconName: 'Briefcase',
    accentColor: 'from-emerald-500 to-teal-600',
    votes: {
      'm-12': 25,
      'm-4': 16,
      'm-1': 10,
      'm-8': 9,
    }
  },
  {
    id: 'sup-7',
    title: 'Duta Kantin Mbak Sri',
    description: 'Menu apapun di kantin dia tahu jam masaknya, bahkan sering bantuin bungkus gorengan.',
    iconName: 'Utensils',
    accentColor: 'from-yellow-500 to-amber-600',
    votes: {
      'm-1': 19,
      'm-9': 16,
      'm-12': 14,
      'm-3': 11,
    }
  }
];

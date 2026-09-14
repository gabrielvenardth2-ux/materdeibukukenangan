import { TimeCapsule } from '../types';

export const INITIAL_CAPSULES: TimeCapsule[] = [
  {
    id: 'cap-1',
    authorName: 'Gabriel & Dewan Pengurus Angkatan',
    title: 'Surat Terbuka Kelulusan: Jangan Pernah Lupa Rumah Ini',
    message: 'Halo rek! Kalo kamu baca ini di hari kelulusan atau reuni pertama kita: selamat! Perjalanan panjang 3 tahun berdarah-darah, ulangan harian dadakan, dan tawa di lorong kelas akhirnya terlewati. Ingat moto kita: "Caritas in Veritate" — Kasih dalam Kebenaran. Jangan pernah takut melangkah tinggi!',
    unlockDate: '2026-05-12', // Already unlocked for instant celebration experience
    createdAt: '12 Mei 2026',
    themeTag: 'Pelepasan & Doa',
    recipientHint: 'Untuk Semua Siswa Angkatan 2026'
  },
  {
    id: 'cap-2',
    authorName: 'Maria Angelica Kusuma',
    title: 'Pesan Reuni 1 Tahun: Apakah Janji Kita Masih Diingat?',
    message: 'Surat ini baru boleh dibuka 1 tahun setelah kita lulus. Aku pengen tahu: apakah kamu sudah betah di kota perantauan barumu? Apakah kamu masih sering dengerin playlist lagu-lagu SMA kita waktu kangen rumah? Semoga kita semua selalu sehat dan tetap saling kabar!',
    unlockDate: '2027-05-15', // Locked until 2027
    createdAt: '14 Mei 2026',
    themeTag: 'Reuni 1 Tahun',
    recipientHint: 'Rahasia Angkatan 2026'
  },
  {
    id: 'cap-3',
    authorName: 'Stefanus Kevin & Squad Olahraga',
    title: 'Kapsul Waktu 5 Tahun: Siapa yang Udah Nyusul Nikah Duluan?',
    message: 'Haha dibuka tahun 2031! Prediksi kita: di antara kita pasti udah ada yang kerja di BUMN, ada yang jadi dokter, ada yang punya startup sendiri, atau mungkin udah ada yang nyebar undangan nikah duluan. Yang pasti, saat kita kumpul lagi, basket 3-on-3 di lapangan sekolah wajib dimainin lagi!',
    unlockDate: '2031-05-15', // Locked until 2031
    createdAt: '14 Mei 2026',
    themeTag: 'Reuni Perak 5 Tahun',
    recipientHint: 'Buka di Reuni Akbar 2031'
  },
  {
    id: 'cap-4',
    authorName: 'Jessica & Clara Natasha',
    title: 'Kapsul Dekade: Refleksi 10 Tahun Menuju 2036',
    message: 'Sepuluh tahun adalah waktu yang sangat panjang. Rambut mungkin sudah ada yang mulai beruban, tanggung jawab hidup makin besar. Tapi ingatlah saat-saat kita tertawa lepas di koridor sekolah Mater Dei tanpa beban cicilan. Tetaplah jadi manusia yang berhati hangat.',
    unlockDate: '2036-05-15', // Locked until 2036
    createdAt: '14 Mei 2026',
    themeTag: '1 Dekade Kelulusan',
    recipientHint: 'Buka pada Tahun 2036'
  }
];

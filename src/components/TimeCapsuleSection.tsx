import React, { useState } from 'react';
import { Lock, Unlock, Clock, Calendar, Sparkles, Send, X, ShieldAlert, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TimeCapsule } from '../types';
import { sounds } from '../utils/audio';

interface TimeCapsuleSectionProps {
  capsules: TimeCapsule[];
  onAddCapsule: (capsule: Omit<TimeCapsule, 'id' | 'createdAt'>) => void;
}

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({
  capsules,
  onAddCapsule,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('2027-05-15');
  const [themeTag, setThemeTag] = useState('Janji Sahabat');
  const [showModal, setShowModal] = useState(false);
  const [selectedUnlockedCapsule, setSelectedUnlockedCapsule] = useState<TimeCapsule | null>(null);

  // Check if a capsule is currently unlocked
  const isCapsuleUnlocked = (dateStr: string) => {
    const today = new Date();
    const target = new Date(dateStr);
    return today >= target;
  };

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !title.trim() || !message.trim()) return;

    onAddCapsule({
      authorName: authorName.trim(),
      title: title.trim(),
      message: message.trim(),
      unlockDate,
      themeTag,
    });

    sounds.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setAuthorName('');
    setTitle('');
    setMessage('');
    setShowModal(false);
  };

  const handleOpenCapsule = (cap: TimeCapsule) => {
    sounds.playChime();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
    });
    setSelectedUnlockedCapsule(cap);
  };

  return (
    <section id="kapsul-waktu" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 text-violet-900 border border-violet-200/80 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-violet-600" />
            Kapsul Waktu Digital Menuju Masa Depan
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Surat Rahasia yang Dikunci{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent">
              Hingga Hari Reuni
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Titipkan harapan, ramalan masa depan, dan curahan hati untuk dibuka saat reuni 1 tahun, 
            5 tahun, atau 10 tahun mendatang. Kapsul yang belum waktunya terkunci secara otomatis.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all self-start md:self-end shrink-0"
        >
          <Lock className="w-4 h-4 text-amber-400" />
          <span>+ Kunci Kapsul Waktu Baru</span>
        </button>
      </div>

      {/* Grid of Capsules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capsules.map((cap) => {
          const unlocked = isCapsuleUnlocked(cap.unlockDate);
          const daysLeft = getDaysRemaining(cap.unlockDate);
          const yearsLeft = Math.round(daysLeft / 365);

          return (
            <div
              key={cap.id}
              className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                unlocked
                  ? 'bg-white border-amber-300 shadow-[0_10px_30px_rgba(245,158,11,0.1)] ring-2 ring-amber-400/30'
                  : 'bg-stone-900 text-white border-stone-800 shadow-xl'
              }`}
            >
              <div>
                {/* Header Tag & Lock status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      unlocked
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-white/10 text-stone-300 border border-white/10'
                    }`}
                  >
                    {cap.themeTag}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Unlock className="w-3 h-3 text-emerald-600" /> Terbuka!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        <Lock className="w-3 h-3 text-amber-400" /> Terkunci
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Author */}
                <h4
                  className={`font-serif-display text-lg sm:text-xl font-bold mb-2 leading-snug ${
                    unlocked ? 'text-stone-900' : 'text-white'
                  }`}
                >
                  {cap.title}
                </h4>
                <p
                  className={`text-xs font-medium mb-4 ${
                    unlocked ? 'text-stone-500' : 'text-stone-400'
                  }`}
                >
                  Oleh: <strong className={unlocked ? 'text-stone-800' : 'text-stone-200'}>{cap.authorName}</strong>
                </p>

                {/* Message preview or blurred content */}
                {unlocked ? (
                  <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/60 mb-4">
                    <p className="text-xs text-stone-700 italic line-clamp-3 leading-relaxed">
                      "{cap.message}"
                    </p>
                  </div>
                ) : (
                  <div className="relative bg-white/5 p-4 rounded-2xl border border-white/10 mb-4 overflow-hidden">
                    <p className="text-xs text-stone-300 blur-sm select-none line-clamp-3 leading-relaxed">
                      Lorem ipsum dolor sit amet harapan masa depan kita saat reuni akbar nanti semoga kita semua sudah sukses di kota masing-masing...
                    </p>
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-stone-950/80 border border-white/20 text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                        🔒 Pesan Dirahasiakan
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Countdown & Action */}
              <div
                className={`pt-4 border-t flex items-center justify-between text-xs ${
                  unlocked ? 'border-stone-100' : 'border-stone-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span className={unlocked ? 'text-stone-500' : 'text-stone-400'}>
                    Buka: {cap.unlockDate}
                  </span>
                </div>

                {unlocked ? (
                  <button
                    onClick={() => handleOpenCapsule(cap)}
                    className="px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-xs hover:scale-105 active:scale-95 transition-all"
                  >
                    Buka Surat 💌
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-400/90">
                    {yearsLeft > 0 ? `~${yearsLeft} th lagi` : `${daysLeft} hari lagi`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Add New Capsule */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-stone-900">
                    Kunci Kapsul Waktu Baru
                  </h3>
                  <p className="text-xs text-stone-500">Pesan ini akan terkunci sampai tanggal yang kamu tentukan</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nama Penulis / Kelompok
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Contoh: Maria & Kevin / XII MIPA 2"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-violet-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Judul Pesan Kapsul
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pesan untuk Kita di Umur 25 Tahun"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-violet-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Tanggal Buka Kapsul
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setUnlockDate('2027-05-15')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      unlockDate === '2027-05-15'
                        ? 'bg-violet-900 text-white border-violet-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    1 Th (2027)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnlockDate('2031-05-15')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      unlockDate === '2031-05-15'
                        ? 'bg-violet-900 text-white border-violet-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    5 Th (2031)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnlockDate('2036-05-15')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      unlockDate === '2036-05-15'
                        ? 'bg-violet-900 text-white border-violet-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    10 Th (2036)
                  </button>
                </div>
                <input
                  type="date"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kategori Tema
                </label>
                <select
                  value={themeTag}
                  onChange={(e) => setThemeTag(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 outline-none"
                >
                  <option value="Janji Sahabat">Janji Sahabat</option>
                  <option value="Harapan Karier">Harapan Karier</option>
                  <option value="Rahasia Masa SMA">Rahasia Masa SMA</option>
                  <option value="Reuni Akbar">Reuni Akbar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Isi Surat Rahasia
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan harapan, tebakan masa depan, atau pesan mengharukan yang baru boleh dibaca di masa depan..."
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-violet-400 outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md"
                >
                  Kunci Surat ke Kapsul 🔒
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Read Unlocked Capsule Letter */}
      {selectedUnlockedCapsule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#fffdf8] rounded-3xl shadow-2xl border-4 border-amber-200/80 p-6 sm:p-10 overflow-hidden">
            
            {/* Washi tape header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-8 py-1.5 bg-amber-200 text-amber-900 text-[11px] font-bold tracking-widest uppercase rounded shadow-sm border border-amber-300 rotate-1">
              Surat Kapsul Terbuka ✉️
            </div>

            <button
              onClick={() => setSelectedUnlockedCapsule(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-4 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                {selectedUnlockedCapsule.themeTag}
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                {selectedUnlockedCapsule.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Ditulis oleh: {selectedUnlockedCapsule.authorName} • Disimpan sejak {selectedUnlockedCapsule.createdAt}
              </p>
            </div>

            {/* Letter Parchment Texture & Message */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/60 shadow-inner my-4 text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
              "{selectedUnlockedCapsule.message}"
            </div>

            {/* School Motto Footnote */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
              <span className="font-serif-display font-semibold italic text-amber-800">
                "Caritas in Veritate" — SMAK Mater Dei
              </span>
              <button
                onClick={() => setSelectedUnlockedCapsule(null)}
                className="px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
              >
                Tutup Surat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

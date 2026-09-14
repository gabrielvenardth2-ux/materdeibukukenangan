import React, { useState } from 'react';
import { ArrowDown, Sparkles, Heart, Compass, PenTool, RotateCw, Instagram, Music } from 'lucide-react';
import { STUDENTS_DATA } from '../data/studentsData';
import { sounds } from '../utils/audio';

interface HeroProps {
  onOpenMessageModal: () => void;
  onSelectStudent?: (student: typeof STUDENTS_DATA[0]) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMessageModal, onSelectStudent }) => {
  const [featuredFlipped, setFeaturedFlipped] = useState(false);
  const featuredStudent = STUDENTS_DATA[0]; // Gabriel Venardth

  const handleCardFlip = () => {
    sounds.playFlip();
    setFeaturedFlipped(!featuredFlipped);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 lg:py-32 flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1b0736 0%, #4a0d4e 25%, #86195a 50%, #c2410c 75%, #f59e0b 92%, #38bdf8 100%)',
      }}
    >
      {/* Subtle organic light reflections & paper dust texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Asymmetrical Typography & Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Tag / Pill badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                Buku Kenangan Digital Angkatan 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-900/40 text-stone-200 border border-white/10 text-xs font-medium">
                SMAK Mater Dei Probolinggo
              </span>
            </div>

            {/* Giant Bold Headline with Golden Hour Gradient */}
            <div className="space-y-2">
              <h1 className="font-serif-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Bukan Buku Tahunan Yang{' '}
                <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-rose-200 bg-clip-text text-transparent underline decoration-amber-400/40 decoration-wavy decoration-2">
                  Berdebu di Lemari.
                </span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-stone-200/90 font-normal leading-relaxed max-w-2xl pt-2">
                Ruang kenangan hidup tempat tawa pojok kelas, rahasia masa SMA, dan janji persahabatan 
                kita di lereng Bromo tetap berdenyut abadi. Bebas dicoret, diisi pesan, dan di-update selamanya.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md pt-1">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-white">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-amber-300">100%</div>
                <div className="text-[11px] sm:text-xs text-stone-200 font-medium">Tingkat Kelulusan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-white">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-rose-300">12+</div>
                <div className="text-[11px] sm:text-xs text-stone-200 font-medium">Karakter Ikonik</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-white">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-sky-300">3 Tahun</div>
                <div className="text-[11px] sm:text-xs text-stone-200 font-medium">Jutaan Cerita</div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#bento-profil"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Compass className="w-5 h-5 text-stone-950" />
                <span>Buka Galeri Sahabat</span>
              </a>

              <button
                id="hero-write-btn"
                onClick={() => {
                  sounds.playChime();
                  onOpenMessageModal();
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-semibold text-sm sm:text-base hover:scale-[1.02] active:scale-95 transition-all"
              >
                <PenTool className="w-4 h-4 text-amber-300" />
                <span>Tinggalkan Tanda Tangan</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-300/80 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Papan pesan aktif — tanda tangan digital langsung tersimpan</span>
            </div>

          </div>

          {/* Right Column: Clean White Floating Card (5 cols) with 3D Flip Preview */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md perspective-1000 relative">
              
              {/* Scrapbook washi tape visual at the top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-6 py-1 bg-amber-200/90 text-amber-900 text-[10px] font-bold tracking-wider uppercase rounded shadow-sm border border-amber-300 rotate-1">
                Preview Kartu 3D
              </div>

              {/* Realistic floating card with smooth shadow */}
              <div
                onClick={handleCardFlip}
                className={`cursor-pointer transition-transform duration-700 transform-style-3d relative rounded-3xl bg-white text-stone-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/80 p-6 sm:p-7 min-h-[460px] flex flex-col justify-between ${
                  featuredFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div className={`w-full h-full flex flex-col justify-between backface-hidden ${featuredFlipped ? 'hidden' : 'block'}`}>
                  <div>
                    {/* Top status & badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        ⭐ Ketua Angkatan 2026
                      </span>
                      <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" /> Klik untuk flip
                      </span>
                    </div>

                    {/* Student Photo */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-stone-100 shadow-inner group">
                      <img
                        src={featuredStudent.avatar}
                        alt={featuredStudent.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-stone-900/60 backdrop-blur-md rounded-xl px-3 py-1.5 text-white flex items-center justify-between">
                        <span className="text-xs font-medium">{featuredStudent.nickname}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-bold">
                          {featuredStudent.major}
                        </span>
                      </div>
                    </div>

                    {/* Name & Quote */}
                    <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                      {featuredStudent.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold mb-2">
                      Ekskul: {featuredStudent.extracurricular}
                    </p>
                    <p className="font-handwriting text-lg text-stone-700 italic leading-snug">
                      {featuredStudent.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Disukai satu angkatan
                    </span>
                    <span className="text-stone-400 font-medium">Putar untuk fakta unik →</span>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div className={`w-full h-full flex flex-col justify-between backface-hidden rotate-y-180 ${featuredFlipped ? 'block' : 'hidden'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                        Fun Facts & Rahasia
                      </span>
                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <RotateCw className="w-3 h-3" /> Balik lagi
                      </span>
                    </div>

                    <h4 className="font-serif-display text-xl font-bold text-stone-900 mb-2">
                      Catatan Dinding {featuredStudent.nickname}
                    </h4>

                    {/* Fun facts list */}
                    <div className="space-y-2 mb-4">
                      {featuredStudent.funFacts.map((fact, idx) => (
                        <div key={idx} className="text-xs text-stone-700 bg-stone-50 rounded-xl p-2.5 border border-stone-200/70 flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>

                    {/* Memory */}
                    <div className="bg-amber-50/80 rounded-xl p-2.5 border border-amber-200/60 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        Kenangan Terindah:
                      </span>
                      <p className="text-xs text-stone-700 italic">
                        "{featuredStudent.favoriteMemory}"
                      </p>
                    </div>

                    {/* Spotify song */}
                    {featuredStudent.spotifyTrack && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900 text-white text-xs">
                        <Music className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <div>
                          <div className="font-semibold text-[11px]">{featuredStudent.spotifyTrack.title}</div>
                          <div className="text-[10px] text-stone-400">{featuredStudent.spotifyTrack.artist}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-600">
                      @{featuredStudent.instagram}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectStudent) {
                          onSelectStudent(featuredStudent);
                        }
                      }}
                      className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium"
                    >
                      Buka Profil Lengkap
                    </button>
                  </div>
                </div>

              </div>

              {/* Decorative sticker */}
              <div className="absolute -bottom-4 -left-4 z-20 px-3.5 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg -rotate-6 border-2 border-white">
                MD Forever '26 🎓
              </div>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="hidden sm:flex justify-center pt-12">
          <a
            href="#bento-profil"
            aria-label="Scroll ke Galeri Profil"
            className="flex flex-col items-center gap-1.5 text-xs text-stone-300/80 hover:text-white transition-colors"
          >
            <span>Scroll untuk menjelajahi</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

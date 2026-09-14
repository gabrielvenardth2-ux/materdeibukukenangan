import React from 'react';
import { Heart, Sparkles, GraduationCap, MapPin, Printer, Share2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export const Footer: React.FC = () => {
  const handlePrint = () => {
    sounds.playChime();
    window.print();
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: School Identity (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-amber-300 font-serif-display font-bold text-base">
                  MD
                </div>
              </div>
              <div>
                <h3 className="font-serif-display text-xl font-bold text-white tracking-tight">
                  SMAK Mater Dei Probolinggo
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  Buku Kenangan & Papan Pesan Kelulusan 2026
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Sebuah arsip digital hidup pengganti buku tahunan cetak, dipersembahkan untuk 
              seluruh keluarga besar angkatan 2026. Di mana pun jalan hidup membawa kita, 
              kita pernah bernapas dan tertawa di bawah langit yang sama.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Kota Probolinggo, Jawa Timur • Dekat Kaki Gunung Bromo</span>
            </div>
          </div>

          {/* Col 2: Moto & Motto (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Semboyan Almamater
            </span>
            <blockquote className="font-serif-display text-lg text-white font-bold italic">
              "Caritas in Veritate"
            </blockquote>
            <p className="text-xs text-stone-400 leading-relaxed">
              Kasih dalam Kebenaran. Menjadi pribadi yang cerdas berilmu, teguh beriman, 
              dan berbelarasa bagi sesama.
            </p>
          </div>

          {/* Col 3: Quick Utilities (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Arsip & Kenangan
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#bento-profil" className="hover:text-amber-300 transition-colors">
                  → Galeri 12 Siswa
                </a>
              </li>
              <li>
                <a href="#papan-pesan" className="hover:text-amber-300 transition-colors">
                  → Papan Tanda Tangan
                </a>
              </li>
              <li>
                <a href="#superlatif" className="hover:text-amber-300 transition-colors">
                  → Hasil Superlatif Kelas
                </a>
              </li>
              <li>
                <a href="#kapsul-waktu" className="hover:text-amber-300 transition-colors">
                  → Kapsul Waktu Reuni
                </a>
              </li>
            </ul>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/10"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Cetak Ringkasan Kenangan</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright & heartwarming message */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 SMAK Mater Dei Probolinggo. Disimpan abadi dalam kenangan.</p>
          <p className="flex items-center gap-1.5 text-stone-300">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk Angkatan 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

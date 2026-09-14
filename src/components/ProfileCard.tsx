import React, { useState } from 'react';
import { RotateCw, Heart, Instagram, Music, Sparkles, Send, Award, BookOpen } from 'lucide-react';
import { Student } from '../types';
import { sounds } from '../utils/audio';

interface ProfileCardProps {
  student: Student;
  onSelectStudent: (student: Student) => void;
  onWriteMessageForStudent: (studentName: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  student,
  onSelectStudent,
  onWriteMessageForStudent,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    // Don't flip if clicking interactive link/button
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    sounds.playFlip();
    setIsFlipped(!isFlipped);
  };

  // Bento span classes
  const getBentoClasses = (size: Student['bentoSize']) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 min-h-[480px]';
      case 'wide':
        return 'md:col-span-2 md:row-span-1 min-h-[300px]';
      case 'tall':
        return 'md:col-span-1 md:row-span-2 min-h-[480px]';
      case 'normal':
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[340px]';
    }
  };

  const getMajorColor = (major: Student['major']) => {
    switch (major) {
      case 'MIPA':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'IPS':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Bahasa':
        return 'bg-violet-50 text-violet-800 border-violet-200';
    }
  };

  return (
    <div
      id={`student-card-${student.id}`}
      className={`perspective-1000 group ${getBentoClasses(student.bentoSize)} transition-all duration-300`}
    >
      <div
        onClick={handleFlip}
        className={`w-full h-full cursor-pointer relative rounded-3xl transition-transform duration-700 transform-style-3d bg-white border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgb(0,0,0,0.08)] p-5 sm:p-6 flex flex-col justify-between ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ==================== FRONT OF CARD ==================== */}
        <div
          className={`w-full h-full flex flex-col justify-between backface-hidden ${
            isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
        >
          <div>
            {/* Header: Major & Flip Indicator */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getMajorColor(student.major)}`}>
                XII {student.major}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip(e);
                }}
                className="text-[11px] font-semibold text-stone-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
                title="Putar kartu"
              >
                <RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                <span className="hidden sm:inline">Flip</span>
              </button>
            </div>

            {/* Photo & Identity Layout */}
            <div className={`relative mb-4 overflow-hidden rounded-2xl bg-stone-100 ${
              student.bentoSize === 'large' ? 'aspect-[16/10]' : student.bentoSize === 'wide' ? 'aspect-[21/9]' : 'aspect-square'
            }`}>
              <img
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[11px] font-medium text-amber-300 block">
                  "{student.nickname}"
                </span>
                <h3 className="font-serif-display text-lg sm:text-xl font-bold leading-tight drop-shadow-sm line-clamp-1">
                  {student.name}
                </h3>
              </div>
            </div>

            {/* Badges: Ekskul & Hobi */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                🎯 {student.extracurricular}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
                ✨ {student.hobby}
              </span>
            </div>

            {/* Student Quote */}
            <blockquote className="font-handwriting text-stone-700 text-base sm:text-lg leading-snug line-clamp-3 italic">
              {student.quote}
            </blockquote>
          </div>

          {/* Card Footer */}
          <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Cita-cita: <strong className="text-stone-700 font-semibold">{student.dreamCareer.split('/')[0]}</strong></span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStudent(student);
              }}
              className="font-semibold text-amber-600 hover:text-amber-700 underline underline-offset-2"
            >
              Detail →
            </button>
          </div>
        </div>

        {/* ==================== BACK OF CARD ==================== */}
        <div
          className={`w-full h-full flex flex-col justify-between backface-hidden rotate-y-180 absolute inset-0 p-5 sm:p-6 bg-gradient-to-b from-stone-50 to-amber-50/30 rounded-3xl ${
            !isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-serif-display font-bold text-stone-900 text-sm">
                  Rahasia & Memori {student.nickname}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip(e);
                }}
                className="text-[11px] text-stone-400 hover:text-stone-700 flex items-center gap-1"
              >
                <RotateCw className="w-3.5 h-3.5" /> Depan
              </button>
            </div>

            {/* Fun Facts */}
            <div className="mb-3 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Fakta Lucu di Kelas:
              </span>
              {student.funFacts.slice(0, 3).map((fact, idx) => (
                <div
                  key={idx}
                  className="text-xs text-stone-700 bg-white/90 rounded-xl p-2 border border-stone-200/80 flex items-start gap-1.5 shadow-2xs"
                >
                  <span className="text-amber-500 font-bold text-sm leading-none">•</span>
                  <span className="line-clamp-2">{fact}</span>
                </div>
              ))}
            </div>

            {/* Favorite memory */}
            <div className="bg-amber-100/50 rounded-xl p-2.5 border border-amber-200/50 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                Kenangan Paling Berkesan:
              </span>
              <p className="text-xs text-stone-800 italic line-clamp-2">
                "{student.favoriteMemory}"
              </p>
            </div>

            {/* Spotify if exists */}
            {student.spotifyTrack && (
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-900 text-white text-[11px]">
                <Music className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="font-medium">{student.spotifyTrack.title}</span>
                  <span className="text-stone-400 text-[10px]"> — {student.spotifyTrack.artist}</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between gap-2">
            <a
              href={`https://instagram.com/${student.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-600" />
              <span>@{student.instagram}</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onWriteMessageForStudent(student.name);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-3 h-3 text-stone-950" />
              <span>Kirim Pesan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

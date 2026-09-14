import React from 'react';
import { X, Instagram, Music, Heart, Sparkles, Send, MapPin, GraduationCap, Quote } from 'lucide-react';
import { Student } from '../types';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onWriteMessage: (studentName: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onWriteMessage,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Photo & Banner */}
        <div className="relative h-64 sm:h-72 bg-stone-900 shrink-0">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Student Banner Info */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950">
                XII {student.major}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                "{student.nickname}"
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
              {student.name}
            </h2>
            <p className="text-xs text-amber-200 font-medium">
              Ekskul: {student.extracurricular} • Hobi: {student.hobby}
            </p>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Quotes */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 relative">
            <Quote className="w-6 h-6 text-amber-400 absolute top-3 right-4 opacity-50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
              Kutipan Buku Tahunan:
            </span>
            <p className="font-handwriting text-stone-800 text-xl leading-snug italic">
              {student.fullQuote || student.quote}
            </p>
          </div>

          {/* Career & Memory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1 font-semibold">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Cita-cita Masa Depan:</span>
              </div>
              <div className="text-sm font-bold text-stone-900">
                {student.dreamCareer}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-500 text-xs mb-1 font-semibold">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Kenangan Terindah:</span>
              </div>
              <div className="text-xs text-stone-800 italic leading-relaxed">
                "{student.favoriteMemory}"
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Fakta Menarik & Rekor Kelas:
            </h4>
            <div className="space-y-2">
              {student.funFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spotify track if any */}
          {student.spotifyTrack && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Soundtrack SMA Favorit:</div>
                  <div className="text-xs font-bold">{student.spotifyTrack.title}</div>
                  <div className="text-[11px] text-stone-300">{student.spotifyTrack.artist}</div>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-stone-300 font-mono">
                Spotify On
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={`https://instagram.com/${student.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-rose-600" />
              <span>Ikuti di @{student.instagram}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onWriteMessage(student.name);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 text-stone-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-stone-950" />
              <span>Tulis Pesan untuk {student.nickname}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useRef } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { TIMELINE_DATA } from '../data/timelineData';
import { sounds } from '../utils/audio';

export const TimelineSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    sounds.playPop();
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="timeline" className="py-20 sm:py-28 bg-[#f5efe6] relative overflow-hidden border-y border-stone-200">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Lini Masa Perjalanan Angkatan 2026
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Enam Babak yang Mengubah{' '}
              <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
                Orang Asing Jadi Keluarga
              </span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Dari rasa canggung di hari pertama MPLS, hawa dingin Bromo, riuh suporter DBL,
              hingga pelukan perpisahan di kapel almamater kita. Geser ke kanan untuk menjelajahi lini masa.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll Kiri"
              className="p-3 rounded-full bg-white hover:bg-stone-100 text-stone-800 shadow-xs border border-stone-200 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll Kanan"
              className="p-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Timeline Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory"
        >
          {TIMELINE_DATA.map((milestone, idx) => (
            <div
              key={milestone.id}
              className="w-[300px] sm:w-[380px] shrink-0 snap-start bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with zoom effect */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 bg-stone-100">
                  <img
                    src={milestone.photoUrl}
                    alt={milestone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs ${milestone.tagBg}`}>
                      {milestone.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                    Babak {idx + 1}
                  </div>
                </div>

                {/* Date & Location */}
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {milestone.dateStr}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 truncate max-w-[170px]" title={milestone.location}>
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {milestone.location.split(',')[0]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors">
                  {milestone.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {milestone.description}
                </p>
              </div>

              {/* Anecdote Scrapbook Snippet */}
              <div className="pt-3 border-t border-stone-100 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                  Momen Paling Membekas:
                </span>
                <p className="text-xs text-stone-700 italic">
                  "{milestone.highlightStory}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

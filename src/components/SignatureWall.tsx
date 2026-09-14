import React, { useState, useMemo } from 'react';
import { PenTool, Heart, MessageSquare, Sparkles, Filter, Search, Smile, Flame } from 'lucide-react';
import { BoardMessage, MessageReaction, TapeColor } from '../types';
import { sounds } from '../utils/audio';

interface SignatureWallProps {
  messages: BoardMessage[];
  onOpenModal: () => void;
  onReact: (messageId: string, reactionType: keyof MessageReaction) => void;
}

export const SignatureWall: React.FC<SignatureWallProps> = ({
  messages,
  onOpenModal,
  onReact,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'latest'>('all');
  const [searchMsg, setSearchMsg] = useState('');

  // Tape styling helper
  const getTapeClass = (color: TapeColor) => {
    switch (color) {
      case 'pink':
        return 'washi-tape washi-tape-pink';
      case 'blue':
        return 'washi-tape washi-tape-blue';
      case 'yellow':
        return 'washi-tape washi-tape-yellow';
      case 'orange':
      default:
        return 'washi-tape';
    }
  };

  const filteredMessages = useMemo(() => {
    let list = [...messages];

    if (searchMsg) {
      const q = searchMsg.toLowerCase();
      list = list.filter(
        (m) =>
          m.senderName.toLowerCase().includes(q) ||
          m.text.toLowerCase().includes(q) ||
          (m.recipientName && m.recipientName.toLowerCase().includes(q))
      );
    }

    if (filterType === 'popular') {
      list.sort((a, b) => {
        const totalA = a.reactions.heart + a.reactions.party + a.reactions.laugh + a.reactions.tear + a.reactions.fire;
        const totalB = b.reactions.heart + b.reactions.party + b.reactions.laugh + b.reactions.tear + b.reactions.fire;
        return totalB - totalA;
      });
    } else if (filterType === 'latest') {
      // already sorted or keep order
    }

    return list;
  }, [messages, searchMsg, filterType]);

  const handleReactionClick = (msgId: string, rKey: keyof MessageReaction) => {
    sounds.playPop();
    onReact(msgId, rKey);
  };

  return (
    <section id="papan-pesan" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 text-rose-900 border border-rose-200/80 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
            Papan Dinding Pesan & Tanda Tangan Digital
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Goresan Tinta & Untaian Doa{' '}
            <span className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Perpisahan Kita
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Tinggalkan pesan tulus, kenangan lucu, dan tanda tangan digitalmu langsung dari layar. 
            Semua pesan tertempel di dinding digital ini dan bisa dibaca selamanya oleh sahabatmu.
          </p>
        </div>

        {/* Action Button */}
        <button
          id="wall-write-message-btn"
          onClick={() => {
            sounds.playChime();
            onOpenModal();
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all self-start md:self-end shrink-0"
        >
          <PenTool className="w-4 h-4 text-stone-950" />
          <span>+ Tulis Pesan & Tanda Tangan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua Pesan ({messages.length})
          </button>
          <button
            onClick={() => setFilterType('popular')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'popular'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            🔥 Paling Populer
          </button>
          <button
            onClick={() => setFilterType('latest')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'latest'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Terbaru
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchMsg}
            onChange={(e) => setSearchMsg(e.target.value)}
            placeholder="Cari pengirim / kata kunci..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-stone-200 text-xs focus:ring-2 focus:ring-amber-400/50 outline-none"
          />
        </div>
      </div>

      {/* Masonry-Style Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 pt-4">
        {filteredMessages.map((msg, index) => {
          // Slight playful rotation for realism
          const rotations = ['rotate-[-0.6deg]', 'rotate-[0.8deg]', 'rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.4deg]'];
          const rotClass = rotations[index % rotations.length];

          return (
            <div
              key={msg.id}
              id={`message-card-${msg.id}`}
              className={`${getTapeClass(msg.tapeColor)} ${rotClass} relative bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_4px_6px_-2px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Top Sticker & Recipient Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md inline-block">
                      Untuk: {msg.recipientName || 'Semua Angkatan'}
                    </span>
                    <div className="flex items-center gap-2 pt-1">
                      <h4 className="font-serif-display font-bold text-stone-900 text-lg">
                        {msg.senderName}
                      </h4>
                      {msg.senderClass && (
                        <span className="text-[11px] text-stone-500 font-medium">
                          • {msg.senderClass}
                        </span>
                      )}
                    </div>
                  </div>

                  {msg.sticker && (
                    <span className="text-2xl drop-shadow-sm select-none animate-in zoom-in">
                      {msg.sticker}
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="my-4 text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                  "{msg.text}"
                </div>
              </div>

              {/* Bottom: Signature + Date + Reactions */}
              <div className="pt-4 border-t border-stone-100/90 space-y-4">
                
                {/* Signature and Date */}
                <div className="flex items-end justify-between gap-4">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {msg.createdAt}
                  </span>

                  {/* Digital Canvas Signature */}
                  <div className="flex flex-col items-end">
                    <img
                      src={msg.signatureDataUrl}
                      alt={`Tanda tangan ${msg.senderName}`}
                      className="h-10 sm:h-12 max-w-[140px] object-contain select-none"
                    />
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest -mt-1 font-mono">
                      TTD Digital Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Reaction Pills Bar */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <button
                    onClick={() => handleReactionClick(msg.id, 'heart')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 transition-transform active:scale-125"
                    title="Kirim Cinta"
                  >
                    <span>❤️</span>
                    <span>{msg.reactions.heart}</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick(msg.id, 'party')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 transition-transform active:scale-125"
                    title="Rayakan!"
                  >
                    <span>🎉</span>
                    <span>{msg.reactions.party}</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick(msg.id, 'laugh')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border border-yellow-200/60 transition-transform active:scale-125"
                    title="Lucu / Ngakak"
                  >
                    <span>😂</span>
                    <span>{msg.reactions.laugh}</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick(msg.id, 'tear')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/60 transition-transform active:scale-125"
                    title="Terharu"
                  >
                    <span>🥺</span>
                    <span>{msg.reactions.tear}</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick(msg.id, 'fire')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200/60 transition-transform active:scale-125"
                    title="Menyala!"
                  >
                    <span>🔥</span>
                    <span>{msg.reactions.fire}</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

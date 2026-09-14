import React, { useState } from 'react';
import { Award, Trophy, Sparkles, CheckCircle2, ChevronRight, Vote, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SuperlativeCategory, Student } from '../types';
import { STUDENTS_DATA } from '../data/studentsData';
import { sounds } from '../utils/audio';

interface SuperlativeVotingProps {
  categories: SuperlativeCategory[];
  onCastVote: (categoryId: string, studentId: string) => void;
}

export const SuperlativeVoting: React.FC<SuperlativeVotingProps> = ({
  categories,
  onCastVote,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || 'sup-1');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [justVoted, setJustVoted] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  // Calculate sorted rankings for active category
  const sortedNominees = Object.entries(activeCategory.votes)
    .map(([studentId, count]) => {
      const student = STUDENTS_DATA.find((s) => s.id === studentId);
      return {
        student,
        count,
      };
    })
    .filter((item): item is { student: Student; count: number } => item.student !== undefined)
    .sort((a, b) => b.count - a.count);

  const totalVotesInActive = sortedNominees.reduce((acc, curr) => acc + curr.count, 0);

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    onCastVote(activeCategory.id, selectedStudentId);
    sounds.playChime();

    const votedStudent = STUDENTS_DATA.find((s) => s.id === selectedStudentId);
    setJustVoted(votedStudent ? votedStudent.nickname : 'Temanmu');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setSelectedStudentId('');
    setTimeout(() => {
      setJustVoted(null);
    }, 4000);
  };

  return (
    <section id="superlatif" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-200 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          Voting Penghargaan Superlatif Kelas 2026
        </div>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Gelar Terkocak & Paling{' '}
          <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            Ikonik Angkatan
          </span>
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Beri apresiasi jenaka untuk teman-teman yang telah memberi warna pada masa SMA kita.
          Pilih kategori dan kirim suaramu secara real-time!
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 p-3 bg-stone-50 border-b border-stone-200 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playPop();
                  setActiveCategoryId(cat.id);
                  setJustVoted(null);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs scale-[1.02]'
                    : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-200/80'
                }`}
              >
                <Award className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Content */}
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Category Info & Voting Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 inline-block mb-2">
                  Kategori Terpilih
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  {activeCategory.title}
                </h3>
                <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              {/* Success Notification */}
              {justVoted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Suaramu untuk <strong>{justVoted}</strong> telah berhasil ditambahkan ke leaderboard! 🎉</span>
                </div>
              )}

              {/* Vote Casting Form */}
              <form onSubmit={handleVoteSubmit} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Beri Suara Sekarang:
                  </span>
                </div>

                <div>
                  <label className="block text-xs text-stone-600 mb-1.5 font-medium">
                    Pilih nama teman yang paling cocok:
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 outline-none"
                    required
                  >
                    <option value="">-- Pilih Teman Sekelas --</option>
                    {STUDENTS_DATA.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.nickname}) — {student.major}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!selectedStudentId}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 text-stone-950 font-bold text-sm shadow-sm hover:shadow-orange-500/25 hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Kirim Suara (+1 Vote)</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center">
                  *Kamu bisa vote lebih dari satu kategori. Semua suara diperbarui langsung di leaderboard.
                </p>
              </form>
            </div>

            {/* Right: Real-time Mini Leaderboard Podium (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h4 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Leaderboard Sementara
                </h4>
                <span className="text-xs font-semibold text-stone-500">
                  Total {totalVotesInActive} Suara Masuk
                </span>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-3 pt-2">
                {sortedNominees.map((item, index) => {
                  const percentage = totalVotesInActive > 0 ? Math.round((item.count / totalVotesInActive) * 100) : 0;
                  const isGold = index === 0;
                  const isSilver = index === 1;
                  const isBronze = index === 2;

                  return (
                    <div
                      key={item.student.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                        isGold
                          ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        {/* Rank Badge & Avatar */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                              isGold
                                ? 'bg-amber-400 text-stone-950 shadow-xs'
                                : isSilver
                                ? 'bg-slate-200 text-stone-800'
                                : isBronze
                                ? 'bg-orange-200 text-amber-950'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {isGold ? '🥇' : isSilver ? '🥈' : isBronze ? '🥉' : `#${index + 1}`}
                          </span>

                          <img
                            src={item.student.avatar}
                            alt={item.student.name}
                            className="w-10 h-10 rounded-full object-cover border border-white shadow-2xs"
                            referrerPolicy="no-referrer"
                          />

                          <div>
                            <div className="font-serif-display font-bold text-stone-900 text-sm sm:text-base">
                              {item.student.name}
                            </div>
                            <div className="text-xs text-stone-500">
                              "{item.student.nickname}" • {item.student.extracurricular}
                            </div>
                          </div>
                        </div>

                        {/* Votes count */}
                        <div className="text-right">
                          <span className="font-serif-display font-bold text-stone-900 text-base sm:text-lg">
                            {item.count}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            suara ({percentage}%)
                          </span>
                        </div>
                      </div>

                      {/* Visual progress bar */}
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isGold
                              ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                              : 'bg-stone-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

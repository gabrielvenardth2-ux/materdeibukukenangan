import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Users, X } from 'lucide-react';
import { Student } from '../types';
import { STUDENTS_DATA } from '../data/studentsData';
import { ProfileCard } from './ProfileCard';

interface BentoGridProps {
  onSelectStudent: (student: Student) => void;
  onWriteMessageForStudent: (studentName: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  onSelectStudent,
  onWriteMessageForStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  const filterOptions = [
    'Semua',
    'MIPA',
    'IPS',
    'Bahasa',
    'Basket',
    'Band',
    'Paduan Suara',
    'OSIS',
    'Fotografi',
    'Dance',
  ];

  // Filter & search logic
  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.hobby.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.extracurricular.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (selectedFilter === 'Semua') return true;
      if (selectedFilter === 'MIPA' || selectedFilter === 'IPS' || selectedFilter === 'Bahasa') {
        return student.major === selectedFilter;
      }
      return (
        student.extracurricular.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        student.hobby.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });
  }, [searchQuery, selectedFilter]);

  return (
    <section id="bento-profil" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/80 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            Galeri Bento Sahabat Angkatan 2026
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Wajah-Wajah Pengukir{' '}
            <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              Sejarah Putih Abu-Abu
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Klik kartu mana pun untuk memutar 3D dan mengintip fun facts, rekor kocak, 
            lagu favorit, dan jejak kenangan mereka di SMAK Mater Dei Probolinggo.
          </p>
        </div>

        {/* Dynamic counter */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-stone-200/80 shadow-2xs self-start md:self-end">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-stone-700">
            Menampilkan <strong className="text-stone-900 font-bold">{filteredStudents.length}</strong> dari {STUDENTS_DATA.length} Siswa
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="student-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teman berdasarkan nama, panggilan, hobi, atau kutipan..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 shrink-0 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs scale-[1.02]'
                    : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-5">
          {filteredStudents.map((student) => (
            <ProfileCard
              key={student.id}
              student={student}
              onSelectStudent={onSelectStudent}
              onWriteMessageForStudent={onWriteMessageForStudent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-1">
            Tidak ada teman yang cocok dengan pencarian
          </h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-4">
            Coba gunakan kata kunci nama lain atau klik tombol reset filter di bawah.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('Semua');
            }}
            className="px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Reset Pencarian & Filter
          </button>
        </div>
      )}
    </section>
  );
};

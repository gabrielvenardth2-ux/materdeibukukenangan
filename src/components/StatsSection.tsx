import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Award, HeartHandshake, Sparkles } from 'lucide-react';
import { STUDENTS_DATA } from '../data/studentsData';
import { BoardMessage } from '../types';

interface StatsSectionProps {
  messages: BoardMessage[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ messages }) => {
  // Aggregate Extracurricular counts
  const ekskulMap: Record<string, number> = {};
  STUDENTS_DATA.forEach((s) => {
    const key = s.extracurricular.split('(')[0].trim();
    ekskulMap[key] = (ekskulMap[key] || 0) + 1;
  });

  const sortedEkskul = Object.entries(ekskulMap)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  // Aggregate Hobby counts
  const hobbyMap: Record<string, number> = {};
  STUDENTS_DATA.forEach((s) => {
    s.hobby.split('&').forEach((h) => {
      const trimmed = h.trim();
      hobbyMap[trimmed] = (hobbyMap[trimmed] || 0) + 1;
    });
  });

  const topHobbies = Object.entries(hobbyMap)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxHobbyCount = Math.max(...topHobbies.map((h) => h.count), 1);

  // Major distribution
  const majorCounts = {
    MIPA: STUDENTS_DATA.filter((s) => s.major === 'MIPA').length,
    IPS: STUDENTS_DATA.filter((s) => s.major === 'IPS').length,
    Bahasa: STUDENTS_DATA.filter((s) => s.major === 'Bahasa').length,
  };

  const totalStudents = STUDENTS_DATA.length;
  const avgMessagePerStudent = (messages.length / totalStudents).toFixed(1);

  // Donut chart colors
  const donutColors = [
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#8b5cf6', // Violet
    '#f97316', // Orange
    '#06b6d4', // Cyan
  ];

  // Calculate donut stroke offsets
  const circumference = 2 * Math.PI * 40; // r=40 -> ~251.3
  let cumulativeOffset = 0;
  const donutSlices = sortedEkskul.slice(0, 5).map((item, idx) => {
    const fraction = item.count / totalStudents;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += fraction * circumference;
    return {
      ...item,
      color: donutColors[idx % donutColors.length],
      strokeDasharray,
      strokeDashoffset,
      percentage: Math.round(fraction * 100),
    };
  });

  return (
    <section id="statistik" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-200 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          Statistik & Insight Angkatan 2026
        </div>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Cerita di Balik{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Angka & Data Kelas
          </span>
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Kilas balik berbasis data nyata teman-teman sekelas: dari peminatan jurusan, ekskul paling diminati,
          hingga sebaran hobi kreatif yang mewarnai keseharian di sekolah.
        </p>
      </div>

      {/* 4 Big Number Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs">
          <div className="p-2 rounded-2xl bg-amber-100/80 text-amber-800 w-fit mb-3">
            <Users className="w-5 h-5" />
          </div>
          <div className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 mb-1">
            {totalStudents}
          </div>
          <div className="text-xs font-semibold text-stone-700">Profil Siswa Aktif</div>
          <div className="text-[11px] text-stone-400 mt-1">SMAK Mater Dei Probolinggo</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs">
          <div className="p-2 rounded-2xl bg-emerald-100/80 text-emerald-800 w-fit mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div className="font-serif-display text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">
            100%
          </div>
          <div className="text-xs font-semibold text-stone-700">Tingkat Kelulusan</div>
          <div className="text-[11px] text-stone-400 mt-1">Lulus murni serentak 2026</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs">
          <div className="p-2 rounded-2xl bg-rose-100/80 text-rose-800 w-fit mb-3">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-600 mb-1">
            {messages.length}
          </div>
          <div className="text-xs font-semibold text-stone-700">Pesan & TTD Masuk</div>
          <div className="text-[11px] text-stone-400 mt-1">Tertempel di papan kenangan</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs">
          <div className="p-2 rounded-2xl bg-sky-100/80 text-sky-800 w-fit mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="font-serif-display text-3xl sm:text-4xl font-bold text-sky-600 mb-1">
            {avgMessagePerStudent}
          </div>
          <div className="text-xs font-semibold text-stone-700">Rasio Pesan per Siswa</div>
          <div className="text-[11px] text-stone-400 mt-1">Interaksi kelas sangat solid</div>
        </div>
      </div>

      {/* SVG Charts Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Donut SVG for Extracurriculars (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-500" />
                Sebaran Ekstrakurikuler Paling Populer
              </h3>
              <span className="text-xs text-stone-400 font-mono">SVG Dinamis</span>
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Aktivitas non-akademik yang paling banyak diikuti siswa angkatan 2026.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
            {/* Pure SVG Donut Chart */}
            <div className="relative w-44 h-44 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background track circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f5f5f4"
                  strokeWidth="16"
                />
                {/* Slices */}
                {donutSlices.map((slice, i) => (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="16"
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    className="transition-all duration-700 hover:opacity-85"
                  />
                ))}
              </svg>

              {/* Center Total Count Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="font-serif-display font-bold text-2xl text-stone-900">
                  {totalStudents}
                </span>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Siswa
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2.5 w-full sm:w-auto">
              {donutSlices.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-md shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-stone-700 font-medium">{item.label}</span>
                  </div>
                  <span className="font-bold text-stone-900">
                    {item.count} siswa ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Horizontal Bar SVG for Top Hobbies & Major Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Hobi Terfavorit Angkatan
              </h3>
              <span className="text-xs text-stone-400 font-mono">Mini Chart</span>
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Minat dan kegemaran yang paling sering mengisi waktu luang di luar jam pelajaran.
            </p>

            {/* Horizontal Bar Visuals */}
            <div className="space-y-3.5">
              {topHobbies.map((hobby, index) => {
                const widthPercent = Math.round((hobby.count / maxHobbyCount) * 100);
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-700">{hobby.label}</span>
                      <span className="text-indigo-600 font-mono">{hobby.count} orang</span>
                    </div>
                    <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-700"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Major Distribution Segmented Bar */}
          <div className="pt-6 mt-6 border-t border-stone-100">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
              Distribusi Jurusan:
            </span>
            <div className="h-4 w-full rounded-full flex overflow-hidden gap-0.5 bg-stone-200 p-0.5">
              <div
                style={{ width: `${(majorCounts.MIPA / totalStudents) * 100}%` }}
                className="bg-emerald-500 rounded-l-full h-full"
                title={`MIPA: ${majorCounts.MIPA}`}
              />
              <div
                style={{ width: `${(majorCounts.IPS / totalStudents) * 100}%` }}
                className="bg-amber-500 h-full"
                title={`IPS: ${majorCounts.IPS}`}
              />
              <div
                style={{ width: `${(majorCounts.Bahasa / totalStudents) * 100}%` }}
                className="bg-violet-500 rounded-r-full h-full"
                title={`Bahasa: ${majorCounts.Bahasa}`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-stone-500 pt-2 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> MIPA: {majorCounts.MIPA} ({Math.round((majorCounts.MIPA / totalStudents) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> IPS: {majorCounts.IPS} ({Math.round((majorCounts.IPS / totalStudents) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-violet-500" /> Bahasa: {majorCounts.Bahasa} ({Math.round((majorCounts.Bahasa / totalStudents) * 100)}%)
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

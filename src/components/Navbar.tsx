import React, { useState, useEffect } from 'react';
import { BookOpen, PenTool, Volume2, VolumeX, Menu, X, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  onOpenMessageModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMessageModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playChime();
    }
  };

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Profil Teman', href: '#bento-profil' },
    { label: 'Papan Pesan', href: '#papan-pesan' },
    { label: 'Superlatif', href: '#superlatif' },
    { label: 'Kapsul Waktu', href: '#kapsul-waktu' },
    { label: 'Statistik', href: '#statistik' },
    { label: 'Timeline', href: '#timeline' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-900/85 backdrop-blur-md shadow-lg shadow-black/10 border-b border-white/10 text-white'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand logo & School Identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-[2px] shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-amber-300 font-serif-display font-bold text-base tracking-wider">
              MD
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                SMAK Mater Dei
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                2026
              </span>
            </div>
            <p className="text-[11px] text-stone-300 font-medium tracking-wide">
              Probolinggo • Caritas in Veritate
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors border border-white/10"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            id="nav-write-message-btn"
            onClick={() => {
              sounds.playChime();
              onOpenMessageModal();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <PenTool className="w-4 h-4 text-stone-950" />
            <span>Tulis Pesan & TTD</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-sound-toggle"
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/10 text-amber-300"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-stone-900/98 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10">
              <button
                id="mobile-write-message-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  sounds.playChime();
                  onOpenMessageModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 text-stone-950 font-bold text-sm shadow-md"
              >
                <PenTool className="w-4 h-4 text-stone-950" />
                <span>Tulis Pesan & Tanda Tangan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

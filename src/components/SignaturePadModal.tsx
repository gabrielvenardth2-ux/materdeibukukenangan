import React, { useState, useRef } from 'react';
import { X, PenTool, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BoardMessage, TapeColor } from '../types';
import { SignaturePad, SignaturePadRef } from './SignaturePad';
import { STUDENTS_DATA } from '../data/studentsData';
import { sounds } from '../utils/audio';

interface SignaturePadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: Omit<BoardMessage, 'id' | 'createdAt' | 'reactions' | 'userReacted'>) => void;
  initialRecipient?: string;
}

const STICKER_CHOICES = ['❤️', '🎉', '⭐', '🕊️', '🏆', '☕', '🎸', '🎓', '🔥', '🌸'];

const TAPE_CHOICES: { color: TapeColor; label: string; bgClass: string }[] = [
  { color: 'orange', label: 'Sunset Oranye', bgClass: 'bg-amber-300' },
  { color: 'pink', label: 'Sakura Pink', bgClass: 'bg-pink-300' },
  { color: 'blue', label: 'Langit Biru', bgClass: 'bg-sky-300' },
  { color: 'yellow', label: 'Lemon Kuning', bgClass: 'bg-yellow-300' },
];

export const SignaturePadModal: React.FC<SignaturePadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialRecipient = '',
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderClass, setSenderClass] = useState('Alumni / Teman Sekelas');
  const [recipientName, setRecipientName] = useState(initialRecipient || 'Semua Angkatan 2026');
  const [messageText, setMessageText] = useState('');
  const [selectedTape, setSelectedTape] = useState<TapeColor>('orange');
  const [selectedSticker, setSelectedSticker] = useState('⭐');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const signatureRef = useRef<SignaturePadRef | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      setErrorMsg('Harap isi nama pengirim!');
      return;
    }
    if (!messageText.trim()) {
      setErrorMsg('Harap tuliskan pesan kenanganmu!');
      return;
    }

    const currentSig = signatureRef.current?.getSignatureDataUrl() || signatureData;
    if (!currentSig) {
      setErrorMsg('Harap torehkan tanda tangan digitalmu pada kanvas di bawah!');
      return;
    }

    // Submit message
    onSubmit({
      senderName: senderName.trim(),
      senderClass: senderClass.trim() || undefined,
      recipientName: recipientName.trim() || 'Semua Angkatan 2026',
      text: messageText.trim(),
      signatureDataUrl: currentSig,
      tapeColor: selectedTape,
      sticker: selectedSticker,
    });

    // Celebration burst
    sounds.playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Reset & close
    setSenderName('');
    setMessageText('');
    setSignatureData(null);
    signatureRef.current?.clear();
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header with warm gradient */}
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              <PenTool className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold">
                Tulis Pesan & Tanda Tangan Digital
              </h3>
              <p className="text-xs sm:text-sm text-stone-100/90 font-medium">
                Papan Kenangan SMAK Mater Dei Probolinggo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Form Fields: Sender & Class */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Nama Pengirim <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Contoh: Gabriel Venardth / Kevin"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Status / Kelas
              </label>
              <input
                type="text"
                value={senderClass}
                onChange={(e) => setSenderClass(e.target.value)}
                placeholder="Contoh: XII MIPA 1 / Sahabat Sebangku"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none"
              />
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Pesan Ditujukan Untuk
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Contoh: Semua Angkatan 2026 / Maria Angelica"
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none"
              />
              <select
                onChange={(e) => {
                  if (e.target.value) setRecipientName(e.target.value);
                }}
                className="px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700 outline-none"
              >
                <option value="">Pilih Cepat Siswa</option>
                <option value="Semua Angkatan 2026">Semua Angkatan 2026</option>
                <option value="Bapak & Ibu Guru SMAK Mater Dei">Bapak/Ibu Guru</option>
                {STUDENTS_DATA.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.nickname})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Text */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Isi Pesan Kenangan / Harapan Kelulusan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tuliskan ucapan perpisahan, doa, lelucon kelas, atau kenangan paling tak terlupakan..."
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none resize-none leading-relaxed"
              required
            />
          </div>

          {/* Scrapbook Customization: Washi Tape & Sticker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
            <div>
              <span className="block text-xs font-bold text-stone-700 mb-2">
                Pilih Warna Selotip Kertas (Washi Tape):
              </span>
              <div className="flex gap-2">
                {TAPE_CHOICES.map((tape) => (
                  <button
                    key={tape.color}
                    type="button"
                    onClick={() => setSelectedTape(tape.color)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedTape === tape.color
                        ? 'border-stone-900 shadow-xs ring-1 ring-stone-900 scale-105'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${tape.bgClass}`} />
                    <span>{tape.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-stone-700 mb-2">
                Stiker Mood Kenangan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STICKER_CHOICES.map((stk) => (
                  <button
                    key={stk}
                    type="button"
                    onClick={() => setSelectedSticker(stk)}
                    className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-transform ${
                      selectedSticker === stk
                        ? 'bg-white shadow-xs ring-2 ring-amber-500 scale-110'
                        : 'bg-stone-200/50 hover:bg-white'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Signature Canvas Pad */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
              <span>Tanda Tangan Digital Asli (Canvas API) <span className="text-rose-500">*</span></span>
              <span className="text-[11px] font-normal text-stone-400">Gunakan mouse atau jari di layar</span>
            </label>
            <SignaturePad
              ref={signatureRef}
              onSignatureChange={(sig) => setSignatureData(sig)}
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 text-sm font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 hover:opacity-95 text-stone-950 font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 text-stone-950" />
              <span>Tempel Pesan ke Dinding</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

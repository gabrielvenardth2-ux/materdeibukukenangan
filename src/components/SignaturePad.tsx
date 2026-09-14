import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trash2, Check, Pen, CircleDot } from 'lucide-react';

interface SignaturePadProps {
  onSignatureChange?: (dataUrl: string | null) => void;
}

const INK_COLORS = [
  { name: 'Hitam Tinta', color: '#18181b' },
  { name: 'Biru Ballpoint', color: '#1d4ed8' },
  { name: 'Merah Maroon', color: '#991b1b' },
  { name: 'Cokelat Emas', color: '#b45309' },
  { name: 'Ungu Elegan', color: '#581c87' },
];

const STROKE_WIDTHS = [
  { label: 'Tipis', width: 2 },
  { label: 'Sedang', width: 3.5 },
  { label: 'Spidol', width: 6 },
];

export interface SignaturePadRef {
  getSignatureDataUrl: () => string | null;
  clear: () => void;
  isEmpty: () => boolean;
}

export const SignaturePad = React.forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ onSignatureChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState(INK_COLORS[0].color);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTHS[1].width);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [hasDrawn, setHasDrawn] = useState(false);

    const lastPosRef = useRef<{ x: number; y: number } | null>(null);

    // Save initial blank state
    const saveState = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(-15), snapshot]);
    }, []);

    // Resize and set up canvas resolution
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      saveState();
    }, [saveState]);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const coords = getCoordinates(e);
      lastPosRef.current = coords;
      setIsDrawing(true);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, strokeWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing || !lastPosRef.current) return;
      e.preventDefault();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentCoords = getCoordinates(e);

      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);

      // Smooth midpoint curve
      const midX = (lastPosRef.current.x + currentCoords.x) / 2;
      const midY = (lastPosRef.current.y + currentCoords.y) / 2;
      ctx.quadraticCurveTo(lastPosRef.current.x, lastPosRef.current.y, midX, midY);
      ctx.lineTo(currentCoords.x, currentCoords.y);
      ctx.stroke();

      lastPosRef.current = currentCoords;
      setHasDrawn(true);
    };

    const stopDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false);
        lastPosRef.current = null;
        saveState();

        if (canvasRef.current && onSignatureChange) {
          onSignatureChange(canvasRef.current.toDataURL('image/png'));
        }
      }
    };

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHistory([]);
      setHasDrawn(false);
      saveState();

      if (onSignatureChange) {
        onSignatureChange(null);
      }
    };

    const handleUndo = () => {
      const canvas = canvasRef.current;
      if (!canvas || history.length <= 1) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Pop current state and apply previous
      const newHistory = [...history];
      newHistory.pop();
      const previousState = newHistory[newHistory.length - 1];

      if (previousState) {
        ctx.putImageData(previousState, 0, 0);
        setHistory(newHistory);
        if (newHistory.length <= 1) {
          setHasDrawn(false);
        }
        if (onSignatureChange) {
          onSignatureChange(newHistory.length > 1 ? canvas.toDataURL('image/png') : null);
        }
      }
    };

    // Forward ref methods
    React.useImperativeHandle(ref, () => ({
      getSignatureDataUrl: () => {
        if (!hasDrawn || !canvasRef.current) return null;
        return canvasRef.current.toDataURL('image/png');
      },
      clear: handleClear,
      isEmpty: () => !hasDrawn,
    }));

    return (
      <div className="space-y-3">
        {/* Canvas Toolbar: Colors & Thickness */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Color choices */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium mr-1">Tinta:</span>
            {INK_COLORS.map((ink) => (
              <button
                key={ink.color}
                type="button"
                onClick={() => setSelectedColor(ink.color)}
                style={{ backgroundColor: ink.color }}
                title={ink.name}
                className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                  selectedColor === ink.color
                    ? 'ring-2 ring-offset-2 ring-stone-900 scale-110'
                    : 'hover:scale-105'
                }`}
              >
                {selectedColor === ink.color && (
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                )}
              </button>
            ))}
          </div>

          {/* Stroke Width choices */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            {STROKE_WIDTHS.map((sw) => (
              <button
                key={sw.label}
                type="button"
                onClick={() => setStrokeWidth(sw.width)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  strokeWidth === sw.width
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {sw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area with signature guide line */}
        <div className="relative rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/70 overflow-hidden shadow-inner touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-40 sm:h-44 cursor-crosshair bg-transparent block"
          />

          {/* Subtle dotted baseline */}
          <div className="absolute bottom-9 left-6 right-6 border-b border-stone-300/80 pointer-events-none flex justify-between items-center text-[10px] text-stone-400 font-mono select-none">
            <span>Tanda tangan di sini</span>
            <span>✕ Mater Dei '26</span>
          </div>

          {/* Floating Action Buttons inside canvas */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-700 shadow-2xs border border-stone-200 disabled:opacity-40 transition-opacity"
              title="Undo Goresan Terakhir"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!hasDrawn}
              className="p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-rose-600 shadow-2xs border border-stone-200 disabled:opacity-40 transition-opacity"
              title="Hapus Semua"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 italic text-center">
          *Gunakan mouse atau jari di layar sentuh untuk menorehkan tanda tangan digital aslimu.
        </p>
      </div>
    );
  }
);

SignaturePad.displayName = 'SignaturePad';

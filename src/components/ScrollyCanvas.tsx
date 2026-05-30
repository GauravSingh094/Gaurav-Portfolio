'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  // Use 120 based on actual file count in /sequence/
  const frameCount = 120;

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Files are named frame_000_delay-0.066s.png to frame_119_delay-0.066s.png
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${frameIndex}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        // If all images loaded, draw the first frame immediately (if at top)
        if (loadedCount === frameCount) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (canvas && ctx && loadedImages[0]) {
            drawCover(ctx, loadedImages[0], canvas.width, canvas.height);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-draw current frame based on scroll if possible, otherwise just draw first frame
        if (images.length > 0) {
           const ctx = canvasRef.current.getContext('2d');
           if (ctx) drawCover(ctx, images[0], window.innerWidth, window.innerHeight);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      drawW = h * imgRatio;
      drawH = h;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx && images[frameIndex]) {
      drawCover(ctx, images[frameIndex], canvas.width, canvas.height);
    }
  });

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
}

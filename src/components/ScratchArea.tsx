import React, { useRef, useEffect, useState, MouseEvent } from "react";

// Define an interface for the component props
interface ScratchCardProps {
  width: number;
  height: number;
  image: string;
  brushSize: number;
  prize: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, image, brushSize, prize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const topLayer = new Image();
        topLayer.crossOrigin = "Anonymous";
        topLayer.src = image;
        topLayer.onload = () => {
          context.drawImage(topLayer, 0, 0, width, height);
        };
      }
    }
  }, [image, width, height]);

  const calculateScratchedPercent = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const imageData = context.getImageData(0, 0, width, height).data;
        let scratched = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          if (imageData[i + 3] === 0) { // Check alpha channel transparency
            scratched++;
          }
        }
        const total = (width * height);
        setScratchedPercent((scratched / total) * 100);
      }
    }
  };

  const scratch = (event: MouseEvent) => {
    if (!isMouseDown || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
      calculateScratchedPercent();
    }
  };

  return (
    <div className="scratch-card" style={{ position: 'relative', width, height }}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          lineHeight: `${height}px`,
          fontSize: '24px',
          fontWeight: '700',
          color: 'black',
          userSelect: 'none',
        }}
      >
        {prize}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseOut={() => setIsMouseDown(false)}
        onMouseMove={scratch}
        style={{
          cursor: 'crosshair',
          position: 'absolute',
          top: 0,
          left: 0,
          border: '1px solid #000',
          borderRadius: 10
        }}
      />
    </div>
  );
};

export default ScratchCard;

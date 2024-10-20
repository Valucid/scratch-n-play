import React, { useRef, useEffect, useState, MouseEvent } from "react";

interface ScratchCardProps {
  image: string;
  brushSize: number;
  prize: string;
  isRevealed: boolean;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  image,
  brushSize,
  prize,
  isRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Function to draw the scratch image
  const drawScratchImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        const { width, height } = canvas;
        const topLayer = new Image();
        topLayer.crossOrigin = "Anonymous";
        topLayer.src = image;
        topLayer.onload = () => {
          context.drawImage(topLayer, 0, 0, width, height);
        };
      }
    }
  };

  // Effect to handle initial render and when `isRevealed` changes
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        // Set canvas dimensions to match CSS size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        if (isRevealed) {
          // Reveal the prize by clearing the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          drawScratchImage();
        }
      }
    }
  }, [image, isRevealed]);

  const scratch = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isRevealed || !isMouseDown || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, brushSize, 0, Math.PI * 2);
      context.fill();
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Prize text */}
      <div className="absolute inset-0 flex items-center justify-center text-black font-bold bg-[#C4C4C4] rounded-[10px]">
        {prize}
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseOut={() => setIsMouseDown(false)}
        onMouseMove={scratch}
        style={{
          cursor: isRevealed ? "default" : "crosshair",
        }}
      />
    </div>
  );
};

export default ScratchCard;

import React, { useRef, useState, MouseEvent, TouchEvent, useLayoutEffect } from "react";

interface ScratchCardProps {
  image: string;
  brushSize: number;
  prize: string;
  isRevealed: boolean;
  onReveal: (prize: string) => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  image,
  brushSize,
  prize,
  isRevealed,
  onReveal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions explicitly
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (isRevealed) {
      clearCanvas(); // Clear the canvas when isRevealed is true
      if (!hasBeenRevealed) {
        setHasBeenRevealed(true);
        onReveal(prize); // Trigger the reveal callback
      }
    } else {
      // Load and draw the glitter image
      const topLayer = new Image();
      topLayer.src = `${image}?cache=${Date.now()}`; // Cache bust for fresh load
      topLayer.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(topLayer, 0, 0, canvas.width, canvas.height);
      };
      topLayer.onerror = () => {
        console.error("Failed to load glitter image:", image);
      };
    }
  }, [image, isRevealed]);

  // Function to calculate scratch percentage
  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = imageData.data.length / 4;
    let transparentPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / totalPixels) * 100;

    if (percent >= 50 && !hasBeenRevealed) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setHasBeenRevealed(true);
      onReveal(prize);
    }
  };

  const scratch = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x =
      "clientX" in event
        ? (event.clientX - rect.left) * scaleX
        : (event.touches[0].clientX - rect.left) * scaleX;
    const y =
      "clientY" in event
        ? (event.clientY - rect.top) * scaleY
        : (event.touches[0].clientY - rect.top) * scaleY;

    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2);
    context.fill();

    calculateScratchPercentage();
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
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        onMouseMove={scratch}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchCancel={() => setIsDrawing(false)}
        onTouchMove={scratch}
        style={{ cursor: "crosshair" }}
      />
    </div>
  );
};

export default ScratchCard;

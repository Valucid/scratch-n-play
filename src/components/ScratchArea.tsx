import React, {
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
  useLayoutEffect,
} from "react";

interface ScratchCardProps {
  image: string;
  brushSize: number;
  prize: string;
  isRevealed: boolean;
  onReveal: (prize: string, index: number) => void;
  index: number;
  scratchValue: number;
  gameEnd: boolean;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  image,
  brushSize,
  prize,
  isRevealed,
  onReveal,
  index,
  scratchValue,
  gameEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasBeenRevealed = useRef(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (isRevealed) {
      clearCanvas();
      if (!hasBeenRevealed.current) {
        hasBeenRevealed.current = true;
        onReveal(prize, index);
      }
    } else {
      const topLayer = new Image();
      topLayer.src = `${image}?cache=${Date.now()}`;
      topLayer.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(topLayer, 0, 0, canvas.width, canvas.height);
      };
      topLayer.onerror = () => {
        console.error("Failed to load glitter image:", image);
      };
    }
  }, [image, isRevealed]);

  const calculateScratchPercentage = () => {
    if (hasBeenRevealed.current) return;

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

    if (percent >= 50) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      hasBeenRevealed.current = true;
      onReveal(prize, index);
    }
  };

  const scratch = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    if (
  !isDrawing ||
  !canvasRef.current ||
  (typeof scratchValue !== 'number' || scratchValue <= 0) ||
  gameEnd === true
) return;


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

  const handleStartScratch = () => {
    if (scratchValue > 0 || !gameEnd) {
      setIsDrawing(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Prize text */}
      <div className="absolute inset-0 flex items-center justify-center text-black font-bold bg-[#C4C4C4] rounded-[10px]">
        {isRevealed ? prize : "*****"}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseDown={handleStartScratch}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        onMouseMove={scratch}
        onTouchStart={handleStartScratch}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchCancel={() => setIsDrawing(false)}
        onTouchMove={scratch}
        style={{ cursor: scratchValue > 0 || gameEnd === true ? "crosshair" : "not-allowed" }}
      />
    </div>
  );
};

export default ScratchCard;

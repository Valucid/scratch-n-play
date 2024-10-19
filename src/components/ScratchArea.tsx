import React, { useRef, useEffect, useState, MouseEvent } from "react";

// Define an interface for the component props
interface ScratchCardProps {
  width: number;
  height: number;
  image: string;
  brushSize: number;
  prize: string;
  isRevealed: boolean; // New prop to control reveal
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
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
      const context = canvasRef.current.getContext("2d");
      if (context) {
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
    if (isRevealed) {
      // Reveal the prize by clearing the canvas
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.clearRect(0, 0, width, height);
        }
      }
    } else {
      // Draw the scratch image
      drawScratchImage();
    }
  }, [isRevealed, image, width, height]);

  // Scratch function to erase parts of the scratch image
  const scratch = (event: MouseEvent) => {
    if (isRevealed || !isMouseDown || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div
      className="scratch-card"
      style={{ position: "relative", width, height }}
    >
      {/* Prize text */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          textAlign: "center",
          lineHeight: `${height}px`,
          fontSize: "24px",
          fontWeight: "700",
          color: "black",
          userSelect: "none",
          backgroundColor: "#C4C4C4",
          borderRadius: 10,
        }}
      >
        {prize}
      </div>

      {/* Canvas with the scratchable image */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseOut={() => setIsMouseDown(false)}
        onMouseMove={scratch}
        style={{
          cursor: isRevealed ? "default" : "crosshair",
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px solid #000",
          borderRadius: 10,
        }}
      />
    </div>
  );
};

export default ScratchCard;

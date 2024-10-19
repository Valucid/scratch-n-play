import React, { useRef, useEffect, useState, useCallback } from "react";

const ScratchCard = ({ width, height, image, brushSize, prize }) => {
  const canvasRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the prize first as the background layer
    context.clearRect(0, 0, width, height); // Clear any previous drawing
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height); // Set a black background

    context.fillStyle = "white"; // Set the prize text color
    context.font = "bold 40px Arial"; // Prize text font
    context.textAlign = "center"; // Center align text
    context.textBaseline = "middle"; // Center vertically
    context.fillText(prize, width / 2, height / 2); // Place the prize in the center

    // Load and draw the scratchable image on top
    const img = new Image();
    img.src = image;
    img.crossOrigin = "anonymous"; // Avoid cross-origin issues
    img.onload = () => {
      context.globalCompositeOperation = "source-over"; // Draw image normally
      context.drawImage(img, 0, 0, width, height); // Draw the image that will be scratched off
      context.globalCompositeOperation = "destination-out"; // Set to "erase" mode for scratching
    };
  }, [width, height, prize, image]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    calculateScratchedPercent();
  };

  const calculateScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, width, height).data;
    const totalPixels = width * height;
    let scratchedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    const percent = (scratchedPixels / totalPixels) * 100;
    setScratchedPercent(percent);
  }, [width, height]);

  const scratch = (e) => {
    if (!isMouseDown) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Scratch away the area to reveal the prize beneath
    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2, true);
    context.fill();
  };

  return (
    <div className="scratch-card">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={scratch}
        onMouseUp={handleMouseUp}
        style={{ cursor: "pointer", border: "2px solid #ccc" }}
      />
      <p>{scratchedPercent.toFixed(2)}% scratched</p>
    </div>
  );
};

export default ScratchCard;

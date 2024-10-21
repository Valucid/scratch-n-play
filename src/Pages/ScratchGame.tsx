import React, { useState, useRef, useEffect } from "react";
import WinnerList from "../components/WinnersList";
import ScratchCard from "../components/ScratchArea";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ScratchGame: React.FC = () => {
  const generateRandomPrizes = () => {
    const possiblePrizes = [100, 200, 500, 1000, 2000, 5000];
    const isWinningGame = Math.random() < 0.5; // 50% chance to be a winning game
    const prizeCounts: { [key: string]: number } = {};
  
    const prizes: string[] = [];
  
    if (isWinningGame) {
      // Winning game logic
      const winningPrizeIndex = Math.floor(Math.random() * possiblePrizes.length);
      const winningPrize = possiblePrizes[winningPrizeIndex];
  
      // Add three instances of the winning prize
      for (let i = 0; i < 3; i++) {
        prizes.push(`₦${winningPrize}`);
        prizeCounts[winningPrize] = (prizeCounts[winningPrize] || 0) + 1;
      }

      // Add six more prizes
      while (prizes.length < 9) {
        const randomIndex = Math.floor(Math.random() * possiblePrizes.length);
        const prize = possiblePrizes[randomIndex];
        prizes.push(`₦${prize}`);
        prizeCounts[prize] = (prizeCounts[prize] || 0) + 1;
      }
    } else {
      // Losing game logic
      while (prizes.length < 9) {
        const randomIndex = Math.floor(Math.random() * possiblePrizes.length);
        const prize = possiblePrizes[randomIndex];
        const count = prizeCounts[prize] || 0;
  
        if (count < 2) {
          prizes.push(`₦${prize}`);
          prizeCounts[prize] = count + 1;
        }
      }
    }

    // Shuffle the prizes array
    prizes.sort(() => Math.random() - 0.5);
  
    return prizes;
  };

  const [prizes, setPrizes] = useState(generateRandomPrizes());
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedPrizes, setRevealedPrizes] = useState<string[]>([]);
  const [winningPrize, setWinningPrize] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameId, setGameId] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  const handleReveal = (prize: string) => {
    setRevealedPrizes((prevRevealedPrizes) => {
      const newRevealedPrizes = [...prevRevealedPrizes, prize];
      console.log(revealedPrizes)

      // Count occurrences of each prize
      const prizeCounts: { [key: string]: number } = {};
      newRevealedPrizes.forEach((p) => {
        prizeCounts[p] = (prizeCounts[p] || 0) + 1;
      });

      // Check if any prize count reaches 3
      let hasWon = false;
      let winningPrizeValue = null;
      for (const [prizeValue, count] of Object.entries(prizeCounts)) {
        if (count >= 3) {
          hasWon = true;
          winningPrizeValue = prizeValue;
          break;
        }
      }

      if (hasWon && !gameEnded) {
        setWinningPrize(winningPrizeValue);
        setMessage(`You have won ${winningPrizeValue}!`);
        setGameEnded(true);
      } else if (newRevealedPrizes.length === prizes.length && !gameEnded) {
        // All cards are revealed and the player hasn't won
        setMessage("Try again!");
        setGameEnded(true);
      }

      return newRevealedPrizes;
    });
  };

  const resetGame = () => {
    setPrizes(generateRandomPrizes());
    setIsRevealed(false);
    setRevealedPrizes([]);
    setWinningPrize(null);
    setMessage("");
    setGameEnded(false);
    setShowModal(false);
    setShowConfetti(false);
    setGameId((prevGameId) => prevGameId + 1);
  };

  // Delay showing the modal by 1 seconds when the game ends
  useEffect(() => {
    if (gameEnded) {
      const timer = setTimeout(() => {
        setShowModal(true);
        if (winningPrize) {
          setShowConfetti(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameEnded]);

  return (
    <div className="">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      <header className="text-light mx-1 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-bottom bg-no-repeat bg-cover py-8">
        <div className="container mx-auto relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-2/5 max-md:px-4">
            Scratch, Win, and Celebrate!
          </h1>
        </div>
      </header>

      <div
        className="container mx-auto flex flex-col sm:flex-row justify-evenly mt-5 gap-5 relative"
        ref={containerRef}
      >
        <div className="w-full md:w-4/5 rounded-[20px] py-4 scratch-bg max-md:px-4 relative">
          <p className="text-light font-bold text-center font-anaheim tracking-wide">
            Match 3 identical prize amounts to win.
          </p>
          <div>
            <div className="grid grid-cols-3 gap-4 max-w-[701px] mx-auto bg-gradient-to-b px-5 py-4 rounded-[28px] place-items-center">
              {prizes.map((prize, index) => (
                <div
                  key={`${gameId}-${index}`}
                  className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                >
                  <ScratchCard
                    image="/images/glitters.svg"
                    brushSize={15}
                    prize={prize}
                    isRevealed={isRevealed}
                    onReveal={handleReveal}
                  />
                </div>
              ))}
            </div>

            {/* Overlay Message */}
            {showModal && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500">
                <div className="text-center text-white p-4 bg-gray-800 bg-opacity-90 rounded-lg">
                  <h2 className="text-2xl font-bold mb-2">{message}</h2>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="max-md:hidden">
            <WinnerList />
          </div>
          <button
            onClick={() => {
              if (gameEnded) {
                resetGame(); // Reset the game
              } else {
                setIsRevealed(true); // Reveal the prizes
              }
            }}
            className="bg-[#87131B] w-max mx-auto text-light py-3 px-8 my-8 text-sm md:text-base font-semibold rounded-lg flex self-center justify-center"
          >
            {gameEnded ? "Play Again" : "Reveal Prizes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScratchGame;

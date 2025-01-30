import React, { useState, useRef, useEffect } from "react";
// import WinnerList from "../components/WinnersList";
import ScratchCard from "../components/ScratchArea";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
// import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchUserScratchValue,
  updateUserScratchValue,
  // getWinningPrize,
} from "../redux/slices/scratchSlice/action";


const ScratchGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    scratches: { data: scratchValue },
    prize: { data: winningPrice },
  } = useAppSelector((state) => state.scratches);
  const generateRandomPrizes = async () => {
    const possiblePrizes = [100, 200, 500, 1000, 2000, 5000];
    const prizeCounts: { [key: string]: number } = {};
    const prizes: string[] = [];

    // const winningPrize = winningPrice[0].priceValue;

    if (winningPrice?.length > 0) {
      // Winning game logic
      // Add the winning prize three times to the prizes array
      for (let i = 0; i < 3; i++) {
        prizes.push(`₦${winningPrice[0].priceValue}`);
        prizeCounts[winningPrice[0].priceValue] = (prizeCounts[winningPrice[0].priceValue] || 0) + 1;
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

    console.log({prizes}, 'prizes')

    return prizes;
  };

  const [prizes, setPrizes] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedPrizes, setRevealedPrizes] = useState<string[]>([]);
  const [winningPrize, setWinningPrize] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameId, setGameId] = useState(0);
  // const [userScratches, setUserScratches] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const storedScratchValue = sessionStorage.getItem("scratchValue");
  
    if (storedScratchValue !== null) {
      dispatch(fetchUserScratchValue());
    } else {
      sessionStorage.setItem("scratchValue", scratchValue?.toString() || "0");
    }
  }, []);

  useEffect(() => {
    if (scratchValue !== undefined) {
      sessionStorage.setItem("scratchValue", scratchValue.toString());
    }
  }, [scratchValue]);
  
  

  useEffect(() => {
    const initializeGame = async () => {
      if ((scratchValue ?? 0) > 0) {
        const generatedPrizes = await generateRandomPrizes();
        setPrizes(generatedPrizes);
      } else {
        setMessage("You have 0 scratches left! To scratch more, text PLAY to 20444.");
        setShowModal(true);
      }
    };
    if (scratchValue !== undefined) initializeGame();
  }, [scratchValue, winningPrice]);

  const handleReveal = (prize: string) => {
    if (!isRevealed) {
      // Deduct one scratch only when revealing for the first time
      const updatedScratchValue = Math.max((scratchValue ?? 0) - 1, 0);
      
      // Update state and sessionStorage
      dispatch(updateUserScratchValue({ newScratchValue: updatedScratchValue }));
      sessionStorage.setItem("scratchValue", updatedScratchValue.toString());
    }
  
    // Continue with revealing the prize
    setRevealedPrizes((prevRevealedPrizes) => [...prevRevealedPrizes, prize]);
  };

  const resetGame = () => {
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

      {/* <header className="text-light mx-1 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-bottom bg-no-repeat bg-cover py-8">
        <div className="container mx-auto relative">
          <h1 className="text-4xl w-4/5 max-md:px-4">
            Scratch, Win, and Celebrate!
          </h1>
        </div>
      </header> */}

      <div
        className="container mx-auto flex flex-col md:flex-row justify-evenly mt-5 gap-5 relative"
        ref={containerRef}
      >
        <div className="w-full md:w-4/5 rounded-[20px] py-4 scratch-bg max-md:px-4 relative">
          <p className="text-light font-bold text-center font-anaheim tracking-wide">
            Match 3 identical prize amounts to win.{" "}
          </p>
          <p className="text-light font-bold text-center font-anaheim tracking-wide">
            Number of Scratches: {scratchValue}
          </p>

          <div>
            <div className="grid grid-cols-3 gap-2 max-w-[701px] mx-auto bg-gradient-to-b px-5 py-4 rounded-[28px] place-items-center">
              {prizes.map((prize, index) => (
                <div
                  key={`${gameId}-${index}`}
                  className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[200px] lg:h-[200px]"
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
          {/* <div className="max-md:hidden">
            <WinnerList />
          </div> */}

          <button
            onClick={() => {
              if (gameEnded) {
                resetGame(); // Reset the game
              } else if (scratchValue !== undefined && scratchValue > 0) {
                setIsRevealed(true); // Reveal the prizes
              } else if (scratchValue !== undefined && scratchValue === 0) {
                setMessage(
                  "You have 0 scratches left! To scratch more, text PLAY to 20444."
                );
                setShowModal(true);
              }
            }}
            className="bg-[#87131B] w-max mx-auto text-light py-3 px-8 text-sm my-2 mb-4 md:text-base font-semibold rounded-lg flex self-center justify-center"
          >
            {gameEnded ? "Play Again" : "Reveal Prizes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScratchGame;

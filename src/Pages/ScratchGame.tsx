import React, { useState, useRef, useEffect } from "react";
import WinnersList from "../components/WinnersList";
import ScratchCard from "../components/ScratchArea";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import axios from "axios";

const ScratchGame: React.FC = () => {
  const [prizes, setPrizes] = useState<string[]>(Array(9).fill(""));
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [scratchMessage, setScratchMessage] = useState("You Have 0 scratches left");
  const [scratchValue, setScratchValue] = useState<number>(0);
  const [hasPlayed, setHasPlayed] = useState(false); // Prevent multiple plays
  const [scratchCount, setScratchCount] = useState(0); // Track number of scratches

  // Fetch scratch data from the API
  const fetchScratchData = async () => {
    const token = sessionStorage.getItem("token");
    const msisdn = sessionStorage.getItem("msisdn");

    if (!token || !msisdn) {
      setScratchMessage("Invalid session. Please login again.");
      // setScratchValue(-1);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.valucid.com/api/v1/users/${msisdn}/check-scratch`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setScratchMessage(response.data.msg);
      setScratchValue(response.data.scratchValue);
      if (response.data.scratchValue > -1) {
        setPrizes(Array(9).fill(""));
      }
    } catch (err) {
      console.error("Failed to fetch scratch data", err);
      setScratchMessage("I don't know how many scratches you have at the moment.");
    }
  };

  // Play the scratch game
  const playScratchGame = async () => {
    setHasPlayed(true); // Set flag to indicate the game has been played

    if (scratchValue <= -1) {
      setMessage("You have 0 scratches left! To scratch more text, text PLAY to 20444.");
      setShowModal(true);
      setHasPlayed(false); // Reset flag to allow retry after showing modal
      return;
    }

    setLoading(true);
    const token = sessionStorage.getItem("token");
    const msisdn = sessionStorage.getItem("msisdn");

    if (!token || !msisdn) {
      setScratchMessage("Invalid session. Please login again.");
      setScratchValue(-1);
      setLoading(false);
      setHasPlayed(false); // Reset flag
      return;
    }

    try {
      const response = await axios.get(
        `https://api.valucid.com/api/v1/users/${msisdn}/play`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.data.status === 400) {
        setMessage(response.data.msg);
        setShowModal(true);
        setHasPlayed(false); // Reset flag
      } else if (response.data.status === 200) {
        if (response.data.prize.length > 0) {
          const prizeDetails = response.data.prize[0];
          const winningPrize = `₦${prizeDetails.prizeValue}`;
          const updatedPrizes = generatePrizesWithWin(winningPrize);
          setPrizes(updatedPrizes);
          setMessage(`Congratulations! You have won ${winningPrize} ${prizeDetails.prizeCategory}`);
          setShowConfetti(true);
          setGameEnded(true); // Mark game as ended
        } else {
          const randomPrizes = generateRandomPrizesNoMatch();
          setPrizes(randomPrizes);
          setMessage(response.data.msg);
          setGameEnded(true); // Mark game as ended
        }
        setShowModal(true);
        fetchScratchData(); // Refresh scratch data after playing
      }
    } catch (err) {
      console.error("Failed to play scratch game", err);
      setMessage("An error occurred. Please try again.");
      setShowModal(true);
      setHasPlayed(false); // Reset flag
    } finally {
      setLoading(false);
    }
  };

  // Generate prizes with the winning prize appearing exactly 3 times
  const generatePrizesWithWin = (winningPrize: string) => {
    const otherPrizes = generateRandomPrizesNoMatch().filter(prize => prize !== winningPrize);
    const selectedOtherPrizes = otherPrizes.slice(0, 6); // Ensure only 6 other prizes
    const updatedPrizes = [winningPrize, winningPrize, winningPrize, ...selectedOtherPrizes];
    return updatedPrizes.sort(() => Math.random() - 0.5);
  };

  // Generate random prizes ensuring no prize appears more than twice
  const generateRandomPrizesNoMatch = () => {
    const possiblePrizes = [100, 200, 500, 1000, 2000, 5000];
    const prizeCounts: { [key: string]: number } = {};
    const prizes: string[] = [];

    while (prizes.length < 9) {
      const randomIndex = Math.floor(Math.random() * possiblePrizes.length);
      const prize = possiblePrizes[randomIndex];
      const count = prizeCounts[prize] || 0;
      if (count < 2) { // Limit to 2 occurrences per prize
        prizes.push(`₦${prize}`);
        prizeCounts[prize] = count + 1;
      }
    }

    return prizes.sort(() => Math.random() - 0.5);
  };

  // Fetch scratch data on component mount
  useEffect(() => {
    fetchScratchData();
  }, []);

  // Automatically reveal prizes after 3 scratches
  useEffect(() => {
    if (scratchCount === 3 && hasPlayed) {
      setIsRevealed(true);
    }
  }, [scratchCount, hasPlayed]);

  // Reset the game to initial state
  const resetGame = async () => {
    await fetchScratchData();
    setPrizes(Array(9).fill("")); // Reset to covered state
    setIsRevealed(false);
    setMessage("");
    setGameEnded(false);
    setShowModal(false);
    setShowConfetti(false);
    setGameId((prevGameId) => prevGameId + 1);
    setHasPlayed(false); // Reset play flag
    setScratchCount(0); // Reset scratch count
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    if (gameEnded) {
      setIsRevealed(false); // Allow user to play again
    }
  };

  // Handle card reveal
  const handleReveal = () => {
    if (scratchCount < 3) {
      if (scratchCount === 0 && !hasPlayed && !gameEnded) {
        playScratchGame();
      }
      setScratchCount((prev) => prev + 1);
    }
  };

  return (
    <div className="">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      {loading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="status"
          aria-live="polite"
        >
          <p className="text-white text-lg">Loading...</p>
        </div>
      )}

      <div
        className="container mx-auto flex flex-col md:flex-row justify-evenly mt-5 gap-5 relative"
        ref={containerRef}
      >
        <div className="w-full md:w-4/5 rounded-[20px] py-4 scratch-bg max-md:px-4 relative">
          <p className="text-light font-bold text-center font-anaheim tracking-wide">
            Match 3 identical prize amounts to win.
          </p>
          <p className="text-light text-sm text-center font-anaheim tracking-wide">
            {scratchMessage}
          </p>
          <div>
            <div className="grid grid-cols-3 gap-2 max-w-[701px] mx-auto bg-gradient-to-b px-5 py-4 rounded-[28px] place-items-center">
              {prizes.map((prize, index) => (
                <div
                  key={`${gameId}-${index}`}
                  className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[200px] lg:h-[200px}"
                >
                  <ScratchCard
                    image="/images/glitters.svg"
                    brushSize={15}
                    prize={prize}
                    isRevealed={isRevealed}
                    onReveal={handleReveal}
                    aria-label={`Scratch card ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Overlay Message */}
            {showModal && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <div className="text-center text-white p-6 bg-gray-800 bg-opacity-90 rounded-lg relative max-w-md mx-auto">
                  <h2 id="modal-title" className="text-2xl font-bold mb-4">
                    {message}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-white text-xl font-bold"
                    aria-label="Close Modal"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="max-md:hidden">
            <WinnersList />
          </div>
          <button
            onClick={() => {
              if (gameEnded) {
                resetGame(); // Reset the game
              } else if (scratchCount === 3) {
                setIsRevealed(true); // Reveal the prizes if 3 scratches made
              }
            }}
            className="bg-[#87131B] w-max mx-auto text-light py-3 px-8 text-sm my-2 mb-4 md:text-base font-semibold rounded-lg flex self-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-50"
            aria-pressed={gameEnded}
            disabled={scratchCount < 3 && !gameEnded} // Disable if not ready to reveal
          >
            {gameEnded ? "Play Again" : "Reveal Prizes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScratchGame;

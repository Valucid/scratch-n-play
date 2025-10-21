import React, { useState, useRef, useEffect } from "react";
// import WinnerList from "../components/WinnersList";
import ScratchCard from "../components/ScratchArea";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
// import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchUserScratchValue,
  getWinningPrize,
  updateUserScratchValue,
  getPrizeList,
  createWinners,
  // getWinningPrize,
} from "../redux/slices/scratchSlice/action";
import Preloader from "../components/Preloader";

const ScratchGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    scratches: { data: scratchValue },
    prize: { data: winningPrice, loading: prizeLoading },
    prizeList: { data: prizeList, loading: prizeListLoading },
  } = useAppSelector((state) => state.scratches);

   const [prizes, setPrizes] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [_, setRevealedPrizes] = useState<string[]>([]);
  const [__, setWinningPrize] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameId, setGameId] = useState(0);
  // const [userScratches, setUserScratches] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([
      dispatch(fetchUserScratchValue()),
      dispatch(getWinningPrize()),
      dispatch(getPrizeList()),
    ])
    // dispatch(getWinningPrize());
  }, []);

 const generateRandomPrizes = (prizesList: string[], winningPrice: string) => {
  const winningPrize = prizesList.find((prize) => prize.includes(winningPrice));
  const randomPrizes: string[] = [];

  if (winningPrize) {
    // Add the winning prize exactly 3 times
    for (let i = 0; i < 3; i++) {
      randomPrizes.push(`₦${winningPrize}`);
    }

    // Filter out the winning prize from the rest of the pool
    const otherPrizes = prizesList.filter((prize) => prize !== winningPrize);

    // Fill the rest with random prizes excluding the winning prize
    while (randomPrizes.length < 9) {
      const randomPrize = otherPrizes[Math.floor(Math.random() * otherPrizes.length)];
      randomPrizes.push(`₦${randomPrize}`);
    }

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = randomPrizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPrizes[i], randomPrizes[j]] = [randomPrizes[j], randomPrizes[i]];
    }
  }

  return randomPrizes;
};


useEffect(() => {
  if (!prizeLoading && !prizeListLoading && prizeList?.length && winningPrice) {
    const randomPrizes = generateRandomPrizes(
      prizeList.map((item: any) => item.prizeValue),
      winningPrice
    );

    // Rearrange prizes to make sure the winning combination appears together

    setPrizes(randomPrizes);
  }
}, [prizeLoading, prizeListLoading, prizeList, winningPrice]);


//use effect when scratchValue is 0
useEffect(() => {
  if (scratchValue && scratchValue === 0) {
    setMessage(
      "You have 0 scratches left! To scratch more, text PLAY to 20444."
    );
    setShowModal(true);
  }
}, [scratchValue]);

type Prize = string; // e.g., "₦1000", "₦5000", etc.

const resetGame = () => {
  setIsRevealed(false);
  setRevealedPrizes([]);
  setWinningPrize(null);
  setMessage("");
  setGameEnded(false);
  setShowModal(false);
  setShowConfetti(false);
  setRevealedIndexes([]); // Reset revealed indexes

  // --- Rearrange the prizes here ---
  const winningPrize = prizes.find((p: Prize, _: number, arr: Prize[]) =>
    arr.filter((x: Prize) => x === p).length >= 3
  );

  let newPrizes: Prize[] = [];

  if (winningPrize) {
    // Pick 3 random unique indexes for the winning prize
    const randomIndexes = Array.from({ length: 9 }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Create a new array with 3 winning prizes placed randomly
    newPrizes = Array(9).fill(null) as Prize[];
    randomIndexes.forEach((i) => {
      newPrizes[i] = winningPrize;
    });

    // Fill remaining slots with random prizes (non-winning)
    const otherPrizes = prizeList
      .map((p: any) => `₦${p.prizeValue}`)
      .filter((p: Prize) => p !== winningPrize);

    for (let i = 0; i < 9; i++) {
      if (!newPrizes[i]) {
        newPrizes[i] =
          otherPrizes[Math.floor(Math.random() * otherPrizes.length)];
      }
    }
  } else {
    // If no previous win, just randomize all prizes
    newPrizes = [...prizes].sort(() => Math.random() - 0.5);
  }

  // Update prizes for the new game round
  setPrizes(newPrizes);

  // Force re-render of ScratchCards
  setGameId((prevGameId) => prevGameId + 1);
};


 const handleReveal = (prize: string, index: number) => {
    if (revealedIndexes.includes(index)) return; // Prevent duplicate reveals

    setRevealedIndexes((prevIndexes) => [...prevIndexes, index]); // Track revealed index

    if (!isRevealed) {
      // Deduct one scratch only when revealing for the first time
      const updatedScratchValue = Math.max((scratchValue ?? 0) - 1, 0);
      dispatch(
        updateUserScratchValue({ newScratchValue: updatedScratchValue })
      );
      sessionStorage.setItem("scratchValue", updatedScratchValue.toString());
    }

    setRevealedPrizes((prevRevealedPrizes) => {
      const newRevealedPrizes = [...prevRevealedPrizes, prize];

      // Count occurrences of each prize
      const prizeCounts: { [key: string]: number } = {};
      newRevealedPrizes.forEach((p) => {
        if (p) prizeCounts[p] = (prizeCounts[p] || 0) + 1;
      });

      // Check if any prize count reaches 3
      let hasWon = false;
      let winningPrizeValue: string | null = null;
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
        setShowModal(true);
        setGameEnded(true);
        setShowConfetti(true);

        // rearrange prizes here

        // Optionally, you can dispatch an action to create a winner record
        winningPrizeValue?.replace("₦", "");

        // get winning prize from prizeList
        const winningPrizeData = prizeList.find(
          (item: any) => item.prizeValue === winningPrizeValue?.replace("₦", "")
        );

        dispatch(createWinners({
          prize: winningPrizeData.prize,
          prizeCategory: winningPrizeData.prizeCategory,
          winningDate: new Date().toISOString(),
          prizeValue: winningPrizeData.prizeValue,
        }))


      } else if (newRevealedPrizes.length === prizes.length && !gameEnded) {
        setMessage("Try again!");
        setShowModal(true);
        setGameEnded(true);
      }

      return newRevealedPrizes;
    });
  };

  return (
    <div className="">
      <>
        {prizeLoading === true && prizeListLoading === true ? (
          <Preloader />
        ) : (
          <>
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
                          scratchValue={scratchValue as number}
                          brushSize={15}
                          prize={prize}
                          isRevealed={revealedIndexes.includes(index)}
                          onReveal={() => handleReveal(prize, index)}
                          index={index}
                          gameEnd={gameEnded}
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
                      setTimeout(() => resetGame(), 3000);
                      return;
                    }

                    if (scratchValue !== undefined && scratchValue > 0) {
                      setIsRevealed(true); // Reveal all cards
                      const allIndexes = prizes.map((_, i) => i);
                      setRevealedIndexes(allIndexes);
                      setRevealedPrizes(prizes);
                      const boxesScratched = 9 - revealedIndexes.length;

                      // Deduct scratches for full reveal (e.g. 9 at once)
                      const updatedScratchValue = Math.max(
                        (scratchValue ?? 0) - boxesScratched,
                        0
                      );

                      // console.log({updatedScratchValue}, 'updated scratch value')
                      dispatch(
                        updateUserScratchValue({
                          newScratchValue: updatedScratchValue,
                        })
                      );
                      sessionStorage.setItem(
                        "scratchValue",
                        updatedScratchValue.toString()
                      );

                      // Check if there's a winner immediately
                      const prizeCounts: { [key: string]: number } = {};
                      for (const prize of prizes) {
                        prizeCounts[prize] = (prizeCounts[prize] || 0) + 1;
                      }

                      let winner = null;
                      for (const [prize, count] of Object.entries(
                        prizeCounts
                      )) {
                        if (count >= 3) {
                          winner = prize;
                          break;
                        }
                      }

                      if (winner) {
                        setWinningPrize(winner);
                        setMessage(`You have won ${winner}!`);
                        setShowConfetti(true);
                      } else {
                        setMessage("Try again!");
                      }

                      setGameEnded(true);
                      setTimeout(() => {
                        resetGame();
                      }, 3000);

                      return;
                    }

                    if (scratchValue !== undefined && scratchValue === 0) {
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
          </>
        )}
      </>
    </div>
  );
};

export default ScratchGame;

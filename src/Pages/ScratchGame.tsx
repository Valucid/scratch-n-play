import React, { useState, useRef, useEffect, useCallback } from "react";
import ScratchCard from "../components/ScratchArea";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchUserScratchValue,
  getWinningPrize,
  updateUserScratchValue,
  getPrizeList,
  createWinners,
  getWinnersList,
  getGeneratedPrizeList,
} from "../redux/slices/scratchSlice/action";
import Preloader from "../components/Preloader";

const ScratchGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    scratches: { data: scratchValue },
    prize: { data: winningPrice, loading: prizeLoading },
    prizeList: { data: prizeList = [], loading: prizeListLoading },
    // winnersList: { data: winnersValue },
    generatedPrizes: { data: generatedPrizeList },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([
      dispatch(fetchUserScratchValue()),
      dispatch(getWinningPrize()),
      dispatch(getPrizeList()),
    ]);
  }, [dispatch]);

  // const generatePrizes = () => {
  //   const list = prizeList.map((item: any) => item.prizeValue);
  //   return winnersValue?.isTwentywinners
  //     ? generateRandomPrizes2(list)
  //     : generateRandomPrizes(list, winningPrice);
  // }

  useEffect(() => {
    if (
      !prizeLoading &&
      !prizeListLoading &&
      prizeList?.length &&
      winningPrice
    ) {
      const list = prizeList.map((item: any) => item.prizeValue);
      dispatch(getGeneratedPrizeList({ prizeList: list, winningPrice }));

      setPrizes(generatedPrizeList as string[]);
    }
  }, [
    prizeLoading,
    prizeListLoading,
    prizeList,
    winningPrice,
    // winnersValue?.isTwentywinners,
  ]);

  useEffect(() => {
    if (scratchValue === 0) {
      setMessage(
        "You have 0 scratches left! To scratch more, text PLAY to 20444."
      );
      setShowModal(true);
    }
  }, [scratchValue]);

  useEffect(() => {
    dispatch(getWinnersList());
  }, [dispatch]);

  useEffect(() => {
    if (
      generatedPrizeList &&
      Array.isArray(generatedPrizeList) &&
      generatedPrizeList.length > 0
    ) {
      setPrizes(generatedPrizeList);
    }
  }, [generatedPrizeList]);

  const resetGame = useCallback(() => {
    setIsRevealed(false);
    setRevealedPrizes([]);
    setWinningPrize(null);
    setMessage("");
    setGameEnded(false);
    setShowModal(false);
    setShowConfetti(false);
    setRevealedIndexes([]);
    setGameId((prevGameId) => prevGameId + 1);

    if (prizeList.length && winningPrice) {
      console.log('if statement')
      const list = prizeList.map((item: any) => item.prizeValue);
      dispatch(getGeneratedPrizeList({ prizeList: list, winningPrice }));
    }
  }, [dispatch, prizeList, winningPrice]);


  const handleReveal = (prize: string, index: number) => {
    if (revealedIndexes.includes(index)) return;

    setRevealedIndexes((prev) => [...prev, index]);

    if (!isRevealed) {
      const updatedScratchValue = Math.max((scratchValue ?? 0) - 1, 0);
      dispatch(
        updateUserScratchValue({ newScratchValue: updatedScratchValue })
      );
      sessionStorage.setItem("scratchValue", updatedScratchValue.toString());
    }

    setRevealedPrizes((prevRevealedPrizes) => {
      const newRevealedPrizes = [...prevRevealedPrizes, prize];
      const prizeCounts: Record<string, number> = {};

      newRevealedPrizes.forEach((p) => {
        prizeCounts[p] = (prizeCounts[p] || 0) + 1;
      });

      let winner: string | null = null;
      for (const [p, count] of Object.entries(prizeCounts)) {
        if (count >= 3) {
          winner = p;
          break;
        }
      }

      if (winner && !gameEnded) {
        setWinningPrize(winner);
        setShowModal(true);
        setGameEnded(true);
        setShowConfetti(true);

        const winningPrizeData = prizeList.find(
          (item: any) => item.prizeValue === winner.replace("₦", "")
        );

        setMessage(`You have won ${winningPrizeData.prizeCategory} ${winner}!`);

        if (winningPrizeData) {
          dispatch(
            createWinners({
              prize: winningPrizeData.prize,
              prizeCategory: winningPrizeData.prizeCategory,
              winningDate: new Date().toISOString(),
              prizeValue: winningPrizeData.prizeValue,
            })
          );
        }
      } else if (newRevealedPrizes.length === prizes.length && !gameEnded) {
        setMessage("Try again!");
        setShowModal(true);
        setGameEnded(true);
      }

      return newRevealedPrizes;
    });
  };

  return (
    <div>
      {prizeLoading && prizeListLoading ? (
        <Preloader />
      ) : (
        <>
          {showConfetti && (
            <Confetti width={width} height={height} recycle={false} />
          )}

          <div
            className="container mx-auto flex flex-col md:flex-row justify-evenly mt-5 gap-5 relative"
            ref={containerRef}
          >
            <div className="w-full md:w-4/5 rounded-[20px] py-4 scratch-bg max-md:px-4 relative">
              <p className="text-light font-bold text-center font-anaheim tracking-wide">
                Match 3 identical prize amounts to win.
              </p>
              <p className="text-light font-bold text-center font-anaheim tracking-wide">
                Number of Scratches: {scratchValue}
              </p>

              <div>
                <div className="grid grid-cols-3 gap-2 max-w-[701px] mx-auto bg-gradient-to-b px-5 py-4 rounded-[28px] place-items-center">
                  {prizes &&
                    prizes?.map((prize, index) => (
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
              <button
                onClick={() => {
                  if (gameEnded) {
                    setTimeout(() => resetGame(), 3000);
                    return;
                  }

                  if (scratchValue && scratchValue > 0) {
                    setIsRevealed(true);
                    const allIndexes = prizes.map((_, i) => i);
                    setRevealedIndexes(allIndexes);
                    setRevealedPrizes(prizes);
                    const boxesScratched = 9 - revealedIndexes.length;

                    const updatedScratchValue = Math.max(
                      (scratchValue ?? 0) - boxesScratched,
                      0
                    );

                    dispatch(
                      updateUserScratchValue({
                        newScratchValue: updatedScratchValue,
                      })
                    );
                    sessionStorage.setItem(
                      "scratchValue",
                      updatedScratchValue.toString()
                    );

                    const prizeCounts: Record<string, number> = {};
                    for (const prize of prizes) {
                      prizeCounts[prize] = (prizeCounts[prize] || 0) + 1;
                    }

                    let winner = null;
                    for (const [prize, count] of Object.entries(prizeCounts)) {
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
                    setTimeout(() => resetGame(), 3000);
                    return;
                  }

                  if (scratchValue === 0) {
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
    </div>
  );
};

export default ScratchGame;

import React, { useState } from "react";
import WinnerList from "../components/WinnersList";
import ScratchCard from "../components/ScratchArea";

const ScratchGame: React.FC = () => {
  const initialPrizes = [
    "₦5000",
    "₦1000",
    "₦2000",
    "₦500",
    "₦5000",
    "₦100",
    "₦5000",
    "₦1000",
    "₦200",
  ];
  const [prizes, setPrizes] = useState(initialPrizes);
  const [isRevealed, setIsRevealed] = useState(false);
  //const scratchCardSize = 100;

  // Function to reset the game
  const resetGame = () => {
    setIsRevealed(false);
    // Optionally, shuffle or reset prizes here
    setPrizes([...initialPrizes]); // Reset to initial prizes
  };

  return (
    <div className="">
      <header className="text-light mx-1 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-bottom bg-no-repeat bg-cover py-8">
        <div className="container mx-auto relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-2/5">
            Scratch, Win, and Celebrate!
          </h1>
        </div>
      </header>

      <div className="container mx-auto flex flex-col sm:flex-row justify-evenly mt-5 gap-5">
        <div className="w-full md:w-4/5 rounded-[20px] py-4 scratch-bg">
          <p className="text-light font-bold text-center font-anaheim tracking-wide">
            Match 3 Identical prize amount to win NGN5000.
          </p>
          <div className="">
            <div className="grid grid-cols-3 gap-4  max-w-[701px] mx-auto bg-gradient-to-b  px-5 py-4 rounded-[28px] place-items-center">

              {prizes.map((prize, index) => (
                <div  key={index}
                className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
                  <ScratchCard
                    key={index}
                    image="/images/glitters.svg"
                    brushSize={15}
                    prize={prize}
                    isRevealed={isRevealed}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="max-md:hidden">
            <WinnerList />
          </div>
          <button
            onClick={() => {
              if (isRevealed) {
                resetGame(); // Reset the game
              } else {
                setIsRevealed(true); // Reveal the prizes
              }
            }}
            className="bg-[#87131B] w-max mx-auto text-light py-3 px-8 my-8 text-sm md:text-base font-semibold rounded-lg flex self-center justify-center"
          >
            {isRevealed ? "Play Again" : "Reveal Prizes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScratchGame;

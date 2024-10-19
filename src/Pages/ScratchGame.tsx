import React, { useState } from 'react';
import WinnerList from '../components/WinnersList';
import ScratchArea from '../components/ScratchArea';
import ScratchCard from '../components/ScratchArea';


const ScratchGame: React.FC = () => {
  const prizes = ['₦5000', '₦1000', '₦2000', '₦500', '₦5000', '₦100', '₦5000', '₦1000', '₦200'];
  // const [currentPrize, setPrize] = useState("");


  return (
    <div className="">
      <header className="text-light mx-1 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-bottom bg-no-repeat bg-cover py-8">
        <div className="container mx-auto relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-2/5">Scratch, Win, and Celebrate!</h1>
        </div>
      </header>
      <div className="App">
      <ScratchCard
        width={500}
        height={500}
        image="https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.813xw:0.721xh;0.0994xw,0.128xh&resize=1200:*"
        brushSize={60}
      />
    </div>
      <div className="container mx-auto flex justify-evenly mt-5 gap-5">
        <div className='w-full md:w-4/5 rounded-[20px] py-4 scratch-bg'>
          <p className='text-light font-bold text-center font-anaheim tracking-wide'>
            Match 3 Identical prize amount to win NGN5000.
          </p>
          <div className=''>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 max-w-[701px] mx-auto bg-gradient-to-b from-[#D6EDFF] via-[#630A0D] to-[#CC9C02] px-5 py-4 rounded-[28px] place-items-center">
              {prizes.map((prize, index) => (
                // <ScratchArea key={index} prize={prize} setPrize={setPrize}/>
                <ScratchCard
                key={index}
                width={200}
                height={200}
                image="https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.813xw:0.721xh;0.0994xw,0.128xh&resize=1200:*"
                brushSize={30}
                prize={prize}
              />
              ))}
            </div>
          </div>
        </div>

        <div className='max-md:hidden'>
          <WinnerList />
        </div>
      </div>
    </div>
  );
};

export default ScratchGame;

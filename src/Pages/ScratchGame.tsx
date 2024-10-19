import React from 'react';
import WinnerList from '../components/WinnersList';
import ScratchCard from '../components/ScratchArea';
// import { useMediaQuery } from 'react-responsive';


const ScratchGame: React.FC = () => {
  const prizes = ['₦5000', '₦1000', '₦2000', '₦500', '₦5000', '₦100', '₦5000', '₦1000', '₦200'];
  // const [currentPrize, setPrize] = useState("");
  // const isMobile = useMediaQuery({ query: '(max-width: 767.99px)' });
  // const scratchCardSize = isMobile ? 100 : 200;
  const scratchCardSize = 200;


  return (
    <div className="">
      <header className="text-light mx-1 rounded-[20px] bg-[url(/images/header-bg.svg)] bg-bottom bg-no-repeat bg-cover py-8">
        <div className="container mx-auto relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-2/5">Scratch, Win, and Celebrate!</h1>
        </div>
      </header>

      <div className="container mx-auto flex flex-col sm:flex-row justify-evenly mt-5 gap-5">
        <div className='w-full md:w-4/5 rounded-[20px] py-4 scratch-bg'>
          <p className='text-light font-bold text-center font-anaheim tracking-wide'>
            Match 3 Identical prize amount to win NGN5000.
          </p>
          <div className=''>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 max-w-[701px] mx-auto bg-gradient-to-b  px-5 py-4 rounded-[28px] place-items-center">
              {prizes.map((prize, index) => (
                <ScratchCard
                  key={index}
                  width={scratchCardSize}
                  height={scratchCardSize}
                  image="public/images/glitters.svg"
                  brushSize={15}
                  prize={prize}
                />
              ))}

            </div>
          </div>
        </div>
        <div>

          <div className='max-md:hidden'>
            <WinnerList />
          </div>
          <button className="bg-[#87131B] text-light py-3 px-8 mt-8 text-sm md:text-base font-semibold rounded-lg flex self-center justify-center">
          Reveal Prizes
          </button>
        </div>

      </div>
    </div>
  );
};

export default ScratchGame;

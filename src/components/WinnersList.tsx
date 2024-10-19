import React from 'react';
import { winners } from '../data';


const WinnerList: React.FC = () => {
  return (
    <div className="bg-dark p-4 rounded-3xl w-72  shadow-md space-y-3">
      {winners.map((winner) => (
        <div key={winner.id} className="flex items-center bg-[#F8F8F8] text-[#405E80] p-3 rounded-xl gap-2 text-[10px] md:text-xs">
          <div className="bg-[#D9D9D9] rounded-full h-10 w-10"></div>
          <div className='flex gap-1'>
            <p className="">{winner.name} just won</p>
            <p className="font-bold">{winner.prize}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnerList;

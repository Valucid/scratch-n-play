import React from 'react';
import Header from '../components/Header';
import HowToPlay from '../components/HowToPlay';
import PlayerReviews from '../components/PlayerReviews';
import WhyScratchHere from '../components/WhyScratchHere';
import Faq from '../components/Faq';
import GetStarted from '../components/GetStarted';


const Home: React.FC = () => {
  return (
    <div className="">
        <Header />
        <HowToPlay />
        <PlayerReviews />
        <WhyScratchHere />
        <Faq />
        <GetStarted />
      </div>

  );
};

export default Home;

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GameBoard from './components/GameBoard';
import GameRulesModal from './components/GameRulesModal';
import SoundButton from './components/SoundButton';

const MainComponent = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  return (
    <>
      <GameRulesModal />
      <SoundButton isSoundOn={ isSoundOn } setIsSoundOn={ setIsSoundOn } />
      <GameBoard isSoundOn={ isSoundOn } />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>,
);

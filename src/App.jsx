import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameRulesModal from './components/GameRulesModal';
import SoundButton from './components/SoundButton';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
    const [isSoundOn, setIsSoundOn] = useState(true);

    return (
        <>
            <header className="game-header">
                <GameRulesModal />
                <ScoreBoard />
                <SoundButton isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} />
            </header>
            <GameBoard isSoundOn={isSoundOn} />
        </>
    );
};

export default App;

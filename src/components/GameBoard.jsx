import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { useGame } from '../hooks/useGame';
import Card from './Card';
import '../styles/styles.css';

const LoadingSpinner = () => (
    <div className="loading-container">
        <div className="spinner" role="status">
            <span className="sr-only">Loading Pokémon...</span>
        </div>
        <p>Loading Pokémon...</p>
    </div>
);

const ErrorMessage = ({ message, onRetry }) => (
    <div className="error-container" role="alert">
        <h2>Oops! Something went wrong</h2>
        <p>{message}</p>
        <button onClick={onRetry} className="retry-button">
            Try Again
        </button>
    </div>
);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
};

const GameBoard = ({ isSoundOn }) => {
    const {
        cards,
        currentScore,
        bestScore,
        showConfetti,
        status,
        error,
        handleCardClick,
        resetGame,
    } = useGame(isSoundOn);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('scoreUpdate', { 
            detail: { currentScore, bestScore } 
        }));
    }, [currentScore, bestScore]);

    const scrollPositionRef = useRef({ x: 0, y: 0 });
    
    useEffect(() => {
        scrollPositionRef.current = {
            x: window.scrollX,
            y: window.scrollY
        };
    });
    
    useEffect(() => {
        const restoreScroll = () => {
            window.scrollTo(scrollPositionRef.current.x, scrollPositionRef.current.y);
        };
        
        requestAnimationFrame(() => {
            requestAnimationFrame(restoreScroll);
        });
    }, [cards]);

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (status === 'error') {
        return <ErrorMessage message={error} onRetry={resetGame} />;
    }

    return (
        <>
            {showConfetti && (
                <Confetti 
                    width={window.innerWidth} 
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                />
            )}
            <div className="game-board" role="main" aria-label="Game board">
                {cards.map((card) => (
                    <Card 
                        key={card.id} 
                        onClick={handleCardClick} 
                        {...card} 
                    />
                ))}
            </div>
        </>
    );
};

GameBoard.propTypes = {
    isSoundOn: PropTypes.bool.isRequired,
};

export default GameBoard;

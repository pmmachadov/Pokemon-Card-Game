import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPokemon } from '../api/pokemonApi';
import { shuffle } from '../utils/shuffle';

const BEST_SCORE_KEY = 'pokemon_best_score';

export const useGame = (isSoundOn) => {
    const [cards, setCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const saved = localStorage.getItem(BEST_SCORE_KEY);
        return saved ? Number(saved) : 0;
    });
    const [selectedCards, setSelectedCards] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    const winSound = useRef(new Audio('/sounds/win.wav')).current;
    const loseSound = useRef(new Audio('/sounds/lose.wav')).current;

    useEffect(() => {
        localStorage.setItem(BEST_SCORE_KEY, bestScore);
    }, [bestScore]);

    useEffect(() => {
        const initializeGame = async () => {
            setStatus('loading');
            setError(null);
            
            try {
                const pokemonData = await fetchPokemon();
                
                if (pokemonData.length === 0) {
                    throw new Error('Could not load Pokémon data');
                }

                const preparedData = shuffle(pokemonData);
                setCards(preparedData);
                setStatus('success');
            } catch (err) {
                setError(err.message || 'Error loading the game');
                setStatus('error');
            }
        };

        initializeGame();
    }, []);

    const handleCardClick = useCallback((id) => {
        if (selectedCards.includes(id)) {
            if (isSoundOn) {
                loseSound.currentTime = 0;
                loseSound.play().catch((error) => {
                    console.error('Error playing lose sound:', error);
                });
            }
            
            setCurrentScore(0);
            setSelectedCards([]);
        } else {
            if (isSoundOn) {
                winSound.currentTime = 0;
                winSound.play().catch((error) => {
                    console.error('Error playing win sound:', error);
                });
            }
            
            const newScore = currentScore + 1;
            setCurrentScore(newScore);
            setSelectedCards((prev) => [...prev, id]);

            if (newScore > bestScore) {
                setBestScore(newScore);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
            }
        }

        setCards((prevCards) => {
            const updatedCards = prevCards.map((card) =>
                card.id === id ? { ...card, flipped: !card.flipped } : card
            );
            return shuffle(updatedCards);
        });
    }, [isSoundOn, currentScore, bestScore, selectedCards, winSound, loseSound]);

    const resetGame = useCallback(async () => {
        setStatus('loading');
        setCurrentScore(0);
        setSelectedCards([]);
        setShowConfetti(false);
        
        try {
            const pokemonData = await fetchPokemon();
            setCards(shuffle(pokemonData));
            setStatus('success');
        } catch (err) {
            setError(err.message || 'Error restarting the game');
            setStatus('error');
        }
    }, []);

    return {
        cards,
        currentScore,
        bestScore,
        showConfetti,
        status,
        error,
        handleCardClick,
        resetGame,
    };
};

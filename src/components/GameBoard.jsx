import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { fetchPokemon } from '../api/pokemonApi';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import '../styles/styles.css';

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const winSound = new Audio('/sounds/win.wav');
    const loseSound = new Audio('/sounds/lose.wav');

    useEffect(() => {
        const initializeGame = async () => {
            const pokemonData = await fetchPokemon();
            const preparedData = pokemonData.map((pokemon, index) => ({
                ...pokemon,
                id: index,
                flipped: false,
            }));
            setCards(prepareCards(preparedData));
        };
        initializeGame();
    }, []);

    const prepareCards = (cardsData) => {
        return shuffleCards(cardsData);
    };

    const shuffleCards = (cardsData) => {
        return cardsData.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id) => {
        if (selectedCards.includes(id)) {
            loseSound.play().catch((error) => {
                console.error("Error playing lose sound:", error);
            });
            setCurrentScore(0);
            setSelectedCards([]);
        } else {
            winSound.play().catch((error) => {
                console.error("Error playing win sound:", error);
            });
            const newScore = currentScore + 1;
            setCurrentScore(newScore);
            setSelectedCards([...selectedCards, id]);

            if (newScore > bestScore) {
                setBestScore(newScore);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
            }
        }

        setCards(cards.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
        setCards(shuffleCards([...cards]));
    };

    return (
        <>
            { showConfetti && <Confetti width={ window.innerWidth } height={ window.innerHeight } /> }
            <ScoreBoard currentScore={ currentScore } bestScore={ bestScore } />
            <div className="game-board">
                { cards.map((card) => (
                    <Card key={ card.id } onClick={ () => handleCardClick(card.id) } { ...card } />
                )) }
            </div>
        </>
    );
};

export default GameBoard;

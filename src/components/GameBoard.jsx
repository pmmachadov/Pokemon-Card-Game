import { useState, useEffect } from 'react';
import { fetchPokemon } from '../api/pokemonApi';
import Card from './Card';
import ScoreBoard from './ScoreBoard';

import '../styles/styles.css'

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);

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
            setCurrentScore(0);
            setSelectedCards([]);
        } else {
            setCurrentScore(currentScore + 1);
            setSelectedCards([...selectedCards, id]);
            if (currentScore >= bestScore) {
                setBestScore(currentScore + 1);
            }
        }
        setCards(cards.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
        setCards(shuffleCards([...cards]));
    };

    return (
        <>
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
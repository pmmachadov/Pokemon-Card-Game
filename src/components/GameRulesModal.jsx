import React, { useState } from 'react';
import '../styles/styles.css';

const GameRulesModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                onClick={ toggleModal }
                className="rules-button"
            >
                Show Game Rules
            </button>

            { isOpen && (
                <div className="modal">
                    <h2>Game Rules</h2>
                    <p>
                        1. Select a card.
                        <br />
                        2. Don't select the same card twice.
                        <br />
                        3. Match all the cards to win.
                        <br />
                        4. Have fun!
                    </p>
                    <button
                        onClick={ toggleModal }
                        className="close-button"
                    >
                        Close
                    </button>
                </div>
            ) }
        </div>
    );
};

export default GameRulesModal;

import React, { useState } from 'react';

const GameRulesModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                onClick={ toggleModal }
                style={ {
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                } }
            >
                Show Game Rules
            </button>

            { isOpen && (
                <div style={ {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    width: '80%',
                    maxWidth: '500px'
                } }>
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
                        style={ {
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '10px'
                        } }
                    >
                        Close
                    </button>
                </div>
            ) }
        </div>
    );
};

export default GameRulesModal;

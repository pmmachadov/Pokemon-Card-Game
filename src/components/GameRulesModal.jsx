import { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';

const GameRulesModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef(null);
    const previousActiveElement = useRef(null);

    const toggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 0);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen]);

    return (
        <div>
            <button
                onClick={toggleModal}
                className="rules-button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                Game Rules
            </button>

            {isOpen && (
                <>
                    <div 
                        className="modal-overlay" 
                        onClick={closeModal}
                        aria-hidden="true"
                    />
                    
                    <div
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="rules-title"
                        aria-describedby="rules-description"
                    >
                        <h2 id="rules-title">Game Rules</h2>
                        <div id="rules-description">
                            <p>
                                1. 21 cards with random Pokémon are displayed.
                                <br />
                                2. Click a card to earn points.
                                <br />
                                3. <strong>Watch out!</strong> Cards shuffle after each click.
                                <br />
                                4. Don&apos;t select the same card twice or you&apos;ll lose.
                                <br />
                                5. Try to get the maximum score (21 points).
                                <br />
                                6. Have fun!
                            </p>
                        </div>
                        <button
                            ref={closeButtonRef}
                            onClick={closeModal}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameRulesModal;

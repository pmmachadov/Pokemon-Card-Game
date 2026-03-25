import { useState, useEffect } from 'react';
import '../styles/styles.css'

const ScoreBoard = () => {
    const [scores, setScores] = useState({ currentScore: 0, bestScore: 0 });

    useEffect(() => {
        const handleScoreUpdate = (e) => {
            setScores(e.detail);
        };

        window.addEventListener('scoreUpdate', handleScoreUpdate);
        return () => window.removeEventListener('scoreUpdate', handleScoreUpdate);
    }, []);

    return (
        <div className="scoreboard">
            <div className="score-item">
                <span className="score-label">Current</span>
                <span className="score-value current">{scores.currentScore}</span>
            </div>
            <div className="score-item">
                <span className="score-label">Best</span>
                <span className="score-value best">{scores.bestScore}</span>
            </div>
        </div>
    );
};

export default ScoreBoard;

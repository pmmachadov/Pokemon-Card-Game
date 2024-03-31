import PropTypes from 'prop-types';
import '../styles/styles.css'

const ScoreBoard = ({ currentScore, bestScore }) => {
    return (
        <div className="scoreboard">
            <h2 className="score current-score">Current Score: <span>{ currentScore }</span></h2>
            <h2 className="score best-score">Best Score: <span>{ bestScore }</span></h2>
        </div>
    )
}


ScoreBoard.propTypes = {
    currentScore: PropTypes.number,
    bestScore: PropTypes.number
};


export default ScoreBoard;
import PropTypes from 'prop-types';
import '../styles/styles.css';

const SoundButton = ({ isSoundOn, setIsSoundOn }) => {

    const toggleSound = () => {
        setIsSoundOn(!isSoundOn);
    };

    return (
        <button
            onClick={ toggleSound }
            className={ `sound-button ${isSoundOn ? 'sound-on' : 'sound-off'}` }
        >
            { isSoundOn ? '🔊' : '🔇' }
        </button>
    );
};

SoundButton.propTypes = {
    isSoundOn: PropTypes.bool.isRequired,
    setIsSoundOn: PropTypes.func.isRequired,
};

export default SoundButton;

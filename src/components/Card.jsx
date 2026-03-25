import PropTypes from 'prop-types';

const Card = ({ id, name, imageUrl, onClick }) => {
    const handleClick = (event) => {
        event.currentTarget.blur();
        onClick(id);
    };

    return (
        <button
            className="card"
            onClick={handleClick}
            aria-label={`${name} card`}
            type="button"
        >
            <img 
                src={imageUrl} 
                alt={name}
                loading="lazy"
                draggable="false"
                onError={(e) => {
                    e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
                }}
            />
            <p>{name}</p>
        </button>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Card;

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ id, name, imageUrl, onClick }) => {
    return (
        <button
            className="card"
            onClick={ () => onClick(id) }
            onKeyDown={ (e) => e.key === 'Enter' && onClick(id) }
            aria-label={ `Card ${name}` }
        >
            <img src={ imageUrl } alt={ name } style={ { width: '100%' } } />
            <p>{ name }</p>
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

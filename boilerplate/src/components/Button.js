import React, { PropTypes } from 'react';

const Button = ({ title, onClick }) => (
    <button
        onClick={onClick}
    >
        {title}
    </button>
);

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Button;
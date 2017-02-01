import React, { PropTypes } from 'react';

const Button = ({ title, onClick, classNames }) => (
    <button
        className={classNames}
        onClick={onClick}
    >
        {title}
    </button>
);

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classNames: PropTypes.string.isRequired
};

export default Button;

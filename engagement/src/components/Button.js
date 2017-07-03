import React, { PropTypes } from 'react';

const Button = ({ title, onClick, classNames, disabled=false }) => (
    <button
        className={classNames}
        onClick={onClick}
        disabled={disabled}
    >
        {title}
    </button>
);

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classNames: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default Button;

import React, { PropTypes } from 'react';

const Button = ({ handleSelection, label, isSelected }) => (
    <button className={`btn display-form__button ${isSelected ? 'display-form__button--selected' : ''}`}
            onClick={handleSelection}>{label}
    </button>
);

Button.propTypes = {
    handleSelection: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
};

export default Button;
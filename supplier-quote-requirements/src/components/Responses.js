import React, { PropTypes } from 'react';

const Responses = ({ updateSelection, response }) => (
    <div>
        <button
            type="button" 
            className={`btn display-form__button${response === 'yes' ? ' display-form__button--selected btn-success' : ''}`}
            onClick={() => updateSelection('yes')}>Yes
        </button>
        <button
            type="button" 
            className={`btn display-form__button${response === 'no' ? ' display-form__button--selected btn-success' : ''}`}
            onClick={() => updateSelection('no')}>No
        </button>
        <button
            type="button" 
            className={`btn display-form__button${response === 'n/a' ? ' display-form__button--selected btn-success' : ''}`}
            onClick={() => updateSelection('n/a')}>N/A
        </button>
    </div>
);

Responses.propTypes = {
    updateSelection: PropTypes.func.isRequired,
    response: PropTypes.string.isRequired
};

export default Responses;
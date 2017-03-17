import React, { PropTypes } from 'react';

const Responses = ({ updateSelection, response, mandatory }) => (
    <div>
        <button
            type="button"
            className={`btn display-form__button${response === 'yes' ? ' display-form__button--selected' : ' btn-reverse display-form__button--reverse'}`}
            onClick={() => updateSelection('yes')}>Yes
        </button>
        <button
            type="button"
            className={`btn btn-reverse display-form__button${response === 'no' ? ' display-form__button--selected' : ' btn-reverse display-form__button--reverse'}`}
            onClick={() => updateSelection('no')}
            disabled={mandatory && 'disabled' || ''}>No
        </button>
        <button
            type="button"
            className={`btn btn-reverse display-form__button${response === 'n/a' ? ' display-form__button--selected' : ' btn-reverse display-form__button--reverse'}`}
            onClick={() => updateSelection('n/a')}
            disabled={mandatory && 'disabled' || ''}>N/A
        </button>
    </div>
);

Responses.propTypes = {
    updateSelection: PropTypes.func.isRequired,
    response: PropTypes.string.isRequired,
    mandatory: PropTypes.bool.isRequired
};

export default Responses;

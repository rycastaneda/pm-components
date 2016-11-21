import React, { PropTypes } from 'react';

const Viewer = ({ handleSave, handleSelection, text = '', selection, comments }) => (
    <div className={`quote-inclusions__form view-form`}>

        <div className="view-form__description">
            {text}
        </div>

        <div className="view-form__buttons-container">
            <button className="btn view-form__button view-form__button--update"
                    onClick={handleSelection}>Yes
            </button>
            <button className="btn view-form__button view-form__button--update"
                    onClick={handleSelection}>No
            </button>
            <button className="btn view-form__button view-form__button--update"
                    onClick={handleSelection}>N/A
            </button>
        </div>
    </div>
);

Viewer.propTypes = {
    handleSave: PropTypes.func.isRequired,
    handleSelection: PropTypes.func.isRequired,
    isAlwaysIncluded: PropTypes.bool,
    text: PropTypes.string,
    isMandatory: PropTypes.bool
};

export default Viewer;
import React, { PropTypes } from 'react';

const Viewer = ({ handleSelection, text, isMandatory = false }) => (
    <div className={`supplier-quote-inclusions__form view-form`}>

        <div className="view-form__description">
            {text}
            {isMandatory ? '' : ''}
        </div>

        <div className="view-form__buttons-container">
            <button className={`btn view-form__button`}
                    onClick={handleSelection}>Yes</button>

            <button className="btn view-form__button"
                    onClick={handleSelection}>No</button>
            <button className="btn view-form__button"
                    onClick={handleSelection}>N/A</button>
        </div>
    </div>
);

Viewer.propTypes = {
    handleSelection: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    isMandatory: PropTypes.bool
};

export default Viewer;
import React, { PropTypes } from 'react';

const Viewer = ({ handleDelete, handleUpdate, isAlwaysIncluded = false, text = '', isMandatory = false }) => (
    <div className={`quote-inclusions__form view-form ${isAlwaysIncluded ? 'view-form--favourite' : ''}`}>

        <div className="view-form__description">
            {text}
            {isMandatory ? (<div className="view-form__mandatory-text">Mandatory for supplier</div>) : ''}
        </div>



        <div className="view-form__buttons-container">
            <button className="btn view-form__button view-form__button--update"
                    onClick={handleUpdate}>Update</button>
            <button className="btn btn-danger view-form__button view-form__button--delete"
                    onClick={handleDelete}>Delete</button>
        </div>
    </div>
);

Viewer.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    isAlwaysIncluded: PropTypes.bool,
    text: PropTypes.string,
    isMandatory: PropTypes.bool
};

export default Viewer;
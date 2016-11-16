import React, { PropTypes } from 'react';

const Viewer = ({ text = '', isMandatory = false, handleDelete, handleUpdate }) => (
    <div className="quote-inclusions__form view-form">

        <div className="view-form__description">
            {text}
            {isMandatory ? (<div className="view-form__mandatory-text"><em>Mandatory for supplier</em></div>) : ''}
        </div>



        <div className="view-form__buttons-container">
            <button className="view-form__button view-form__button--update"
                    onClick={handleUpdate}>Update</button>
            <button className="view-form__button view-form__button--delete"
                    onClick={handleDelete}>Delete</button>
        </div>
    </div>
);

Viewer.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    text: PropTypes.string,
    isMandatory: PropTypes.bool
};

export default Viewer;
import React, { PropTypes } from 'react';

const Document = ({ handleChange, id, title, checked = false }) => (
    <div className="checkbox">
        <label htmlFor={`document-${id}`}>
            <input id={`document-${id}`}
                   type="checkbox"
                   checked={checked}
                   onChange={handleChange}
            />
            {title}
        </label>
    </div>
);

Document.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    checked: PropTypes.bool
};

export default Document;

import React, { PropTypes } from 'react';

const Document = ({ handleChange, id, title, checked = false, updating = false }) => (
    <div className="checkbox">
        { updating ? <i className="fa fa-spinner fa-pulse fa-fw"></i> : null }
        <label htmlFor={`document-${id}`}>
            <input id={`document-${id}`}
                   type={updating ? 'hidden':'checkbox'}
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
    checked: PropTypes.bool,
    updating: PropTypes.bool
};

export default Document;

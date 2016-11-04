import React, { PropTypes } from 'react';

const Viewer = ({ text = '', isMandatory = false, handleDelete, handleUpdate }) => (
    <div>

        <div>{text}</div>

        <input readOnly="true"
               type="checkbox"
               checked={isMandatory}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
);

Viewer.propTypes = {
    text: PropTypes.string,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    isMandatory: PropTypes.bool
};

export default Viewer;
import React, { PropTypes } from 'react';

const Viewer = ({ text, onDelete, onUpdate }) => (
    <div>

        <div>{text}</div>

        <input readOnly="true"
               type="checkbox"
        />
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
    </div>
);

Viewer.propTypes = {
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Viewer;
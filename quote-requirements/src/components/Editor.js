import React, { PropTypes } from 'react';

const Editor = ({ text, onSave }) => (
    <div>
        <textarea name="description"
              value={text}
        />
        <input name=""
               type="checkbox"
        />
        <button onClick={onSave}>Add</button>
    </div>
);

Editor.propTypes = {
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

export default Editor;
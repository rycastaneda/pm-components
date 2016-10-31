import React, { PropTypes } from 'react';
import Document from './Document';

const Documents = ({ files, groupIndex, onFileRemove, preview }) => (
    <div className="files">
        {!preview ? <h3>Documents</h3> : null}
        <div className="row">
        {files.map((file, key) => (
            <Document
                key={key}
                file={file}
                preview={preview}
                groupIndex={groupIndex}
                onFileRemove={onFileRemove}
            />
        ))}
        </div>
    </div>
);

Documents.propTypes = {
    files: PropTypes.array.isRequired,
    groupIndex: PropTypes.number.isRequired,
    onFileRemove: PropTypes.func,
    preview: PropTypes.bool
};



export default Documents;


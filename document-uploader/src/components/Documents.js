import React, { PropTypes, Component } from 'react';
import Document from './Document';

class Documents extends Component { 
    render() {
        const { files, groupIndex, onFileRemove, onDownloadFile, preview } = this.props;

        return (
            <ul className="list-group files">
                {!preview ? <h3>Uploaded Documents</h3> : null}
                {files.map(file => (
                    <Document
                        key={file.id}
                        file={file}
                        preview={preview}
                        groupIndex={groupIndex}
                        onFileRemove={onFileRemove}
                        onDownloadFile={onDownloadFile}
                    />
                ))}
            </ul>
        );
    }
}

Documents.propTypes = {
    files: PropTypes.array.isRequired,
    groupIndex: PropTypes.number.isRequired,
    onFileRemove: PropTypes.func,
    onDownloadFile: PropTypes.func,
    preview: PropTypes.bool
};

export default Documents;


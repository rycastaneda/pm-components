import React, { PropTypes, Component } from 'react';
import Document from './Document';

class Documents extends Component {
    render() {
        const { files, onFileRemove, onDownloadFile } = this.props;

        return (
            <ul className="list-group files">
                {files.map(file => (
                    <Document
                        key={file.id}
                        file={file}
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
    onFileRemove: PropTypes.func,
    onDownloadFile: PropTypes.func
};

export default Documents;

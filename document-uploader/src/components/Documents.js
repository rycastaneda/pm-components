import React, { PropTypes, Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Document from './Document';

class Documents extends Component { 
    render() {
        const { files, groupIndex, onFileRemove, onDownloadFile, preview } = this.props;

        return (
            <div className="files">
                {!preview ? <h3>Documents</h3> : null}
                <div className="row">
                <CSSTransitionGroup
                  transitionName="documents"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
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
                </CSSTransitionGroup>
                </div>
            </div>
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


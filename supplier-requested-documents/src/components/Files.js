import React, { PropTypes, Component } from 'react';
import File from './File';

class Files extends Component { 
    render() {
        const files = this.props.files.map((file) => {
            return <File 
                file={file} 
                requirementId={this.props.requirementId} 
                onRemoveFile={this.props.onFileRemove}></File>;
        });

        return (
            <div>
                {files.length 
                ? files 
                : null }
            </div>
        );
    }
}

Files.propTypes = {
    files: PropTypes.object.isRequired,
    requirementId: PropTypes.string.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    onDropFile: PropTypes.func.isRequired
};

export default Files;


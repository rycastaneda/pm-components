import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import Files from '../components/Files';

class Requirement extends Component { 
    render() {
        const {
            requirement,
            onDropFiles,
            onFileRemove
        } = this.props;

        return (
            <div>
                <div className="pull-left">
                    <h3>{requirement.name}</h3>
                </div>
                <div className="pull-right">
                    <Dropzone 
                        className="dropzone"
                        onDrop={(files) => {
                            onDropFiles(requirement.id, files);
                        }}>
                    </Dropzone>
                </div>
                {requirement.files && requirement.files.length
                    ? <Files onFileRemove={onFileRemove} 
                        files={requirement.files} 
                        requirementId={requirement.id}>
                     </Files>
                    : null }
                <div className="clearfix"></div>
            </div>
        );
    }
}

Requirement.propTypes = {
    requirement: PropTypes.object.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    onDropFiles: PropTypes.func.isRequired
};

export default Requirement;


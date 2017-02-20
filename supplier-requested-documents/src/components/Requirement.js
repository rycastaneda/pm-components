import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import Documents from '../components/Documents';

class Requirement extends Component { 
    render() {
        const {
            requirement,
            onDropDocuments,
            onRemoveDocument
        } = this.props;

        const documents = requirement.documents && requirement.documents.length 
            ? <Documents onRemoveDocument={onRemoveDocument} 
                    documents={requirement.documents} 
                    requirementId={requirement.id}>
                 </Documents>
            : null;

        return (
            <li>
                <ul>
                    <li>
                        <Dropzone className="dropzone dz-clickable clearfix"
                            accept="application/pdf"
                            onDrop={(documents) => {
                                onDropDocuments(requirement.id, documents);
                            }}>
                            <div className="form-group">
                                <label className="pull-left">{requirement.title}</label>
                                <div className="clearfix"></div>
                                <p className="text-center dropzone__placeholder">
                                    <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                                </p>
                            </div>
                        </Dropzone>
                    </li>
                    {documents}
                </ul>
            </li>
        );
    }
}

Requirement.propTypes = {
    requirement: PropTypes.object.isRequired,
    onRemoveDocument: PropTypes.func.isRequired,
    onDropDocuments: PropTypes.func.isRequired
};

export default Requirement;


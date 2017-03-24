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
                        <div className="form-group mar-top-sm">
                            <label>{requirement.title}</label>
                            <Dropzone className="dropzone dz-clickable"
                                accept="application/pdf,image/*,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onDrop={(documents) => {
                                    onDropDocuments(requirement.id, documents);
                                }}>
                                    <p className="text-center dz-default dz-message">
                                        <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                                    </p>
                            </Dropzone>
                        </div>
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


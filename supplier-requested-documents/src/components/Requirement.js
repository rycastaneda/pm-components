import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import Documents from '../components/Documents';

class Requirement extends Component {
    render() {
        const {
            requirement,
            readOnly,
            onDropDocuments,
            onRemoveDocument,
            downloadDocument
        } = this.props;

        const documents = requirement.documents && requirement.documents.length
            ? <Documents onRemoveDocument={onRemoveDocument}
                    downloadDocument={downloadDocument}
                    readOnly={readOnly} 
                    documents={requirement.documents} 
                    requirementId={requirement.id}>
                 </Documents>
            : readOnly ? <li className="list-group-item">N/A</li> : null;

        return (
            <li>
                <ul>
                    <li>
                        <div className="form-group mar-top-sm mar-btm-no">
                            <label>{requirement.title}</label>
                            {!readOnly ? <Dropzone className="dropzone dz-clickable"
                                accept="application/pdf,image/*,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onDrop={(documents) => {
                                    onDropDocuments(requirement.id, documents);
                                }}>
                                    <p className="text-center dz-default dz-message">
                                        <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                                    </p>
                            </Dropzone> : null}
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
    readOnly: PropTypes.bool,
    onRemoveDocument: PropTypes.func.isRequired,
    onDropDocuments: PropTypes.func.isRequired,
    downloadDocument: PropTypes.func.isRequired
};

export default Requirement;

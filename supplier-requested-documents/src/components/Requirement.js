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

        return (
            <li>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Dropzone className="dropzone clearfix"
                            accept="application/pdf"
                            onDrop={(documents) => {
                                onDropDocuments(requirement.id, documents);
                            }}>
                            <div className="pull-left">
                                {requirement.title}
                            </div>
                            <div className="pull-right">
                                <p className="text-center dropzone__placeholder">
                                    <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                                </p>
                            </div>
                        </Dropzone>
                    </li>
                    {requirement.documents && requirement.documents.length
                        ? <Documents onRemoveDocument={onRemoveDocument} 
                            documents={requirement.documents} 
                            requirementId={requirement.id}>
                         </Documents>
                        : null }
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


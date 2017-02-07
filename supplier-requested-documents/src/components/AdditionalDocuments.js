import React, { Component, PropTypes } from 'react';
import Documents from './Documents';
import Dropzone from 'react-dropzone';

export default class AdditionalDocuments extends Component {
    render() {
        const {
            onDropDocuments,
            onRemoveDocument,
            documents
        } = this.props;

        return (
            <div>
                {<Dropzone className="clearfix"
                    accept="application/pdf"
                    onDrop={(documents) => {
                        onDropDocuments('additional', documents);
                    }}>
                    <p className="text-center">
                        <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                    </p>
                </Dropzone>}
                <Documents
                    onRemoveDocument={onRemoveDocument} 
                    documents={documents} 
                    requirementId="additional">
                </Documents>
            </div>
        );
    }
}

AdditionalDocuments.propTypes = {
    documents: PropTypes.array.isRequired,
    onDropDocuments: PropTypes.func.isRequired,
    onRemoveDocument: PropTypes.func.isRequired
};
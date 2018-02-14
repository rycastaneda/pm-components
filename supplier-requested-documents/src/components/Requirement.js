import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import Documents from '../components/Documents';

class Requirement extends Component {
    constructor(props) {
        super(props);
        this.handleFilterDropDocuments = this.handleFilterDropDocuments.bind(this);
        this.state = {
            error: ''
        };
    }

    handleFilterDropDocuments(requirementId, files) {
        const allowedExtenstions = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xls', '.xlsx', '.doc', '.docx', '.dwg', '.ppt', '.pptx', '.mpp', '.vsd', '.pptm', '.dotm', '.xltm'];
        let invalid = [];

        let filteredFiles = files.filter((file) => {
            let extension = file.name.split('.').pop().toLowerCase();

            if (!~allowedExtenstions.indexOf(`.${extension}`)) {
                invalid.push(file.name);
            }

            return !!~allowedExtenstions.indexOf(`.${extension}`);
        });

        if (filteredFiles.length !== files.length) {
            this.setState({
                error: invalid.join(', ') + ' - file type not supported Supplier Requested Documents'
            });

            return;
        }

        this.setState({
            error: ''
        });

        this.props.onDropDocuments(requirementId, filteredFiles);
    }

    render() {
        const {
            requirement,
            readOnly,
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
                                onDrop={(documents) => {
                                    this.handleFilterDropDocuments(requirement.id, documents);
                                }}>
                                    <p className="text-center dz-default dz-message">
                                        <i className="fa fa-cloud-upload"></i> Drop documents here or click to select files.
                                    </p>
                            </Dropzone> : null}
                            {this.state.error ?
                                <div className="bs-callout bs-callout-danger">{this.state.error}</div>
                            : null}
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

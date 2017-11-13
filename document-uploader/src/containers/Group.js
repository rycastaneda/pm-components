import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    renamingGroup,
    toggleRenaming,
    downloadDocumentGroup,
    removeGroup,
    dropDocuments,
    removeDocument,
    downloadDocument
} from '../actions/groups';
import Loader from '../components/Loader';
import GroupHeader from '../components/GroupHeader';
import Documents from '../components/Documents';
import Dropzone from 'react-dropzone';

class Group extends Component {

    constructor(props) {
        super(props);
        this.handleRenameGroup = this.handleRenameGroup.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.handleToggleRename = this.handleToggleRename.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDropDocuments = this.handleDropDocuments.bind(this);
        this.handleRemoveDocument = this.handleRemoveDocument.bind(this);
        this.handleDownloadDocument = this.handleDownloadDocument.bind(this);
        this.handleFilterDropDocuments = this.handleFilterDropDocuments.bind(this);
        this.renameInput = null;
        this.state = {
            error: ''
        };
    }

    handleRenameGroup(title) {
        if (!title || title === this.props.group.title) {
            return;
        }

        return this.props.dispatch(renamingGroup(this.props.group.id, title));
    }

    handleRemoveGroup() {
        return this.props.dispatch(removeGroup(this.props.group.id));
    }

    handleToggleRename() {
        return this.props.dispatch(toggleRenaming(this.props.group.id));
    }

    handleDownloadDocumentGroup() {
        return this.props.dispatch(downloadDocumentGroup(this.props.group.id));
    }

    handleDropDocuments(files) {
        const documents = files.map((file, key) => {
            file.id = +new Date() + key;
            return file;
        });

        return this.props.dispatch(dropDocuments(this.props.group.id, documents));
    }

    handleRemoveDocument(documentId) {
        return this.props.dispatch(removeDocument(this.props.group.id, documentId));
    }

    handleDownloadDocument(documentId) {
        return this.props.dispatch(downloadDocument(this.props.group.id, documentId));
    }

    handleFilterDropDocuments(files) {
        const allowedExtenstions = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xls', '.xlsx', '.doc', '.docx', '.dwg'];
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
                error: invalid.join(', ') + ' - file type not supported'
            });

            return;
        }

        this.setState({
            error: ''
        });

        this.handleDropDocuments(filteredFiles);
    }

    render() {
        const {
            group
        } = this.props;

        return (
            <div className="db-form-section group-panel" >
                {group.isUpdating ? <Loader /> : ''}
                <GroupHeader
                    isRenaming={group.isRenaming}
                    title={group.title}
                    showDownload={!!group.documents.length}
                    handleRenameGroup={this.handleRenameGroup}
                    handleToggleRename={this.handleToggleRename}
                    handleRemoveGroup={this.handleRemoveGroup}
                    handleDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                    renameInput={this.renameInput}
                    isReadOnly={group.isReadOnly}/>
                <div className="panel-body">
                    <Dropzone className="dropzone"
                        onDrop={this.handleFilterDropDocuments}>
                        <p className="text-center dropzone__placeholder"><i className="fa fa-cloud-upload"></i> Drop files here or click to select files.</p>
                    </Dropzone>
                    {group.documents && group.documents.length ?
                    <Documents
                        files={group.documents}
                        preview={false}
                        onFileRemove={this.handleRemoveDocument}
                        onDownloadFile={this.handleDownloadDocument}/>
                    : null}
                    {this.state.error ?
                        <div className="bs-callout bs-callout-danger">{this.state.error}</div>
                    : null}
                </div>
            </div>
        );
    }
}

Group.propTypes = {
    dispatch: PropTypes.func.isRequired,
    group: PropTypes.object
};


function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Group);  // adds dispatch prop

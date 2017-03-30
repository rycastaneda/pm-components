import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchDocuments,
    addGroup,
    catchFiles,
    removeFile,
    removeFilesToBeAdded,
    downloadFile,
    downloadDocumentGroup,
    downloadDocumentGroups,
    uploadFile
} from '../actions/groups';
import Group from './Group';
import Loader from '../components/Loader';
import AddGroupForm from '../components/AddGroupForm';
import GroupLists from '../components/GroupLists';
import cloneDeep from 'lodash';

class DocumentGroup extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleCatchFiles = this.handleCatchFiles.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleDownloadFile = this.handleDownloadFile.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDownloadDocumentGroups = this.handleDownloadDocumentGroups.bind(this);
        this.addGroupInput = null;
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.readOnly = document.querySelector('[data-quote-id]').getAttribute('data-read-only');
        this.props.dispatch(fetchDocuments(this.quote_id));
    }

    handleDownloadFile(quote, index, filename) {
        return this.props.dispatch(downloadFile(this.quote_id, quote, index, filename));
    }

    handleDownloadDocumentGroup(group, index) {
        return this.props.dispatch(downloadDocumentGroup(this.quote_id, group, index));
    }

    handleDownloadDocumentGroups() {
        return this.props.dispatch(downloadDocumentGroups(this.quote_id, `SearcherQR-${this.quote_id}`));
    }

    handleCatchFiles(index, id, files) {
        return this.props.dispatch(catchFiles(index, id, files));
    }

    handleFileUpload(group_id, index) {
        const quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.props.dispatch(uploadFile(group_id, index, quote_id));
    }

    handleRemoveFile(groupIndex, file, preview) {
        if (preview) {
            return this.props.dispatch(removeFilesToBeAdded(groupIndex, file.id));
        }

        return this.props.dispatch(removeFile(groupIndex, this.quote_id, file));
    }

    handleAddGroup(newGroup) {
        
        return this.props.dispatch(addGroup(newGroup.value));
    }

    getDocuments(group) {
        if (!group.relationships || !group.relationships.documents) {
            return [];
        }

        let document_ids = group.relationships.documents.data.map(document => document.id);
        // get document ids valid for display which are those that are not default
        return this.props.documents.filter((document) => {
            return document_ids.includes(document.id);
        });
    }

    render() {
        let groups, error;


        const list = (
            <GroupLists 
                groups={this.props.documentGroups} 
                downloadDocumentGroup={this.handleDownloadDocumentGroup}
            />
        );

        // console.log("this.props", this.props);

        const document_groups = this.props.documentGroups.map((group, key) => {
            return <Group
                group={group}
                key={key}
                groupIndex={key}
                onFileRemove={this.handleRemoveFile}
                onFileUpload={this.handleFileUpload}
                onDownloadFile={this.handleDownloadFile}
                toggleRenaming={this.handleTogglingRename}
                onDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                catchFiles={this.handleCatchFiles}
            />;
        });

        if (this.props.documentGroups) {
            groups = this.readOnly ? list : document_groups;
        }

        if (this.props.ui.error) {
            error = (
                <div className="alert alert-danger">{this.props.ui.error}</div>
            );
        }
        
        return (
            <div className="group-panel">
                <div className="row container text-center">
                    {this.props.documents.length ?
                        <button className="db-function" onClick={() => {
                            this.handleDownloadDocumentGroups();
                        }}>
                            <i className={`fa ${this.props.documentGroups.downloading ? 'fa-spin fa-spinner' : 'fa-download'}`}></i>
                            &nbsp; Download All
                        </button>
                        : null}
                    <hr/>
                </div>
                {groups}
                {error}
                {this.props.documentGroups.loading ? <Loader block={true}/> : ''}
                {!this.readOnly ? 
                <AddGroupForm 
                    onAddGroup={this.handleAddGroup}
                    documentGroups={this.props.documentGroups}/> 
                : null }
            </div>
        );
    }
}

DocumentGroup.propTypes = {
    dispatch: PropTypes.func.isRequired,
    documentGroups: PropTypes.array,
    documents: PropTypes.array,
    ui: PropTypes.object
};


function mapStateToProps(state) {
    const { 
        documentGroups: rawGroups, 
        documents: rawDocuments,
        ui
        // documentsToBeAdded: rawDocumentsToBeAdded
    } = state;


    const documentGroups = cloneDeep(rawGroups).value().allIds.map((documentGroupId) => {
        let documentGroup = rawGroups.byId[documentGroupId];

        documentGroup.documents = documentGroup.documentIds.map((documentId) => {
            return rawDocuments.byId[documentId];
        });

        return documentGroup;
    });

    return { documentGroups, documents: rawDocuments.allIds, ui };
}

export default connect(mapStateToProps)(DocumentGroup);  // adds dispatch prop
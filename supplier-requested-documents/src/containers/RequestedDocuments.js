import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchDocuments,
    addGroup,
    renamingGroup,
    removeGroup,
    toggleRenaming,
    catchFiles,
    removeFile,
    downloadFile,
    downloadDocumentGroup,
    downloadDocumentGroups,
    uploadFile
} from '../actions/groups';
import Group from '../components/Group';
import Loader from '../components/Loader';
import AddGroupForm from '../components/AddGroupForm';
import GroupLists from '../components/GroupLists';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class DocumentGroup extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleCatchFiles = this.handleCatchFiles.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleTogglingRename = this.handleTogglingRename.bind(this);
        this.handleGroupRename = this.handleGroupRename.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleDownloadFile = this.handleDownloadFile.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDownloadDocumentGroups = this.handleDownloadDocumentGroups.bind(this);
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.readOnly = document.querySelector('[data-quote-id]').getAttribute('data-read-only');
        this.props.dispatch(fetchDocuments(this.quote_id));
    }

    handleDownloadFile(quote, index, filename) {
        return this.props.dispatch(downloadFile(quote, index, filename));
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

    handleRemoveFile(groupIndex, file) {
        return this.props.dispatch(removeFile(groupIndex, this.quote_id, file));
    }

    handleRemoveGroup(group, index) {
        return this.props.dispatch(removeGroup(group, index));
    }

    handleAddGroup(value, isDefault, callback) {
        return this.props.dispatch(addGroup(value, isDefault, this.quote_id, callback));
    }

    handleTogglingRename(index) {
        return this.props.dispatch(toggleRenaming(index));
    }

    handleGroupRename(index, id, title) {
        if (!title.value.length) {
            return;
        }

        return this.props.dispatch(renamingGroup(index, id, title.value));
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
                groups={this.props.documentGroups.data} 
                downloadDocumentGroup={this.handleDownloadDocumentGroup}
            />
        );

        const document_groups = this.props.documentGroups.data.map((group, key) => {
            return <Group
                group={group}
                documentsAdded={this.props.documentsToBeAdded[group.id] || []}
                documents={this.getDocuments(group)}
                key={key}
                groupIndex={key}
                onFileRemove={this.handleRemoveFile}
                onFileUpload={this.handleFileUpload}
                onGroupRename={this.handleGroupRename}
                onGroupRemove={this.handleRemoveGroup}
                onDownloadFile={this.handleDownloadFile}
                toggleRenaming={this.handleTogglingRename}
                onDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                catchFiles={this.handleCatchFiles}
            />;
        });

        if (this.props.documentGroups) {
            groups = this.readOnly ? list : document_groups;
        }

        if (this.props.documentGroups.error) {
            let message = this.props.documentGroups.error;
            error = (
                <div className="alert alert-danger">{message}</div>
            );
        }
        
        return (
            <div className="group-panel">
                <div className="row container text-center">
                    <button className="db-function" onClick={() => {
                        this.handleDownloadDocumentGroups();
                    }}>
                        <i className={`fa ${this.props.documentGroups.downloading ? 'fa-spin fa-spinner' : 'fa-download'}`}></i>
                        &nbsp; Download All
                    </button>
                    <hr/>
                </div>
                <CSSTransitionGroup
                  transitionName="documents"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                {groups}
                </CSSTransitionGroup>
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
    documentGroups: PropTypes.object,
    documents: PropTypes.array,
    documentsToBeAdded: PropTypes.object
};


function mapStateToProps(state) {
    const { documentGroups, documents, documentsToBeAdded  } = state;

    return { documentGroups, documents, documentsToBeAdded };
}

export default connect(mapStateToProps)(DocumentGroup);  // adds dispatch prop
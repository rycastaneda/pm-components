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
    uploadFile
} from '../actions/groups';
import Group from '../components/Group';
import Loader from '../components/Loader';

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
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.props.dispatch(fetchDocuments());
    }

    handleCatchFiles(index, id, files) {
        return this.props.dispatch(catchFiles(index, id, files));
    }

    handleFileUpload(index) {
        this.props.dispatch(uploadFile(index));
    }

    handleRemoveFile(groupIndex, fileId) {
        return this.props.dispatch(removeFile(groupIndex, fileId));
    }

    handleRemoveGroup(id, index) {
        return this.props.dispatch(removeGroup(id, index));
    }

    handleAddGroup(e) {
        e.preventDefault();

        if (!this.addGroupInput.value.length) {
            return;
        }

        return this.props.dispatch(
            addGroup(this.addGroupInput.value, () => {
                this.addGroupInput.value = '';
            })
        );
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
        return this.props.documents.filter((document) => {
            return !!~document_ids.indexOf(document.id);
        });
    }

    render() {
        let groups, error;
        if (this.props.documentGroups) {
            groups = this.props.documentGroups.data.map((group, key) => {
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
                    toggleRenaming={this.handleTogglingRename}
                    catchFiles={this.handleCatchFiles}
                />;
            });
        }

        if (this.props.documentGroups.error) {
            let message = this.props.documentGroups.error;
            error = (
                <div className="alert alert-danger">{message}</div>
            );
        }

        return (
            <div className="group-panel">
                <Loader loading={this.props.documentGroups.loading} />
                {groups}
                {error}
                <form onSubmit={this.handleAddGroup}>
                    <div className="input-group">
                        <span className="input-group-addon">+</span>
                        <input
                            ref={ref => this.addGroupInput = ref}
                            type="text"
                            className="form-control"
                            placeholder="Add new group" />
                    </div>
                </form>
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
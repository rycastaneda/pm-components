import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    renamingGroup,
    toggleRenaming,
    downloadDocumentGroup,
    removeGroup
} from '../actions/groups';
import Loader from '../components/Loader';
import GroupHeader from '../components/GroupHeader';

class Group extends Component {

    constructor(props) {
        super(props);
        this.handleRenameGroup = this.handleRenameGroup.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.handleToggleRename = this.handleToggleRename.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.renameInput = null;
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

    render() {
        const {
            group, 
            readOnly
        } = this.props;

        return (
            <div className="db-form-section group-panel" >
                {group.isUpdating ? <Loader /> : ''}
                <GroupHeader 
                    isRenaming={group.isRenaming}
                    isDefault={!!group.default}
                    title={group.title}
                    showDownload={!!group.documents.length}
                    handleRenameGroup={this.handleRenameGroup}
                    handleToggleRename={this.handleToggleRename}
                    handleRemoveGroup={this.handleRemoveGroup}
                    handleDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                    renameInput={this.renameInput}
                    readOnly={readOnly}/>
            </div>
        );
    }
}

Group.propTypes = {
    dispatch: PropTypes.func.isRequired,
    group: PropTypes.object,
    readOnly: PropTypes.bool
};


function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Group);  // adds dispatch prop
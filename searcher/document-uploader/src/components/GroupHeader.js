import React, { PropTypes } from 'react';

const GroupHeader = ({
    title,
    isRenaming,
    isReadOnly,
    showDownload,
    handleRenameGroup,
    handleToggleRename,
    handleRemoveGroup,
    handleDownloadDocumentGroup,
    renameInput
}) => {
    const renameForm = (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleRenameGroup(renameInput.value);
        }} className="pull-left">
            <input
                className="form-control"
                type="text"
                ref={(ref) => {
                    renameInput = ref;
                    renameInput && renameInput.focus();
                }}
                defaultValue={title}/>
        </form>
    );

    const confirmationButtons = (
        <span>
            <i onClick={() => handleRenameGroup(renameInput.value)}
                className="group-panel__actions fa fa-check"></i>
            <i onClick={() => handleToggleRename()}
                className="group-panel__actions fa fa-times"></i>
        </span>
    );

    const renameToggleButton = (
        <i onClick={() => handleToggleRename()}
           className="group-panel__actions fa fa-pencil">
        </i>
    );

    const actions = (
        <aside className="pull-right">
            {isRenaming ? confirmationButtons : renameToggleButton}
            <i className="group-panel__actions fa fa-trash" onClick={() => handleRemoveGroup()}></i>
        </aside>
    );

    return (
        <div className="db-form-title clearfix">
            <aside className="pull-left">
                {isRenaming ? renameForm : title}
            </aside>
            <aside className="pull-right">
                {isReadOnly ? null : actions}
                {showDownload ?
                    <i className="group-panel__actions fa fa-download" onClick={() => handleDownloadDocumentGroup()}></i>
                : null}
            </aside>
        </div>
    );
};

GroupHeader.propTypes = {
    title: PropTypes.string,
    isRenaming: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    showDownload: PropTypes.bool.isRequired,
    handleRenameGroup: PropTypes.func.isRequired,
    handleToggleRename: PropTypes.func.isRequired,
    handleRemoveGroup: PropTypes.func.isRequired,
    handleDownloadDocumentGroup: PropTypes.func.isRequired,
    renameInput:PropTypes.any
};

export default GroupHeader;

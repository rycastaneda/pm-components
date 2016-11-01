import React, { PropTypes } from 'react';
import Loader from './Loader';
import Dropzone from 'react-dropzone';
import Documents from './Documents';

const Group = ({
    group,
    documentsAdded,
    documents,
    groupIndex,
    catchFiles,
    onFileRemove,
    onFileUpload,
    onGroupRename,
    onGroupRemove,
    toggleRenaming
}) => {
    let rename;

    const title = (
        <form onSubmit={(e) => {
            e.preventDefault();
            return onGroupRename(groupIndex, group.id, rename);
        }} className="pull-left">
            <input
                className="form-control"
                type="text"
                ref={(ref) => {
                    rename = ref;
                    rename && rename.focus();
                }}
                defaultValue={group.attributes.title}/>
        </form>
    );

    const actions = group.attributes.is_renaming ?
        (<span>
            <i onClick={() => onGroupRename(groupIndex, group.id, rename)}
                className="actions fa fa-check"></i>
            <i onClick={() => toggleRenaming(groupIndex)}
                className="actions fa fa-times"></i>
        </span>) :
        (<i onClick={() => {
            toggleRenaming(groupIndex);
        }}
        className="actions fa fa-pencil"></i>) ;


    return (
        <div className="panel panel-default group-panel" key={groupIndex}>
            {group.attributes.is_updating ? <Loader /> : ''}
            <div className="panel-heading">
                <aside className="pull-left">
                    {group.attributes.is_renaming ? title : group.attributes.title}
                </aside>
                <aside className="pull-right">
                    {actions}
                    <i className="actions fa fa-trash" onClick={() => onGroupRemove(group)}></i>
                </aside>
                <div className="clearfix"></div>
            </div>
            <div className="panel-body">
                <Dropzone className="dropzone" onDrop={(files) => {
                    catchFiles(groupIndex, group.id, files);
                }}>
                    <p className="text-center drop-placeholder">Drop files here</p>
                    {documentsAdded.length ?
                    <Documents
                        files={documentsAdded}
                        groupIndex={groupIndex}
                        preview={true}
                        />
                    : null}
                </Dropzone>

                {documentsAdded.length ?
                    <div className="upload">
                        <button
                            className="upload"
                            onClick={() => onFileUpload(group.id)}>Upload</button>
                    </div>
                : null}

                {documents && documents.length ?
                <Documents
                    files={documents}
                    groupIndex={groupIndex}
                    preview={false}
                    onFileRemove={onFileRemove}
                    />
                : null}
            </div>
        </div>
    );
};

Group.propTypes = {
    group: PropTypes.object.isRequired,
    groupIndex: PropTypes.number.isRequired,
    documentsAdded: PropTypes.array,
    documents: PropTypes.array,
    catchFiles: PropTypes.func,
    onFileRemove: PropTypes.func,
    onFileUpload: PropTypes.func,
    onGroupRemove: PropTypes.func,
    onGroupRename: PropTypes.func,
    toggleRenaming: PropTypes.func
};

export default Group;

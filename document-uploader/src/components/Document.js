import React, { PropTypes } from 'react';
import Progress from './Progress';

const Document = ({ file, preview, groupIndex, onFileRemove, onDownloadFile }) => {
    return (
        <li className="list-group-item document">
            <div className="pull-left">
                <span className="document__filename">{file.attributes.name}</span>
            </div>
            <div className="pull-right">
                <a onClick={() => onFileRemove(groupIndex, file, preview)}>
                    <i className="fa fa-times"></i>
                </a>
                {!preview ? 
                    <a key={`link-${file.id + 1}`} 
                        onClick={() => {
                            onDownloadFile(file.id, groupIndex, file.attributes.name);
                        }}
                    ><i className="group-panel__actions fa fa-download"></i></a>
                : null}
            </div>
            <div className="clearfix"></div>
            {preview && file.attributes.progress ? <Progress key={file.id}
                status={file.attributes.status}
                progress={file.attributes.progress}/> : null}
        </li>
    );
};

Document.propTypes = {
    file: PropTypes.object.isRequired,
    preview: PropTypes.bool.isRequired,
    groupIndex: PropTypes.number.isRequired,
    onFileRemove: PropTypes.func,
    onDownloadFile: PropTypes.func
};

export default Document;


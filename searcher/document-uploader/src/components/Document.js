import React, { PropTypes } from 'react';
import Progress from './Progress';
import {
  UPLOAD_IN_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED
} from '../constants';

const Document = ({ file, onFileRemove, onDownloadFile }) => {
    return (
        <li className="list-group-item document">
            <div className="pull-left document__filename">
                {file.name}
                {file.status === UPLOAD_FAILED ? ' - Something went wrong. Please try again' : null}
            </div>
            {file.status === UPLOAD_SUCCESS ?
            <div className="pull-right">
                {file.locked_in !== 1 &&
                    <a onClick={() => onFileRemove(file.id)}>
                        <i className="fa fa-times"></i>
                    </a>
                }
                <a key={`link-${file.id + 1}`}
                    onClick={() => {
                        onDownloadFile(file.id);
                    }}
                ><i className="group-panel__actions fa fa-download"></i></a>
            </div>
            : null}
            <div className="clearfix"></div>
            {file.status === UPLOAD_IN_PROGRESS ?
                <Progress key={file.id}
                    status={file.status}
                    progress={file.progress}/>
            : null}
        </li>
    );
};

Document.propTypes = {
    file: PropTypes.object.isRequired,
    onFileRemove: PropTypes.func,
    onDownloadFile: PropTypes.func
};

export default Document;

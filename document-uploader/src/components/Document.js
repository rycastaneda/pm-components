import React, { PropTypes } from 'react';
import Progress from './Progress';
import moment from 'moment';
import filesize from 'filesize';

const Document = ({ file, preview, groupIndex, onFileRemove, onDownloadFile }) => {
    const progress = (
        <Progress key={file.id}
            status={file.attributes.status}
            progress={file.attributes.progress}/>
    );

    const removeBtn = (
        <div className="document__remove-icon">
            <a onClick={() => {
                onFileRemove(groupIndex, file);
            }} className="icon-btn icon-btn-hollow">
                <i className="fa fa-trash"></i>
            </a>
        </div>
    );
 
    const thumb = file.attributes.type.match(/image.*/) ? 
        (<img key={file.id + 1}
            className={`document__thumb ${!onFileRemove ? 'document__thumb--added' : ''}`}
            src={preview ? file.attributes.preview : file.attributes.links.self}/>) :
        (<i className={`document__thumb  ${!onFileRemove ? 'document__thumb--added' : ''} fa fa-file-pdf-o`}></i>);

    const link = (
        <a key={file.id + 1} 
        onClick={() => {
            onDownloadFile(file.links && file.links.self || '', groupIndex, file.attributes.name);
        }}
        >{thumb}</a>
    );

    let date_created = file.attributes.created_at;

    if (!preview) {
        date_created = file.attributes.created_at && file.attributes.created_at.date;
    } 

    const stamp = <div className="document__timestamp">{moment(date_created).fromNow()}</div>;

    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="document">
                <div className="document__image">
                    { preview ? [thumb, progress] : [removeBtn, link] }
                    <p className="document__filename">{file.attributes.name}</p>
                    <div className="document__filesize">{filesize(file.attributes.size)}</div>
                    { preview ? null : stamp }
                </div>
            </div>
        </div>
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


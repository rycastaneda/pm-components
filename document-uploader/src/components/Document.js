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
        <div className="row" key={file.id}>
            <aside className="pull-right">
                <i onClick={() => {
                    onFileRemove(groupIndex, file);
                }} className="document__remove-icon fa fa-times pull-right"></i>
            </aside>
        </div>
    );

    const thumb = file.attributes.type.match(/image.*/) ?
        (<img key={file.id + 1}
            className={`document__thumb ${!onFileRemove ? 'document__thumb--added' : ''}`}
            src={preview ? file.attributes.preview : file.attributes.links.self}/>) :
        (<i className={`document__thumb ${!onFileRemove ? 'document__thumb--added' : ''} fa fa-file-o`}></i>);

    const link = (
        <a key={file.id + 1} 
        onClick={() => {
            onDownloadFile(file.links && file.links.self || '', groupIndex, file.attributes.name);
        }}
        >{thumb}</a>
    );

    const stamp = <div className="document__timestamp">{moment(date_created).fromNow()}</div>;

    let date_created = file.attributes.created_at;

    if (!preview) {
        date_created = file.attributes.created_at && file.attributes.created_at.date;
    } 

    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="document">
                <div className="document__image">
                    <div className="col-lg-12">
                        { preview ? [thumb, progress] : [removeBtn, link] }
                        <p className="document__filename">{file.attributes.name}</p>
                        <div className="document__filesize">{filesize(file.attributes.size)}</div>
                        { preview ? null : stamp }
                    </div>
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


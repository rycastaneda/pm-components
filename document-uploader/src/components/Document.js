import React, { PropTypes } from 'react';
import Progress from './Progress';
import moment from 'moment';
import filesize from 'filesize';

const Document = ({ file, preview, groupIndex, onFileRemove }) => {
    const progress = (
        <Progress key={file.id}
            status={file.attributes.status}
            progress={file.attributes.progress}/>
    );

    const removeBtn = (
        <div className="row" key={file.id}>
            <aside className="pull-right">
                <i onClick={() => {
                    onFileRemove(groupIndex, file.id);
                }} className="fa fa-times pull-right"></i>
            </aside>
        </div>
    );

    const thumb = file.attributes.type.match(/image.*/) ?
        (<img key={file.id + 1}
            className={`thumb ${!onFileRemove ? 'added' : ''}`}
            src={preview ? file.attributes.preview : file.attributes.location}/>) :
        (<i className={`thumb ${!onFileRemove ? 'added' : ''} fa fa-file-o`}></i>);

    const link = (
        <a key={file.id + 1} target="_blank"
           href={file.attributes.location}>{thumb}</a>
    );

    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="image-container">
                <div className="image clearfix">
                    <div className="col-lg-12">
                        { preview ? [thumb, progress] : [removeBtn, link] }
                        <p className="filename text-center">{file.attributes.name}</p>
                        <div className="details text-center">{filesize(file.attributes.size)}</div>
                        <div className="details ">{moment(file.attributes.created_at).fromNow()}</div>
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
    onFileRemove: PropTypes.func
};

export default Document;


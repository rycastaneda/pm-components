import React, { PropTypes } from 'react';
import Progress from './Progress';
import moment from 'moment';
import filesize from 'filesize';

const Document = ({ file, preview, groupIndex, onFileRemove }) => {
    let removeBtn,
        progress = (
            <Progress
                status={file.attributes.status}
                progress={file.attributes.progress}/>
        ),
        thumb = <i className={`thumb ${!onFileRemove ? 'added' : ''} fa fa-file-o`}></i>;

    if (file.attributes.type.match(/image.*/)) {
        thumb = (
            <img
            className={`thumb ${!onFileRemove ? 'added' : ''}`}
            src={preview ? file.attributes.preview : file.attributes.location}/>
        );
    }

    if (!preview) {
        removeBtn = (
            <div className="row">
                <aside className="pull-right">
                    <i onClick={() => {
                        onFileRemove(groupIndex, file.id);
                    }} className="fa fa-times pull-right"></i>
                </aside>
            </div>
        );

        thumb = (
            <a target="_blank" href={file.attributes.location}>{thumb}</a>
        );

        progress = null;
    }

    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="image-container">
                <div className="image clearfix">
                    <div className="col-lg-12">
                        {removeBtn}
                        {thumb}
                        {progress}
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


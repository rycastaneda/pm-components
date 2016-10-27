import React, { PropTypes } from 'react';
import moment from 'moment';
import filesize from 'filesize';
import cx from 'classnames';
import { UPLOADING, UPLOAD_SUCCESS, UPLOAD_FAILED } from '../constants';

const Files = ({ files, groupIndex, onFileRemove, preview }) => (
    <div className="files">
        {!preview ?
            <h3>Files</h3>
        : null}
        <div className="row">
        {files.map((file, key) => {
            let removeBtn, progress,
                thumb = <i className={`thumb ${!onFileRemove ? 'added' : ''} fa fa-file-o`}></i>;
            if (file.attributes.type.match(/image.*/)) {
                thumb = (<img className={`thumb ${!onFileRemove ? 'added' : ''}`} src={preview ? file.attributes.preview : file.attributes.location}/>);
            }

            if (!preview) {
                removeBtn = (
                    <div className="row">
                        <aside className="pull-right">
                            <i onClick={() => {
                                onFileRemove(groupIndex, key);
                            }} className="fa fa-times pull-right"></i>
                        </aside>
                    </div>
                );
            }

            if (preview) {
                progress = (
                    <div className="progress">
                        <div className={cx('progress-bar progress-bar-striped', {
                            'progress-bar-success': file.attributes.status === UPLOAD_SUCCESS,
                            'progress-bar-danger': file.attributes.status === UPLOAD_FAILED,
                            'active': file.attributes.status === UPLOADING
                        })} role="progressbar" aria-valuenow={file.attributes.progress} aria-valuemin="0" aria-valuemax="100" style={{ width: file.attributes.progress + '%' }}>
                            <span className="sr-only">{`${file.attributes.progress}% Complete`}</span>
                        </div>
                    </div>
                );
            }

            return (
                <div className="col-lg-3 col-md-6 col-sm-6" key={key}>
                    <div className="image-container">
                        <div className="image clearfix">
                            <div className="col-lg-12">
                                {removeBtn}
                                {!preview ? <a target="_blank" href={file.attributes.location}>{thumb}</a> : thumb}
                                {progress}
                                <p className="filename text-center">
                                    {file.attributes.name}
                                </p>
                                <div className="details text-center">{filesize(file.attributes.size)}</div>
                                <div className="details ">{moment(file.attributes.created_at).fromNow()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
        </div>
    </div>
);

Files.propTypes = {
    files: PropTypes.array.isRequired,
    groupIndex: PropTypes.number.isRequired,
    onFileRemove: PropTypes.func,
    preview: PropTypes.bool
};



export default Files;


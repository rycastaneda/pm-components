import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { UPLOAD_IN_PROGRESS, UPLOAD_SUCCESS, UPLOAD_FAILED } from '../constants';

const Progress = ({ status, progress }) => (
    <div className="progress">
        <div className={classnames('progress-bar progress-bar-striped', {
            'progress-bar-success': status === UPLOAD_SUCCESS,
            'progress-bar-danger': status === UPLOAD_FAILED,
            'active': status === UPLOAD_IN_PROGRESS
        })}
            style={{ width: progress + '%' }}>
            <span className="sr-only">{`${progress}% Complete`}</span>
        </div>
    </div>
);

Progress.propTypes = {
    status: PropTypes.string,
    progress: PropTypes.number
};

export default Progress;


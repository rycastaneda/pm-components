import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { IN_PROGRESS, SUCCESS, FAILED } from '../constants';

const Progress = ({ status, progress }) => (
    <div className="progress">
        <div className={classnames('progress-bar progress-bar-striped', {
            'progress-bar-success': status === SUCCESS,
            'progress-bar-danger': status === FAILED,
            'active': status === IN_PROGRESS
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


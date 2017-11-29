import React from 'react';
import PropTypes from 'prop-types';

const StatusLabel = ({status}) => (
    <span className={`bs-label ${setStatusClass(status)}`}>Invited</span>
);

const setStatusClass = (status) => {
    if (status === 'active') {
        return 'bs-label-success';
    }
    return 'bs-label-danger';
};

StatusLabel.propTypes = {
    status: PropTypes.bool.isRequired,
};

export default StatusLabel;

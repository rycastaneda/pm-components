import React from 'react';
import PropTypes from 'prop-types';

const setStatusClass = (status) => {
    if (status === 'active') {
        return 'bs-label-success';
    }
    return 'bs-label-danger';
};

const StatusLabel = ({ status }) => (
    <span className={`bs-label ${setStatusClass(status)}`}>Invited</span>
);

StatusLabel.propTypes = {
    status: PropTypes.string.isRequired,
};

export default StatusLabel;

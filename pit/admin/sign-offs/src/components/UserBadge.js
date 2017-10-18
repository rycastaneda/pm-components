import React, { PropTypes } from 'react';

const UserBadge = ({ name, status }) => {
    const badges = {
        'rejected': 'badge-bg-danger',
        'approved': 'badge-success',
        'pending': 'badge-info',
        'in progress': 'badge-warning'
    };

    const icons = {
        'rejected': 'fa-times-circle',
        'approved': 'fa-check-circle',
        'pending': 'fa-exclamation-circle',
        'in progress': 'fa-gears'
    };

    return (
        <span className={`badge mar-r-sm ${badges[status.toLowerCase()]}`}>
            <i className={`fa ${icons[status.toLowerCase()]} mar-r-sm`}></i>
            {name}
        </span>
    );
};

UserBadge.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default UserBadge;


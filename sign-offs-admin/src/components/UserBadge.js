import React, { PropTypes } from 'react';
import { STATUS } from '../constants/status';

const UserBadge = ({ name, statusId }) => {
    const badges = {
        declined: 'badge-bg-danger',
        approved: 'badge-success',
        pending: 'badge-info',
        'in progress': 'badge-warning'
    };

    const icons = {
        declined: 'fa-times-circle',
        approved: 'fa-check-circle',
        pending: 'fa-exclamation-circle',
        'in progress': 'fa-gears'
    };

    return (
        <span
            className={`badge mar-r-sm mar-top-sm ${badges[
                STATUS[statusId].toLowerCase()
            ]}`}>
            <i className={`fa ${icons[status.toLowerCase()]} mar-r-sm`} />
            {name}
        </span>
    );
};

UserBadge.propTypes = {
    name: PropTypes.string.isRequired,
    statusId: PropTypes.number.isRequired
};

export default UserBadge;

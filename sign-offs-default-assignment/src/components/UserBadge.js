import React, { PropTypes } from 'react';

const UserBadge = ({ id, name, removeUser }) => (
    <li className={`badge mar-r-sm`}>
        <span
            className="Select-value-icon mar-r-sm"
            aria-hidden="true"
            onClick={() => removeUser(id)}>
            ×
        </span>
        <span className="name">{name}</span>
    </li>
);

UserBadge.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removeUser: PropTypes.func
};

export default UserBadge;

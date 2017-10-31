import React, { PropTypes } from 'react';

const UserBadge = ({ name }) => (
    <span className={`badge mar-r-sm`}>{name}</span>
);

UserBadge.propTypes = {
    name: PropTypes.string.isRequired
};

export default UserBadge;

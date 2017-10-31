import React, { PropTypes } from 'react';
import UserBadge from './UserBadge';

const UserList = ({ users, removeUser }) => {
    const badges = users.map(user => (
        <UserBadge key={user.id} {...user} removeUser={removeUser} />
    ));

    return (
        <ul className="pointer">
            {users.length ? (
                badges
            ) : (
                <li className="user-lists">
                    No staff assigned to this section yet.
                </li>
            )}
        </ul>
    );
};

UserList.propTypes = {
    users: PropTypes.array,
    removeUser: PropTypes.func.isRequired
};

export default UserList;

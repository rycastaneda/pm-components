import React, { PropTypes } from 'react';
import UserBadge from './UserBadge';

const UserList = ({ users }) => {
    const badges = users.map(user => (
        <UserBadge key={user.id} name={user.name} status={user.status} />
    ));

    return (
        <div className="row pointer">
            <div className="col-sm-12 user-lists">
                {users.length
                    ? badges
                    : 'No staff assigned to this section yet.'}
            </div>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.array
};

export default UserList;

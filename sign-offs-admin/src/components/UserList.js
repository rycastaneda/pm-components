import React, { PropTypes } from 'react';
import UserBadge from './UserBadge';

const UserList = ({ users, toggleManageSectionModal }) => {
    const badges = users.map(user => (
        <UserBadge key={user.id} name={user.name} status={user.status} />
    ));
    return (
        <div className="row mar-btm mar-top">
            <div className="col-sm-9 user-lists">
                {users.length
                    ? badges
                    : 'No staff assigned to this section yet.'}
            </div>
            <div className="col-sm-3">
                <button
                    className="db-function mar-top-sm"
                    onClick={toggleManageSectionModal}>
                    <i className="fa fa-gears" />
                    Manage Staff
                </button>
            </div>
        </div>
    );
};

UserList.propTypes = {
    sectionId: PropTypes.number,
    users: PropTypes.array,
    toggleManageSectionModal: PropTypes.func
};

export default UserList;

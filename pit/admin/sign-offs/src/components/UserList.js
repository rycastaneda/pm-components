import React, { PropTypes } from 'react';
import UserBadge from './UserBadge';

const UserList = ({ users, toggleManageSectionModal }) => {
    return (
        <div className="row mar-btm mar-top">
            <div className="col-lg-10">{users.map(user => <UserBadge key={user.id} name={user.name} status={user.status}/>)}</div>
            <div className="col-lg-2">
                <button className="db-function" onClick={toggleManageSectionModal}>
                    <i className="fa fa-gears"></i>
                    Manage
                </button>
            </div>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.array,
    toggleManageSectionModal: PropTypes.func
};

export default UserList;


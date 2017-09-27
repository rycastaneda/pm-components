import React, { PropTypes } from 'react';
import Tab from './Tab';
import Status from './Status';

const Header = ({ currentTab, status, switchTab, toggleStatus, isReadOnly }) => (
    <div className="row">
        <div className="tabs pull-left">
            <Tab text="Questions" active={currentTab === 'questions'} switchTab={() => switchTab('questions')}></Tab>
            <Tab text="Comments" active={currentTab === 'comments'} switchTab={() => switchTab('comments')}></Tab>
        </div>
        {isReadOnly ? null
        : <div className="pull-right">
            <Status status={status} toggleStatus={toggleStatus}/>
        </div>}
        <div className="clearfix"></div>
    </div>
);

Header.propTypes = {
    currentTab: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    switchTab: PropTypes.func.isRequired,
    toggleStatus: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired
};

export default Header;
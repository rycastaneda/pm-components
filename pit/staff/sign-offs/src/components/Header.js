import React, { PropTypes } from 'react';
import TabHeader from './TabHeader';
import Status from './Status';

const Header = ({ currentTab, status, switchSectionTab, toggleSectionStatus, isReadOnly }) => (
    <div className="mar-top mar-btm row">
        <div className="col-lg-10">
            <ul className="list-inline pad-top-sm mar-top-sm">
                <TabHeader text="Questions" active={currentTab === 'questions'} switchSectionTab={() => switchSectionTab('questions')}></TabHeader>
                <TabHeader text="Comments" active={currentTab === 'comments'} switchSectionTab={() => switchSectionTab('comments')}></TabHeader>
            </ul>
        </div>
        {isReadOnly || !status ? null
        : <div className="col-lg-2">
            <Status status={status} toggleSectionStatus={toggleSectionStatus}/>
        </div>}
        <div className="clearfix"></div>
    </div>
);

Header.propTypes = {
    currentTab: PropTypes.string,
    status: PropTypes.string,
    switchSectionTab: PropTypes.func.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired
};

export default Header;
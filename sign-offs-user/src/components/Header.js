import React, { PropTypes } from 'react';
import TabHeader from './TabHeader';
import Status from './Status';

const Header = ({
    currentTab,
    statusId,
    switchSectionTab,
    toggleSectionStatus,
    isReadOnly
}) => (
    <div className="mar-top mar-btm row">
        <div className="col-lg-9">
            <ul className="list-inline pad-top-sm mar-top-sm">
                <TabHeader
                    text="Questions"
                    active={currentTab === 'questions'}
                    switchSectionTab={() => switchSectionTab('questions')}
                />
                <TabHeader
                    text="Comments"
                    active={currentTab === 'comments'}
                    switchSectionTab={() => switchSectionTab('comments')}
                />
            </ul>
        </div>
        {isReadOnly || statusId === null ? null : (
            <div className="col-lg-3">
                <Status
                    statusId={statusId}
                    toggleSectionStatus={toggleSectionStatus}
                />
            </div>
        )}
        <div className="clearfix" />
    </div>
);

Header.propTypes = {
    currentTab: PropTypes.string,
    statusId: PropTypes.number,
    switchSectionTab: PropTypes.func.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Header;

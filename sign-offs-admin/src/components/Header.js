import React, { PropTypes } from 'react';
import TabHeader from './TabHeader';

const Header = ({ currentTab, switchSectionTab }) => (
    <div className="mar-top mar-btm row">
        <div className="col-lg-12">
            <ul className="list-inline pad-top-sm mar-top-sm">
                <TabHeader text="Questions" active={currentTab === 'questions'} switchSectionTab={() => switchSectionTab('questions')}></TabHeader>
                <TabHeader text="Comments" active={currentTab === 'comments'} switchSectionTab={() => switchSectionTab('comments')}></TabHeader>
            </ul>
        </div>
        <div className="clearfix"></div>
    </div>
);

Header.propTypes = {
    currentTab: PropTypes.string,
    switchSectionTab: PropTypes.func.isRequired
};

export default Header;
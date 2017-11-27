import React, { PropTypes } from 'react';

const Header = ({ currentTab, changeTab }) => (
    <div className="mar-top mar-btm row">
        <div className="col-lg-10">
            <ul className="nav nav-pills tabs pad-top-sm mar-top-sm">
                <li
                    id="responses"
                    className={`${currentTab === 'responses'
                        ? 'selected'
                        : ''}`}
                    onClick={changeTab}>
                    Responses
                </li>
                <li
                    id="reports"
                    className={`${currentTab === 'reports' ? 'selected' : ''}`}
                    onClick={changeTab}>
                    Responses
                </li>
            </ul>
        </div>
        <div className="clearfix" />
    </div>
);

Header.propTypes = {
    currentTab: PropTypes.string,
    changeTab: PropTypes.func.isRequired
};

export default Header;

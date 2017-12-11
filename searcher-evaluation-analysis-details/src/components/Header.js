import React, { PropTypes } from 'react';

const Header = ({ currentTab, changeTab }) => (
    <div className="mar-btm row">
        <div className="col-lg-10 bor-btm-no">
            <ul className="nav nav-pills tab-pills">
                <li>
                    <a
                        id="responses"
                        onClick={changeTab}
                        className={`font-sm ${currentTab === 'responses'
                            ? 'selected'
                            : ''}`}>
                        Responses
                    </a>
                </li>
                <li>
                    <a
                        id="reports"
                        onClick={changeTab}
                        className={`font-sm ${currentTab === 'reports'
                            ? 'selected'
                            : ''}`}>
                        Reports
                    </a>
                </li>
            </ul>
        </div>
        <div className="clearfix" />
    </div>
);

Header.propTypes = {
    currentView: PropTypes.string,
    currentTab: PropTypes.string,
    changeTab: PropTypes.func.isRequired
};

export default Header;

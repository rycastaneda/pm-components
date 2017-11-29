import React, { PropTypes } from 'react';

const Header = ({ currentTab, changeTab }) => (
    <div className="mar-btm row">
        <div className="pmnav col-lg-10 bor-btm-no">
            <ul className="nav nav-pills pad-top-sm mar-top-sm">
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
    currentTab: PropTypes.string,
    changeTab: PropTypes.func.isRequired
};

export default Header;

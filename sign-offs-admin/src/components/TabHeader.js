import React, { PropTypes } from 'react';

const TabHeader = ({ text, active, switchSectionTab }) => (
    <li className="pointer" onClick={switchSectionTab}>
        <i className={`fa fa-chevron-${active ? 'down' : 'right'}`}></i> 
        <span>{text}</span>
    </li>
);

TabHeader.propTypes = {
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    switchSectionTab: PropTypes.func.isRequired
};

export default TabHeader;
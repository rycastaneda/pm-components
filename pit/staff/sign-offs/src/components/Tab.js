import React, { PropTypes } from 'react';

const Tab = ({ text, active, switchTab }) => (
    <div className="pointer" onClick={switchTab}>
        <i className={`fa fa-chevron-${active ? 'down' : 'right'}`}></i> 
        {text}
    </div>
);

Tab.propTypes = {
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    switchTab: PropTypes.func.isRequired
};

export default Tab;
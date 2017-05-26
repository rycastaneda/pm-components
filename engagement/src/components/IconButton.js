import React, { PropTypes } from 'react';

const IconButton = ({ title, onClick, classNames, iconClass, iconPlacement }) => (
    <button
        className={classNames}
        onClick={onClick}
    >
        {iconPlacement==='left' && <i className={iconClass}></i>}
        {title}
        {iconPlacement==='right' && <i className={iconClass}></i>}
    </button>
);

IconButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classNames: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    iconPlacement: PropTypes.string.isRequired
};

export default IconButton;

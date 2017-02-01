import React, { PropTypes } from 'react';

const IconButton = ({ title, onClick, classNames, iconClass }) => (
    <button
        className={classNames}
        onClick={onClick}
    >
        <i className={iconClass}></i>
        {title}
    </button>
);

IconButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classNames: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired
};

export default IconButton;

import React, { PropTypes } from 'react';

const Loader = ({ block, icon = '' }) => {
    const mainClass = block && 'loader-block' || 'loader';

    return (
        <div className={mainClass}>
            <div className={mainClass + '__backdrop'}></div>
            <i className={`${mainClass}__spinner${icon} fa fa-spin fa-spinner`}></i>
        </div>
    );
};

Loader.propTypes = {
    block: PropTypes.bool,
    icon: PropTypes.string
};

export default Loader;


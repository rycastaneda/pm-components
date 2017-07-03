import React, { PropTypes } from 'react';

const Loader = ({ block }) => {
    const mainClass = block && 'loader-block' || 'loader';

    return (
        <div className={mainClass}>
            <div className="backdrop"></div>
            <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        </div>
    );
};

Loader.propTypes = {
    block: PropTypes.bool
};

export default Loader;

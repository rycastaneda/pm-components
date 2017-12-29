import React, { PropTypes } from 'react';

const Loader = ({ block, icon = '' }) => {
    const mainClass = (block && 'loader-block') || 'loader';

    return (
        <div className={mainClass}>
            <div className={mainClass + '__backdrop'} />
            <div className="loading-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
            </div>
        </div>
    );
};

Loader.propTypes = {
    block: PropTypes.bool,
    icon: PropTypes.string
};

export default Loader;

import React, { PropTypes } from 'react';

const Loader = ({ block }) => {
    const mainClass = (block && 'loader-block') || 'loader';

    return (
        <div className="row">
            <div className="col-sm-12">
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
            </div>
        </div>
    );
};

Loader.propTypes = {
    block: PropTypes.bool,
    icon: PropTypes.string
};

export default Loader;

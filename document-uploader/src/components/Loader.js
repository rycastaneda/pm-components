import React, { PropTypes } from 'react';

const Loader = ({ loading }) => {
    return loading ? (
        <div className="loader">
            <div className="backdrop"></div>
            <i className="actions fa fa-spin fa-spinner"></i>
        </div>
    ) : (<div></div>);
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loader;


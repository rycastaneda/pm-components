import React, { PropTypes } from 'react';

const Counters = ({ counters }) => {
    return (
        <div>
            <span className="mar-r-sm badge badge-success">{counters.approved}</span>
            <span className="mar-r-sm badge badge-danger">{counters.rejected}</span>
            <span className="mar-r-sm badge badge-warning">{counters.inprogress}</span>
            <span className="mar-r-sm badge badge-info">{counters.pending}</span>
        </div>
    );
};

Counters.propTypes = {
    counters: PropTypes.shape({ 
        pending: PropTypes.number.isRequired, 
        rejected: PropTypes.number.isRequired,
        approved: PropTypes.number.isRequired,
        inprogress: PropTypes.number.isRequired
    })
};

export default Counters;


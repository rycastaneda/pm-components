import React, { PropTypes } from 'react';
import CounterBadge from './CounterBadge';
const Counters = ({ counters }) => (
    <div>
        <CounterBadge status="approved" count={counters.approved} />
        <CounterBadge status="rejected" count={counters.rejected} />
        <CounterBadge status="in progress" count={counters.inprogress} />
        <CounterBadge status="pending" count={counters.pending} />
    </div>
);

Counters.propTypes = {
    counters: PropTypes.shape({ 
        pending: PropTypes.number.isRequired, 
        rejected: PropTypes.number.isRequired,
        approved: PropTypes.number.isRequired,
        inprogress: PropTypes.number.isRequired
    })
};

export default Counters;


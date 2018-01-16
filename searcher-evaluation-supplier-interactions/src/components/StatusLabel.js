import React from 'react';
import PropTypes from 'prop-types';
import { Statuses, StatusesColors } from './Statuses';


const StatusLabel = ({ status, type }) => (
    <span className={`bs-label ${type === 'Message' ? 'bs-label-success' : StatusesColors[type][status]}`}>
        {type === 'Message' ? 'Sent' : Statuses[type][status]}
    </span>
);

StatusLabel.propTypes = {
    status: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    type: PropTypes.string.isRequired,
};

export default StatusLabel;

import React, { PropTypes } from 'react';
import {
    PENDING,
    IN_PROGRESS,
    APPROVED,
    DECLINED
} from '../constants/ActionTypes';
import Select from 'react-select';

const StatusDropdown = ({ selectedStatus, onStatusChange }) => {
    const options = [
        {
            value: PENDING,
            label: 'Pending'
        },
        {
            value: IN_PROGRESS,
            label: 'In Progress'
        },
        {
            value: APPROVED,
            label: 'Approved'
        },
        {
            value: DECLINED,
            label: 'Declined'
        }
    ];

    return (
        <Select
            multi={true}
            options={options}
            value={selectedStatus}
            onChange={onStatusChange}
        />
    );
};

StatusDropdown.propTypes = {
    selectedStatus: PropTypes.array.isRequired,
    onStatusChange: PropTypes.func.isRequired
};

export default StatusDropdown;

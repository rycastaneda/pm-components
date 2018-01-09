import React, { PropTypes } from 'react';
import { options } from '../constants';
import Select from 'react-select';

const StatusDropdown = ({ selectedStatus, onStatusChange }) => {
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

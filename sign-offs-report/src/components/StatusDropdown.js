import React, { PropTypes } from 'react';
import { options } from '../constants';
import Select from 'react-select';

const StatusDropdown = ({ selectedStatus, onStatusChange }) => {
    const valueRender = option => {
        return <span className="mar-l-sm">{option.label}</span>;
    };

    return (
        <Select
            valueRenderer={valueRender}
            backspaceToRemoveMessage=""
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

import React, { PropTypes } from 'react';
import { prefStatus } from '../constants/supplierStatus';
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
            options={Object.values(prefStatus)}
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

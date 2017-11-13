import React, { PropTypes } from 'react';
import Select from 'react-select';

const StaffDropdown = ({ staff, isLoading, selectedStaff, onStaffChange }) => {
    return (
        <Select
            className="staff-dropdown"
            options={staff}
            value={selectedStaff}
            onChange={onStaffChange}
            isLoading={isLoading}
        />
    );
};

StaffDropdown.propTypes = {
    staff: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    selectedStaff: PropTypes.number.isRequired,
    onStaffChange: PropTypes.func.isRequired
};

export default StaffDropdown;

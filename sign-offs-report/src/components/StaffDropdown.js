import React, { PropTypes } from 'react';
import Select from 'react-select';

const StaffDropdown = ({ staff, selectedStaff, onStaffChange }) => {
    return (
        <Select
            className="staff-dropdown"
            options={staff}
            value={selectedStaff}
            onChange={onStaffChange}
            isLoading={!staff.length}
        />
    );
};

StaffDropdown.propTypes = {
    staff: PropTypes.array.isRequired,
    selectedStaff: PropTypes.number.isRequired,
    onStaffChange: PropTypes.func.isRequired
};

export default StaffDropdown;

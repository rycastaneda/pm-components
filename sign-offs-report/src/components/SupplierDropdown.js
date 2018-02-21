import React, { PropTypes } from 'react';
import Select from 'react-select';

const SupplierDropdown = ({
    suppliers,
    selectedSupplier,
    onSupplierChange
}) => {
    return (
        <Select
            className="staff-dropdown"
            options={suppliers}
            value={selectedSupplier}
            onChange={onSupplierChange}
            isLoading={!suppliers.length}
        />
    );
};

SupplierDropdown.propTypes = {
    suppliers: PropTypes.array.isRequired,
    selectedSupplier: PropTypes.number.isRequired,
    onSupplierChange: PropTypes.func.isRequired
};

export default SupplierDropdown;

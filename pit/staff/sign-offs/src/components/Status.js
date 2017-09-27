import React, { PropTypes } from 'react';
import Select from 'react-select';

const Status = ({ status, toggleStatus }) => (
    <Select 
        name="status"
        value={status}
        options={['approved', 'pending', 'in progress', 'not approved']}
        onChange={toggleStatus}
        />
);

Status.propTypes = {
    status: PropTypes.string.isRequired,
    toggleStatus: PropTypes.func.isRequired
};

export default Status;
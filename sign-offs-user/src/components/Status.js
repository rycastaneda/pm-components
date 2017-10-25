import React, { PropTypes } from 'react';
import Select from 'react-select';

const Status = ({ status, toggleSectionStatus }) => {
    const renderer = (option) => {
        return (
            <p className="col-header">
                <i className={`fa ${option.icon}`}></i>
                <span className="mar-l-sm col-grey-1">{option.label}</span>
            </p>
        );
    };

    return (
        <Select 
            name="status"
            placeholder="Set status"
            clearable={false}
            searchable={false}
            value={status.toLowerCase()}
            options={[
                { icon: 'fa-check bs-callout-success', label: 'Approved', value: 'approved' }, 
                { icon: 'fa-gear bs-callout-warning', label: 'In progress', value: 'in progress' }, 
                { icon: 'fa-times bs-callout-danger', label: 'Not Approved', value: 'not approved' }
            ]}
            optionRenderer={renderer}
            valueRenderer={renderer}
            onChange={toggleSectionStatus}/>
    );
};

Status.propTypes = {
    status: PropTypes.string.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired
};

export default Status;
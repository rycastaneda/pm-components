import React, { PropTypes } from 'react';
import Select from 'react-select';

const Status = ({ statusId, toggleSectionStatus }) => {
    const renderer = option => {
        return (
            <p className="col-header">
                <i className={`fa ${option.icon}`} />
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
            value={statusId}
            options={[
                {
                    icon: 'fa-gear bs-callout-warning',
                    label: 'In progress',
                    value: 1
                },
                {
                    icon: 'fa-check bs-callout-success',
                    label: 'Approved',
                    value: 2
                },
                {
                    icon: 'fa-times bs-callout-danger',
                    label: 'Declined',
                    value: 3
                }
            ]}
            optionRenderer={renderer}
            valueRenderer={renderer}
            onChange={toggleSectionStatus}
        />
    );
};

Status.propTypes = {
    statusId: PropTypes.number.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired
};

export default Status;

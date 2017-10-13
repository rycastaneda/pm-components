import React, { PropTypes } from 'react';
import Select from 'react-select';

const Status = ({ staffs, addStaff }) => {
    const renderer = (option) => {
        return (
            <p className="col-header">
                <span className="mar-l-sm col-grey-1">{option.name}</span>
            </p>
        );
    };

    return (
        <Select 
            name="status"
            placeholder="Add staff to the section"
            options={staffs}
            optionRenderer={renderer}
            valueRenderer={renderer}
            onChange={addStaff}/>
    );
};

Status.propTypes = {
    staffs: PropTypes.array.isRequired,
    addStaff: PropTypes.func.isRequired
};

export default Status;
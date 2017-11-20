import React, { PropTypes } from 'react';
import Select from 'react-select';

const StaffDropdown = ({ staffs, addStaffResponse, fetchStaff, isLoading }) => {
    const renderer = option => {
        return (
            <p className="col-header">
                <span className="mar-l-sm col-grey-1">{option.label}</span>
            </p>
        );
    };

    return (
        <div className="row">
            <div className="col-sm-11">
                <Select
                    isLoading={isLoading}
                    placeholder="Add staff to the section"
                    options={staffs}
                    optionRenderer={renderer}
                    valueRenderer={renderer}
                    onChange={addStaffResponse}
                    searchable={true}
                />
            </div>
            <div className="col-sm-1">
                <i
                    className="fa fa-refresh pointer mar-top-10"
                    onClick={() => fetchStaff(true)}
                />
            </div>
        </div>
    );
};

StaffDropdown.propTypes = {
    staffs: PropTypes.array.isRequired,
    addStaffResponse: PropTypes.func.isRequired,
    fetchStaff: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default StaffDropdown;

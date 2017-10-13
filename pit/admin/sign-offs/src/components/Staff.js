import React, { PropTypes } from 'react';
import Select from 'react-select';

const Staff = ({ name, status, toggleSectionStatus, deleteStaff }) => {
    const renderer = (option) => {
        return (
            <p className="col-header">
                <i className={`fa ${option.icon}`}></i>
                <span className="mar-l-sm col-grey-1">{option.label}</span>
            </p>
        );
    };

    return (
        <div className="row mar-top-sm">
            <div className="col-lg-6">
               <label>{name}</label>
            </div>
            <div className="col-lg-5">
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
            </div>
            <div className="col-lg-1">
                <i className="fa fa-times mar-top-10" onClick={deleteStaff}></i>
            </div>
        </div>
    );
};

Staff.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired
};

export default Staff;
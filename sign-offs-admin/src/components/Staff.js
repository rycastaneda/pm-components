import React, { PropTypes } from 'react';
import Select from 'react-select';
import Loader from '../components/Loader';

const Staff = ({ name, status, toggleSectionStatus, deleteStaffResponse, isLoading }) => {
    const renderer = (option) => {
        return (
            <p className="col-header">
                <i className={`fa ${option.icon}`}></i>
                <span className="mar-l-sm col-grey-1">{option.label}</span>
            </p>
        );
    };

    return (
        <li className="mar-top-sm pos-relative">
            <div className="row">
                <div className="col-sm-4">
                    <label className="mar-top-10">{name}</label>
                </div>
                <div className="col-sm-7">
                    <Select name="status"
                        placeholder="Set status"
                        clearable={false}
                        searchable={false}
                        value={status.toLowerCase()}
                        options={[
                            { icon: 'fa-check label-text-success', label: 'Approved', value: 'approved' }, 
                            { icon: 'fa-gear label-text-warning', label: 'In progress', value: 'in progress' }, 
                            { icon: 'fa-times label-text-danger', label: 'Not Approved', value: 'not approved' }
                        ]}
                        optionRenderer={renderer}
                        valueRenderer={renderer}
                        onChange={toggleSectionStatus}/>
                </div>
                <div className="col-sm-1">
                    {isLoading ? 
                        <i className="fa fa-spinner mar-top-10 fa-spin"></i> 
                    : <i className="fa fa-times mar-top-10 delete-staff pointer" onClick={deleteStaffResponse}></i>}
                </div>         
            </div>
        </li>
    );
};

Staff.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    toggleSectionStatus: PropTypes.func.isRequired,
    deleteStaffResponse: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Staff;
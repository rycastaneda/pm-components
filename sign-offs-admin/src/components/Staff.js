import React, { PropTypes } from 'react';
import Select from 'react-select';
import { IN_PROGRESS, APPROVED, DECLINED } from '../constants';
import { includes } from 'lodash';

const Staff = ({
    name,
    statusId,
    toggleSectionStatus,
    deleteStaffResponse,
    isLoading
}) => {
    const renderer = option => {
        return (
            <p className="col-header">
                <i className={`fa ${option.icon}`} />
                <span className="mar-l-sm col-grey-1">{option.label}</span>
            </p>
        );
    };

    const deleteAction = !includes([APPROVED, DECLINED], statusId) ? (
        <i
            className="fa fa-times mar-top-10 delete-staff pointer"
            onClick={deleteStaffResponse}
        />
    ) : null;

    return (
        <li className="mar-top-sm pos-relative">
            <div className="row">
                <div className="col-sm-4">
                    <label className="mar-top-10">{name}</label>
                </div>
                <div className="col-sm-7">
                    <Select
                        name="status"
                        placeholder="Set status"
                        clearable={false}
                        searchable={false}
                        value={statusId}
                        options={[
                            {
                                icon: 'fa-check label-text-success',
                                label: 'Approved',
                                value: APPROVED
                            },
                            {
                                icon: 'fa-gear label-text-warning',
                                label: 'In progress',
                                value: IN_PROGRESS
                            },
                            {
                                icon: 'fa-times label-text-danger',
                                label: 'Declined',
                                value: DECLINED
                            }
                        ]}
                        optionRenderer={renderer}
                        valueRenderer={renderer}
                        onChange={toggleSectionStatus}
                    />
                </div>
                <div className="col-sm-1">
                    {isLoading ? (
                        <i className="fa fa-spinner mar-top-10 fa-spin" />
                    ) : (
                        deleteAction
                    )}
                </div>
            </div>
        </li>
    );
};

Staff.propTypes = {
    name: PropTypes.string.isRequired,
    statusId: PropTypes.number,
    toggleSectionStatus: PropTypes.func.isRequired,
    deleteStaffResponse: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Staff;

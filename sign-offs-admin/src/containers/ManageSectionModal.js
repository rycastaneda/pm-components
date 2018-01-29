import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { toggleManageSectionModal } from '../actions/section';

import {
    deleteStaffResponse,
    addStaffResponse,
    changeStaffResponse
} from '../actions/staff';

import StaffDropdown from '../components/StaffDropdown';
import Staff from '../components/Staff';
import { difference } from 'lodash';

class ManageSectionModal extends Component {
    constructor(props) {
        super(props);
        this.previousSection = null;
    }

    componentDidUpdate() {
        const { section } = this.props;

        if (
            this.previousSection &&
            this.previousSection.isShown &&
            section.isShown
        ) {
            // if isShown remains unchanged, dont toggle animations
            return;
        }
        // show the elements
        this.modal.className = `modal fade show`;
        this.drop.className = `modal-backdrop fade`;

        this.previousSection = section;
        if (!section) {
            // closing the modal, hide modal and drop again
            setTimeout(() => this.toggleOpacityAnimation(false), 300); // element hides instantly; need significant delay
            return;
        }

        // toggle the opacity animation; wrap into timeout for seamless animation
        setTimeout(() => this.toggleOpacityAnimation(section.isShown));
    }

    toggleOpacityAnimation(isShown) {
        this.modal.className = `modal fade ${isShown ? 'show in' : ''}`;
        this.drop.className = `modal-backdrop fade ${isShown
            ? 'in'
            : 'hidden'}`;
    }

    render() {
        const {
            section,
            assignedStaffs,
            unassignedStaffs,
            dispatch,
            isLoading
        } = this.props;
        const staffs = assignedStaffs.map(staff => {
            return (
                <Staff
                    key={staff.id}
                    {...staff}
                    deleteStaffResponse={() =>
                        dispatch(
                            deleteStaffResponse(
                                section.id,
                                staff.id,
                                staff.responseId
                            )
                        )}
                    toggleSectionStatus={newStatus => {
                        dispatch(
                            changeStaffResponse(
                                staff.id,
                                staff.responseId,
                                newStatus.value,
                                newStatus.label
                            )
                        );
                    }}
                />
            );
        });

        return (
            <div>
                <div ref={ref => (this.modal = ref)} className={`modal fade`}>
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() =>
                                        dispatch(
                                            toggleManageSectionModal(
                                                +section.id
                                            )
                                        )}>
                                    <span aria-hidden="true">×</span>
                                </button>
                                <div className="modal-title">Manage Staff</div>
                            </div>
                            <div className="modal-body pos-relative">
                                <div className="row">
                                    <div className="col-sm-1" />
                                    <div className="col-sm-10 col-sm-offest-1">
                                        <StaffDropdown
                                            isLoading={isLoading}
                                            staffs={unassignedStaffs}
                                            addStaffResponse={staff =>
                                                dispatch(
                                                    addStaffResponse(
                                                        section.id,
                                                        staff.value
                                                    )
                                                )}
                                        />
                                        <div
                                            className={`${assignedStaffs.length >=
                                            12
                                                ? 'staff-lists'
                                                : ''}`}>
                                            <ul className="mar-top pos-relative">
                                                {staffs}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="db-function mar-left-sm"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        dispatch(
                                            toggleManageSectionModal(section.id)
                                        )}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={ref => (this.drop = ref)}
                    className={`modal-backdrop fade `}
                />
            </div>
        );
    }
}

ManageSectionModal.propTypes = {
    section: PropTypes.object,
    assignedStaffs: PropTypes.array.isRequired,
    unassignedStaffs: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    const {
        sections: rawSections,
        response: rawResponse,
        staff: rawStaff
    } = state;
    if (!ownProps.sectionId) {
        return {
            section: null,
            assignedStaffs: [],
            unassignedStaffs: [],
            isLoading: rawStaff.isLoading
        };
    }

    const section = rawSections.byId[ownProps.sectionId];

    const responses = section.responseIds.map(responseId => {
        return {
            ...rawResponse.byId[responseId],
            responseId
        };
    });

    const assignedStaffIds = responses.map(response => response.staffId);
    const unassignedStaffIds = difference(rawStaff.allIds, assignedStaffIds);

    const assignedStaffs = responses.map(response => {
        const staff = rawStaff.byId[response.staffId];
        return {
            ...rawStaff.byId[response.staffId],
            name: `${staff.first_name} ${staff.last_name}`,
            responseId: response.responseId,
            statusId: response.statusId,
            status: response.status
        };
    });

    const unassignedStaffs = unassignedStaffIds
        .map(staffId => {
            const staff = rawStaff.byId[staffId];
            const label = [staff.first_name, staff.last_name].join(' ');
            return {
                label,
                value: staffId
            };
        })
        .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

    return {
        section,
        assignedStaffs,
        unassignedStaffs,
        needsFetching: rawStaff.needsFetching,
        isLoading: rawStaff.isLoading
    };
}

export default connect(mapStateToProps)(ManageSectionModal); // adds dispatch prop

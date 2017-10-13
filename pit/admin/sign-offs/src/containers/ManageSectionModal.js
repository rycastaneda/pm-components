import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { toggleManageSectionModal, deleteStaff, addStaff, toggleStaffStatus  } from '../actions';
import StaffDropdown from '../components/StaffDropdown';
import Staff from '../components/Staff';
import { difference } from 'lodash';

class ManageSectionModal extends Component {
    constructor(props) {
        super(props);
        console.log("props", props); // eslint-disable-line no-console, quotes
    }

    componentDidUpdate() {
        const { section } = this.props;

        // show the elements
        this.modal.className = `modal fade show`; 
        this.drop.className = `modal-backdrop fade`; 

        if (!section) { // closing the modal, hide modal and drop again
            setTimeout(() => this.toggleOpacityAnimation(false), 300); // element hides instantly; need significant delay
            return;
        }

        // toggle the opacity animation; wrap into timeout for seamless animation
        setTimeout(() => this.toggleOpacityAnimation(section.isShown));

    }

    toggleOpacityAnimation(isShown) {
        this.modal.className = `modal fade ${isShown ? 'show in' : ''}`;
        this.drop.className = `modal-backdrop fade ${isShown ? 'in' : 'hidden'}`;
    }

    render() {
        const { section, assignedStaffs, unassignedStaffs, dispatch } = this.props;
        const staffs = assignedStaffs.map((staff) => {
            return <Staff key={staff.id} {...staff} 
                deleteStaff={staffId => dispatch(deleteStaff(section.id, staffId))}
                toggleSectionStatus={staffId => dispatch(toggleStaffStatus(section.id, staffId))}/>;
        });

        return (
            <div>
                <div ref={ref => this.modal = ref } className={`modal fade`}>
                    <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={() => dispatch(toggleManageSectionModal(section.id))}><span aria-hidden="true">×</span></button>
                                <div className="modal-title">Manage Staff</div>
                            </div>
                            <div className="modal-body ">
                                <StaffDropdown staffs={unassignedStaffs} addStaff={staff => dispatch(addStaff(section.id, staff.id))}/>
                                <div className="well mar-top">{staffs}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="db-function mar-left-sm" data-dismiss="modal" onClick={() => dispatch(toggleManageSectionModal(section.id))}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={ref => this.drop = ref } className={`modal-backdrop fade hidden`}>
                </div> 
            </div>
        );
    }
}

ManageSectionModal.propTypes = {
    section: PropTypes.object,
    assignedStaffs: PropTypes.array.isRequired,
    unassignedStaffs: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    const {
        sections: rawSections,
        staff: rawStaff
    } = state;

    if (!ownProps.sectionId) {
        return {
            section: null,
            assignedStaffs: [],
            unassignedStaffs: []
        };
    }

    const section = rawSections.byId[ownProps.sectionId];

    const assignedStaffIds = Object.keys(section.responses).map(staffId => +staffId);
    const unassignedStaffIds = difference(rawStaff.allIds, assignedStaffIds);

    const assignedStaffs = assignedStaffIds.map((staffId) => {
        return { 
            ...rawStaff.byId[staffId],
            status: section.responses[staffId]
        };
    });
    const unassignedStaffs = unassignedStaffIds.map(staffId => rawStaff.byId[staffId]);


    return {
        section,
        assignedStaffs,
        unassignedStaffs,
        needsFetching: rawStaff.needsFetching
    };
}

export default connect(mapStateToProps)(ManageSectionModal);  // adds dispatch prop

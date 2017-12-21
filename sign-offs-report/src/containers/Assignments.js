import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchAssignments,
    fetchStaff,
    fetchComments,
    toggleCommentModal,
    toggleSupplierRow
} from '../actions/assignments';
import Filters from './Filters';
import Table from '../components/Table';
import PaginatePerPage from '../components/PaginatePerPage';
import CommentModal from './CommentModal';

export class Assignments extends Component {
    constructor(props) {
        super(props);
        this.quickSearch = this.quickSearch.bind(this);
        this.fetchAssignments = this.fetchAssignments.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.changeOrderBy = this.changeOrderBy.bind(this);
        this.changePage = this.changePage.bind(this);
        this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.toggleSupplierRow = this.toggleSupplierRow.bind(this);
    }

    componentDidMount() {
        const { parameters, dispatch, staff } = this.props;
        this.defaultFilters = parameters;
        this.fetchAssignments();
        if (!staff.data.length) {
            dispatch(fetchStaff());
        }
    }

    fetchAssignments(forDownload) {
        const { parameters, dispatch } = this.props;

        dispatch(fetchAssignments(parameters, forDownload));
    }

    clearFilters() {
        this.props.dispatch(fetchAssignments(this.defaultFilters));
    }

    changeFilters(filters) {
        this.props.dispatch(
            fetchAssignments({ ...this.props.parameters, filters })
        );
    }

    quickSearch(keyword) {
        this.props.dispatch(
            fetchAssignments({ ...this.props.parameters, keyword })
        );
    }

    changePage(page, perPage) {
        this.props.dispatch(
            fetchAssignments({
                ...this.props.parameters,
                page: page ? page.selected + 1 : this.props.parameters.page,
                perPage: perPage || this.props.parameters.perPage
            })
        );
    }

    toggleCommentsModal(event) {
        const { dispatch, currentAssignment } = this.props;

        dispatch(toggleCommentModal(event.target.id || currentAssignment.id));
    }

    toggleSupplierRow(supplierId) {
        const { dispatch } = this.props;

        dispatch(toggleSupplierRow(supplierId));
    }

    fetchComments() {
        const { dispatch, currentAssignment } = this.props;

        dispatch(
            fetchComments(
                currentAssignment.id,
                currentAssignment.sectionId,
                currentAssignment.preferredSupplierId
            )
        );
    }

    changeOrderBy(event) {
        const { orderByDirection } = this.props.parameters;
        this.props.dispatch(
            fetchAssignments({
                ...this.props.parameters,
                orderByField: event.target.id,
                orderByDirection: orderByDirection === 'asc' ? 'desc' : 'asc'
            })
        );
    }

    render() {
        const {
            keyword,
            filters,
            orderByField,
            orderByDirection,
            totalPage,
            perPage
        } = this.props.parameters;

        const { assignments, staff, isLoading, currentAssignment } = this.props;

        return (
            <div>
                <Filters
                    keyword={keyword}
                    selectedStaff={+filters.assignee}
                    status={filters.status}
                    staff={staff}
                    downloadAssignments={this.fetchAssignments}
                    quickSearch={this.quickSearch}
                    changeFilters={this.changeFilters}
                    clearFilters={this.clearFilters}
                />
                <Table
                    isLoading={isLoading}
                    data={assignments}
                    orderByDirection={orderByDirection}
                    orderByField={orderByField}
                    changeOrderBy={this.changeOrderBy}
                    toggleCommentsModal={this.toggleCommentsModal}
                    toggleSupplierRow={this.toggleSupplierRow}
                />

                <PaginatePerPage
                    pageCount={totalPage}
                    onPageChange={this.changePage}
                    onPerPageChange={event => {
                        this.changePage(null, +event.target.value);
                    }}
                    perPage={perPage}
                />
                <CommentModal
                    assignment={currentAssignment}
                    toggleCommentModal={this.toggleCommentsModal}
                    fetchComments={this.fetchComments}
                />
            </div>
        );
    }
}

Assignments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    parameters: PropTypes.shape({
        error: PropTypes.string,
        orderByField: PropTypes.string,
        orderByDirection: PropTypes.string,
        keyword: PropTypes.string,
        filters: PropTypes.object,
        page: PropTypes.number,
        perPage: PropTypes.number,
        totalPage: PropTypes.number
    }),
    isLoading: PropTypes.bool.isRequired,
    assignments: PropTypes.array,
    staff: PropTypes.object,
    currentAssignment: PropTypes.object
};

function mapStateToProps(state) {
    const {
        ui,
        assignments: rawAssignments,
        suppliers: rawSuppliers,
        staff: rawStaff,
        comments: rawComments
    } = state;

    let assignments = rawSuppliers.allIds.map(supplierId => {
        let supplier = rawSuppliers.byId[supplierId];
        supplier.assignments = supplier.assignmentIds.map(
            assignmentId => rawAssignments.byId[assignmentId]
        );
        return supplier;
    });

    let staff = {
        data: rawStaff.allIds
            .map(staffId => {
                const staff = rawStaff.byId[staffId];
                return {
                    label: `${staff.first_name} ${staff.last_name}`,
                    value: staff.user_id
                };
            })
            .sort(
                (a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0)
            ),
        isLoading: rawStaff.isLoading
    };

    let currentAssignment;

    if (ui.currentAssignment) {
        const assignment = rawAssignments.byId[ui.currentAssignment];
        currentAssignment = {
            ...assignment,
            commentCount: assignment.comments,
            comments: assignment.commentIds.map(commentId => {
                const comment = rawComments.byId[commentId];
                const staff = rawStaff.byId[comment.staffId];
                return {
                    ...comment,
                    staff: [staff.first_name, staff.last_name].join(' ')
                };
            })
        };
    }

    return {
        parameters: { ...ui },
        assignments,
        staff,
        isLoading: rawAssignments.isLoading,
        currentAssignment
    };
}

export default connect(mapStateToProps)(Assignments); // adds dispatch prop

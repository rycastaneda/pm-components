import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchAssignments,
    fetchStaff,
    fetchComments,
    toggleCommentModal
} from '../actions/assignments';
import Filters from './Filters';
import Table from '../components/Table';
import PaginatePerPage from '../components/PaginatePerPage';
import CommentModal from './CommentModal';

class Assignments extends Component {
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
        console.log('this.defaultFilters', this.defaultFilters); // eslint-disable-line no-console, quotes
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
                />

                <PaginatePerPage
                    pageCount={totalPage}
                    onPageChange={this.changePage}
                    onPerPageChange={event => {
                        console.log('event', event); // eslint-disable-line no-console, quotes
                        console.log('event.target.value', event.target.value); // eslint-disable-line no-console, quotes
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
        staff: rawStaff,
        comments: rawComments
    } = state;
    let assignments = rawAssignments.allIds.map(reportId => {
        return rawAssignments.byId[reportId];
    });

    let staff = {
        data: rawStaff.allIds.map(staffId => {
            const staff = rawStaff.byId[staffId];
            return {
                label: `${staff.first_name} ${staff.last_name}`,
                value: staff.user_id
            };
        }),
        isLoading: rawStaff.isLoading
    };

    let currentAssignment;

    if (ui.currentAssignment) {
        const assignment = rawAssignments.byId[ui.currentAssignment];
        console.log('assignment', assignment); // eslint-disable-line no-console, quotes
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

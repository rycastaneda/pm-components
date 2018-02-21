import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchPreferredSuppliers,
    fetchStaff,
    toggleCommentModal,
    toggleSupplierRow
} from '../actions/preferredSuppliers';
import Filters from './Filters';
import { getPreferredSuppliers } from '../reducers/preferredSuppliers';
import Table from '../components/Table';
import PaginatePerPage from '../components/PaginatePerPage';
import CommentModal from './CommentModal';

export class PreferredSuppliers extends Component {
    constructor(props) {
        super(props);
        this.quickSearch = this.quickSearch.bind(this);
        this.fetchPreferredSuppliers = this.fetchPreferredSuppliers.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.changeOrderBy = this.changeOrderBy.bind(this);
        this.changePage = this.changePage.bind(this);
        this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
        this.toggleSupplierRow = this.toggleSupplierRow.bind(this);
    }

    componentDidMount() {
        const { parameters, dispatch, staff } = this.props;
        const parent = this.domRef.parentNode; // eslint-disable-line
        this.canViewAll = parent.getAttribute('data-view-all') === '1';
        this.defaultFilters = parameters;
        this.fetchPreferredSuppliers();
        if (!staff.data.length && this.canViewAll) {
            dispatch(fetchStaff());
        }
    }

    fetchPreferredSuppliers(canViewAll, forDownload) {
        const { parameters, dispatch } = this.props;

        dispatch(
            fetchPreferredSuppliers(
                { ...parameters, canViewAll: this.canViewAll },
                forDownload
            )
        );
    }

    clearFilters() {
        this.props.dispatch(
            fetchPreferredSuppliers({
                ...this.defaultFilters,
                filters: { assignee: '', status: [] }
            })
        );
    }

    changeFilters(filters) {
        this.props.dispatch(
            fetchPreferredSuppliers({ ...this.props.parameters, filters })
        );
    }

    quickSearch(keyword) {
        this.props.dispatch(
            fetchPreferredSuppliers({ ...this.props.parameters, keyword })
        );
    }

    changePage(page, perPage) {
        this.props.dispatch(
            fetchPreferredSuppliers({
                ...this.props.parameters,
                page: page ? page.selected + 1 : this.props.parameters.page,
                perPage: perPage || this.props.parameters.perPage
            })
        );
    }

    toggleCommentsModal(event) {
        const { dispatch, currentSection } = this.props;
        dispatch(toggleCommentModal(event.target.id || currentSection.id));
    }

    toggleSupplierRow(supplierId) {
        const { dispatch } = this.props;
        dispatch(toggleSupplierRow(supplierId));
    }

    changeOrderBy(event) {
        const { orderByDirection } = this.props.parameters;
        this.props.dispatch(
            fetchPreferredSuppliers({
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
            canViewAll,
            perPage
        } = this.props.parameters;

        const {
            preferredSuppliers,
            staff,
            suppliers,
            isLoading,
            currentSection
        } = this.props;

        return (
            <div ref={ref => (this.domRef = ref)}>
                <Filters
                    keyword={keyword}
                    selectedStaff={+filters.assignee}
                    status={filters.status}
                    selectedSupplier={filters.supplierId}
                    staff={staff}
                    suppliers={suppliers}
                    canViewAll={canViewAll}
                    downloadPreferredSuppliers={this.fetchPreferredSuppliers}
                    quickSearch={this.quickSearch}
                    changeFilters={this.changeFilters}
                    clearFilters={this.clearFilters}
                />
                <Table
                    isLoading={isLoading}
                    data={preferredSuppliers}
                    orderByDirection={orderByDirection}
                    orderByField={orderByField}
                    changeOrderBy={this.changeOrderBy}
                    toggleCommentsModal={this.toggleCommentsModal}
                    toggleSupplierRow={this.toggleSupplierRow}
                />

                {preferredSuppliers.length ? (
                    <PaginatePerPage
                        pageCount={totalPage}
                        onPageChange={this.changePage}
                        onPerPageChange={event => {
                            this.changePage(null, +event.target.value);
                        }}
                        perPage={perPage}
                    />
                ) : null}
                <CommentModal
                    id={+currentSection.id}
                    comments={currentSection.comments}
                    isShown={currentSection.isShown}
                    toggleCommentModal={this.toggleCommentsModal}
                />
            </div>
        );
    }
}

PreferredSuppliers.propTypes = {
    dispatch: PropTypes.func.isRequired,
    parameters: PropTypes.shape({
        error: PropTypes.string,
        orderByField: PropTypes.string,
        orderByDirection: PropTypes.string,
        keyword: PropTypes.string,
        filters: PropTypes.object,
        page: PropTypes.number,
        perPage: PropTypes.number,
        totalPage: PropTypes.number,
        canViewAll: PropTypes.bool.isRequired
    }),
    isLoading: PropTypes.bool.isRequired,
    suppliers: PropTypes.array,
    preferredSuppliers: PropTypes.array,
    staff: PropTypes.object,
    currentSection: PropTypes.object
};

function mapStateToProps(state) {
    const {
        ui,
        staff: rawStaff,
        preferredSuppliers: rawPrefSuppliers,
        suppliers: rawSuppliers,
        sections: rawSections,
        comments: rawComments
    } = state;

    let preferredSuppliers = getPreferredSuppliers(state);
    let suppliers = rawPrefSuppliers.allIds.map(supplierId => {
        let value = rawPrefSuppliers.byId[supplierId].supplierId;
        let label = rawSuppliers.byId[value].title;
        return {
            value: +supplierId,
            label
        };
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

    let currentSection = {
        id: false,
        comments: [],
        isShown: false
    };

    if (ui.currentSection) {
        const section = rawSections.byId[ui.currentSection];
        currentSection = {
            id: ui.currentSection,
            isShown: section.isShown,
            comments: section.commentIds.map(commentId => {
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
        preferredSuppliers,
        suppliers,
        staff,
        isLoading: ui.isLoading,
        currentSection
    };
}

export default connect(mapStateToProps)(PreferredSuppliers); // adds dispatch prop

import React, { PropTypes, Component } from 'react';
import SearchForm from '../components/SearchForm';
import StatusDropdown from '../components/StatusDropdown';
import StaffDropdown from '../components/StaffDropdown';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onStaffChange = this.onStaffChange.bind(this);
        this.quickSearch = this.quickSearch.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.state = {
            selectedStatus: this.props.status,
            selectedStaff: this.props.selectedStaff,
            showFilters: false
        };
    }

    componentDidMount() {
        this.initialState = this.state;
    }

    quickSearch(event) {
        event.preventDefault();
        this.props.quickSearch(this.searchRef.value);
    }

    changeFilters(event) {
        event.preventDefault();
        this.props.changeFilters({
            assigned_to: this.state.selectedStaff,
            status: this.state.selectedStatus
        });
    }

    onStatusChange(newOptions) {
        this.setState({
            selectedStatus: newOptions.map(option => option.value)
        });
    }

    onStaffChange(newStaff) {
        this.setState({
            selectedStaff: newStaff ? newStaff.value : 0
        });
    }

    toggleFilters() {
        this.setState({
            showFilters: !this.state.showFilters
        });
    }

    clearFilters() {
        this.setState({
            ...this.initialState,
            selectedStatus: [],
            showFilters: true
        });
        this.props.clearFilters();
    }

    render() {
        const {
            keyword,
            staff,
            canViewAll,
            downloadPreferredSuppliers
        } = this.props;

        return (
            <div className="panel panel-default pad-all">
                <div className="row">
                    <SearchForm
                        keyword={keyword}
                        showFilters={this.state.showFilters}
                        toggleFilters={this.toggleFilters}
                        quickSearch={this.quickSearch}
                        downloadPreferredSuppliers={downloadPreferredSuppliers}
                        searchRef={ref => (this.searchRef = ref)}
                    />

                    {this.state.showFilters ? (
                        <div className="col-xs-12 col-sm-12 col-md-12 mar-top-sm">
                            <form onSubmit={this.changeFilters}>
                                <div className="form-group status-selector">
                                    <label>Status</label>
                                    <StatusDropdown
                                        selectedStatus={
                                            this.state.selectedStatus
                                        }
                                        onStatusChange={this.onStatusChange}
                                    />
                                </div>
                                <div className="form-group staff-dropdown">
                                    <label>Assigned To</label>
                                    {canViewAll ? (
                                        <StaffDropdown
                                            staff={staff.data}
                                            isLoading={staff.isLoading}
                                            selectedStaff={
                                                this.state.selectedStaff
                                            }
                                            onStaffChange={this.onStaffChange}
                                        />
                                    ) : null}
                                </div>
                                <button className="btn mar-r-sm" type="submit">
                                    Apply Filters
                                </button>
                                <a className="btn" onClick={this.clearFilters}>
                                    Clear Filters
                                </a>
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

Filters.propTypes = {
    keyword: PropTypes.string,
    selectedStaff: PropTypes.number,
    status: PropTypes.array,
    staff: PropTypes.object,
    canViewAll: PropTypes.bool.isRequired,
    quickSearch: PropTypes.func.isRequired,
    changeFilters: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    downloadPreferredSuppliers: PropTypes.func.isRequired
};

export default Filters;

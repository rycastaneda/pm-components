import React, { PropTypes, Component } from 'react';
import Datetime from './PlantMinerDatetime';

class EvaluationAssignmentsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterShown: false,
            keywordSearch: '',
            selectedStatus: '',
            selectedLinkedTo: '',
            selectedDate: null
        };
        this.onSelectedDateChange = this.onSelectedDateChange.bind(this);
        this.onNormalSubmit = this.onNormalSubmit.bind(this);
        this.onAdvancedSubmit = this.onAdvancedSubmit.bind(this);
        this.onToggleFilter = this.onToggleFilter.bind(this);
    }

    onKeywordChange(val) {
        this.setState({ keywordSearch: val });
    }

    onSelectedStatusChange(val) {
        this.setState({ selectedStatus: val });
    }
    onSelectedLinkedToChange(val) {
        this.setState({ selectedLinkedTo: val });
    }
    onSelectedDateChange(date) {
        this.setState({ selectedDate: date });
    }

    onNormalSubmit() {
        this.setState({
            selectedStatus: '',
            selectedDate: null,
            isFilterShown: false
        });
        this.props.onSubmit(this.state.keywordSearch, null, null);
    }

    onAdvancedSubmit() {
        if (
            this.state.selectedStatus.length ||
            this.state.selectedDate !== null
        ) {
            let date =
                this.state.selectedDate !== null
                    ? this.state.selectedDate.toDate()
                    : null;
            this.props.onSubmit(
                this.state.keywordSearch,
                this.state.selectedStatus,
                date
            );
        }
    }
    onToggleFilter() {
        this.setState({ isFilterShown: !this.state.isFilterShown });
    }
    render() {        
        return (
            <div>
                <div className="panel panel-default pad-all">
                    <div className="row">
                        <div className="col-xs-6 col-md-4">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-search" />
                                </span>
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="Quick search"
                                    onChange={event =>
                                        this.onKeywordChange(
                                            event.target.value
                                        )}
                                />
                            </div>
                        </div>
                        <div className="col-xs-2 col-md-2">
                            <button
                                className="btn"
                                onClick={this.onNormalSubmit}>
                                Search
                            </button>
                        </div>
                        <div className="col-xs-4 col-md-6 align-right">
                            <button
                                className="btn pmfilters-toggle"
                                onClick={this.onToggleFilter}>
                                <i className="fa fa-sort-amount-desc" />
                                <span>
                                    {this.state.isFilterShown
                                        ? 'Hide Filters'
                                        : 'Show Filters'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.isFilterShown ? (
                    <div className="panel panel-default pad-all">
                        <div className="row">

                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Template</label>
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Assigned To</label>
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div><div className="col-xs-6">
                                <div>
                                    <label>Assigned on</label>
                                    <Datetime
                                        onSelectedDateChange={
                                            this.onSelectedDateChange
                                        }
                                        selectedDate={null}
                                    />
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Supplier Name</label>
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Linked to</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onSelectedLinkedToChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedLinkedTo}>
                                        {this.props.assignmentLinkedToList.map(
                                            (item, index) => (
                                                <option id={item.id} key={index}>
                                                    {item.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Active Status</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onSelectedStatusChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedStatus}>
                                        {this.props.assignmentStatusesList.map(
                                            (item, index) => (
                                                <option id={item.id} key={index}>
                                                    {item.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-12 pad-top align-right">
                                <ul className="list-inline">
                                    <li>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={this.onToggleFilter}>
                                            <i className="fa fa-ban" />Cancel
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-success"
                                            onClick={this.onAdvancedSubmit}>
                                            <i className="fa fa-check" />Submit
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

EvaluationAssignmentsFilter.propTypes = {
    assignmentStatusesList: PropTypes.array,
    assignmentLinkedToList: PropTypes.array,
    onSubmit: PropTypes.func.isRequired
};

export default EvaluationAssignmentsFilter;

import React, { PropTypes, Component } from 'react';
import Datetime from './PlantMinerDatetime';

class EvaluationAssignmentsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterShown: false,
            selectedStatus: '',
            selectedLinkedTo: '',
            selectedTemplate: '',
            selectedAssignedOn: null,
            selectedAssignedTo:'',
            selectedSupplier:''
        };
        this.onSelectedDateChange = this.onSelectedDateChange.bind(this);
        this.onSupplierChange = this.onSupplierChange.bind(this);
        this.onLinkedToChange = this.onLinkedToChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onAssignedToChange = this.onAssignedToChange.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onAdvancedSubmit = this.onAdvancedSubmit.bind(this);
        this.onToggleFilter = this.onToggleFilter.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onTemplateChange(val) {
        this.setState({ selectedTemplate: val });
    }
    onStatusChange(val) {
        this.setState({ selectedStatus: val });
    }
    onLinkedToChange(val) {
        this.setState({ selectedLinkedTo: val });
    }
    onSelectedDateChange(date) {
        // set date to null when cleared
        date = (date ==='')?null:date;
        this.setState({ selectedAssignedOn: date });
    }
    onAssignedToChange(val) {

        this.setState({ selectedAssignedTo: val });
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            if (this.state.isFilterShown) {
                this.onAdvancedSubmit();
            } else {
                this.onNormalSubmit();
            }

        }
    }

    onSupplierChange(index) {
        this.setState({ selectedSupplier: index });
    }
    onAdvancedSubmit() {

        let selectedAssignedOn =
            this.state.selectedAssignedOn !== null
                ? this.state.selectedAssignedOn.toDate()
                : null;
        let { selectedStatus,
                selectedLinkedTo,
                selectedTemplate,
                selectedAssignedTo,
                selectedSupplier
             } = this.state;

        let selectedEntityInstanceId = '';
        if (selectedSupplier!=='') {
            selectedEntityInstanceId = this.props.supplierList[selectedSupplier].userName;
            selectedSupplier = this.props.supplierList[selectedSupplier].id;
        }
        this.props.onSubmit(
            { selectedStatus,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedEntityInstanceId,
            selectedAssignedOn }
        );

    }
    onToggleFilter() {
        this.setState({ isFilterShown: !this.state.isFilterShown });
    }
    render() {

        let { evaluationTemplateList, assignedToList, assignmentStatusesList } = this.props;
        return (
            <div>

                    <div className="row mar-btm">
                        <div className="col-xs-12 col-md-12 align-right">
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
                {this.state.isFilterShown ? (
                    <div className="panel panel-default pad-all">
                        <div className="row">

                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Template</label>
                                    <select className = "form-control form-control-sm"
                                    value={this.state.selectedTemplate}
                                    onChange={event =>
                                        this.onTemplateChange(
                                            event.target.value
                                        )}>
                                        <option value={''} >None</option>
                                        {   evaluationTemplateList.map(item =>
                                            <option key={item.id} value={item.id}>{item.title}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Assigned To</label>
                                    <select className = "form-control form-control-sm"
                                        value={this.state.selectedAssignedTo}
                                        onChange={event =>
                                            this.onAssignedToChange(
                                                event.target.value
                                            )}>
                                        <option value={''} >Any Assignee</option>
                                        {   assignedToList.map(item =>
                                            <option key={item.id} value={item.id}>{item.firstName} {item.lastName}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div>
                                    <label>Date Assigned</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                        <Datetime
                                            placeholder="Any Date"
                                            onSelectedDateChange={
                                                this.onSelectedDateChange
                                            }
                                            selectedDate={null}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Linked to</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onLinkedToChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedLinkedTo}>
                                        <option value={''} >Any</option>
                                        {this.props.assignmentTypeList.map(
                                            (item, index) => (
                                                <option value={item.id} key={index}>
                                                    {item.title}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onStatusChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedStatus}>
                                        <option value={''} >Any Status</option>
                                        { assignmentStatusesList.map(
                                            (item, index) => (
                                                <option value={item.id} key={index}>
                                                    {item.title}
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
    evaluationTemplateList:PropTypes.array,
    assignmentStatusesList: PropTypes.array,
    assignmentLinkedToList: PropTypes.array,
    assignedToList: PropTypes.array,
    supplierList: PropTypes.array,
    assignmentTypeList: PropTypes.array,
    onSubmit: PropTypes.func.isRequired
};

export default EvaluationAssignmentsFilter;

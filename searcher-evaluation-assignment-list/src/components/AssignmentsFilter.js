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
        this.setState({ selectedAssignedOn: date });
    }
    onAssignedToChange(val) {

        this.setState({ selectedAssignedTo: val });
    }
    onSupplierChange(val) {

        this.setState({ selectedSupplier: val });
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
        this.props.onSubmit(
            { selectedStatus,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn }
        );

    }
    onToggleFilter() {
        this.setState({ isFilterShown: !this.state.isFilterShown });
    }
    render() {

        let { evaluationTemplateList, assignedToList, supplierList, assignmentStatusesList } = this.props;
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
                                        <option value={null} >None</option>
                                        {   evaluationTemplateList.map(item =>
                                            <option key={item.id} value={item.id}>{item.title}</option>)
                                        }
                                    </select>
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Assigned To</label>
                                    <select className = "form-control form-control-sm"
                                        value={this.state.selectedAssignedTo}
                                        onChange={event =>
                                            this.onAssignedToChange(
                                                event.target.value
                                            )}>
                                        <option value={null} >None</option>
                                        {   assignedToList.map(item =>
                                            <option key={item.id} value={item.id}>{item.firstName} {item.lastName}</option>)
                                        }
                                    </select>
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
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Supplier Name</label>
                                    <select className = "form-control form-control-sm"
                                    value={this.state.selectedSupplier}
                                    onChange={event =>
                                        this.onSupplierChange(
                                            event.target.value
                                        )}>
                                        <option value={null} >None</option>
                                        {   supplierList.map(item =>
                                            <option key={item.id} value={item.id}>{item.userName}</option>)
                                        }
                                    </select>
                                </div>
                            </div><div className="col-xs-6">
                                <div className="form-group">
                                    <label>Linked to</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onLinkedToChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedLinkedTo}>
                                        <option value={null} >None</option>
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
                                    <label>Active Status</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={event =>
                                            this.onStatusChange(
                                                event.target.value
                                            )}
                                        value={this.state.selectedStatus}>
                                        <option value={null} >None</option>
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

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import * as pmDateRangeActions from './PMDateRange/actions';
import PMDateRange from './PMDateRange/main';

class EvaluationTemplatesFilter extends Component {

    constructor(props) {
        super(props);
        this.state={ isFilterShown:false, keywordSearch:'', selectedStatus:'', selectedDate:null, selectedUser:null };
        this.onSelectedDateChange= this.onSelectedDateChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onNormalSubmit = this.onNormalSubmit.bind(this);
        this.onAdvancedSubmit = this.onAdvancedSubmit.bind(this);
        this.onToggleFilter = this.onToggleFilter.bind(this);
        this.onCancelFilter = this.onCancelFilter.bind(this);
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

    onCancelFilter() {
        this.props.dispatch(pmDateRangeActions.resetDateRange());
        this.onNormalSubmit();
    }

    onKeywordChange(event) {
        this.setState({ keywordSearch: event.target.value });
    }

    onSelectedStatusChange(val) {
        this.setState({ selectedStatus: val });
    }

    onSelectedDateChange(date) {
        // set date to null when cleared
        date = (date ==='')?null:date;
        this.setState({ selectedDate: date });
    }

    onNormalSubmit() {
        let { keywordSearch } = this.state;
        this.setState({ selectedStatus:'', selectedUser:null, selectedDate:null, isFilterShown:false });
        this.props.onSubmit(keywordSearch, null, null, null);
    }

    onAdvancedSubmit() {
        let { keywordSearch, selectedStatus, selectedUser, selectedDate } = this.state;
        let selectedUserId;
        if (selectedUser===null) {
            selectedUserId = '';
        } else {
            selectedUserId = selectedUser.id;
        }
        selectedStatus =(selectedStatus!=='active'&&selectedStatus!=='inactive')?null:selectedStatus;
        let date= selectedDate!==null&&selectedDate!==''? selectedDate.toDate():null;
        this.props.onSubmit(keywordSearch, selectedStatus, date, selectedUserId);
    }
    onToggleFilter() {
        let { isFilterShown } = this.state;
        isFilterShown = !isFilterShown;
        this.setState({ isFilterShown });
    }
    render() {

        return (
            <div>
                <div className="panel panel-default pad-all">
                    <div className="row">
                        <div className="col-xs-6 col-md-4">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-search"></i></span>
                                     <input type="text" name="search" className="form-control" placeholder="Quick search" onKeyPress={this.onKeyPress} onChange={this.onKeywordChange}/>
                             </div>
                        </div>
                       <div className="col-xs-2 col-md-2">
                            <button className="btn" onClick={this.onNormalSubmit} >Search</button>
                        </div>
                     <div className="col-xs-4 col-md-6 align-right">
                         <button className="btn pmfilters-toggle" onClick={this.onToggleFilter}><i className="fa fa-sort-amount-desc"></i><span>{this.state.isFilterShown?'Hide Filters':'Show Filters'}</span></button>
                     </div>
                 </div>
            </div>
            {this.state.isFilterShown? <div className="panel panel-default pad-all">
               <div className="row">
                    <div className="col-xs-4">
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-control form-control-sm" onChange={event => this.onSelectedStatusChange(event.target.value)} value={this.state.selectedStatus}>
                                {this.props.templateStatusesList.map(item => <option id={item} key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <PMDateRange />
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="form-group">
                            <label>Created By</label>
                            <Select
                                name="form-field-name"
                                value={this.state.selectedUser}
                                options={this.props.users}
                                noResultsText ={'No match found'}
                                placeholder = {'Any User'}
                                backspaceToRemoveMessage={''}
                                onChange={item =>
                                    this.setState({ selectedUser: item })} />

                       </div>
                    </div>
                    <div className="col-xs-12 pad-top align-right">
                          <ul className="list-inline">
                            <li>
                                <button type="button" className="btn btn-sm btn-danger" onClick={this.onCancelFilter}><i className="fa fa-ban"></i>Cancel</button>
                            </li>
                            <li>
                                <button type="submit" className="btn btn-sm btn-success" onClick={this.onAdvancedSubmit}><i className="fa fa-check"></i>Submit</button>
                            </li>
                            </ul>
                    </div>
               </div>
              </div>:null}
        </div>
   );
    }
}

EvaluationTemplatesFilter.propTypes = {
    templateStatusesList: PropTypes.array,
    users: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

export default connect(mapStateToProps)(EvaluationTemplatesFilter);
import React, { PropTypes, Component } from 'react';
import Datetime  from './PlantMinerDatetime';


class EvaluationTemplatesFilter extends Component {

    constructor(props) {
        super(props);
        this.state={ isFilterShown:false, keywordSearch:'', selectedStatus:'', selectedDate:null, selectedUserId:'' };
        this.onSelectedDateChange= this.onSelectedDateChange.bind(this);
        this.onNormalSubmit= this.onNormalSubmit.bind(this);
        this.onAdvancedSubmit= this.onAdvancedSubmit.bind(this);
        this.onToggleFilter= this.onToggleFilter.bind(this);
    }

    onKeywordChange(val) {
        this.setState({ keywordSearch: val });
    }

    onSelectedStatusChange(val) {
        this.setState({ selectedStatus: val });
    }
    onSelectedUserChange(val) {
        this.setState({ selectedUserId: val });
    }

    onSelectedDateChange(date) {
        this.setState({ selectedDate: date });
    }

    onNormalSubmit() {
        let { keywordSearch } = this.state;
        this.setState({ selectedStatus:'', selectedUserId:'', selectedDate:null, isFilterShown:false });
        this.props.onSubmit(keywordSearch, null, null, null);
    }

    onAdvancedSubmit() {
        let { keywordSearch, selectedStatus, selectedUserId, selectedDate } = this.state;
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
                                     <input type="text" name="search" className="form-control" placeholder="Quick search"  onChange={event => this.onKeywordChange(event.target.value)}/>
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
                    </div>
                    <div className="col-xs-4">
                        <div className="form-group">
                            <label>Created At</label>
                            <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                            <Datetime
                                onSelectedDateChange={this.onSelectedDateChange}
                                selectedDate={null}
                                />
                            </div>
                       </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="form-group">
                            <label>Created By</label>
                            <div className="input-group">
                                <select className="form-control form-control-sm" onChange={event => this.onSelectedUserChange(event.target.value)} value={this.state.selectedUserId}>
                                    <option value="">{'All Users'}</option>
                                    {
                                        this.props.users.map((user, index) => <option key={index} value={user.id} >{ `${user.lastName}, ${user.firstName}` }</option>)
                                    }
                                </select>
                            </div>
                       </div>
                    </div>
                    <div className="col-xs-12 pad-top align-right">
                          <ul className="list-inline">
                            <li>
                                <button type="button" className="btn btn-sm btn-danger" onClick={this.onToggleFilter}><i className="fa fa-ban"></i>Cancel</button>
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
    onSubmit: PropTypes.func.isRequired
};

export default EvaluationTemplatesFilter;

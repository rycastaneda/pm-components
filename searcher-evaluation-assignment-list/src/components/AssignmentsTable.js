import React, { PropTypes, Component } from 'react';

import ReactPaginate from 'react-paginate';
import Preloader from './PreloaderAnimation';
class AssignmentsTable extends Component {

    constructor(props) {
        super(props);
        this.actionDropdown= null;
        this.state= { menuVisibleItemId:null };
        this.hideMenu= this.hideMenu.bind(this);
        this.handlePageClick= this.handlePageClick.bind(this);
        this.onDropdownClickOutside = this.onDropdownClickOutside.bind(this);
        this.onMarkAsInProgressClick = this.onMarkAsInProgressClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.onDropdownClickOutside, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDropdownClickOutside, false);
    }
    onDropdownClickOutside(e) {
        this.clickedElement = e.target;
        if (this.actionDropdown) {
            if (!this.actionDropdown.contains(e.target)) {
                this.hideMenu();
            }
        }
    }

    toggleMenu(id) {
        if (this.state.menuVisibleItemId!== id) {
            this.setState({ menuVisibleItemId:id });
        }
    }
    handlePageClick({ selected }) {
        this.props.goToPage(selected+1);
    }
    renderStatus(status) {
        let styleClass = 'bs-label';
        switch (status.id) {
            case '1':
                styleClass = ' bs-label-danger';
                break;
            case '2':
                styleClass =' bs-label-warning';
                break;
            case '3':
                styleClass += ' bs-label-success';
                break;
        }
        return <span className={ styleClass }>{status.title}</span>;
    }
    hideMenu() {
        this.setState({ menuVisibleItemId:null });
    }
    onDeleteClick(id) {
        this.props.onAssignmentDelete(id);
        this.hideMenu();
    }
    onMarkAsInProgressClick(id) {
        this.props.onAssignmentMarkAsInProgress(id);
        this.hideMenu();
    }
    renderMoreButton(assignment) {
        let { id, complete_url, view_single_url, view_all_url, view_compare_url, isDeleteAllowed, isMarkInProgressAllowed } = assignment;
    
        if (this.state.menuVisibleItemId === id) {
            return (
            <div className="db-function-dropdown click"
                ref={(ul) => {
                    if (ul!==null) {
                        this.actionDropdown=ul;
                    }
                }}>
                <a className="db-function"
                    onClick={this.toggleMenu.bind(this, id)}
                    href="javascript:">
                    More &nbsp;
                    <i className="fa fa-caret-down" ></i>
                </a>
                <ul className="db-function-menu">
                    { isDeleteAllowed?
                        <li>
                            <a href="javascript:;"
                            onClick ={() => this.onDeleteClick(id)} >
                                <i className="fa fa-trash-o"></i> Delete
                            </a>
                        </li>
                        :null
                    }
                    { complete_url?
                        <li>
                            <a href={complete_url}>
                                <i className="fa fa-check"></i> Complete Evaluation
                            </a>
                        </li>
                        :null
                    }
                    { isMarkInProgressAllowed?
                        <li>
                            <a href="javascript:;" onClick={() => this.onMarkAsInProgressClick(id)} >
                            <i className="fa fa-clock-o"></i> Mark as in Progress</a>
                        </li>
                        :null
                    }
                    <li role="separator" className="divider"></li>
                    <li className="dropdown-header">Analysis</li>
                    <li role="separator" className="divider"></li>
                    <li>
                        <a href={view_single_url}>
                            <i className="fa fa-area-chart"></i> View Single
                        </a>
                    </li>
                    <li><a href={view_all_url}><i className="fa fa-pie-chart"></i> View All</a></li>
                    <li><a href={view_compare_url}><i className="fa fa-exchange"></i> View Comparison</a></li>
                </ul>
        </div>);
        } else {
            return (
                <div className="dropdown">
                    <a className="db-function"
                        onClick={this.toggleMenu.bind(this, id)}
                        href="javascript:">
                        More &nbsp;
                        <i className="fa fa-caret-down" ></i>
                    </a>
                </div>
            );
        }
    }
    render() {
        return (
        <div>
            <table className="table db-table db-table-sort">
            <thead>
                <tr>
                    <th>Date Assigned</th>
                    <th>Evaluation Template</th>
                    <th>Linked To</th>
                    <th>Assigned User</th>
                    <th>Supplier</th>
                    <th>Status</th>
                    <th>More</th>
                </tr>
            </thead>
            <tbody>
            { this.props.isBusy?
                <tr>
                    <td colSpan="7">
                        <Preloader />
                    </td>
                </tr>
                :
                this.props.tableData.length===0?
                <tr>
                    <td colSpan="10" className="text-center td-no-link">
                        Click 'Create Assignment' to create an evaluation assignment
                    </td>
                </tr>
                :this.props.tableData.map(item =>
                   <tr key={item.id}>
                   <td className="nowrap">
                       {item.assignedOn}
                   </td>
                   <td className="nowrap">
                       {item.evaluationTemplate.title}
                   </td>
                   <td className="nowrap">
                    {item.linkedTo.title} #{item.supplier.id}
                   </td>
                   <td className="nowrap">
                       {item.assignedUser.userName}
                   </td>

                   <td className="nowrap">
                       {item.supplier.title}
                   </td>
                   <td className="text-center nowrap">
                       {this.renderStatus(item.assignmentStatus)}
                   </td>
                   <td data-heading="More" className="td-center last">
                       {this.renderMoreButton(item)}
                   </td>
               </tr>
               )
            }
            </tbody>
            </table>
            <div className="row">
                <div className="col-sm-12 form-inline">
                    <select className="form-control" defaultValue={this.props.rowCount}
                        onChange={event => this.props.rowCountChange(event.target.value) }>
                        { this.props.rowCountList.map((item, index) =>
                            <option key={index}>{item}</option>
                        )}
                    </select>
                    &nbsp;
                    {this.props.totalPages > 1?
                        <ReactPaginate
                                  previousLabel={"previous"}
                                  nextLabel={"next"}
                                  breakLabel={<a href="">...</a>}
                                  breakClassName={"break-me"}
                                  pageCount={this.props.totalPages}
                                  forcePage= {this.props.currentPage-1}
                                  marginPagesDisplayed={2}
                                  pageRangeDisplayed={5}
                                  onPageChange={this.handlePageClick}
                                  containerClassName={"pagination"}
                                  subContainerClassName={"pages pagination"}
                                  activeClassName={"active"} />
                        :null
                    }
                    &nbsp;
                    <button className="btn btn-sm pull-right" onClick={() => this.props.onExportButtonClick() }>Export as CSV</button>
                </div>
            </div>
        </div>);
    }
}

AssignmentsTable.propTypes = {
    onAssignmentDelete:PropTypes.func.isRequired,
    onAssignmentMarkAsInProgress: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    rowCount: PropTypes.string.isRequired,
    totalPages:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    goToPage:PropTypes.func.isRequired,
    onExportButtonClick: PropTypes.func.isRequired,
    rowCountChange: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired
};

export default AssignmentsTable;

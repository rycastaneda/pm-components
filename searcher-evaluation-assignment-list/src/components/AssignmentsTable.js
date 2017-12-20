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
        switch (status.id) {
            case '1':
                return <span className="bs-label bs-label-danger">{status.title}</span>;
            case '2':
                return <span className="bs-label bs-label-warning">{status.title}</span>;
            case '3':
                return <span className="bs-label bs-label-success">{status.title}</span>;
        }
    }
    hideMenu() {
        this.setState({ menuVisibleItemId:null });
    }
    onDeleteClick(id) {
        this.props.onAssignmentDelete(id);
        this.hideMenu();
    }
    onMarkAsInProgressClick(id) {
        window.console.log(id);
        this.props.onAssignmentMarkAsInProgress(id);
        this.hideMenu();
    }
    renderMoreButton(assignment, complete_url, isDeletable, statusId) {
        let isInProgressStatus = (statusId ==='2');
        let { id } = assignment;
        if (this.state.menuVisibleItemId===id) {
            return (
            <div className="dropdown open" ref={(ul) => {
                if (ul!==null) {
                    this.actionDropdown=ul;
                }
            }}>
                <a className="btn btn-sm"
                    onClick={this.toggleMenu.bind(this, id)}
                    href="javascript:">
                    More &nbsp;
                    <i className="caret" ></i>
                </a>
                <ul className="dropdown-menu">
                    { !isInProgressStatus&&isDeletable? <li><a href="javascript:;" onClick ={() => this.onDeleteClick(id)} >Delete</a></li>:null }
                    <li ><a href={complete_url} >Complete evaluation</a></li>
                    {isInProgressStatus?null:<li><a href="javascript:;" onClick={() => this.onMarkAsInProgressClick(id)} >Mark as in Progress</a></li>}
                    <li><a href="javascript:;">Analysis</a></li>
                    <li><a href="javascript:;">View Single</a></li>
                    <li><a href="javascript:;">View All</a></li>
                    <li><a href="javascript:;">View Comparison</a></li>
                </ul>
        </div>);
        } else {
            return (
                <div className="dropdown">
                    <a className="btn btn-sm"
                        onClick={this.toggleMenu.bind(this, id)}
                        href="javascript:">
                        More &nbsp;
                        <i className="caret" ></i>
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
                    <th>Evaluation</th>
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
                    this.props.tableData.map(item =>
                       <tr key={item.id}>
                       <td className="nowrap">
                           {item.assignedOn}
                       </td>
                       <td className="nowrap">
                           {item.evaluationTemplate.title}
                       </td>
                       <td className="nowrap">
                        {item.linkedTo.title}#{item.supplier.id}
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
                       <td data-heading="More" className="td-center  last">
                           {this.renderMoreButton(item, item.complete_url, item.isDeletable, item.assignmentStatus.id)}
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
                    <ReactPaginate  previousLabel={"previous"}
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
                    </div>
                </div>
        </div>);
    }
}

AssignmentsTable.propTypes = {
    onAssignmentDelete:PropTypes.func.isRequired,
    onAssignmentMarkAsInProgress: PropTypes.func.isRequired,
    isDeletable: PropTypes.bool.isRequired,
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    rowCount: PropTypes.string.isRequired,
    totalPages:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    goToPage:PropTypes.func.isRequired,
    rowCountChange: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired
};

export default AssignmentsTable;

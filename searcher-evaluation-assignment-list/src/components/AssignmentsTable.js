import React, { PropTypes, Component } from 'react';

import ReactPaginate from 'react-paginate';

class AssignmentsTable extends Component {


    constructor(props) {
        super(props);
        this.actionDropdown= null;
        this.state= { menuVisibleItemId:null };
        this.hideMenu= this.hideMenu.bind(this);
        this.handlePageClick= this.handlePageClick.bind(this);
        this.onDropdownClickOutside = this.onDropdownClickOutside.bind(this);
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
                return <span className="badge badge--dark badge-text-danger">{status.title}</span>;
            case '2':
                return <span className="badge badge--dark badge-text-warning">{status.title}</span>;
            case '3':
                return <span className="badge badge--dark badge-text-success">{status.title}</span>;
        }
    }
    hideMenu() {
        this.setState({ menuVisibleItemId:null });
    }
    renderMoreButton(id, edit_url, preview_url) {
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
                    <li ><a href={preview_url} >Complete evaluation</a></li>
                    <li><a href={edit_url} >Mark as in Progress</a></li>
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
                    <th>Assigned On</th>
                    <th>Evaluation</th>
                    <th>Linked To</th>
                    <th>Assigned User</th>
                    <th>Supplier Name</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.tableData.map(item =>
                    <tr key={item.id}>
                    <td className="td-center nowrap">
                        {item.assignedOn}
                    </td>
                    <td className="td-center nowrap">
                        {item.evaluationTemplate.title}
                    </td>
                    <td className="td-center nowrap">
                        {item.linkedTo.title}
                    </td>
                    <td className="td-center nowrap">
                        {item.assignedUser.userName}
                    </td>
                    <td className="td-center nowrap">
                        {item.supplier.title}
                    </td>
                    <td className="td-center nowrap">
                        {this.renderStatus(item.assignmentStatus)}
                    </td>
                    <td data-heading="More" className="td-center  last">
                        {this.renderMoreButton(item.id, item.edit_url, item.preview_url, item.status)}
                    </td>
                </tr>
                )}
            </tbody>
            </table>
            <select defaultValue={this.props.rowCount}
                onChange={event => this.props.rowCountChange(event.target.value) }>
                {this.props.rowCountList.map((item, index) =>
                    <option key={index}>{item}</option>
                )}
            </select>
             <div className="pull-right">
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
             </div>
        </div>);
    }
}

AssignmentsTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    rowCount: PropTypes.number.isRequired,
    totalPages:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    goToPage:PropTypes.func.isRequired,
    rowCountChange: PropTypes.func.isRequired
};

export default AssignmentsTable;

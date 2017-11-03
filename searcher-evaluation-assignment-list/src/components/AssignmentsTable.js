import React, { PropTypes, Component } from 'react';
import ReactPaginate from 'react-paginate';

class AssignmentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = { menuVisibleItemId: null };
        this.hideMenu = this.hideMenu.bind(this);
    }

    toggleMenu(id) {
        if (this.state.menuVisibleItemId !== id) {
            this.setState({ menuVisibleItemId: id });
        }
    }
    hideMenu() {
        this.setState({ menuVisibleItemId: null });
    }
    renderStatus(status) {
        switch (status) {
            case 'submitted':
                return <span className="badge badge-success">Submitted</span>;
        }
    }
    renderMoreButton(id) {
        return (
            <div
                className={`dropdown ${this.state.menuVisibleItemId === id
                    ? 'open'
                    : ''}`}>
                <a
                    className="btn btn-sm"
                    onBlur={this.hideMenu}
                    onClick={this.toggleMenu.bind(this, id)}
                    href="javascript:">
                    More &nbsp;
                    <i className="caret" />
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <a
                            href="javascript:;"
                            onClick={() => this.onAssignmentPreviewClick(id)}>
                            Complete Evaluation
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:;"
                            onClick={() => this.onAssignmentEditClick(id)}>
                            Analysis
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:;"
                            onClick={() =>
                                this.onAssignmentToggleActivateClick(id)}>
                            View Single
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:;"
                            onClick={() => this.onAssignmentDeleteClick(id)}>
                            View All
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:;"
                            onClick={() => this.onAssignmentDeleteClick(id)}>
                            View Comparison
                        </a>
                    </li>
                </ul>
            </div>
        );
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
                        {this.props.tableData.map((item, index) => (
                            <tr key={index}>
                                <td className="td-center nowrap">
                                    {item.assignedOn}
                                </td>
                                <td className="td-center nowrap">
                                    {item.evaluation}
                                </td>
                                <td className="td-center nowrap">
                                    {item.linkedTo}
                                </td>
                                <td className="td-center nowrap">
                                    {item.assignedUser}
                                </td>
                                <td className="td-center nowrap">
                                    {item.supplierName}
                                </td>
                                <td className="td-center nowrap">
                                    {this.renderStatus(item.status)}
                                </td>
                                <td
                                    data-heading="More"
                                    className="td-center  last">
                                    {this.renderMoreButton(item.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <select onChange={() => this.props.onMaxRowLengthChange()}>
                    {this.props.rowCountList.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
                <div className="pull-right">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={<a href="">...</a>}
                        breakClassName={'break-me'}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

AssignmentsTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    onMaxRowLengthChange: PropTypes.func.isRequired
};

export default AssignmentsTable;

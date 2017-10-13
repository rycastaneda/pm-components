import React, {  PropTypes, Component } from 'react';
import ReactPaginate from 'react-paginate';

class TemplatesTable extends Component {

    constructor(props) {
        super(props);
    }
    renderMoreButton(id) {
        return (
        <div className="dropdown">
            <a className="btn btn-sm">More &nbsp;<i className="fa fa-caret-down"></i></a>
            <ul className="dropdown-menu show">
                <li ><a href="javascript:;" onClick={() => this.onTemplatePreviewClick(id)}>Preview</a></li>
                <li><a href="javascript:;" onClick={() => this.onTemplateEditClick(id)}>Edit</a></li>
                <li><a href="javascript:;" onClick={()  => this.onTemplateToggleActivateClick(id)}>Deactivate</a></li>
                <li><a href="javascript:;" onClick={()  => this.onTemplateDeleteClick(id)}>Delete</a></li>
            </ul>
    </div>);
    }
    render() {
        return (
        <div>
            <table className="table db-table db-table-sort">
            <thead>
            <tr>
                <th>Template name</th>
                <th>Instances</th>
                <th>Completed</th>
                <th>Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {this.props.tableData.map((item, index) =>
                    <tr key={index}>
                    <td className="td-center nowrap">{item.name}</td>
                    <td className="td-center nowrap">{item.instances}</td>
                    <td className="td-center nowrap">{item.completed}</td>
                    <td className="td-center nowrap"><span className={`bs-label ${item.statusClass}`}>{item.statusName}</span></td>
                    <td data-heading="More" className="td-center  last">
                        {this.renderMoreButton(item.id)}
                    </td>
                </tr>
                )}
            </tbody>
            </table>
            <select onChange={() => this.props.onMaxRowLengthChange() }>
                {this.props.rowCountList.map((item, index) => <option key={index}>{item}</option>)}
            </select>
             <div className="pull-right">
             <ReactPaginate  previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.props.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
             </div>
        </div>);
    }
}

TemplatesTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    pageCount:PropTypes.number.isRequired,
    onMaxRowLengthChange: PropTypes.func.isRequired
};

export default TemplatesTable;

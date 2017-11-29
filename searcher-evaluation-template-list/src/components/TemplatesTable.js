import React, { PropTypes, Component } from 'react';

import ReactPaginate from 'react-paginate';

class TemplatesTable extends Component {


    constructor(props) {
        super(props);
        this.actionDropdown= null;
        this.state= { menuVisibleItemId:null };
        this.hideMenu= this.hideMenu.bind(this);
        this.handlePageClick= this.handlePageClick.bind(this);
        this.onTemplateToggleActivation = this.onTemplateToggleActivation.bind(this);
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
    onTemplateToggleActivation(id, status) {
        this.hideMenu();
        this.props.onTemplateToggleActivation(id, status);
    }
    toggleMenu(id) {
        if (this.state.menuVisibleItemId!== id) {
            this.setState({ menuVisibleItemId:id });
        }
    }
    handlePageClick({ selected }) {
        this.props.goToPage(selected+1);
    }

    hideMenu() {
        this.setState({ menuVisibleItemId:null });
    }
    renderMoreButton(id, edit_url, preview_url, status) {
        if (this.state.menuVisibleItemId===id) {
            return (
            <div className="dropdown open"   ref={(ul) => {
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
                    <li ><a href={preview_url} >Preview</a></li>
                    <li><a href={edit_url} >Edit</a></li>
                    <li><a href="javascript:;" onClick={()  => this.onTemplateToggleActivation(id, !(status))}>{status? 'Deactivate': 'Activate'}</a></li>
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
                    <td className="td-center nowrap">{item.status?
                        <span className={`bs-label bs-label-success`}>Active</span>
                        :<span className={`bs-label bs-label-danger`}>Inactive</span>
                    }
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
             </div>
        </div>);
    }
}

TemplatesTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    rowCountList: PropTypes.array.isRequired,
    rowCount: PropTypes.number.isRequired,
    totalPages:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    goToPage:PropTypes.func.isRequired,
    rowCountChange: PropTypes.func.isRequired,
    onTemplateToggleActivation: PropTypes.func.isRequired,
    onTemplateEdit: PropTypes.func.isRequired,
    onTemplatePreview: PropTypes.func.isRequired
};

export default TemplatesTable;

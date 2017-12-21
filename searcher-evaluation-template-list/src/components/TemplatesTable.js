import React, { PropTypes, Component } from 'react';
import moment from 'moment';
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

    onTemplateToggleActivation(id, active) {
        this.hideMenu();
        this.props.onTemplateToggleActivation(id, active);
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
    renderMoreButton(id, edit_url, preview_url, active, instances) {
        instances = Number(instances);
        instances;
        if (this.state.menuVisibleItemId===id) {
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
                    <li>
                        <a href={preview_url} ><i className="fa fa-eye"></i> Preview</a>
                    </li>
                    { !active&&(instances<1)?
                        <li>
                            <a disabled ="true" href={edit_url} ><i className="fa fa-edit"></i> Edit</a>
                        </li>
                        :
                        null
                    }
                    { !active&&(instances<1)?
                        null
                        :
                        <li>
                            <a href="javascript:;"
                            onClick={ ()  => this.onTemplateToggleActivation(id, !(active))}><i className="fa fa-toggle-off"></i> {active?' Deactivate':'Activate'}
                            </a>
                        </li>
                    }
                </ul>
        </div>);
        } else {
            return (
                <div className="dropdown">
                    <a className="db-function"
                        onClick={this.toggleMenu.bind(this, id)}
                        href="javascript:">
                        More &nbsp;
                        <i className="fa fa-caret-down"></i>
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
                <th>Creation Date</th>
                <th>Status</th>
                <th>More</th>
            </tr>
            </thead>
            <tbody>
                {this.props.tableData.map((item, index) =>
                    <tr key={index}>
                    <td className="nowrap">{item.title}</td>
                    <td className="td-center nowrap">{item.instances}</td>
                    <td className="td-center nowrap">{item.completed}</td>
                    <td className="td-center nowrap">{moment(item.date).format('DD/MM/YYYY')}</td>
                    <td className="td-center nowrap" onClick={()  => this.onTableRowClick(item.edit_url)}>{item.active?
                        <span className={`bs-label bs-label-success`}>Active</span>
                        :<span className={`bs-label bs-label-danger`}>Inactive</span>
                    }
                    </td>
                    <td data-heading="More" className="td-center last">
                        {this.renderMoreButton(item.id, item.edit_url, item.preview_url, item.active, item.instances)}
                    </td>
                </tr>
                )}
            </tbody>
            </table>

            <div className="row">
                <div className="col-sm-12 form-inline">
                    <select className="form-control" defaultValue={this.props.rowCount}
                        onChange={event => this.props.rowCountChange(event.target.value) }>
                        {this.props.rowCountList.map((item, index) =>
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
                    :null}
                    </div>
                </div>

            </div>
        );
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {

    render() {
        const { maxRowsList, pages, actions } = this.props;
        return (
            <div className="row">
                <div className="col-sm-6 form-inline">
                    <select
                        value={pages.per_page}
                        onChange={actions.onRowsPerPageUpdate}
                        name="per_page"
                        className="form-control"
                    >
                        {maxRowsList.map((item) => {
                            return (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={<a href="">...</a>}
                        breakClassName={'break-me'}
                        pageCount={pages.total - (pages.per_page === 10 ? 0 : pages.per_page)}
                        forcePage={pages.current_page-1}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={actions.onPageUpdateChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    actions: PropTypes.object,
    maxRowsList: PropTypes.array.isRequired,
    supplierId: PropTypes.string,
    pages: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { maxRowsList, pages } = state.pagination;

    return {
        ...ownProps,
        maxRowsList,
        pages,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

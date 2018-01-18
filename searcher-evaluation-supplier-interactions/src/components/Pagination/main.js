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
                    {pages.total_pages < 1 ? (
                        <span>&nbsp;</span>
                    ) : (
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={<a href="">...</a>}
                            breakClassName={'break-me'}
                            pageCount={pages.total_pages}
                            forcePage={pages.current_page - 1}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={actions.onPageUpdateChange}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    )}
                </div>
            </div>
        );
    }

    renderPagination() {
        const { pages, actions } = this.props;
        if (pages.total_pages < 1) {
            return null;
        }

        return (
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={pages.total_pages}
                forcePage={pages.current_page - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={actions.onPageUpdateChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
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

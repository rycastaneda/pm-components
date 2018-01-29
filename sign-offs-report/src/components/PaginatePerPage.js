import React, { PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import * as pagination from '../constants/pagination';

const PaginatePerPage = ({
    pageCount,
    perPage,
    onPageChange,
    onPerPageChange
}) => {
    return (
        <div>
            <div className="pull-left mar-r-sm">
                <select
                    className="form-control"
                    value={perPage}
                    onChange={onPerPageChange}>
                    {pagination.PER_PAGE.map(pageNumber => (
                        <option key={pageNumber} value={pageNumber}>
                            {pageNumber}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pull-left">
                <ReactPaginate
                    onPageChange={onPageChange}
                    pageCount={pageCount}
                    pageRangeDisplayed={pagination.PAGE_RANGE_DISPLAYED}
                    marginPagesDisplayed={pagination.MARGIN_PAGES_DISPLAYED}
                    containerClassName="pagination"
                />
            </div>
            <div className="clearfix" />
        </div>
    );
};

PaginatePerPage.propTypes = {
    pageCount: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired
};

export default PaginatePerPage;

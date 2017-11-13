import React, { PropTypes } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatePerPage = ({
    pageCount,
    perPage,
    onPageChange,
    onPerPageChange
}) => {
    return (
        <div>
            <div className="pull-left">
                <ReactPaginate
                    onPageChange={onPageChange}
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={5}
                    containerClassName="pagination"
                />
            </div>
            <div className="pull-left">
                <select
                    className="form-control"
                    value={perPage}
                    onChange={onPerPageChange}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
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

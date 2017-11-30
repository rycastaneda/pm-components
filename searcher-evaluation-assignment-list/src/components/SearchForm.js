import React, { PropTypes } from 'react';

const SearchForm = ({
    keyword,
    showFilters,
    searchRef,
    quickSearch,
    toggleFilters,
    downloadAssignments
}) => {
    return (
        <form onSubmit={quickSearch}>
            <div className="col-xs-6 col-md-4">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-search" />
                    </span>
                    <input
                        className="form-control"
                        ref={searchRef}
                        type="search"
                        defaultValue={keyword || ''}
                    />
                </div>
            </div>
            <div className="col-xs-2 col-md-2">
                <button className="btn" type="submit">
                    Search
                </button>
            </div>
            <div className={`col-xs-4 col-md-6 align-right`}>
                <button className="btn" onClick={toggleFilters}>
                    <i className="fa fa-sort-amount-desc" />
                    {`${showFilters ? 'Hide Filters' : 'Show Filters'}`}
                </button>
                <button className="btn mar-l-sm" onClick={downloadAssignments}>
                    <i className="fa fa-download" />
                    Download as CSV
                </button>
            </div>
        </form>
    );
};

SearchForm.propTypes = {
    keyword: PropTypes.string,
    showFilters: PropTypes.bool.isRequired,
    searchRef: PropTypes.any,
    quickSearch: PropTypes.func.isRequired,
    toggleFilters: PropTypes.func.isRequired,
    downloadAssignments: PropTypes.func.isRequired
};

export default SearchForm;

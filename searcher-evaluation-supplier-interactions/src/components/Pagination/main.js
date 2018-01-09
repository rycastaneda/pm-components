import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { PaginationList } from './styling/styledComponents';

class Pagination extends Component {
    componentDidMount() {
        const { actions, supplierId } = this.props;
        actions.paginationInit(supplierId);
    }
    render() {
        const { maxRowsList } = this.props;
        return (
            <div className="row">
                <div className="col-sm-6 form-inline">
                    <select name="per_page" className="form-control">
                        {maxRowsList.map((item) => {
                            return (
                                <option key={item} value="item">
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <PaginationList className="pagination">
                        <li className="active">
                            <a>1</a>
                        </li>
                        <li className="pagination-first">
                            <a href="#" data-ci-pagination-page="2">
                                2
                            </a>
                        </li>
                        <li className="pagination-first">
                            <a href="#" data-ci-pagination-page="3">
                                3
                            </a>
                        </li>
                        <li className="pagination-next">
                            <a href="#" data-ci-pagination-page="2" rel="next">
                                Next
                            </a>
                        </li>
                        <li className="pagination-last">
                            <a href="#" data-ci-pagination-page="12">
                                »»
                            </a>
                        </li>
                    </PaginationList>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    actions: PropTypes.object,
    maxRowsList: PropTypes.array.isRequired,
    supplierId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { maxRowsList, pages, links } = state.pagination;

    return {
        ...ownProps,
        maxRowsList,
        pages,
        links,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

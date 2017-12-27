import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { PaginationList } from './styling/styledComponents';

class Pagintation extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 form-inline">
                    <select name="per_page" className="form-control">
                        <option>15</option>
                        <option>30</option>
                        <option>60</option>
                        <option>90</option>
                        <option>120</option>
                        <option>Show All</option>
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

Pagintation.propTypes = {
    actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagintation);

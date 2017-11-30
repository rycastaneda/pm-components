import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import FilterHead from './FilterHead';
import FilterBody from './FilterBody';

class SupplierInteractionsFilter extends Component {

    render() {
        return (
            <div>
                <FilterHead />
                <FilterBody />
            </div>
        );
    }
}

SupplierInteractionsFilter.propTypes = {
    actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierInteractionsFilter);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SupplierInteractionsTable from '../components/SupplierInteractions/SupplierInteractionsTable';
import * as actions from '../actions/actions';


class SupplierInteractionsContainer extends Component {

    componentDidMount() {
        debugger
        const {actions} = this.props;
        actions.fetchSupplierInteractions('urls');
    }

    render() {
        const {interactions} = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <SupplierInteractionsTable interactions={interactions}/>
            </div>
        );
    }
}

SupplierInteractionsContainer.propTypes = {
    interactions: PropTypes.array.isRequired,
    actions: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {interactions} = state.supplierInteractions;
    return {
        ...ownProps,
        interactions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierInteractionsContainer);

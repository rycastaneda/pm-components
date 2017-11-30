import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SupplierInteractionsTable from '../components/SupplierInteractions/SupplierInteractionsTable';
import * as actions from '../actions/actions';
import SupplierInteractionsFilter from '../components/SupplierInteractionsFilter/main';

class SupplierInteractionsContainer extends Component {

    componentDidMount() {
        const {actions} = this.props;
        actions.fetchSupplierInteractions('https://0f3f69f0-1609-4efe-9c8f-b8ea2ce115b8.mock.pstmn.io/supplier-interactions');
    }

    render() {
        const {interactions} = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <SupplierInteractionsFilter />
                <SupplierInteractionsTable interactions={interactions}/>
            </div>
        );
    }
}

SupplierInteractionsContainer.propTypes = {
    interactions: PropTypes.array.isRequired,
    actions: PropTypes.object,
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

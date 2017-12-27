import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import SupplierInteractionsFilter from '../../components/SupplierInteractionsFilter/main';
import SupplierInteractionsTable from './SupplierInteractionsTable';
import Pagination from '../../components/Pagination/main';

class SupplierInteractionsContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchSupplierInteractions('/preferred-suppliers/8/interactions');
    }

    render() {
        const { interactions, isLoading } = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <SupplierInteractionsFilter />
                <SupplierInteractionsTable isLoading={isLoading} interactions={interactions} />
                <Pagination />
            </div>
        );
    }
}

SupplierInteractionsContainer.propTypes = {
    interactions: PropTypes.array.isRequired,
    apiActions: PropTypes.object,
    actions: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { interactions, isLoading } = state.supplierInteractions;
    return {
        ...ownProps,
        interactions,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SupplierInteractionsContainer
);

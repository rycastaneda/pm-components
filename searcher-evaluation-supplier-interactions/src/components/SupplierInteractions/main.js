import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import SupplierInteractionsFilter from '../../components/SupplierInteractionsFilter/main';
import SupplierInteractionsTable from './SupplierInteractionsTable';
import Pagination from '../../components/Pagination/main';
import { selectFromStore, getLoadingForEndpoint } from '../../utils/reduxApiUtils';

class SupplierInteractionsContainer extends Component {
    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.applyPerPage('8');
    }

    render() {
        const { interactions, loading } = this.props;
        return (
            <div className="searcher-evaluation-template-list">
                <SupplierInteractionsFilter />
                <SupplierInteractionsTable isLoading={loading} interactions={interactions} />
                <Pagination />
            </div>
        );
    }
}

SupplierInteractionsContainer.propTypes = {
    interactions: PropTypes.array.isRequired,
    apiActions: PropTypes.object,
    actions: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { supplierId } = ownProps;
    const { maxRowsSelected } = state.supplierInteractions;
    const interactions = selectFromStore(state.supplierInteractions, `/preferred-suppliers/${supplierId}/interactions`, 'interactions');
    const loading = getLoadingForEndpoint(state.supplierInteractions, `/preferred-suppliers/${supplierId}/interactions?per_page=${maxRowsSelected}`);

    return {
        ...ownProps,
        interactions,
        loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SupplierInteractionsContainer
);

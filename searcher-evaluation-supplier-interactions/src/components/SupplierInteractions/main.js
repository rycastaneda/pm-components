import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import SupplierInteractionsFilter from '../../components/SupplierInteractionsFilter/main';
import SupplierInteractionsTable from './SupplierInteractionsTable';
import Pagination from '../../components/Pagination/main';
import { selectFromStore } from '../../utils/reduxApiUtils';

class SupplierInteractionsContainer extends Component {
    componentWillMount() {
        const { apiActions, actions } = this.props;
        // TO DO: Get Id straight into the props from window
        const rootElement = document.querySelector('[data-component="searcher-evaluation-supplier-interactions"]');
        const supplierId = rootElement.dataset.preferredSupplierId;

        actions.setUpdateCurrentSupplier(supplierId);
        apiActions.initSupplierInteractions();
    }

    render() {
        const { interactions, isLoading, currentSupplierId } = this.props;

        if (isLoading) {
            return <h3>Loading..</h3>;
        }

        return (
            <div className="searcher-evaluation-template-list">
                <SupplierInteractionsFilter />
                <div>
                    <SupplierInteractionsTable
                        isLoading={isLoading}
                        interactions={interactions}
                    />
                    <Pagination supplierId={currentSupplierId} />
                </div>
            </div>
        );
    }
}

SupplierInteractionsContainer.propTypes = {
    interactions: PropTypes.array.isRequired,
    apiActions: PropTypes.object,
    actions: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    currentSupplierId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { currentSupplierId, isLoading, urlParams, endpoint } = state.supplierInteractions;

    const interactions = selectFromStore(
        state.supplierInteractions,
        endpoint,
        urlParams,
        'interactions'
    );

    return {
        ...ownProps,
        interactions,
        isLoading,
        currentSupplierId,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SupplierInteractionsContainer
);

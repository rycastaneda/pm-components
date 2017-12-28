import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import SupplierInteractionsFilter from '../../components/SupplierInteractionsFilter/main';
import SupplierInteractionsTable from './SupplierInteractionsTable';
import Pagination from '../../components/Pagination/main';
import { selectFromStore } from '../../utils/selectFromStore';

class SupplierInteractionsContainer extends Component {
    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.fetchInteractions('8');
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
    const { isLoading } = state.supplierInteractions;
    const { supplierId } = ownProps;
    const interactions = selectFromStore(state.supplierInteractions, `/preferred-suppliers/${supplierId}/interactions`, 'interactions');
    window.console.log('map state -> interactions: ', interactions);
    return {
        ...ownProps,
        interactions,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SupplierInteractionsContainer
);

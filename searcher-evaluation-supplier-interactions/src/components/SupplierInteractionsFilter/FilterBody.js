import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as apiActions from '../../actions/apiActions';

import { FilterMainContainer, FilterApplyButton, FilterClearButton } from './styling/styledComponents';
import PMDateRange from '../PMDateRange/main';
import FilterInteractionType from './FilterInteractionType';

const FilterBody = ({
    toggleFilterShow,
    interactionTypes,
    interactionTypeSelected,
    actions,
    apiActions,
}) => (
    <FilterMainContainer
        className="panel panel-default pad-all"
        toggleFilterShow={toggleFilterShow}
    >
        <div className="row">
            <div className="col-xs-6">
                <FilterInteractionType
                    interactionTypes={interactionTypes}
                    interactionTypeSelected={interactionTypeSelected}
                    interactionTypeOnChange={
                        actions.updateFilterInteractionTypeChange
                    }
                />
            </div>
            <div className="col-xs-6">
                <PMDateRange />
            </div>
            <div className="col-xs-6">
                <FilterApplyButton className="btn btn-success" onClick={apiActions.initSupplierInteractions}>Apply Filters</FilterApplyButton>
                <FilterClearButton className="btn" onClick={actions.resetFilters}>Clear Filters</FilterClearButton>
            </div>
        </div>
    </FilterMainContainer>
);

FilterBody.propTypes = {
    actions: PropTypes.object,
    apiActions: PropTypes.object,
    toggleFilterShow: PropTypes.bool.isRequired,
    interactionTypes: PropTypes.array.isRequired,
    interactionTypeSelected: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        apiActions: bindActionCreators(apiActions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {
        toggleFilterShow,
        interactionTypes,
        interactionTypeSelected,
    } = state.interactionsFilter;

    return {
        ...ownProps,
        toggleFilterShow,
        interactionTypes,
        interactionTypeSelected,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);

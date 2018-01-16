import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as apiActions from '../../actions/apiActions';

import { FilterMainContainer } from './styling/styledComponents';
import PMDateRange from '../PMDateRange/main';
import FilterInteractionType from './FilterInteractionType';
import FilterInitiatedBy from './FilterInitiatedBy';

const FilterBody = ({
    toggleFilterShow,
    interactionTypes,
    interactionTypeSelected,
    actions,
    apiActions,
    staffInitiators,
    initiatedBySelected,
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
                <FilterInitiatedBy
                    staffInitiators={staffInitiators}
                    initiatedBySelected={initiatedBySelected}
                    initiatedByOnChange={actions.updateFilterInitiatedByChange}
                />
            </div>
            <div className="col-xs-6">
                <PMDateRange />
            </div>
            <div className="col-xs-6">
                <button className="btn" type="button" onClick={apiActions.initSupplierInteractions}>Apply Filters</button>
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
    staffInitiators: PropTypes.array.isRequired,
    initiatedBySelected: PropTypes.string.isRequired,
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
        staffInitiators,
        interactionTypeSelected,
        initiatedBySelected,
    } = state.interactionsFilter;

    return {
        ...ownProps,
        toggleFilterShow,
        interactionTypes,
        interactionTypeSelected,
        staffInitiators,
        initiatedBySelected,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);

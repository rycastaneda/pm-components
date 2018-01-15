import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as datePickerActions from '../PMDateTime/actions';

import { FilterMainContainer } from './styling/styledComponents';
import PMDateTime from '../PMDateTime/main';
import FilterInteractionType from './FilterInteractionType';
import FilterInitiatedBy from './FilterInitiatedBy';

const FilterBody = ({
    toggleFilterShow,
    interactionTypes,
    interactionTypeSelected,
    actions,
    datePickerActions,
    dateTimeStart,
    dateTimeEnd,
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
                <div className="form-group">
                    <label>Start Date</label>
                    <PMDateTime
                        dateTime={dateTimeStart}
                        onDateChange={
                            datePickerActions.updateFilterStartDateChange
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <PMDateTime
                        dateTime={dateTimeEnd}
                        onDateChange={
                            datePickerActions.updateFilterEndDateChange
                        }
                    />
                </div>
            </div>
        </div>
    </FilterMainContainer>
);

FilterBody.propTypes = {
    actions: PropTypes.object,
    datePickerActions: PropTypes.object,
    toggleFilterShow: PropTypes.bool.isRequired,
    interactionTypes: PropTypes.array.isRequired,
    interactionTypeSelected: PropTypes.string.isRequired,
    staffInitiators: PropTypes.array.isRequired,
    initiatedBySelected: PropTypes.string.isRequired,
    dateTimeStart: PropTypes.string.isRequired,
    dateTimeEnd: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        datePickerActions: bindActionCreators(datePickerActions, dispatch),
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

    const { dateTimeStart, dateTimeEnd } = state.pmDateTime;

    return {
        ...ownProps,
        toggleFilterShow,
        interactionTypes,
        interactionTypeSelected,
        dateTimeStart,
        dateTimeEnd,
        staffInitiators,
        initiatedBySelected,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);

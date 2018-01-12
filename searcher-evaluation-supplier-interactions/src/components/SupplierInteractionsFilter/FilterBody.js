import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as datePickerActions from '../PMDateTime/actions';

import { FilterMainContainer } from './styling/styledComponents';
import PMDateTime from '../PMDateTime/main';

const FilterBody = ({
    toggleFilterShow,
    interactionTypes,
    interactionTypeSelected,
    actions,
    datePickerActions,
    dateTimeStart,
    dateTimeEnd,
}) => (
    <FilterMainContainer
        className="panel panel-default pad-all"
        toggleFilterShow={toggleFilterShow}
    >
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label>Interaction Type</label>
                    <select
                        className="form-control form-control-sm text-capitalize"
                        onChange={event =>
                            actions.updateFilterInteractionTypeChange(
                                event.target.value
                            )
                        }
                        value={interactionTypeSelected}
                    >
                        {interactionTypes.map(item => (
                            <option id={item} key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-xs-6">
                <div className="form-group">
                    <label>Start Date</label>
                    <PMDateTime dateTime={dateTimeStart} onDateChange={datePickerActions.updateFilterStartDateChange} />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <PMDateTime dateTime={dateTimeEnd} onDateChange={datePickerActions.updateFilterEndDateChange} />
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
        interactionTypeSelected,
    } = state.interactionsFilter;

    const { dateTimeStart, dateTimeEnd } = state.pmDateTime;

    return {
        ...ownProps,
        toggleFilterShow,
        interactionTypes,
        interactionTypeSelected,
        dateTimeStart,
        dateTimeEnd,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);

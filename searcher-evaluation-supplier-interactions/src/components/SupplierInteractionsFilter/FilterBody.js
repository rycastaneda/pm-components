import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { FilterMainContainer } from './styling/styledComponents';
import PMDateTime from '../PMDateTime/main';

const FilterBody = ({
    toggleFilterShow,
    interactionTypes,
    interactionTypeSelected,
    actions,
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
                            actions.updateFilterStatusChange(event.target.value)
                        }
                        value={interactionTypeSelected}
                    >
                        {interactionTypes.map(item => (
                            <option id={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-xs-6">
                <div className="form-group">
                    <label>Date Created</label>
                    <PMDateTime />
                </div>
            </div>
        </div>
    </FilterMainContainer>
);

FilterBody.propTypes = {
    actions: PropTypes.object,
    toggleFilterShow: PropTypes.bool.isRequired,
    interactionTypes: PropTypes.array.isRequired,
    interactionTypeSelected: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
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

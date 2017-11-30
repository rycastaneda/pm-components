import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import {FilterMainContainer} from "./styling/styledComponents";

const FilterBody = ({toggleFilterShow, interactionStatuses, filterInteractionStatus, actions}) => (
    <FilterMainContainer className="panel panel-default pad-all" toggleFilterShow={toggleFilterShow}>
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label>Active Status</label>
                    <select className="form-control form-control-sm" onChange={event => actions.updateFilterStatusChange(event.target.value)}
                        value={filterInteractionStatus}>
                        {interactionStatuses.map(item => <option id={item} key={item}>{item}</option>)}
                    </select>
                </div>
            </div>
        </div>
    </FilterMainContainer>
);

FilterBody.propTypes = {
    actions: PropTypes.object,
    toggleFilterShow: PropTypes.bool.isRequired,
    interactionStatuses: PropTypes.array.isRequired,
    filterInteractionStatus: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {toggleFilterShow, interactionStatuses, filterInteractionStatus} = state.interactionsFilter;
    return {
        ...ownProps,
        toggleFilterShow,
        interactionStatuses,
        filterInteractionStatus,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';
import * as actions from '../../actions/evaluationAssignmentsAction';

const MatchedItemsDropdown = ({ matchedItems, isLoading, actions }) => (
    <div>

        { !isLoading ?
            <div>
                <select name="evaluationLink"
                        className="form-control"
                        onChange={
                            event => actions.updateChangeMatchedItems(event.target.value)
                        }>
                    <option key="-" value={null}>Select RFQ Item</option>
                    {matchedItems.map(
                        (item, index) =>
                            <option key={index} value={item.id}>{item.title}</option>
                    )}
                </select>
            </div>
            :
            <div>
                <span>Loading...</span>
            </div>
        }

    </div>
);

MatchedItemsDropdown.propTypes = {
    actions: PropTypes.object,
    isLoading: PropTypes.bool,
    matchedItems: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { rfqTypeSelectedId, matchedSupplierId } = state.evaluationAssignment;

    const  isLoading = state.evaluationAssignment.meta[`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`].loading;
    const matchedItems = (state.evaluationAssignment.meta[`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`].data || []).map(object => build(state.evaluationAssignment, 'matchedItems', object.id));


    return {
        ...ownProps,
        isLoading,
        matchedItems,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchedItemsDropdown);

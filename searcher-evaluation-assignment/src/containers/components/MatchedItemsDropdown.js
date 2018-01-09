import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore } from '../../utils/selectFromStore';
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
                <div className="input-group">
                    <select className="form-control" disabled><option>Loading RFQ Items...</option></select>
                    <span className="spinner-animation form-control-feedback"></span>
                </div>
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
    const matchedItems = selectFromStore(state.evaluationAssignment, `/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers/${matchedSupplierId}/matched-items`, 'matchedItems');

    return {
        ...ownProps,
        isLoading,
        matchedItems,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchedItemsDropdown);

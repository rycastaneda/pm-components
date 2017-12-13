import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const MatchedItemsDropdown = ({ matchedItems, actions }) => (
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
);

MatchedItemsDropdown.propTypes = {
    actions: PropTypes.object,
    matchedItems: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(MatchedItemsDropdown);

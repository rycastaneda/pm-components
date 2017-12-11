import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const MatchedSuppliersDropdown = ({ matchedSuppliers, actions }) => (
    <div>
        <select name="evaluationLink"
                className="form-control"
                onChange={
                    event => actions.updateChangeMatchedSuppliers(event.target.value)
                }>
            <option key="-" value={null}>Select..</option>
            { matchedSuppliers.map(
                (item, index) =>
                    <option key={index} value={item.id}>{item.title}</option>
            )}
        </select>
    </div>
);

MatchedSuppliersDropdown.propTypes = {
    actions: PropTypes.object,
    matchedSuppliers: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(MatchedSuppliersDropdown);

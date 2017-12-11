import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const RfqListDropdown = ({ evaluationTypesRfq, actions }) => (
    <div>
        <select name="evaluationLink"
                className="form-control"
                onChange={
                    event => actions.fetchMatchedSuppliers(event.target.value)
                }>
            <option key="-" value={null}>Select..</option>
            {evaluationTypesRfq.map(
                (item, index) =>
                    <option key={index} value={item.id}>{item.quoteTitle}</option>
            )}
        </select>
    </div>
);

RfqListDropdown.propTypes = {
    actions: PropTypes.object,
    evaluationTypesRfq: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(RfqListDropdown);

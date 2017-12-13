import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';
import * as actions from '../../actions/evaluationAssignmentsAction';

const RfqListDropdown = ({ evaluationTypesRfq, isLoading, actions }) => (
    <div>
        { !isLoading ?
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
            :
            <div>
                <span>Loading...</span>
            </div>
        }
    </div>
);

RfqListDropdown.propTypes = {
    actions: PropTypes.object,
    evaluationTypesRfq: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const  isLoading = state.evaluationAssignment.meta['/request-for-quotations'].loading;
    const evaluationTypesRfq = (state.evaluationAssignment.meta['/request-for-quotations'].data || []).map(object => build(state.evaluationAssignment, 'requestForQuotations', object.id));

    return {
        ...ownProps,
        isLoading,
        evaluationTypesRfq,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RfqListDropdown);

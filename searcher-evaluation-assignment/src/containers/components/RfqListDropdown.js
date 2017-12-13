import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';
import * as actions from '../../actions/evaluationAssignmentsAction';

const RfqListDropdown = ({ evaluationTypesRfq, isLoading, actions }) => (
    <div>
        { !isLoading ?
            <div className="input-group">
                <select name="evaluationLink"
                        className="form-control"
                        onChange={
                            event => actions.fetchMatchedSuppliers(event.target.value)
                        }>
                    <option key="-" value={null}>Select RFQ</option>
                    {evaluationTypesRfq.map(
                        (item, index) =>
                            <option key={index} value={item.id}>#{item.id} &ndash; {item.quoteTitle}</option>
                    )}
                </select>
            </div>
            :
            <div className="input-group">
                <select className="form-control" disabled><option>Loading RFQs...</option></select>
                <span className="spinner-animation form-control-feedback"></span>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';
import * as actions from '../../actions/evaluationAssignmentsAction';

const MatchedSuppliersDropdown = ({ matchedSuppliers, actions, isLoading }) => (
    <div>
        { !isLoading ?
            <div>
                <select name="evaluationLink"
                        className={`form-control ${matchedSuppliers.length === 0 ? 'hidden':'visible'}`}
                        onChange={
                            event => actions.updateChangeMatchedSuppliers(event.target.value)
                        }>
                    <option key="-" value={null}>Select..</option>
                    {matchedSuppliers.map(
                        (item, index) =>
                            <option key={index} value={item.id}>{item.title}</option>
                    )}
                </select>

                <div className={`bs-callout bs-callout-warning ${matchedSuppliers.length === 0 ? 'visible':'hidden'}`}>
                    The selected RFQ doesn't match any suppliers, please select other option
                </div>
            </div>
        :
            <div>
                <span>Loading...</span>
            </div>
        }
    </div>
);

MatchedSuppliersDropdown.propTypes = {
    actions: PropTypes.object,
    matchedSuppliers: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { rfqTypeSelectedId } = state.evaluationAssignment;
    const isLoading = state.evaluationAssignment.meta[`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers`].loading;
    const matchedSuppliers = (state.evaluationAssignment.meta[`/request-for-quotations/${rfqTypeSelectedId}/matched-suppliers`].data || []).map(object => build(state.evaluationAssignment, 'matchedSuppliers', object.id));

    return {
        ...ownProps,
        isLoading,
        matchedSuppliers,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchedSuppliersDropdown);

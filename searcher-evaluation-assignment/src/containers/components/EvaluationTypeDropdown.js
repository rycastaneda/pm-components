import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationTypeDropdown = ({ evaluationTypes, isLoading, actions }) => (
    <div>
        <select name="evaluationIsOn"
                className="form-control"
                onChange={ evt => actions.updateChangeEvaluationType(evt.target.value) }>
            <option key="-" value={null}>{!isLoading ? 'Select..' : 'Loading...'}</option>
            {evaluationTypes.map(
                item => <option key={item.id} value={item.id}>{item.title}</option>
            )}
        </select>
    </div>
);

EvaluationTypeDropdown.propTypes = {
    actions: PropTypes.object,
    isLoading: PropTypes.bool,
    evaluationTypes: PropTypes.array.isRequired,

};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(EvaluationTypeDropdown);

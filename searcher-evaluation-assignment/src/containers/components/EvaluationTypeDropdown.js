import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';
import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationTypeDropdown = ({ evaluationTypes, actions, isLoading }) => (
    <div>

        { !isLoading ?
            <div>
                <select name="evaluationIsOn"
                        className="form-control"
                        onChange={ evt => actions.updateChangeEvaluationType(evt.target.value) }>
                    <option key="-" value={null}>{'Select Evaluation Type'}</option>
                    {evaluationTypes.map(
                        item => <option key={item.id} value={item.id}>{item.title}</option>
                    )}
                </select>
            </div>
            :
            <div className="input-group">
                <select className="form-control" disabled><option>Loading Evaluation Types ...</option></select>
                <span className="spinner-animation form-control-feedback"></span>
            </div>
        }

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

const mapStateToProps = (state, ownProps) => {
    const  isLoading = state.evaluationAssignment.meta['/evaluation-template-assignment-types'].loading;
    const  evaluationTypes = (state.evaluationAssignment.meta['/evaluation-template-assignment-types'].data || []).map(object => build(state.evaluationAssignment, 'evaluationTemplateAssignmentTypes', object.id));

    return {
        ...ownProps,
        evaluationTypes,
        isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationTypeDropdown);

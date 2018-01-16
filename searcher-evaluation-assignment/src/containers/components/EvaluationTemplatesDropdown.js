import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const EvaluationTemplatesDropdown = ({ evaluationTemplates, actions }) => (
    <div>
        <select name="evaluationTemplate"
                className="form-control"
                onChange={ evt => actions.evaluationTemplateUpdateChange(evt.target.value) }>
            <option key="-" value={null}>Select Template</option>
            { evaluationTemplates.map(
                item => <option key={item.id} value={item.id}>{item.title}</option>
            ) }
        </select>
    </div>
);

EvaluationTemplatesDropdown.propTypes = {
    actions: PropTypes.object,
    evaluationTemplates: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(EvaluationTemplatesDropdown);

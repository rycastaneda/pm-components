import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { setOptionValue } from '../actions/evaluationSubmissionAction';
class ScaleDefinition extends Component {

    constructor(props) {
        super(props);
    }

    setOptionValue(criteriaId, questionId, optionId, value) {
        this.props.dispatch(setOptionValue(criteriaId, questionId, optionId, value));
    }

    render() {
        let { scaleDefinition, questionId, criteriaId } = this.props;
        return (
            <div className="radio">
                <span className="score">{scaleDefinition.score}</span>
                <input type="radio" name={`rating-group-${questionId}`} className={`rating-group-${questionId}`} id={`rating-${questionId}-${scaleDefinition.id}`} defaultValue={scaleDefinition.score}
                onChange ={event => this.setOptionValue(criteriaId, questionId, scaleDefinition.id, event.target.value)}/>
                <label htmlFor={`rating-${questionId}-${scaleDefinition.id}`}>{scaleDefinition.definition}</label>
            </div>
        );
    }

}

ScaleDefinition.propTypes = {
    criteriaId:PropTypes.string.isRequired,
    enableScaleDefinitions:PropTypes.number.isRequired,
    questionId:PropTypes.string.isRequired,
    scaleDefinitionId:PropTypes.string.isRequired,
    scaleDefinition:PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    let { scaleDefinitionByIndex, questionTypeDefinitionsByIndex } = state.evaluationSubmission;
    let { questionId, scaleDefinitionId } = props;
    let scaleDefinition;

    if (props.enableScaleDefinitions) {
        scaleDefinition = scaleDefinitionByIndex[scaleDefinitionId];
        let qnTypeDfn = questionTypeDefinitionsByIndex[scaleDefinition.typeDefinitionId];
        let { value, title } = qnTypeDfn;
        scaleDefinition = { ...scaleDefinition, value, title };
        window.console.log(scaleDefinition);
    } else {
        let { value, title, id } = questionTypeDefinitionsByIndex[scaleDefinitionId];
        let score = null;
        let definition = null;
        let typeDefinitionId = null;
        scaleDefinition =  { id, score, definition, value, title, typeDefinitionId };
    }
    return { scaleDefinition, questionId  };
}

export default connect(mapStateToProps)(ScaleDefinition);

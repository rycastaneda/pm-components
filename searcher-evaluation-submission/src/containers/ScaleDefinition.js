import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { setOptionValue } from '../actions/evaluationSubmissionAction';
class ScaleDefinition extends Component {

    constructor(props) {
        super(props);
    }

    setOptionValue(questionId, scaleDefinitionId, value) {
        window.console.log('ScaleDefinition>setOptionValue', questionId, scaleDefinitionId, value);
        this.props.dispatch(setOptionValue(questionId, scaleDefinitionId, value));
    }

    render() {
        let { scaleDefinition, questionId, selectedDefinition, questionType } = this.props;
        return (
            <div className="radio">
                { questionType==='3'?
                    null:
                    <span className="score">{scaleDefinition.value}</span>
                }
                <input type="radio"
                name={`rating-group-${questionId}`}
                checked={ scaleDefinition.value === selectedDefinition }
                className={`rating-group-${questionId}`} id={`rating-${questionId}-${scaleDefinition.id}`}
                defaultValue={scaleDefinition.value}
                onChange ={event => this.setOptionValue(questionId, scaleDefinition.id, event.target.value)}/>
                <label htmlFor={`rating-${questionId}-${scaleDefinition.id}`}>{scaleDefinition.definition}</label>
            </div>
        );
    }

}

ScaleDefinition.propTypes = {
    questionType : PropTypes.string.isRequired,
    enableScaleDefinitions:PropTypes.number.isRequired,
    questionId:PropTypes.string.isRequired,
    typeDefinitionId:PropTypes.string.isRequired,
    selectedDefinition:PropTypes.string,
    scaleDefinitionIds:PropTypes.array,
    scaleDefinition:PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    let { scaleDefinitionByIndex, questionTypeDefinitionsByIndex } = state.evaluationSubmission;

    let { questionId, scaleDefinitionIds, typeDefinitionId } = props;
    let { value, title, id } = questionTypeDefinitionsByIndex[String(typeDefinitionId)];
    let score = 0;
    let definition = null;
    if (props.enableScaleDefinitions) {
        let scaleDefinitions = scaleDefinitionIds.map((scaleDefinitionId) => {
            return scaleDefinitionByIndex[String(scaleDefinitionId)];
        });
        let scaleDefinitionObj = scaleDefinitions.find(scaleDefn => scaleDefn.typeDefinitionId === typeDefinitionId);
        if (scaleDefinitionObj) {
            score = scaleDefinitionObj.score;
            definition = scaleDefinitionObj.definition;
        }
    } else if (props.questionType==='3') {
        if (Number(value)) {
            definition = 'Yes';
        } else {
            definition = 'No';
        }
    }
    let scaleDefinition =  { id, score, definition, value, title };


    return { scaleDefinition, questionId  };
}

export default connect(mapStateToProps)(ScaleDefinition);

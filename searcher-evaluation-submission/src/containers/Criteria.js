import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { criteriaMaximised } from '../actions/evaluationSubmissionAction';
class Criteria extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { criteria } = this.props;
        if (criteria.isMaximised) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pmaccordion pmaccordion--impact">
                            <a href="javascript:;" className="pmaccordion__head" data-toggle="collapse" onClick={ () => {
                                this.props.dispatch(criteriaMaximised(criteria.id, !criteria.isMaximised));
                            } }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="pmaccordion__title font-rg">{this.props.index+1}. {criteria.title}</div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <div className="weight">
                                            Weighting: <strong>{criteria.weight}%</strong>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div id="first-question" className="questionnaire-panel collapse in">
                                <div className="pmaccordion__body">
                                    { criteria.questions.map(
                                    (questionId, index) =>
                                        <div key={index}>
                                            <Question index={index} criteriaId ={criteria.id} questionId = {questionId} questionIndex ={`${this.props.index+1}.${index+1}`}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pmaccordion pmaccordion--impact">
                            <a href="javascript:;" className="pmaccordion__head" data-toggle="collapse" onClick={ () => {
                                this.props.dispatch(criteriaMaximised(criteria.id, !criteria.isMaximised));
                            } }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="pmaccordion__title font-rg">this.props.index+1}. {criteria.title}</div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <div className="weight">
                                            Weighting: <strong>{criteria.weight}%</strong>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }


    }
}
Criteria.propTypes = {
    criteria:PropTypes.object.isRequired,
    criteriaId:PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    index:PropTypes.number
};

function mapStateToProps(state, props) {
    let { criteriaByIndex } = state.evaluationSubmission;
    let { criteriaId } = props;
    let criteria = criteriaByIndex[criteriaId];
    return { criteria };
}
export default connect(mapStateToProps)(Criteria);

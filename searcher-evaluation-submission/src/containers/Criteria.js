import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
class Criteria extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { criteria } = this.props;
        return (
            <div className="row">

                <div className="col-sm-12">
                    <div className="pmaccordion pmaccordion--impact">
                        <a href="#first-question" className="pmaccordion__head" data-toggle="collapse">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="pmaccordion__title font-rg">{criteria.title}</div>
                                </div>
                                <div className="weight text-right">
                                    Weighting: {criteria.weight}%
                                </div>
                            </div>
                        </a>
                        <div id="first-question" className="questionnaire-panel collapse in">
                            <div className="pmaccordion__body">
                                { criteria.questions.map(
                                (questionId, index) =>
                                    <div key={index}>
                                        <Question index={index} criteriaId ={criteria.id} questionId = {questionId} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}
Criteria.propTypes = {
    criteria:PropTypes.object.isRequired,
    criteriaId:PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
    let { criteriaByIndex } = state.evaluationSubmission;
    let { criteriaId } = props;
    let criteria = criteriaByIndex[criteriaId];
    return { criteria };
}
export default connect(mapStateToProps)(Criteria);

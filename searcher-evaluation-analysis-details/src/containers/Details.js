import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvaluation, changeView } from '../actions/evaluation';

import Criterion from '../components/Criterion';
import Loader from '../components/Loader';
import ViewSelector from '../components/ViewSelector';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const evaluationId = parent.getAttribute('data-evaluation-id');
        const currentView = parent.getAttribute('data-view');

        this.props.dispatch(fetchEvaluation(evaluationId, currentView));
    }

    changeView(event) {
        this.props.dispatch(changeView(event.target.id));
    }

    render() {
        const { criteria, currentView, isLoading } = this.props;
        const criteriaComponents = criteria.map(section => {
            return <Criterion key={section.id} {...section} />;
        });

        return (
            <div ref={ref => (this.domRef = ref)}>
                <ViewSelector view={currentView} changeView={this.changeView} />
                {isLoading ? <Loader /> : criteriaComponents}
            </div>
        );
    }
}

Details.propTypes = {
    dispatch: PropTypes.func.isRequired,
    criteria: PropTypes.array.isRequired,
    currentView: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const {
        evaluation: rawEvaluation,
        criterion: rawCriterion,
        question: rawQuestions,
        // staff: rawStaff,
        ui
    } = state;

    let criteria = [];
    let isLoading = ui.isLoading.who === 'evaluation' && !ui.isLoading.done;
    let currentView = ui.currentView;

    if (isLoading) {
        return {
            criteria,
            currentView,
            isLoading
        };
    }

    if (ui.currentView === 'single') {
        rawEvaluation.byId[ui.evaluationId].criteriaIds.map(criterionId => {
            let criteria = rawCriterion.byId[criterionId];

            criteria.questions = criteria.questionIds.map(questionId => {
                let question = rawQuestions.byId[questionId];
                return question;
            });

            return criteria;
        });
    }

    return { criteria, currentView, isLoading };
}

export default connect(mapStateToProps)(Details); // adds dispatch prop

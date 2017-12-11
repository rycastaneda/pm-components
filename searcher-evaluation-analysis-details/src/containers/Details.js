import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvaluation, changeView } from '../actions/evaluation';

import Criterion from './Criterion';
import Loader from '../components/Loader';
import ViewSelector from '../components/ViewSelector';
import ComparisonTable from './ComparisonTable';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const assignmentId = parent.getAttribute(
            'data-evaluation-assignment-id'
        );
        const currentView = parent.getAttribute('data-view');

        this.props.dispatch(fetchEvaluation(assignmentId, currentView));
    }

    changeView(event) {
        this.props.dispatch(changeView(event.target.id));
        this.props.dispatch(fetchEvaluation(null, event.target.id));
    }

    render() {
        const { criteria, currentView, isLoading } = this.props;
        const criteriaComponents = criteria.map(criterion => {
            return <Criterion key={criterion.id} {...criterion} />;
        });

        return (
            <div ref={ref => (this.domRef = ref)}>
                <div className="row">
                    <div className="pull-right">
                        <ViewSelector
                            view={currentView}
                            changeView={this.changeView}
                        />
                    </div>
                </div>
                <div className="row mar-top-sm criteria-list">
                    {isLoading ? (
                        <Loader />
                    ) : currentView === 'compare' ? (
                        <ComparisonTable criteria={criteria} />
                    ) : (
                        criteriaComponents
                    )}
                </div>
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
        questions: rawQuestions,
        staff: rawStaff,
        comments: rawComments,
        ui
    } = state;

    let criteria = [];
    let isLoading = ui.isLoading.who === 'evaluation' && !ui.isLoading.done;
    let currentView = ui.currentView;

    const getComments = commentId => {
        let comment = rawComments.byId[commentId];
        let staff = rawStaff.byId[comment.staffId];
        comment.staff = staff.name;
        return comment;
    };

    const getQuestions = questionId => {
        let question = rawQuestions.byId[questionId];
        question.comments = question.commentIds.map(getComments);
        return question;
    };

    const getCriteria = criterionId => {
        let criteria = rawCriterion.byId[criterionId];
        criteria.questions = criteria.questionIds.map(getQuestions);

        return criteria;
    };

    if (isLoading) {
        return {
            criteria,
            currentView,
            isLoading
        };
    }

    let criteriaIds = rawCriterion.allIds;
    if (ui.currentView !== 'compare') {
        criteriaIds = rawEvaluation.byId[ui.assignmentId].criteriaIds;
    }

    criteria = criteriaIds.map(getCriteria);

    return { criteria, currentView, isLoading };
}

export default connect(mapStateToProps)(Details); // adds dispatch prop

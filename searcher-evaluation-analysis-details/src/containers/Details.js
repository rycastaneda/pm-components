import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchEvaluation,
    changeView,
    toggleCriterionCollapse
} from '../actions/evaluation';

import Criterion from './Criterion';
import Loader from '../components/Loader';
import ViewSelector from '../components/ViewSelector';
import ComparisonTable from './ComparisonTable';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.toggleCriterionCollapse = this.toggleCriterionCollapse.bind(this);
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const assignmentId = parent.getAttribute(
            'data-evaluation-assignment-id'
        );
        const canViewAll = parent.getAttribute('data-view-all');
        console.log('canViewAll', canViewAll); // eslint-disable-line quotes, no-console
        const currentView = location.hash.substr(1);
        this.props.dispatch(
            fetchEvaluation(assignmentId, currentView, canViewAll)
        );
    }

    changeView(event) {
        this.props.dispatch(changeView(event.target.id));
        this.props.dispatch(fetchEvaluation(null, event.target.id));
    }

    toggleCriterionCollapse() {
        this.props.dispatch(toggleCriterionCollapse(null));
    }

    render() {
        const {
            criteria,
            currentView,
            isLoading,
            error,
            expandAll,
            canViewAll
        } = this.props;
        const criteriaComponents = criteria.map(criterion => {
            return <Criterion key={criterion.id} {...criterion} />;
        });

        const expandToggle = (
            <div className="pull-left">
                <button
                    className="btn db-function mar-top-sm"
                    onClick={this.toggleCriterionCollapse}>
                    {expandAll ? 'Collapse All' : 'Expand All'}
                </button>
            </div>
        );

        return (
            <div ref={ref => (this.domRef = ref)}>
                {error ? (
                    <div className="bs-callout bs-callout-danger">{error}</div>
                ) : (
                    <div>
                        <div className="row">
                            {currentView !== 'compare' ? expandToggle : null}
                            <div className="pull-right">
                                <ViewSelector
                                    view={currentView}
                                    changeView={this.changeView}
                                    canViewAll={canViewAll}
                                />
                            </div>
                            <div className="clearfix" />
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
                )}
            </div>
        );
    }
}

Details.propTypes = {
    dispatch: PropTypes.func.isRequired,
    criteria: PropTypes.array.isRequired,
    currentView: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    expandAll: PropTypes.bool.isRequired,
    canViewAll: PropTypes.bool.isRequired,
    error: PropTypes.string
};

function mapStateToProps(state) {
    const {
        assignments: rawAssignments,
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
    let error = ui.error;
    let canViewAll = ui.canViewAll;
    let expandAll = rawCriterion.expandAll;

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
            isLoading,
            error,
            expandAll,
            canViewAll
        };
    }

    let criteriaIds = rawCriterion.allIds;
    if (ui.currentView !== 'compare') {
        let evaluationId = rawAssignments.byId[ui.assignmentId].templateId;

        criteriaIds = rawEvaluation.byId[evaluationId].criteriaIds;
    }

    criteria = criteriaIds.map(getCriteria);

    return { criteria, currentView, isLoading, error, expandAll, canViewAll };
}

export default connect(mapStateToProps)(Details); // adds dispatch prop

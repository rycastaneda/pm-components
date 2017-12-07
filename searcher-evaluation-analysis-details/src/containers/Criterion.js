import React, { PropTypes, Component } from 'react';
import Report from '../components/Report';
import Question from '../components/Question';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { toggleCriterionCollapse, changeTab } from '../actions/evaluation';
export class Criterion extends Component {
    constructor(props) {
        super(props);
        this.newComment = {
            ref: null,
            comment: ''
        };

        this.state = {
            open: false,
            tab: 'responses'
        };

        this.toggleAccordion = this.toggleAccordion.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    toggleAccordion() {
        const { id, dispatch } = this.props;

        dispatch(toggleCriterionCollapse(id));
    }

    changeTab(event) {
        const { id, dispatch } = this.props;

        dispatch(changeTab(id, event.target.id));
    }

    render() {
        const {
            title,
            weight,
            questions,
            isOpen,
            currentTab,
            currentView
        } = this.props;

        const questionComponents = questions.length ? (
            questions.map((question, index) => (
                <Question key={question.id} number={index + 1} {...question} />
            ))
        ) : (
            <div className="mar-top-sm text-center">No Responses yet.</div>
        );

        return (
            <div className="pmaccordion pmaccordion--impact">
                <a
                    onClick={this.toggleAccordion}
                    className={`toggle-section pmaccordion__head ${isOpen
                        ? ''
                        : 'collapsed'}`}>
                    <div className="row-title">
                        <span className="pull-left pmaccordion__title">
                            {title}
                        </span>
                        <span className="pull-right status-icon">
                            Weighting: %
                            <span className="weight">{weight}</span>
                        </span>
                        <div className="clearfix" />
                    </div>
                </a>
                <div
                    className={`collapse mar-btm pad-hor ${isOpen
                        ? 'in'
                        : ''}`}>
                    asdfsadf
                    <Header
                        currentView={currentView}
                        currentTab={currentTab}
                        changeTab={this.changeTab}
                    />
                    {currentTab === 'responses' ? (
                        questionComponents
                    ) : (
                        <Report questions={questions} />
                    )}
                </div>
            </div>
        );
    }
}

Criterion.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    isOpen: PropTypes.bool,
    currentView: PropTypes.string,
    currentTab: PropTypes.string,
    questions: PropTypes.array,
    reports: PropTypes.array,
    dispatch: PropTypes.func
};

function mapStateToProps(state) {
    return { currentView: state.ui.currentView };
}

export default connect(mapStateToProps)(Criterion); // adds dispatch prop

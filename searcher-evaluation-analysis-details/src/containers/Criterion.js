import React, { PropTypes, Component } from 'react';
import Report from '../components/Report';
import Question from '../components/Question';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { toggleCriterionCollapse, changeTab } from '../actions/evaluation';

export class Criterion extends Component {
    constructor(props) {
        super(props);

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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="pmaccordion__title font-rg">
                                {title}
                            </div>
                        </div>
                        <div className="col-md-6 text-right">
                            Weighting:
                            <strong className="weight">{weight}%</strong>
                        </div>
                    </div>
                </a>

                <div className={`collapse ${isOpen ? 'in' : ''}`}>
                    <div className="pmaccordion__body">
                        {currentView === 'all' ? (
                            <Header
                                currentView={currentView}
                                currentTab={currentTab}
                                changeTab={this.changeTab}
                            />
                        ) : null}
                        {currentTab === 'responses' ? (
                            questionComponents
                        ) : (
                            <Report questions={questions} />
                        )}
                    </div>
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

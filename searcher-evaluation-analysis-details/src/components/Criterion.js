import React, { PropTypes, Component } from 'react';
import Report from '../components/Report';
import Question from '../components/Question';
import Header from '../components/Header';

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
        this.setState({
            open: !this.state.open
        });
    }

    changeTab(event) {
        this.setState({
            tab: event.target.id
        });
    }

    render() {
        const { title, weight, questions, reports } = this.props;

        const { open, tab } = this.state;

        const questionComponents = questions.map(question => (
            <Question key={question.id} {...question} />
        ));

        return (
            <div className="pmaccordion pmaccordion--impact">
                <a
                    onClick={this.toggleAccordion}
                    className={`toggle-section pmaccordion__head ${open
                        ? 'collapsed'
                        : ''}`}>
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
                <div className={`collapse pad-hor ${open ? 'in' : ''}`}>
                    <Header currentTab={tab} changeTab={this.changeTab} />
                    {tab === 'responses' ? (
                        questionComponents
                    ) : (
                        <Report reportData={reports} />
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
    questions: PropTypes.array,
    reports: PropTypes.array
};

export default Criterion; // adds dispatch prop

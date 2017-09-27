import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Comment from '../components/Comment';
import { toggleSection, toggleStatus, switchTab } from '../actions';

class Section extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { 
            id,
            name, status, 
            currentTab, isCollapsed, 
            questions, comments,
            isReadOnly
        } = this.props;
        console.log("questions", questions); // eslint-disable-line no-console, quotes
        console.log("comments", comments); // eslint-disable-line no-console, quotes
        const tabs = {
            questions: questions.map(question => <Question {...question}/>),
            comments: comments.map(comment => <Comment {...comment}/>)
        };

        const icon = {
            approved: 'fa-check-circle',
            'not approved': 'fa-times-rectangle',
            'in progress': 'fa-gears',
            pending: 'fa-exclamation'
        };

        return (
            <div className="pmaccordion pmaccordion--impact">
                <a onClick={() => this.props.dispatch(toggleSection(id))} 
                    className={`toggle-section pmaccordion__head ${isCollapsed || 'collapsed'}`}>
                    <div className="row-title">
                        <span className="pull-left pmaccordion__title">{name}</span>
                        <span className="pull-right status-icon">
                            <i className={`fa ${icon}`}></i>
                        </span>
                    </div>
                </a>
                <div className={`collapse ${isCollapsed ? 'in' : ''}`}>
                    <Header 
                        currentTab={currentTab} 
                        status={status} 
                        switchTab={() => { 
                            this.props.dispatch(switchTab(id));
                        }}
                        toggleStatus={(newStatus) => {
                            console.log("newStatus", newStatus); // eslint-disable-line no-console, quotes
                            this.props.dispatch(toggleStatus(newStatus));
                        }}
                        isReadOnly={isReadOnly}/>
                    {currentTab ? tabs[currentTab] : null}
                </div>
            </div>
        );
    }
}

Section.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    currentTab: PropTypes.string,
    isCollapsed: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};


export default connect()(Section);  // adds dispatch prop

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from './Section';
import { toggleSection, fetchSections } from '../actions';
// import { updateState, resetState } from '../actions/boilerplate';

class SignOff extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchSections());
        // We do this because of ES6 class properties do not automatically bind to the React class instance
    }

    render() {
        const { sections } = this.props;

        console.log("sections", sections); // eslint-disable-line no-console, quotes

        return (
            <div>
                {sections.map((section) => {
                    return <Section key={section.id} {...section}></Section>;
                })}
            </div>
        );
    }
}

SignOff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    console.log("state", state); // eslint-disable-line no-console, quotes
    const { 
        sections: rawSections, 
        questions: rawQuestions, 
        comments: rawComments 
    } = state;

    let sections = [];

    if (!rawSections.allIds.length) {
        return { sections };
    }

    sections = rawSections.allIds.map((sectionId) => {
        const section = rawSections.byId[sectionId];
        let questions = section.answers.map((answer) => {
            return {
                ...rawQuestions.byId[answer.questionId],
                answer: answer.answer
            };
        });
        let comments = section.commentIds.map(commentId => rawComments.byId[commentId]);
            
        return {
            sectionId,
            ...section,
            comments,
            questions
        };
    });

    return { sections };
}

export default connect(mapStateToProps)(SignOff);  // adds dispatch prop
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from './Section';
import { fetchSections } from '../actions';
import Loader from '../components/Loader';

class SignOff extends Component {

    constructor(props) {
        super(props);
        let isReadOnly = document.querySelector('[data-component="staff-sign-offs"]').getAttribute('data-read-only');
        this.staffId = +document.querySelector('[data-component="staff-sign-offs"]').getAttribute('data-staff-id');
        this.props.dispatch(fetchSections(isReadOnly === 'true', this.staffId)); // parse string
    }

    render() {
        const { sections, isLoading } = this.props;
        const sectionComponents = sections.map((section) => {
            return <Section key={section.id} {...section}></Section>;
        });

        return (
            <div>
                {isLoading ? <Loader></Loader> : sectionComponents}
            </div>
        );
    }
}

SignOff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const { 
        sections: rawSections, 
        questions: rawQuestions, 
        comments: rawComments,
        staff: rawStaff
    } = state;

    let sections = [];

    if (!rawSections.allIds.length) {
        return { sections, isLoading: rawSections.isLoading };
    }

    sections = rawSections.allIds.map((sectionId) => {
        const section = rawSections.byId[sectionId];
        let questions = section.answers.map((answer) => {
            return {
                id: answer.questionId,
                ...rawQuestions.byId[answer.questionId],
                answer: answer.answer
            };
        });

        let comments = section.commentIds.map((commentId) => {
            let comment = rawComments.byId[commentId];
            return {
                ...comment,
                id: commentId,
                staff: rawStaff.byId[comment.staffId].name
            };
        });
            
        return {
            sectionId,
            ...section,
            comments,
            questions
        };
    });

    return { sections, isLoading: rawSections.isLoading };
}

export default connect(mapStateToProps)(SignOff);  // adds dispatch prop
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from './Section';
import { fetchSections } from '../actions/section';
import Loader from '../components/Loader';

class SignOff extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const isReadOnly = parent.getAttribute('data-read-only');
        const staffId = parent.getAttribute('data-staff-id');
        const organizationId = parent.getAttribute('data-organization-id');
        const panelId = parent.getAttribute('data-panel-id');
        const supplierUserId = parent.getAttribute('data-user-id');
        const preferredSupplierId = parent.getAttribute(
            'data-preferred-supplier-id'
        );
        this.props.dispatch(
            fetchSections(
                isReadOnly === 'true',
                staffId,
                organizationId,
                panelId,
                preferredSupplierId,
                supplierUserId
            )
        );
    }

    render() {
        const { sections, isLoading } = this.props;
        const sectionComponents = sections.map(section => {
            return <Section key={section.id} {...section} />;
        });

        return (
            <div ref={ref => (this.domRef = ref)}>
                {isLoading ? <Loader /> : sectionComponents}
            </div>
        );
    }
}

SignOff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    sectionModalId: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

function mapStateToProps(state) {
    const {
        sections: rawSections,
        questions: rawQuestions,
        comments: rawComments,
        staff: rawStaff,
        response: rawResponses,
        ui
    } = state;

    let sections = [];

    if (!rawSections.allIds.length) {
        return {
            sections,
            isLoading: rawSections.isLoading,
            sectionModalId: null,
            error: ui.error
        };
    }

    sections = rawSections.allIds.map(sectionId => {
        const section = rawSections.byId[sectionId];
        let comments = section.commentIds.map(commentId => {
            let comment = rawComments.byId[commentId];
            let { first_name, last_name } = rawStaff.byId[comment.staffId];
            return {
                ...comment,
                id: commentId,
                staff: `${first_name} ${last_name}`
            };
        });

        let responses = section.responseIds.map(responseId => {
            const response = rawResponses.byId[responseId];
            const staff = rawStaff.byId[response.staffId];
            const name = `${staff.first_name} ${staff.last_name}`;
            const status = response.status;

            return {
                id: responseId,
                staffId: response.staffId,
                staffLoading: staff.isLoading,
                name,
                status
            };
        });

        let questions = [];

        if (rawQuestions.bySectionId[sectionId]) {
            questions = rawQuestions.bySectionId[sectionId].map(questionId => {
                return rawQuestions.byId[questionId];
            });
        }

        return {
            ...section,
            id: +sectionId,
            comments,
            responses,
            questions
        };
    });

    return {
        sections,
        isLoading: rawSections.isLoading,
        sectionModalId: +ui.sectionModalId,
        error: ui.error
    };
}

export default connect(mapStateToProps)(SignOff); // adds dispatch prop

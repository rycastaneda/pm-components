import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from './Section';
import { fetchSections, toggleAllSectionsCollapse } from '../actions/section';
import Loader from '../components/Loader';
import { format } from 'date-fns';

class SignOff extends Component {
    constructor(props) {
        super(props);
        this.toggleAllSectionsCollapse = this.toggleAllSectionsCollapse.bind(
            this
        );
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const isReadOnly = parent.getAttribute('data-read-only');
        const staffId = parent.getAttribute('data-staff-id');
        const panelId = parent.getAttribute('data-panel-id');
        const supplierUserId = parent.getAttribute('data-user-id');
        const preferredSupplierId = parent.getAttribute(
            'data-preferred-supplier-id'
        );
        this.props.dispatch(
            fetchSections(
                isReadOnly === 'true',
                staffId,
                panelId,
                preferredSupplierId,
                supplierUserId
            )
        );
    }

    toggleAllSectionsCollapse() {
        this.props.dispatch(toggleAllSectionsCollapse());
    }

    render() {
        const { sections, isLoading, expandAll, error } = this.props;
        const sectionComponents = sections.map(section => {
            return <Section key={section.id} {...section} />;
        });

        return (
            <div ref={ref => (this.domRef = ref)}>
                {isLoading && !error ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="panel panel-default pad-all">
                            <div className="row text-right">
                                <div className="col-md-12">
                                    <a
                                        onClick={this.toggleAllSectionsCollapse}
                                        className="btn btn-sm selection-toggle expand">
                                        {!expandAll
                                            ? 'Expand All'
                                            : 'Collapse All'}
                                    </a>
                                </div>
                            </div>
                        </div>
                        {sectionComponents}
                    </div>
                )}

                {error ? (
                    <div className="bs-callout bs-callout-danger">{error}</div>
                ) : null}
            </div>
        );
    }
}

SignOff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    sectionModalId: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    expandAll: PropTypes.bool.isRequired,
    error: PropTypes.string
};

function mapStateToProps(state) {
    const {
        sections: rawSections,
        questions: rawQuestions,
        comments: rawComments,
        staff: rawStaff,
        response: rawResponses,
        uploads: rawUploads,
        ui
    } = state;

    let sections = [];
    let { expandAll } = ui;

    if (!rawSections.allIds.length) {
        return {
            sections,
            isLoading: rawSections.isLoading,
            sectionModalId: null,
            expandAll,
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
                text: comment.text,
                date: format(comment.date, 'MM-DD-YYYY HH:mma'),
                id: commentId,
                staff: `${first_name} ${last_name}`
            };
        });

        let responses = section.responseIds.map(responseId => {
            const response = rawResponses.byId[responseId];
            const staff = rawStaff.byId[response.staffId];
            const { statusId } = response;

            return {
                id: responseId,
                staffId: response.staffId,
                staffLoading: staff.isLoading,
                name: staff.name,
                statusId
            };
        });

        let questions = section.questionIds.map(questionId => {
            let question = rawQuestions.byId[questionId];

            question.uploads = question.uploadIds.map(
                uploadId => rawUploads.byId[uploadId]
            );

            return question;
        });
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
        expandAll,
        error: ui.error
    };
}

export default connect(mapStateToProps)(SignOff); // adds dispatch prop

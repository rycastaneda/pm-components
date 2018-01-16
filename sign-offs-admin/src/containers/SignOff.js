import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from './Section';
import { fetchSections, toggleAllSectionsCollapse } from '../actions/section';
import ManageSectionModal from './ManageSectionModal';
import Loader from '../components/Loader';

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
        const currentStaffId = parent.getAttribute('data-user-id');
        const preferredSupplierId = parent.getAttribute(
            'data-preferred-supplier-id'
        );
        const supplierUserId = parent.getAttribute('data-supplier-user-id');

        this.props.dispatch(
            fetchSections(
                isReadOnly === 'true',
                currentStaffId,
                preferredSupplierId,
                supplierUserId
            )
        );
    }

    toggleAllSectionsCollapse() {
        this.props.dispatch(toggleAllSectionsCollapse());
    }

    render() {
        const { sections, isLoading, sectionModalId, expandAll } = this.props;
        const sectionComponents = sections.map(section => {
            return <Section key={section.id} {...section} />;
        });

        return (
            <div ref={ref => (this.domRef = ref)}>
                {isLoading ? (
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
                <ManageSectionModal sectionId={sectionModalId} />
            </div>
        );
    }
}

SignOff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    sectionModalId: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    expandAll: PropTypes.bool.isRequired
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
    let { expandAll } = ui;

    if (!rawSections.allIds.length) {
        return {
            sections,
            isLoading: rawSections.isLoading,
            sectionModalId: null,
            expandAll
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
            const name = `${rawStaff.byId[response.staffId]
                .first_name} ${rawStaff.byId[response.staffId].last_name}`;
            const status = response.status;

            return {
                id: response.staffId,
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
        expandAll
    };
}

export default connect(mapStateToProps)(SignOff); // adds dispatch prop

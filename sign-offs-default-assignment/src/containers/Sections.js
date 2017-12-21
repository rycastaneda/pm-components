import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from '../components/Section';
import {
    fetchSections,
    toggleSectionCollapse,
    toggleAllSectionCollapse
} from '../actions/section';

class Sections extends Component {
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const parent = this.domRef.parentNode; // eslint-disable-line
        const panelId = parent.getAttribute('data-panel-id');

        this.props.dispatch(fetchSections(panelId));
    }

    toggleCollapse(sectionId) {
        this.props.dispatch(
            sectionId
                ? toggleSectionCollapse(sectionId)
                : toggleAllSectionCollapse()
        );
    }

    render() {
        const { sections, error } = this.props;

        return (
            <div ref={ref => (this.domRef = ref)}>
                {error ? (
                    <div className="bs-callout bs-callout-danger">{error}</div>
                ) : (
                    <div className="row">
                        <div className="pull-right">
                            <button
                                className="btn db-function expand-all"
                                onClick={() => this.toggleCollapse(false)}>
                                Expand All
                            </button>
                        </div>
                    </div>
                )}

                {sections.map(section => (
                    <Section
                        key={section.id}
                        {...section}
                        toggleCollapse={() => this.toggleCollapse(section.id)}
                    />
                ))}
            </div>
        );
    }
}

Sections.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const { sections: rawSections, staff: rawStaffs, ui } = state;
    let sections = rawSections.allIds.map(sectionId => {
        let section = rawSections.byId[sectionId];
        let defaultUsers = section.defaultUserIds.map(
            userId => rawStaffs.byId[userId]
        );

        return { ...section, defaultUsers, error: ui.error };
    });

    return {
        sections,
        error: ui.error
    };
}

export default connect(mapStateToProps)(Sections); // adds dispatch prop

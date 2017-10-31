import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Section from '../components/Section';
import { fetchSections, toggleSectionCollapse } from '../actions/section';
import { fetchStaff } from '../actions/staff';

class Sections extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(fetchSections());
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse(sectionId) {
        this.props.dispatch(toggleSectionCollapse(sectionId));
        this.props.dispatch(fetchStaff(sectionId));
    }

    render() {
        const { sections } = this.props;

        return (
            <div>
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
    sections: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const { sections: rawSections, staff: rawStaffs } = state;

    let sections = rawSections.allIds.map(sectionId => {
        let section = rawSections.byId[sectionId];
        let defaultUsers = section.defaultUserIds.map(
            userId => rawStaffs.byId[userId]
        );

        return { ...section, defaultUsers };
    });

    return {
        sections
    };
}

export default connect(mapStateToProps)(Sections); // adds dispatch prop

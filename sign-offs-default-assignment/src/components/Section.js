import React, { PropTypes } from 'react';
import UserSelector from '../containers/UserSelector';

const Section = ({
    id,
    title,
    isCollapsed,
    isLoading,
    defaultUsers,
    toggleCollapse
}) => (
    <div className="pmaccordion pmaccordion--impact">
        <a
            onClick={toggleCollapse}
            className={`toggle-section pmaccordion__head ${isCollapsed ||
                'collapsed'}`}>
            <div className="section-title">{title}</div>
        </a>
        <div className={`collapse pad-all-xs ${isCollapsed ? 'in' : ''}`}>
            <UserSelector
                sectionId={id}
                isLoading={isLoading}
                assignedUsers={defaultUsers}
            />
        </div>
    </div>
);

Section.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    defaultUsers: PropTypes.array.isRequired,
    toggleCollapse: PropTypes.func.isRequired
};

export default Section;

import React, { PropTypes } from 'react';
import SectionRow from './SectionRow';
import Header from './Header';
import { ROW_HEADERS } from '../constants/tables';

const Panel = ({ title, sections, toggleCommentsModal }) => {
    const sectionComponents = sections
        .filter(section => section.assignments.length)
        .map(section => (
            <SectionRow
                key={section.id}
                id={section.id}
                section={section.title}
                assignees={section.assignments}
                commentCount={section.comments.length}
                toggleCommentsModal={toggleCommentsModal}
            />
        ));

    return (
        <tr>
            <td colSpan="5" className="td-center">
                <h3>{title}</h3>
                <table className="table db-table db-table-sort db-table-sort-nojs">
                    <thead>
                        <tr>
                            {ROW_HEADERS.map(header => (
                                <Header key={header.field} text={header.text} />
                            ))}
                        </tr>
                    </thead>
                    {sectionComponents}
                </table>
            </td>
        </tr>
    );
};

Panel.propTypes = {
    title: PropTypes.string,
    sections: PropTypes.array,
    toggleCommentsModal: PropTypes.func
};

export default Panel;

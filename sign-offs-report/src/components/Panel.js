import React, { PropTypes } from 'react';
import AssignmentRow from './AssignmentRow';
import Header from './Header';
import { ROW_HEADERS } from '../constants/tables';

const Panel = ({ assignments, toggleCommentsModal }) => {
    const assignmentComponents = assignments.map(assignment => {
        return assignment.panels.map(panel => {
            return (
                <AssignmentRow
                    key={assignment.id + '-' + panel.short_name}
                    id={assignment.id}
                    sectionId={assignment.sectionId}
                    sectionTitle={assignment.sectionTitle}
                    staffName={assignment.staffName}
                    statusId={assignment.statusId}
                    panelTitle={panel.short_name}
                    lastUpdated={assignment.lastUpdated}
                    commentCount={assignment.comments.length}
                    toggleCommentsModal={toggleCommentsModal}
                />
            );
        });
    });

    return (
        <tr>
            <td colSpan="5" className="td-center">
                <table className="table db-table db-table-sort db-table-sort-nojs">
                    <thead>
                        <tr>
                            {ROW_HEADERS.map(header => (
                                <Header key={header.field} text={header.text} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>{assignmentComponents}</tbody>
                </table>
            </td>
        </tr>
    );
};

Panel.propTypes = {
    assignments: PropTypes.array,
    toggleCommentsModal: PropTypes.func
};

export default Panel;

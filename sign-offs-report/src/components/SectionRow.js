import React, { PropTypes } from 'react';
import { status } from '../constants/filters';
const Row = ({ id, section, assignees, commentCount, toggleCommentsModal }) => {
    return (
        <tbody key={id}>
            {assignees.map(assignee => (
                <tr key={assignee.id}>
                    <td>{section}</td>
                    <td>{`${assignee.assignedTo.first_name} ${assignee
                        .assignedTo.last_name}`}</td>
                    <td className="td-center">
                        {status[assignee.statusId].label}
                    </td>
                    <td className="td-center">N/A</td>
                    <td className="td-center comments">
                        {commentCount ? (
                            <i
                                className="fa fa-comments col-brand pointer"
                                id={id}
                                onClick={toggleCommentsModal}
                            />
                        ) : (
                            'No Comments'
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

Row.propTypes = {
    id: PropTypes.string,
    section: PropTypes.string,
    assignees: PropTypes.array,
    commentCount: PropTypes.number,
    preferredSupplierId: PropTypes.number,
    toggleCommentsModal: PropTypes.func.isRequired
};

export default Row;

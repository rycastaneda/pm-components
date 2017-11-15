import React, { PropTypes } from 'react';
import { format } from 'date-fns';

const Row = ({
    id,
    supplier,
    panels,
    section,
    assignee,
    status,
    lastUpdated,
    comments,
    toggleCommentsModal
}) => (
    <tr>
        <td>{supplier}</td>
        <td>{panels}</td>
        <td>{section}</td>
        <td>{assignee}</td>
        <td className="td-center">{status}</td>
        <td className="td-center">
            {lastUpdated ? format(lastUpdated, 'MMMM D, YYYY HH:mm a') : 'N/A'}
        </td>
        <td className="td-center comments">
            {comments ? (
                <i
                    className="fa fa-comments"
                    id={id}
                    onClick={toggleCommentsModal}
                />
            ) : (
                'No Comments'
            )}
        </td>
    </tr>
);

Row.propTypes = {
    id: PropTypes.string,
    supplier: PropTypes.string,
    panels: PropTypes.string,
    section: PropTypes.string,
    assignee: PropTypes.string,
    status: PropTypes.string,
    lastUpdated: PropTypes.string,
    comments: PropTypes.number,
    toggleCommentsModal: PropTypes.func.isRequired
};

export default Row;

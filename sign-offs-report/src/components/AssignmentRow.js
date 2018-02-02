import React, { PropTypes } from 'react';
import format from 'date-fns/format';

const Row = ({
    id,
    section,
    assignee,
    status,
    lastUpdated,
    commentCount,
    toggleCommentsModal
}) => {
    return (
        <tr>
            <td>{section}</td>
            <td>{assignee}</td>
            <td className="td-center">{status}</td>
            <td className="td-center">
                {lastUpdated
                    ? format(lastUpdated, 'MMMM D, YYYY HH:mm a')
                    : 'N/A'}
            </td>
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
    );
};

Row.propTypes = {
    id: PropTypes.string,
    section: PropTypes.string,
    assignee: PropTypes.string,
    status: PropTypes.string,
    lastUpdated: PropTypes.string,
    commentCount: PropTypes.number,
    preferredSupplierId: PropTypes.number,
    toggleCommentsModal: PropTypes.func.isRequired
};

export default Row;

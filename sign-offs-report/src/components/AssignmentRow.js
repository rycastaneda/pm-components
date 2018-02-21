import React, { PropTypes } from 'react';
import { status } from '../constants/filters';
const AssignmentRow = ({
    id,
    sectionId,
    sectionTitle,
    staffName,
    statusId,
    panelTitle,
    lastUpdated,
    commentCount,
    toggleCommentsModal
}) => {
    return (
        <tr key={id}>
            <td>{sectionTitle}</td>
            <td>{staffName}</td>
            <td className="td-center">{status[statusId].label}</td>
            <td className="td-center">{panelTitle}</td>
            <td className="td-center">{lastUpdated || 'N/A'}</td>
            <td className="td-center comments">
                {commentCount ? (
                    <i
                        className="fa fa-comments col-brand pointer"
                        id={sectionId}
                        onClick={toggleCommentsModal}
                    />
                ) : (
                    'No Comments'
                )}
            </td>
        </tr>
    );
};

AssignmentRow.propTypes = {
    id: PropTypes.number,
    sectionId: PropTypes.number,
    sectionTitle: PropTypes.string,
    staffName: PropTypes.string,
    statusId: PropTypes.number,
    panelTitle: PropTypes.string,
    lastUpdated: PropTypes.string,
    commentCount: PropTypes.number,
    toggleCommentsModal: PropTypes.func.isRequired
};

export default AssignmentRow;

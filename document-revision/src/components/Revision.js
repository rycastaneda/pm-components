import React, { PropTypes } from 'react';
import moment from 'moment';

const Revision = ({ revision, handleDownloadRevision }) => {

    return (
        <tr className="text-center">
            <td>{revision.number}</td>
            <td>{revision.status}</td>
            <td>{moment(revision.created_at).format('MMMM Do YYYY, h:mm a')}</td>
            <td>{revision.name}</td>
            <td>
                <a onClick={() => handleDownloadRevision(revision.id)}>
                    <i className="fa fa-download"></i>
                </a>
            </td>
        </tr>
    );
};

Revision.propTypes = {
    revision: PropTypes.object.isRequired,
    handleDownloadRevision: PropTypes.func
};

export default Revision;

import React, { PropTypes } from 'react';
import moment from 'moment';

const Revision = ({ revision, handleDownloadRevision }) => {

    return (
        <tr>
            <td className="text-center">{revision.number}</td>
            <td>{revision.status}</td>
            <td className="text-center">{moment(revision.created_at).format('MMMM Do YYYY, h:mm a')}</td>
            <td>{revision.name}</td>
            <td className="text-center">
                <a onClick={() => handleDownloadRevision(revision.id)}>
                    <i className="fa fa-download icon-link"></i>
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

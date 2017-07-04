import React, { PropTypes } from 'react';
import moment from 'moment';

const Revision = ({ revision, handleDownloadRevision }) => {

    return (
        <tr>
            <td className="revision" data-heading="Revision">{revision.number}</td>
            <td className="status" data-heading="Status">{revision.status}</td>
            <td className="added" data-heading="Added">{moment(revision.created_at).format('MMMM Do YYYY, h:mm a')}</td>
            <td className="filename" data-heading="Name">{revision.name}</td>
            <td className="download" data-heading="Download">
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

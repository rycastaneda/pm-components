import React, { PropTypes } from 'react';
import moment from 'moment';

const Document = ({ document, handleDownloadDocument, items }) => {

    return (
        <tr>
            <td>
                <a className="" onClick={() => handleDownloadDocument(document.id)}>
                    <i className="fa fa-download icon-link"></i>
                </a>

                {document.name}

            </td>
            <td className="text-center">{moment(document.created_at).format('MMMM Do, YYYY h:mm a')}</td>
            <td className="text-center">
                <span data-document-id={document.id} data-size="modal-lg" data-title={`Revision History for ${document.name}`}
                    data-target="#revision-history"
                    className={`badge badge--brand ${document.revisionIds.length && 'pointer revision-badge'}`}>
                    {document.revisionIds.length}
                </span>
            </td>
            {items.map((item) => {
                return (
                    <td key={document.id + item.id}>
                        {!!~document.included.indexOf(item.id) ? <i className="fa fa-check"></i> : null}
                    </td>
                );
            })}
        </tr>
    );
};

Document.propTypes = {
    document: PropTypes.object.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default Document;

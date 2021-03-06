import React, { PropTypes } from 'react';
import moment from 'moment';

const Document = ({ document, handleDownloadDocument, items }) => {
    return (
        <tr>
            <td data-heading="Document" className="pad-left-sm label-nowrap">
                <span className="mar-left-25 hidden-xs"></span>
                <a className="detail-link" onClick={() => handleDownloadDocument(document.id)}>
                    <i className="fa fa-download mar-r-sm icon-link"></i>
                    {document.name}
                </a>
            </td>
            <td data-heading="Added" className="label-nowrap text-center bordered">{moment(document.created_at).format('MMMM Do, YYYY h:mm a')}</td>
            <td data-heading="Revisions" className="text-center bordered">
                <span data-document-id={document.id} data-size="modal-lg" data-title={`Revision History for ${document.name}`}
                    data-target="#revision-history"
                    className={`badge ${document.revisionIds.length && 'badge--brand pointer revision-badge'}`}>
                    {document.revisionIds.length}
                </span>
            </td>
            {items.map((item, key) => {
                return (
                    <td key={document.id + item.id + key} className="bordered text-center" data-heading={item.title}>
                        {document.included.includes(item.id) ? <i className="fa fa-check"></i> : null}
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

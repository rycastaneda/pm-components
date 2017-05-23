import React, { PropTypes } from 'react';
import moment from 'moment';

const Document = ({ document, handleDownloadDocument, handleToggleRevisions, items }) => {

    return (
        <tr className="group-table__document-row">
            <td className="document-table__document-name">
                <a className="filelist__file" onClick={() => handleDownloadDocument(document.id)}>
                    <i className="fa fa-download"></i>
                </a>

                {document.name}

            </td>
            <td className="text-center">{moment(document.created_at).format('MMMM Do, YYYY h:mm a')}</td>
            <td className="text-center">
                <span onClick={() => document.revisionIds.length && handleToggleRevisions()}
                    data-document-id={document.id} data-size="modal-lg" data-title={`Revision History for ${document.name}`}
                    data-target="#revision-history"
                    className={`badge ${document.revisionIds.length && 'revision-badge'}`}>
                    {document.revisionIds.length}
                </span>
            </td>
            {items.map((item) => {
                return (
                    <td className="document-table__document-checkbox" key={document.id + item.id}>
                        <input type="checkbox" readOnly checked={!!~document.included.indexOf(item.id)}/>
                    </td>
                );
            })}
        </tr>
    );
};

Document.propTypes = {
    document: PropTypes.object.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired,
    handleToggleRevisions: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default Document;

import React, { PropTypes } from 'react';
import Revision from './Revision';

const Document = ({ document, handleToggleRevisions, handleDownloadDocument, items }) => {
    function revisions() {
        return document.showRevisions ?
            <ul className="filelist">
                {document.revisions.map(revision => <Revision key={revision.id} handleDownloadDocument={handleDownloadDocument} document={revision}/>)}
            </ul>
        : null;
    }

    return (
        <tr className="group-table__document-row">
            <td className="group-table__document-name">
                <a className="filelist__file" onClick={() => handleDownloadDocument(document.id)}>
                    <i className="fa fa-download"></i>
                </a>

                {document.revisionIds.length ? 'Current Version: ' : null}
                {document.name}

                {document.revisionIds.length ?
                    <a className="mar-l-sm" onClick={() => handleToggleRevisions(document.id)}>
                        {document.showRevisions ? 'Hide History' : 'View History'}
                    </a> : null}

                {revisions()}
            </td>
            {items.map((item) => {
                return (
                    <td className="group-table__document-checkbox" key={document.id + item.id}>
                        <input type="checkbox" readOnly checked={!!~document.included.indexOf(item.id)}/>
                    </td>
                );
            })}
        </tr>
    );
};

Document.propTypes = {
    document: PropTypes.object.isRequired,
    handleToggleRevisions: PropTypes.func.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default Document;

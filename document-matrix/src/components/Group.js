import React, { PropTypes } from 'react';
import Document from './Document';

const Group = ({ group, items, handleDownloadDocument, handleDownloadDocumentGroup, handleToggleRevisions }) => {
    return (
        <tbody>
            <tr className="document-table__group-header">
                <td className="document-table__group-header-title filelist__file" colSpan={items.length+1}>
                    <a onClick={() => handleDownloadDocumentGroup(group.id)}>
                        <i className="fa fa-download"></i>
                    </a>
                    &nbsp;{group.title}
                </td>
            </tr>
            {group.documents.map((document) => {
                return <Document key={document.id}
                            document={document} items={items}
                            handleDownloadDocument={handleDownloadDocument}
                            handleToggleRevisions={handleToggleRevisions}/>;
            })}
        </tbody>
    );
};

Group.propTypes = {
    group: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    handleDownloadDocumentGroup: PropTypes.func.isRequired,
    handleToggleRevisions: PropTypes.func.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired
};

export default Group;

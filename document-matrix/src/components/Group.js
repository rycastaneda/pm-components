import React, { PropTypes } from 'react';
import Document from './Document';

const Group = ({
    group,
    items,
    handleDownloadDocument,
    handleDownloadDocumentGroup
}) => {
    return (
        <tbody>
            <tr>
                <td data-heading="Group" className="group" colSpan={items.length+3}>
                    <a className="detail-link" onClick={() => handleDownloadDocumentGroup(group.id)}>
                        <i className="fa fa-download icon-link mar-r-sm"></i>
                        {group.title}
                    </a>
                </td>
            </tr>
            {group.documents.map((document) => {
                return <Document key={document.id}
                            document={document} items={items}
                            handleDownloadDocument={handleDownloadDocument}/>;
            })}
        </tbody>
    );
};

Group.propTypes = {
    group: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    handleDownloadDocumentGroup: PropTypes.func.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired
};

export default Group;

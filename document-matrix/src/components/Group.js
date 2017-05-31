import React, { PropTypes } from 'react';
import Document from './Document';

const Group = ({
    group,
    items,
    handleDownloadDocument,
    handleDownloadDocumentGroup,
    handleDownloadRequestedItemDocuments
}) => {
    return (
        <tbody>
            <tr>
                <td className="group" colSpan={items.length+3}>
                    <a onClick={() => handleDownloadDocumentGroup(group.id)}>
                        <i className="fa fa-download icon-link"></i>
                    </a>
                    &nbsp;{group.title}
                </td>
            </tr>
            {group.documents.map((document) => {
                return <Document key={document.id}
                            document={document} items={items}
                            handleDownloadDocument={handleDownloadDocument}/>;
            })}
            <tr>
                <td colSpan="3" className="group">Download By Service</td>

                {items.map((item) => {
                    return (
                        <td key={item.id} className="group text-center">
                            <a onClick={() => handleDownloadRequestedItemDocuments(item.id)}>
                                <i className="fa fa-download icon-link"></i>
                            </a>
                        </td>
                    );
                })}
            </tr>
        </tbody>
    );
};

Group.propTypes = {
    group: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    handleDownloadDocumentGroup: PropTypes.func.isRequired,
    handleDownloadRequestedItemDocuments: PropTypes.func.isRequired,
    handleDownloadDocument: PropTypes.func.isRequired
};

export default Group;

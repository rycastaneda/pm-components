import React, { PropTypes } from 'react';
import Document from '../components/Document';
import RequestedItems from '../components/RequestedItems';

const Documents = ({ documents, items, toggleItem, toggleDocument }) => {
    const qs = document.querySelector('[data-all-items]');

    const docs = documents.map((doc, key) => {
        if (qs) {
            return <Document key={key} document={doc} toggleDocument={toggleDocument}/>;
        }

        return <RequestedItems key={key} document={doc} items={items} toggleItem={toggleItem}/>;
    });

    return (
        <tbody>
        {docs}
        </tbody>
    );
};

Documents.propTypes = {
    documents: PropTypes.array.isRequired,
    items: PropTypes.object,
    toggleItem: PropTypes.func,
    toggleDocument: PropTypes.func
};

export default Documents;

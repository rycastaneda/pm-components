import React, { Component, PropTypes } from 'react';

export default class Document extends Component {
    render() {

        const {
            document,
            toggleDocument
        } = this.props;

        let checked = document.requesteditems ? document.requesteditems.length : 0; // Add check if all items are checked, else set this to false

        return (
            <tr className="group-table__document-row">
                <td className="group-table__document-name">{document.name}</td>
                <td className="group-table__document-checkbox"><input type="checkbox" onChange={() => toggleDocument(document)} checked={checked}/></td>
            </tr>
        );
    }
}

Document.propTypes = {
    document: PropTypes.object,
    toggleDocument: PropTypes.func
};

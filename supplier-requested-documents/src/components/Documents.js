import React, { PropTypes, Component } from 'react';
import Document from './Document';

class Documents extends Component {
    render() {
        const documents = this.props.documents.map((document, key) => {
            return <Document
                        key={key}
                        document={document}
                        requirementId={this.props.requirementId}
                        readOnly={this.props.readOnly}
                        downloadDocument={this.props.downloadDocument}
                        onRemoveDocument={this.props.onRemoveDocument}>
                    </Document>;
        });

        return (
            <div className="filelist">
                {documents.length
                ? documents
                : null }
            </div>
        );
    }
}

Documents.propTypes = {
    documents: PropTypes.array.isRequired,
    requirementId: PropTypes.node.isRequired,
    readOnly: PropTypes.bool,
    onRemoveDocument: PropTypes.func.isRequired,
    downloadDocument: PropTypes.func.isRequired
};

export default Documents;

import React, { PropTypes, Component } from 'react';
import Progress from './Progress';

class Document extends Component {
    render() {
        const {
            document,
            requirementId,
            readOnly,
            onRemoveDocument,
            downloadDocument
        } = this.props;

        return (
            <li className={`list-group-item filelist__item ${document.status === 'FAILED' && 'bs-callout-danger'}`}>
                {document.progress !== 100
                    ? <Progress progress={document.progress} status={document.status}></Progress>
                    : null
                }
                <span className="pull-left filelist__file">
                    {document.status === 'SUCCESS' ?
                        <i className="fa fa-download mar-r-sm" onClick={() => downloadDocument(document.id, document.name)}></i>
                    : null }
                    {`${document.name} ${document.status === 'FAILED' && ' - failed to upload. Please try again later.' || ''}`}
                </span>
                {!readOnly ? <span className="pull-right">
                    <i className="fa fa-times" onClick={() => onRemoveDocument(requirementId, document.id)}></i>
                </span> : null}
                <div className="clearfix"></div>
            </li>
        );
    }
}

Document.propTypes = {
    document: PropTypes.object.isRequired,
    requirementId: PropTypes.node.isRequired,
    readOnly: PropTypes.bool,
    onRemoveDocument: PropTypes.func.isRequired,
    downloadDocument: PropTypes.func.isRequired
};

export default Document;

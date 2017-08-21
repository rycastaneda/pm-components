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
            <div className={`filelist__item mar-top-tiny ${document.status === 'FAILED' && 'bs-callout-danger'}`}>
                {document.progress !== 100
                    ? <Progress progress={document.progress} status={document.status}></Progress>
                    : null
                }
                <a className="pull-left filelist__file">
                    {document.status === 'SUCCESS' ?
                        <span  onClick={() => downloadDocument(document.id, document.name)}><i className="fa fa-download mar-r-sm"></i><span>{document.name}</span>
                        </span>
                    : `${document.name} ${document.status === 'FAILED' && ' - failed to upload. Please try again later.' || ''}` }

                </a>
                {!readOnly ? <span className="pull-right">
                    <i className="fa fa-times" onClick={() => onRemoveDocument(requirementId, document.id)}></i>
                </span> : null}
                <div className="clearfix"></div>
            </div>
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

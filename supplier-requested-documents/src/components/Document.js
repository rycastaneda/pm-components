import React, { PropTypes, Component } from 'react';
import Progress from './Progress';

class Document extends Component { 
    render() {
        const {
            document,
            requirementId,
            readOnly,
            onRemoveDocument
        } = this.props;

        return (
            <li className="list-group-item">
                {document.progress !== 100 
                    ? <Progress progress={document.progress} status={document.status}></Progress>
                    : null
                }
                <span className="pull-left">{document.name}</span>
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
    onRemoveDocument: PropTypes.func.isRequired
};

export default Document;


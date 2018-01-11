import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
class Attachment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { attachment } = this.props;
        return (
            <a href={attachment.referenceUrl}><i className={`fa fa-file-o`} ></i> {attachment.name}</a>
        );
    }
}
Attachment.propTypes = {
    attachment:PropTypes.object.isRequired,
    questionId:PropTypes.string.isRequired,
    attachmentId:PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
    let { uploadedDocumentByIndex } = state.evaluationSubmission;
    let { questionId, attachmentId } = props;

    let attachment = uploadedDocumentByIndex[attachmentId];
    if (attachment===undefined) {
        let label = 'Could not find matching document for '+attachmentId;
        attachment = { label, url: attachmentId };
    }
    return { attachment, questionId  };
}
export default connect(mapStateToProps)(Attachment);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
class Attachment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { attachment } = this.props;
        return (
            <a href={attachment.url}><i className={`fa fa-file-o`} ></i> {attachment.label}</a>
        );
    }
}
Attachment.propTypes = {
    attachment:PropTypes.object.isRequired,
    questionId:PropTypes.string.isRequired,
    attachmentId:PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
    let { attachmentByIndex } = state.evaluationSubmission;
    let { questionId, attachmentId } = props;
    let attachment = attachmentByIndex[attachmentId];
    return { attachment, questionId  };
}
export default connect(mapStateToProps)(Attachment);

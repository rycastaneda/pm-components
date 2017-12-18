import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Documents from '../components/Documents';
import Attachment from './Attachment';
import ScaleDefinition from './ScaleDefinition';
import { setOptionValue, setComment, uploadDocuments, deleteDocument } from '../actions/evaluationSubmissionAction';

class Question extends Component {
    constructor(props) {
        super(props);
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
        this.uncheckRadioButtons = this.uncheckRadioButtons.bind(this);
        this.onDeleteAttachment = this.onDeleteAttachment.bind(this);
        this.onDownloadAttachment = this.onDownloadAttachment.bind(this);
    }

    onDownloadAttachment(file) {
        window.console.log(file);

    }
    onDeleteAttachment(documentId) {
        this.props.dispatch(deleteDocument(this.props.questionId, documentId));
    }
    onDocumentDrop(files) {
        const allowedExtenstions = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xls', '.xlsx', '.doc', '.docx', '.dwg'];
        let invalid = [];

        let filteredFiles = files.filter((file) => {
            let extension = file.name.split('.').pop().toLowerCase();

            if (!~allowedExtenstions.indexOf(`.${extension}`)) {
                invalid.push(file.name);
            }

            return !!~allowedExtenstions.indexOf(`.${extension}`);
        });

        if (filteredFiles.length !== files.length) {
            this.setState({
                documentError: invalid.join(', ') + ' - file type not supported'
            });

            return;
        }

        this.setState({
            documentError: ''
        });

        const documents = files.map((file, key) => {
            file.id = +new Date() + key;
            return file;
        });
        this.props.dispatch(uploadDocuments(this.props.questionId, documents));
    }
    onCommentChange(comment) {

        this.props.dispatch(setComment(this.props.questionId, comment));
    }
    uncheckRadioButtons() {
        document.getElementsByClassName('rating-group-1');
        this.props.dispatch(setOptionValue(this.props.questionId, null, null));
    }
    getScaleDefinitionClass(enableScaleDefinitions, questionType) {
        if (enableScaleDefinitions) {
            return 'defined-scale';
        } else {
            if (questionType === 3) {
                return 'horizontal';
            } else {
                return 'undefined-scale';
            }
        }
    }
    render() {
        let { question, index, typeDefinitionIds } = this.props;
        let {
            enableScaleDefinitions,
            selectedDefinition,
            mandatoryComments,
            allowDocuments,
            questionAttachments,
            questionType,
            title,
            id } = question;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 col-sm-11">
                        <h2 className= {`${index===0?'margin-top-0':'border-top'}`} >{id}. {title}</h2>
                        <ol className={`questionnaire ${this.getScaleDefinitionClass(enableScaleDefinitions, questionType)}`}>
                            { typeDefinitionIds.map((definitionId, index) =>
                                <li key={index}>
                                    <ScaleDefinition
                                        enableScaleDefinitions = {enableScaleDefinitions}
                                        selectedDefinition = { selectedDefinition }
                                        questionId = {id}
                                        scaleDefinitionIds = {question.scaleDefinitions}
                                        typeDefinitionId = {definitionId} >
                                    </ScaleDefinition>
                                </li>
                            )}
                        </ol>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="form-group">
                            <button type="button"
                                className="btn btn-sm btn-danger pmfilters__cancel"
                                onClick={this.uncheckRadioButtons}>
                                <i className="fa fa-undo"></i>Clear Rating
                            </button>
                        </div>
                    </div>
                </div>

                { questionAttachments.length > 0 &&
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <h2>Documents</h2>
                        <ul className="attachments">
                            { questionAttachments.map((attachmentId, index) =>
                                <li key={index}>
                                    <Attachment
                                        questionId={id}
                                        attachmentId={attachmentId}>
                                    </Attachment>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }

                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <h2>Comments { mandatoryComments === true && <small>(required)</small> }</h2>
                        <div className="form-group">
                            <textarea name="comments"
                                defaultValue ={this.props.question.comment}
                                className="form-control"
                                rows="4" placeholder="Your comments"
                                required={ mandatoryComments }
                                onBlur={event => this.onCommentChange(event.target.value)}>
                            </textarea>
                        </div>
                    </div>
                </div>
                { Boolean(allowDocuments)&&
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <Dropzone className="dropzone"
                            onDrop={this.onDocumentDrop}>
                                <p className="text-center dropzone__placeholder">
                                    <i className="fa fa-cloud-upload"></i> Drop files here or click to select files.
                                </p>
                            </Dropzone>
                            <Documents
                                files ={this.props.uploadedDocuments}
                                onFileRemove ={this.onDeleteAttachment}
                                onDownloadFile = {this.onDownloadAttachment}
                            >
                            </Documents>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Question.propTypes = {
    questionId: PropTypes.string.isRequired,
    typeDefinitionIds: PropTypes.array.isRequired,
    uploadedDocuments:PropTypes.array,
    question:PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {

    let { questionId, index } = props;
    let { questionByIndex, questionTypeByIndex, uploadedDocumentByIndex } = state.evaluationSubmission;
    let question = questionByIndex[questionId];
    let typeDefinitionIds = questionTypeByIndex[question.type].definitions;
    let uploadedDocuments = question.uploadedDocuments.map(item => uploadedDocumentByIndex[String(item)]);
    return { question, index, typeDefinitionIds, uploadedDocuments };

}

export default connect(mapStateToProps)(Question);

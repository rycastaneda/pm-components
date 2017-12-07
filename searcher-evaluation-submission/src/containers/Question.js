import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Attachment from './Attachment';
import ScaleDefinition from './ScaleDefinition';


class Question extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
        this.uncheckRadioButtons = this.uncheckRadioButtons.bind(this);
    }

    onDocumentDrop(files) {
        window.console.log(files);
    }

    uncheckRadioButtons() {
        document.getElementsByClassName('rating-group-1');
        window.console.log('unchecked');
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
        let { question, criteriaId, index } = this.props;
        let { enableScaleDefinitions, mandatoryComments, allowDocuments, documents, droppedDocuments, questionType, title, id } = question;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 col-sm-11">
                        <h2 className= {`${index===0?'margin-top-0':'border-top'}`} >{id}. {title}</h2>
                        <ol className={`questionnaire ${this.getScaleDefinitionClass(enableScaleDefinitions, questionType)}`}>
                            { question.scaleDefinitions.map((scaleDefinitionId, index) =>
                                <li key={index}>
                                    <ScaleDefinition
                                        criteriaId = {criteriaId}
                                        enableScaleDefinitions = {enableScaleDefinitions}
                                        questionId = {id}
                                        scaleDefinitionId = {scaleDefinitionId} >
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

                { documents.length > 0 &&
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <h2>Attachments</h2>
                        <ul className="attachments">
                            { document.map((attachmentId, index) =>
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
                                className="form-control"
                                rows="4" placeholder="Your comments"
                                required={ mandatoryComments }>
                            </textarea>
                        </div>
                    </div>
                </div>
                { allowDocuments === true &&
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <Dropzone className="dropzone"
                            onDrop={this.onDocumentDrop}>
                                <p className="text-center dropzone__placeholder">
                                    <i className="fa fa-cloud-upload"></i> Drop files here or click to select files.
                                </p>
                            </Dropzone>
                            <ul>
                                { droppedDocuments.map((documents, index) =>
                                    <Document
                                    key={index}
                                    file={documents}
                                    preview={false}
                                    onFileRemove={this.onRemoveDocument}
                                    onDownloadFile={this.onDownloadDocument}></Document>
                                )}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Question.propTypes = {
    criteriaId: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    question:PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {

    let { criteriaId, questionId, index } = props;
    let { questionByIndex } = state.evaluationSubmission;
    let question = questionByIndex[questionId];

    return { question, criteriaId, index };

}

export default connect(mapStateToProps)(Question);

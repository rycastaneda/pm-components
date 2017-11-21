import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Document from '../components/Document';
import { initialize, setOptionValue } from '../actions/evaluationSubmissionAction';

// import Button from '../components/Button';

class EvaluationSubmission extends Component {

    constructor(props) {
        super(props);
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
        this.uncheckRadioButtons = this.uncheckRadioButtons.bind(this);
    }

    uncheckRadioButtons() {
        document.getElementsByClassName('rating-group-1');
        window.console.log('unchecked');
    }
    componentDidMount() {
        this.props.dispatch(initialize());
    }
    onDocumentDrop(files) {
        window.console.log(files);
        files;
    }

    setOptionValue(sectionId, questionId, optionId, value) {
        this.props.dispatch(setOptionValue(sectionId, questionId, optionId, value));
    }

    render() {
        const { sections } = this.props;

        window.console.log(sections);
        return (
            <div>

            { sections.map(

                (section, index) =>

                <div key={index}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="pmaccordion pmaccordion--impact">
                                <a href="#first-question" className="pmaccordion__head" data-toggle="collapse">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="pmaccordion__title font-rg">{section.label}</div>
                                        </div>
                                        <div className="weight text-right">
                                            Weighting: {section.weighting}%
                                        </div>
                                    </div>
                                </a>
                                <div id="first-question" className="questionnaire-panel collapse in">
                                    <div className="pmaccordion__body">
                                        { section.questionnaire.map(

                                            (question, index) =>
                                            <div key={index}>
                                            <div className="row">
                                                <div className="col-md-8 col-sm-11">
                                                    <h2 className= {`${question.id===1?'margin-top-0':'border-top'}`} >{question.id}. {question.label}</h2>

                                                    { question.enable_scale_definitions === true &&
                                                    <ol className="questionnaire defined-scale">
                                                        { question.options.map((option, index) =>
                                                            <li key={index}>
                                                            { window.console.log(question) }
                                                                <div className="radio">
                                                                    <span className="score">{option.score}</span>
                                                                    <input type="radio" name={`rating-group-${question.id}`} className={`rating-group-${question.id}`} id={`rating-${question.id}-${option.id}`} defaultValue={option.score}
                                                                    onChange ={event => this.setOptionValue(section.id, question.id, option.id, event.target.value)}/>
                                                                    <label htmlFor={`rating-${question.id}-${option.id}`}>{option.label}</label>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ol>
                                                }

                                                { question.enable_scale_definitions === false && question.question_type !== 3 &&
                                                    <ol className="questionnaire undefined-scale">
                                                        { question.options.map((option, index) =>
                                                            <li key={index}>
                                                                <div className="radio">
                                                                    <span className="score">{option.score}</span>
                                                                    <input type="radio" name={`rating-group-${question.id}`} className={`rating-group-${question.id}`} id={`rating-${question.id}-${option.id}`} value={option.score} checked={false} />
                                                                    <label htmlFor={`rating-${question.id}-${option.id}`}>{option.label}</label>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ol>
                                                }

                                                { question.enable_scale_definitions === false && question.question_type === 3 &&
                                                    <ol className="questionnaire horizontal">
                                                        { question.options.map((option, index) =>
                                                            <li key={index}>
                                                                <div className="radio">
                                                                    <span className="score">{option.score}</span>
                                                                    <input type="radio" name={`rating-group-${question.id}`} className={`rating-group-${question.id}`} id={`rating-${question.id}-${option.id}`} value={option.score} checked={false} />
                                                                    <label htmlFor={`rating-${question.id}-${option.id}`}>{option.label}</label>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ol>
                                                }

                                                </div>
                                                <div className="col-md-8 col-sm-12">
                                                    <div className="form-group">
                                                        <button type="button" className="btn btn-sm btn-danger pmfilters__cancel" onClick={this.uncheckRadioButtons}><i className="fa fa-undo"></i>Clear Rating</button>
                                                    </div>
                                                </div>
                                            </div>

                                            { question.attachments.length > 0 &&
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-12">
                                                        <h2>Attachments</h2>
                                                        <ul className="attachments">
                                                        { question.attachments.map((attachment, index) =>
                                                            <li key={index}><a href={attachment.url}><i className={`fa fa-file-o`} ></i> {attachment.label}</a></li>
                                                        )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            }

                                            <div className="row">
                                                <div className="col-md-8 col-sm-12">
                                                    <h2>Comments { question.mandatory_comments === true && <small>(required)</small> }</h2>
                                                    <div className="form-group">
                                                        <textarea name="comments" className="form-control" rows="4" placeholder="Your comments" required={ question.mandatory_comments }></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            { question.allow_documents === true &&
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12">
                                                    <Dropzone className="dropzone"
                                                    onDrop={this.onDocumentDrop}>
                                                        <p className="text-center dropzone__placeholder">
                                                            <i className="fa fa-cloud-upload"></i> Drop files here or click to select files.
                                                        </p>
                                                    </Dropzone>
                                                    <ul>
                                                        { section.documents.map((document, index) =>
                                                            <Document
                                                            key = {index}
                                                            file={document}
                                                            preview={false}
                                                            onFileRemove={this.onRemoveDocument}
                                                            onDownloadFile={this.onDownloadDocument}></Document>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        );
    }
}

EvaluationSubmission.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const { sectionsIds } = state.evaluationSubmission;
    let sections = sectionsIds.map(id => state.evaluationSubmission.sections[id]);
    return {
        sections
    };
}

export default connect(mapStateToProps)(EvaluationSubmission);  // adds dispatch prop

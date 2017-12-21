import React, {
    PropTypes,
    Component
} from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Document from '../components/Document';

import {
    QUESTION_OPTIONS
} from '../constants/models';

import {
    getItemByAttrib,
    createQuestion
} from '../utils/dataParserUtil';

import {
    toggleMaximiseQuestion,
    onQuestionTypeChange,
    onQuestionAllowCommentsChange,
    onQuestionAllowUploadChange,
    onScaleDefinitionChange,
    onAllowScaleDefinitionChange,
    addQuestionToCriteria as addQuestion,
    onQuestionTitleChange,
    deleteQuestion,
    deleteDocument,
    addDocumentsForQuestion as addDocuments
} from '../actions/evaluationTemplateCreator';

import { INPUT_SYNC_INTERVAL, SAVE_ANIM_INTERVAL } from '../constants';

class Question extends Component {

    constructor(props) {
        super(props);
        const {
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions,
            isSaved
        } = this.props.question;

        this.state = {
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions,
            documentError:'',
            documents:[],
            isSaved
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.toggleMaximise = this.toggleMaximise.bind(this);
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
        this.onRemoveDocument = this.onRemoveDocument.bind(this);
        this.onScaleDefinitionChange = this.onScaleDefinitionChange.bind(this);
        this.updateScaleDefinition = this.updateScaleDefinition.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.intervalId_update = null;
        this.intervalId_saveAnim = null;
    }

    componentWillReceiveProps(nextProps) {
        let { question }  = nextProps;

        this.setStateWithQuestion(question, question.isSaved);
        this.clearAllIntervals();
        this.intervalId_saveAnim = setInterval(() => {
            this.setState({ isSaved:false });
            clearInterval(this.intervalId_saveAnim);
        },
        SAVE_ANIM_INTERVAL);
    }

    setStateWithQuestion(question, isSaved) {

        const {
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions
        } = question;
        const documentError ='';        
        this.setState({
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions,
            documentError,
            isSaved
        });

    }

    updateQuestionIndex() {
        let newQuestionIndex = this.state.questionIndex;
        this.setState({ newQuestionIndex: newQuestionIndex });
    }

    componentWillUnmount() {
        this.clearAllIntervals();
    }

    addQuestion() {
        this.props.dispatch(addQuestion(this.props.criteriaId, this.state.title, this.state.type));
    }

    deleteQuestion() {
        this.props.dispatch(deleteQuestion(this.props.criteriaId, this.props.question.id));
    }

    updateTitle() {
        if (this.props.question.id!==null) {
            this.props.dispatch(onQuestionTitleChange(this.props.criteriaId, this.props.question.id, this.state.title));
        }
        clearInterval(this.intervalId_update);
    }

    onTitleChange(title) {
        this.setState({ title });
        if (title.length) {
            this.clearAllIntervals();
            this.intervalId_update = setInterval(this.updateTitle, INPUT_SYNC_INTERVAL);
        }
    }

    clearAllIntervals() {
        clearInterval(this.intervalId_update);
        clearInterval(this.intervalId_saveAnim);
    }

    toggleMaximise() {
        this.clearAllIntervals();
        let { question } = this.props;
        this.props.dispatch(toggleMaximiseQuestion(question.id, !question.isMaximised));
    }

    onCommentRequiredChange(isCommentRequired) {
        this.props.dispatch(onQuestionAllowCommentsChange(this.props.criteriaId, this.props.question.id, isCommentRequired));
    }

    onAllowUploadChange(isAllowUpload) {
        this.props.dispatch(onQuestionAllowUploadChange(this.props.criteriaId, this.props.question.id, isAllowUpload));
    }

    onQuestionTypeChange(type) {
        clearInterval(this.intervalId_saveAnim);
        this.setState({ type });
        if (this.props.question.id) {
            this.props.dispatch(onQuestionTypeChange(this.props.criteriaId, this.props.question.id, type));
        }
    }

    updateScaleDefinition(id, index, label, value, definitionId) {
        this.clearAllIntervals();
        this.props.dispatch(onScaleDefinitionChange(this.props.criteriaId, this.props.question.id, id,  label, value, definitionId));
    }

    onScaleDefinitionChange(id, index, label) {
        let { scaleDefinitions } = this.state;
        scaleDefinitions[index] = Object.assign({}, scaleDefinitions[index], { label });

        let { value, definitionId } = scaleDefinitions[index];

        this.setState({ scaleDefinitions });
        this.clearAllIntervals();
        this.intervalId_update = setInterval(() => {
            this.updateScaleDefinition(id, index, label, value, definitionId);
        }, INPUT_SYNC_INTERVAL);
    }

    onAllowScaleDefinitionChange(isAllowScaleDefinitions) {
        let scaleDefinitions = [];
        this.setState({ isAllowScaleDefinitions, scaleDefinitions });
        this.props.dispatch(onAllowScaleDefinitionChange(this.props.criteriaId, this.props.question.id,  isAllowScaleDefinitions));
    }

    onRemoveDocument(id) {
        const { criteriaId, question } = this.props;
        this.props.dispatch(deleteDocument(criteriaId, question.id, id));
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
        const documentError ='';
        this.setState({ documentError });

        const documents = files.map((file, key) => {
            file.id = +new Date() + key;
            return file;
        });
        const { criteriaId, question } = this.props;

        this.props.dispatch(addDocuments(criteriaId, question.id, documents));
    }

    getWeightInputStyle() {
        let style = 'form-control';
        if (this.state.isWeightError) {
            style +=' error';
        } else if (this.state.isSaved) {
            style +=' saved';
        }
        return style;
    }

    renderMinimised() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <fieldset className="question-container collapsed">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>
                                        Question {this.props.questionIndex} <span>{getItemByAttrib(this.props.questionTypes, 'type', this.state.type).title}</span>
                                    </label>
                                    <p>{this.state.title}</p>
                                </div>
                            </div>
                            <div className="col-md-6 text-right">
                                <div className="form-group">
                                    <br />
                                    <button className="btn btn-sm" onClick={ this.toggleMaximise }>
                                        <i className="fa fa-pencil"></i>Edit Question
                                    </button>
                                    &nbsp;
                                    <button className="btn btn-sm" onClick={this.deleteQuestion}>
                                        <i className="fa fa-trash-o"></i>Delete Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

    renderMaximised() {
        const isDefsDisabled = (this.state.type === '3' || this.state.type === '4');

        return (
            <div>
                <h3>Question {this.props.questionIndex}</h3>
                <fieldset className={`question-container ${this.state.isSaved?'saved':''}`}>
                    <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                            <label className="control-label">
                                <span className="required" aria-required="true">Question Type</span>
                            </label>
                            <select className="form-control" value={this.state.type}
                                onChange={event =>  this.onQuestionTypeChange(event.target.value)}>
                                { this.props.questionTypes.map((type, index) =>
                                    <option key={index} value={type.type}>{type.title }</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="control-label">
                                <span className="required" aria-required="true">Question Title
                                </span>
                            </label>
                            <input className="form-control"
                                defaultValue={this.state.title}
                                 onChange={ event => this.onTitleChange(event.target.value)} />
                        </div>
                    </div>

                {
                    this.props.question.id!==null?
                    <div>
                        <div className="form-group pull-right">
                            <div className="hidden-sm">
                            <br /><br />
                            </div>
                            <button
                                className="btn btn-sm"
                                onClick = {this.toggleMaximise} >
                                <i className="fa fa-angle-double-up"></i>
                                Collapse Question
                            </button>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label">Options</label>
                                <ul>
                                {  isDefsDisabled !== true?
                                    <li>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" disabled = {isDefsDisabled}
                                                    checked={this.state.isAllowScaleDefinitions}
                                                    onChange={ event =>
                                                        this.onAllowScaleDefinitionChange(event.target.checked)
                                                    }
                                                />
                                                {QUESTION_OPTIONS[0].label}
                                            </label>
                                        { this.state.isAllowScaleDefinitions?
                                            <ul>
                                                {this.state.scaleDefinitions.map((type, index) =>
                                                    <li key={index} className="mar-btm-sm">
                                                        <div className="input-group">
                                                          <span className="input-group-addon scale" id="basic-addon1">{index}</span>
                                                          <input type="text"
                                                          defaultValue={type.label}
                                                          onChange = {event =>
                                                              this.onScaleDefinitionChange(type.id, index, event.target.value)
                                                          }
                                                          className="form-control" aria-describedby="basic-addon1" placeholder="Enter Definition"/>
                                                        </div>
                                                    </li>)}
                                                </ul>
                                            :null}
                                        </div>
                                    </li>
                                    :null
                                }
                                    <li>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"
                                                    defaultChecked={this.props.question.isAllowUpload}
                                                    value={this.state.isAllowUpload}
                                                    onChange={ event => this.onAllowUploadChange(event.target.checked) }
                                                />
                                                {QUESTION_OPTIONS[1].label}
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"
                                                    defaultChecked = {this.props.question.isCommentRequired}
                                                    value = {this.state.isCommentRequired}
                                                    onChange = { event => this.onCommentRequiredChange(event.target.checked) }/>
                                                    {QUESTION_OPTIONS[2].label}
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label">Documents</label>
                                {this.state.documentError ?
                                    <div className="bs-callout bs-callout-danger">{this.state.documentError}</div>
                                : null}
                                <Dropzone className="dropzone"
                                onDrop={this.onDocumentDrop}>
                                    <p className="text-center dropzone__placeholder">
                                        <i className="fa fa-cloud-upload"></i> Drop files here or click to select files.
                                    </p>
                                </Dropzone>
                                <ul>
                                    { this.props.documents.map((document, index) =>
                                        <Document
                                        key = {index}
                                        file={document}
                                        preview={false}
                                        onFileRemove={this.onRemoveDocument}
                                        ></Document>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    : null
                }
                {this.renderFunctionButtons()}
                </fieldset>
            </div>);
    }

    renderFunctionButtons() {
        if (this.props.question.id===null && this.state.title) {
            return (
                    <div className="col-md-2">
                        <div className="form-group pull-right">
                            <div className="hidden-sm">
                                <br />
                                <br />
                            </div>
                            <button className="btn btn-sm"
                                disabled={!this.state.title}
                                onClick={this.addQuestion}><i className="fa fa-plus"></i>Add Question
                            </button>
                        </div>
                    </div>
            );
        } else {
            return null;
        }
    }
    render() {
        return this.props.question.isMaximised? this.renderMaximised():this.renderMinimised();
    }
}

Question.propTypes = {
    question: PropTypes.object,
    documents:PropTypes.array,
    questionId: PropTypes.string,
    questionIndex: PropTypes.number,
    criteriaId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    questionTypes:PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
    const { questionsByIndex, documentsByIndex, questionTypes } = state.evaluationTemplateCreator;
    let question = props.questionId ? questionsByIndex[props.questionId]: createQuestion(questionTypes[0].type);
    const questionIndex = props.questionIndex;
    let documents = [];
    documents = question.documentIds.map((id) => {
        return documentsByIndex[id];
    });
    return { question, documents, questionTypes, questionIndex };
}

export default connect(mapStateToProps)(Question);

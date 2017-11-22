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
    onQuestionTypeChange,
    onQuestionAllowCommentsChange,
    onQuestionAllowUploadChange,
    onScaleDefinitionChange,
    onAllowScaleDefinitionChange,
    addQuestionToCriteria as addQuestion,
    onQuestionTitleChange,
    deleteQuestion,
    addDocumentsForQuestion as addDocuments
} from '../actions/evaluationTemplateCreator';

class Question extends Component {

    constructor(props) {
        super(props);
        window.console.log(props);
        const { isMaximised,
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions
        } = this.props.question;
        this.state = { isMaximised,
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions,
            documentError:'',
            documents:[]
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.onDiscardChanges = this.onDiscardChanges.bind(this);
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
        this.onScaleDefinitionChange = this.onScaleDefinitionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setStateWithQuestion(nextProps.question);
    }
    setStateWithQuestion(question) {
        const { isMaximised,
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions
        } = question;
        this.setState({ isMaximised,
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions,
            documentError:''
        });
    }
    addQuestion() {
        window.console.log(this.state.type);
        // let questionType =  getItemByAttrib(this.props.questionTypes, 'type', this.state.type);
        this.props.dispatch(addQuestion(this.props.criteriaId, this.state.title, this.state.type));
    }
    deleteQuestion() {
        this.props.dispatch(deleteQuestion(this.props.criteriaId, this.props.question.id));
    }
    onTitleChange(title) {
        this.setState({ title });
        if (this.props.question.id!==null) {
            this.props.dispatch(onQuestionTitleChange(this.props.criteriaId, this.props.question.id, title));
        }
    }
    saveQuestion() {
        let {
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions
        } = this.state;
        let question = Object.assign({}, this.props.question, {
            title,
            isAllowUpload,
            isCommentRequired,
            isAllowScaleDefinitions,
            type,
            scaleDefinitions
        });
        this.props.dispatch(onQuestionTitleChange(this.props.criteriaId, question.id, question.title));
    }

    onDiscardChanges() {
        const question = Object.assign({}, this.props.question);
        question.isMaximised = false;
        this.setStateWithQuestion(question);
    }
    onCommentRequiredChange(isCommentRequired) {
        this.props.dispatch(onQuestionAllowCommentsChange(this.props.criteriaId, this.props.question.id, isCommentRequired));
    }
    onAllowUploadChange(isAllowUpload) {
        this.props.dispatch(onQuestionAllowUploadChange(this.props.criteriaId, this.props.question.id, isAllowUpload));
    }
    onQuestionTypeChange(type) {
        this.props.dispatch(onQuestionTypeChange(this.props.criteriaId, this.props.question.id, type));
    }
    onScaleDefinitionChange(id, index, label) {
        let  scaleDefinitions = this.state.scaleDefinitions;
        scaleDefinitions[index] = Object.assign({}, scaleDefinitions[index], { label });
        this.setState({ scaleDefinitions });
        this.props.dispatch(onScaleDefinitionChange(this.props.criteriaId, this.props.question.id, id,  label));
    }
    onAllowScaleDefinitionChange(isAllowScaleDefinitions) {
        let scaleDefinitions = [];
        if (isAllowScaleDefinitions) {
            if (this.state. type === this.props.question.type) {
                scaleDefinitions = [...this.props.question.scaleDefinitions];
            }
            this.setState({ isAllowScaleDefinitions, scaleDefinitions });
            this.props.dispatch(onAllowScaleDefinitionChange(this.props.criteriaId, this.props.question.id,  isAllowScaleDefinitions));
        }
    }
    onDownloadDocument() {

    }
    onRemoveDocument() {

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
        const { criteriaId, question } = this.props;
        // this.saveQuestion();
        this.props.dispatch(addDocuments(criteriaId, question.id, documents));
    }

    renderMinimised() {
        return (
            <div className="col-md-12">
                <div className="form-group">
                    <label>{getItemByAttrib(this.props.questionTypes, 'type', this.state.type).label}
                    </label>
                    <p>{this.state.title}</p>
                    <ul className="list-inline">
                        <li>
                            <button className="btn btn-sm"
                                onClick={ () => this.setState({ isMaximised:true })}>Edit
                            </button>
                        </li>
                        <li>
                            <button className="btn btn-sm" onClick={this.deleteQuestion}>Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    renderMaximised() {
        const lastQnOption = getItemByAttrib(this.props.questionTypes, 'maxOptionDefinitions', 0);
        const isDefsDisabled = (lastQnOption.type===this.state.type);
        return (<div className="col-md-12">
            <div className="col-md-12">
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
            <div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label">
                            <span className="required" aria-required="true">Question Title
                            </span>
                        </label>
                        <textarea className="form-control"
                            value={this.state.title}
                             onChange={ event => this.onTitleChange(event.target.value)}>
                         </textarea>
                    </div>
                </div>
                {
                    this.props.question.id!==null?
                    <div>
                        <div className="col-md-12">
                            <ul>
                                <li>
                                    <div className="form-group">
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
                                                            <span className="badge">{type.id}</span>
                                                            <input type="text"
                                                            defaultValue={type.label}
                                                            onChange = {event =>
                                                                this.onScaleDefinitionChange(type.id, index, event.target.value)
                                                            }
                                                            className="mar-l-sm" />
                                                        </li>)}
                                                </ul>
                                            :null}
                                        </div>
                                    </div>
                                </li>
                                <li><div className="form-group">
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
                                </div>
                                </li>
                                <li><div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                defaultChecked = {this.props.question.isCommentRequired}
                                                value = {this.state.isCommentRequired}
                                                onChange = { event => this.onCommentRequiredChange(event.target.checked) }/>
                                                {QUESTION_OPTIONS[2].label}
                                            </label>
                                    </div>
                                </div>
                                </li>
                            </ul>
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
                                        onDownloadFile={this.onDownloadDocument}></Document>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            {this.renderFunctionButtons()}
        </div>);
    }
    renderFunctionButtons() {
        if (this.props.question.id===null) {
            return (
                    <div className="col-md-12">
                        <div className="form-group pull-right">
                            <button className="btn btn-sm"
                                disabled={!this.state.title}
                                onClick={this.addQuestion}>Add Question
                            </button>
                        </div>
                    </div>
            );
        } else {
            return null;
        }
    }
    render() {
        return this.state.isMaximised? this.renderMaximised():this.renderMinimised();
    }
}

Question.propTypes = {
    question: PropTypes.object,
    documents:PropTypes.array,
    questionId: PropTypes.string,
    criteriaId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    questionTypes:PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
    const { questionsByIndex, documentsByIndex, questionTypes } = state.evaluationTemplateCreator;

    let question = props.questionId ? questionsByIndex[props.questionId]: createQuestion(questionTypes[0].type);
    let documents = [];
    documents = question.documentIds.map((id) => {
        return documentsByIndex[id];
    });
    return { question, documents, questionTypes };
}

export default connect(mapStateToProps)(Question);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Document from '../components/Document';
import { initialize } from '../actions/evaluationSubmissionAction';

// import Button from '../components/Button';

class EvaluationSubmission extends Component {

    constructor(props) {
        super(props);
        this.onDocumentDrop = this.onDocumentDrop.bind(this);
    }
    componentDidMount() {
        window.console.log('sdfdsf');
        this.props.dispatch(initialize());
    }
    onDocumentDrop(files) {
        window.console.log(files);
        files;
    }

    render() {
        const { sections } = this.props;
        window.console.log(sections);
        return (
            <div>

            { sections.map(

                (section, index) =>

                <div key={index}>
                <span></span>
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
                                        <div className="row">
                                            <div className="col-md-8 col-sm-11">
                                                <h2 className="margin-top-0">{section.questionnaire[index].id}. {section.questionnaire[index].label}</h2>
                                                <ol className="questionnaire">
                                                    { section.questionnaire[index].options.map((options, index) =>
                                                        <li key={index}>
                                                            <div className="radio">
                                                                <input type="radio" name="optionsRadios" id={options.id} value={options.score} />
                                                                <label htmlFor={options.id}>{options.label}</label>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ol>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                                <div className="form-group">
                                                    <button type="button" className="btn btn-sm btn-danger pmfilters__cancel"><i className="fa fa-undo"></i>Clear Rating</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-8 col-sm-12">
                                                <h2>Attachments</h2>
                                                <ul className="attachments">
                                                { section.questionnaire[index].attachments.map((attachment, index) =>
                                                    <li key={index}><a href={attachment.url}><i className={`fa fa-file-o`} ></i> {attachment.label}</a></li>
                                                )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-8 col-sm-12">
                                                <h2>Comments</h2>
                                                <div className="form-group">
                                                    <textarea name="comments" className="form-control" rows="4" placeholder="Your comments"></textarea>
                                                </div>
                                            </div>
                                        </div>

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

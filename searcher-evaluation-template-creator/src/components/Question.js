import React, { PropTypes,  Component } from 'react';
import Dropzone from 'react-dropzone';
import { QUESTION_TYPES } from '../constants/DataConstants';
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        window.console.log(this.props.question);
        let { selectedQuestionId } =this.props.question;
        return     (<div className="col-md-12">
            <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Question Type</span></label>
                    <select className="form-control" value ={selectedQuestionId}>{QUESTION_TYPES.map(item => <option key={item.type} value={item.type}>{item.label }</option>)}
                </select>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Question Title</span></label>
                    <textarea className="form-control"></textarea>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <div className="checkbox">
                        <label><input type="checkbox" value=""/></label>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label">Documents</label>
                    <Dropzone className="dropzone">
                        <p className="text-center dropzone__placeholder"><i className="fa fa-cloud-upload"></i> Drop files here or click to select files.</p>
                    </Dropzone>
                </div>
            </div>
        </div>);
    }
}
Question.propTypes = {
    question: PropTypes.object.isRequired
};
export default Question;

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="searcher-evaluation-template-creator">
            <div className="db-form-section">
                <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Template Title*</span></label>
                    <input type="text" name="title" className="form-control" value="" title="Full Panel Name" placeholder="Full Panel Name" />
                    </div>
                    </div>
                    <div className="col-md-12"><div className="col-md-7">
                    <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                    <input type="text" name="title" className="form-control" value="" title="Full Panel Name" placeholder="Full Panel Name" />
                    </div>
                    </div>
                    <div className="col-md-5">
                    <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Weighting*</span></label>
                    <input type="text" name="title" className="form-control" value="" title="Weighting" placeholder="Please enter weighting"/>
                    </div>
                    </div>
                    <div className="col-md-12">
                    <div className="col-md-12">
                    <div className="form-group">
                    <label className="control-label"><span className="required" aria-required="true">Question Type</span></label>
                    <select className="form-control"><option>Test</option></select>
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
                    <div className="col-md-12"><div className="form-group">
                    <label className="control-label">Documents</label>
                            <Dropzone className="dropzone">
                                <p className="text-center dropzone__placeholder"><i className="fa fa-cloud-upload"></i> Drop files here or click to select files.</p>
                            </Dropzone>
                    </div></div>
            <div className="col-md-12">
            <div className="form-group">
                <button className="btn btn-sm">Add Question</button>
            </div>
            </div>
            </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <button className="btn btn-sm">Add Criteria</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
    }
}

EvaluationTemplateCreator.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);

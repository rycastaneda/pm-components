import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from '../components/Criteria';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { criteria } =this.props;
        return (
        <div className="searcher-evaluation-template-creator">
            <div className="db-form-section">
                <div className="col-md-12">
                <div className="form-group">
                    <label className="control-label">
                        <span className="required" aria-required="true">Template Title*</span>
                    </label>
                    <input type="text" name="title" className="form-control" value="" title="Template Title" placeholder="Enter template title" />
                    </div>
                    </div>
                    {criteria.map(criterion =>
                            <Criteria
                            key={criterion.title}
                            title={criterion.title}
                            questions={criterion.questions}
                            weighting ={criterion.weighting} />
                    )}
                <div className="col-md-12">
                    <div className="form-group">
                        <button className="btn btn-sm">Add Criteria</button>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

EvaluationTemplateCreator.propTypes = {
    criteria: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { criteria } =state.evaluationTemplateCreator;
    window.console.log(criteria);
    return { criteria };
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);

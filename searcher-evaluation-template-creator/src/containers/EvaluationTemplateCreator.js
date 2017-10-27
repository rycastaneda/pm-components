import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Criteria from '../components/Criteria';
class EvaluationTemplateCreator extends Component {

    constructor(props) {
        super(props);
        this.state = { title:this.props.title };
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
                        <input type="text"
                            name="title"
                            className="form-control"
                            value={this.state.title}
                            title="Template Title"
                            placeholder="Enter template title"
                            onChange={event => this.setState({ title:event.target.value })}/>
                        </div>
                    </div>
                    {criteria.map(criterion =>
                            <Criteria
                            key = {criterion.title}
                            criteria = {criterion} />
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
    title: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { criteria, title } =state.evaluationTemplateCreator;
    return { criteria, title };
}
export default connect(mapStateToProps)(EvaluationTemplateCreator);

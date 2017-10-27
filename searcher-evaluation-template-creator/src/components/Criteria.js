import React, { PropTypes, Component } from 'react';
import Question  from './Question';

class Criteria extends Component {
    constructor(props) {
        super(props);
        const criteria =this.props.criteria;
        this.state = {
            isMaximised:criteria.isMaximised,
            questions:criteria.questions,
            title:criteria.title,
            weighting: criteria.weighting };
    }

    render() {
        let { questions, title, weighting, isMaximised } =this.state;
        if (isMaximised) {
            return (
                    <div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                                <input type="text" name="title" className="form-control" value={title} title="Criteria" placeholder="Criteria title"
                                onChange={event => this.setState({ title:event.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label className="control-label"><span className="required" aria-required="true">Weighting*</span></label>
                                <input type="number" min="0" step="1" max="100" name="weighting" value = {weighting} className="form-control"  title="Criteria weighting" placeholder="Enter weighting value"
                                onChange={event => this.setState({ weighting:event.target.value })} />
                            </div>
                        </div>
                            <div>{ questions.map(item => <Question key={item.title} question={item}/>) }</div>
                    </div>
            );
        } else {
            return (
                <div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                            <div>{title}</div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label className="control-label"><span className="required" aria-required="true">Weighting*</span></label>
                            <div>{weighting}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Criteria.propTypes = {
    criteria: PropTypes.object.isRequired
};
export default Criteria;

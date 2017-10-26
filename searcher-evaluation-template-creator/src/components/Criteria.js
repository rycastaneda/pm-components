import React, { PropTypes, Component } from 'react';
import Question  from './Question';

class Criteria extends Component {
    constructor(props) {
        super(props);
        this.state = { questions:this.props.questions, title:this.props.title, weighting: this.props.weighting };
    }

    render() {
        window.console.log(this.state);
        let { questions, title, weighting } =this.state;
        return (
            <div>
                <div className="col-md-7">
                    <div className="form-group">
                        <label className="control-label"><span className="required" aria-required="true">Criteria*</span></label>
                        <input type="text" name="title" className="form-control" value={title} title="Criteria" placeholder="Criteria title" />
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="form-group">
                        <label className="control-label"><span className="required" aria-required="true">Weighting*</span></label>
                        <input type="number" min="0" step="1" name="weighting" value = {weighting} className="form-control"  title="Criteria weighting" placeholder="Enter weighting value" />
                    </div>
                </div>
                { questions.map(item => <Question key={item.title} question={item}/>) }

            </div>
        );
    }
}

Criteria.propTypes = {
    questions: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    weighting:PropTypes.number

};
export default Criteria;

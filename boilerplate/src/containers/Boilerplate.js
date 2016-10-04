import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateState, resetState } from '../actions/boilerplate';
import Button from '../components/Button';

class Boilerplate extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleOnClick = this.handleOnClick.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    handleOnClick() {
        return this.props.dispatch(updateState());
    }

    resetState() {
        return this.props.dispatch(resetState());
    }

    render() {
        return (
            <div>
                Here it comes...
                <Button title="Click" onClick={this.handleOnClick}/>
                <Button title="Reset state" onClick={this.resetState}/>
            </div>
        );
    }
}

Boilerplate.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Boilerplate);  // adds dispatch prop
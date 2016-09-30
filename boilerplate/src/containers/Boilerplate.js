import React, { PropTypes, Component } from 'react';

class Boilerplate extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {

    }

    render() {
        return (
            <div>
                Here it comes...
                <button
                    onClick={this.handleOnClick}>My Button</button>
            </div>
        );
    }
}

Boilerplate.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default Boilerplate;
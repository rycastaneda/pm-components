import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {



    render() {
        return (
            <div>Test

            </div>
        );
    }
}

Test.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Test);  // adds dispatch prop
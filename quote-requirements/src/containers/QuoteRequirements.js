import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea name="description"
                          value="This is a description." />

            </div>
        );
    }
}

QuoteRequirements.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(QuoteRequirements);  // adds dispatch prop
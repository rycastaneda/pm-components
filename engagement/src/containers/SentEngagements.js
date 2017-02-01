import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class SentEngagements extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sentEngagements } = this.props.engagementsReducer;

        return (
            <div>
            {
                sentEngagements.length > 0 ?
                <div>
                    <h2>Sent Engagements: </h2>
                    {sentEngagements.map(sentEngagement =>
                        <div key={sentEngagement.id}> {sentEngagement.id} </div>
                    )}
                </div> : null
                }
            </div>
        );
    }
}

SentEngagements.propTypes = {
    engagementsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { engagementsReducer } = state;
    return { engagementsReducer };
}

export default connect(mapStateToProps)(SentEngagements);

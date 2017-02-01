import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EngagementRow from './EngagementRow';
import Button from '../components/Button';

class PendingEngagements extends Component {
    constructor(props) {
        super(props);
        this.handleSendEngagements = this.handleSendEngagements.bind(this);
        this.pendingEngagementsTotal = this.pendingEngagementsTotal.bind(this);
    }

    handleSendEngagements() {
        window.alert('handleSendEngagements');
    }

    pendingEngagementsTotal(engagements) {
        return parseFloat(engagements.reduce(function(a, b) {
            return a + (b.engagementDetails[0].attributes.rate_value * b.engagementDetails[0].attributes.unit * b.matchedItem.attributes.quantity);
        }, 0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    render() {
        const { pendingEngagements } = this.props.engagementsReducer;

        return (
            <div>
            {
                pendingEngagements.length > 0 ?
                <div className="engagements">
                    <h4 className="pad-top">Pending Engagements: </h4>
                    {pendingEngagements.map(pendingEngagement =>
                        <EngagementRow key={pendingEngagement.id} engagement={pendingEngagement} />
                    )}
                    <div className="row">
                        <div className="col-md-7 text-right">
                            <strong className="txt-small">Total Estimated Amount (ex GST)</strong>
                            <div className="txt-small">x {pendingEngagements.length} Engagement(s)</div>
                        </div>
                        <div className="col-md-3 text-center">
                            <span className="txt-large">${this.pendingEngagementsTotal(pendingEngagements)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 align-right db-form-submit">
                            <Button classNames="submit btn" title="Send Engagements"
                                    onClick={this.handleSendEngagements}
                            />
                        </div>
                    </div>
                </div> : null
                }
            </div>
        );
    }
}

PendingEngagements.propTypes = {
    engagementsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { engagementsReducer } = state;
    return { engagementsReducer };
}

export default connect(mapStateToProps)(PendingEngagements);

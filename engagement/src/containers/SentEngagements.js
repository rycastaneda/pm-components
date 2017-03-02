import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SentEngagementRow from './SentEngagementRow';

class SentEngagements extends Component {
    constructor(props) {
        super(props);
        this.sentEngagementsTotal = this.sentEngagementsTotal.bind(this);
        this.convertToCurrency = this.convertToCurrency.bind(this);
    }

    convertToCurrency(value) {
        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    sentEngagementsTotal(engagements) {
        return this.convertToCurrency(engagements.reduce(function(a, b) {

            if (b.engagementDetails.length) {
                const qty = b.matchedItem.attributes.quantity;
                b.engagementDetails.forEach(
                    engagementDetail => a += (engagementDetail.attributes.rate_value * engagementDetail.attributes.unit * qty)
                );
            }
            return a;
        }, 0));
    }

    render() {
        const { sentEngagements } = this.props.engagementsReducer;

        return (
            <div>
            {
                sentEngagements.length > 0 ?
                <div className="engagements">
                    <h4 className="pad-top">Sent Engagements: </h4>
                    {sentEngagements.map(pendingEngagement =>
                        <SentEngagementRow key={pendingEngagement.id} engagement={pendingEngagement} />
                    )}
                    <div className="row">
                        <div className="col-md-9 text-right">
                            <strong className="txt-small">Total Estimated Amount (ex GST)</strong>
                            <div className="txt-small">x {sentEngagements.length} Engagement(s)</div>
                        </div>
                        <div className="col-md-3 text-center">
                            <span className="txt-large">${this.sentEngagementsTotal(sentEngagements)}</span>
                        </div>
                    </div>
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

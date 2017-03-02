import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EngagementRow from './EngagementRow';
import Button from '../components/Button';
import { updateNotifyAll, sendEngagements } from '../actions/engagementsActions';

class PendingEngagements extends Component {
    constructor(props) {
        super(props);
        this.handleNotifyAll = this.handleNotifyAll.bind(this);
        this.handleSendEngagements = this.handleSendEngagements.bind(this);
        this.pendingEngagementsTotal = this.pendingEngagementsTotal.bind(this);
        this.convertToCurrency = this.convertToCurrency.bind(this);
    }

    handleNotifyAll(event) {
        return this.props.dispatch(updateNotifyAll(event.target.checked));
    }

    handleSendEngagements() {
        return this.props.dispatch(sendEngagements());
    }

    convertToCurrency(value) {
        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    pendingEngagementsTotal(engagements) {
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
        const { pendingEngagements, sentEngagements, notifyAll } = this.props.engagementsReducer;

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
                    {sentEngagements.length === 0 ?  <div className="row">
                                                    <div className="col-xs-12 align-right db-form-submit">
                                                        <div className = "checkbox">
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={notifyAll}
                                                                    onChange={this.handleNotifyAll}
                                                                    />
                                                                Notify all unsuccessful suppliers
                                                            </label>
                                                        </div>
                                                    </div>
                                                  </div>
                                                : null
                    }

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

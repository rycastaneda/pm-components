import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EngagementRow from './EngagementRow';
import Button from '../components/Button';
import { updateNotifyAll, sendEngagements } from '../actions/engagementsActions';
import { resetItemDetails } from '../actions/itemDetailsActions';

class PendingEngagements extends Component {
    constructor(props) {
        super(props);
        this.handleNotifyAll = this.handleNotifyAll.bind(this);
        this.handleSendEngagements = this.handleSendEngagements.bind(this);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.resetItemDetails = this.resetItemDetails.bind(this);
    }

    handleNotifyAll(event) {
        return this.props.dispatch(updateNotifyAll(event.target.checked));
    }

    handleSendEngagements() {
        this.resetItemDetails();
        return this.props.dispatch(sendEngagements());
    }

    resetItemDetails() {
        return this.props.dispatch(resetItemDetails());
    }

    convertToCurrency(value) {
        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    render() {
        const { pendingEngagements, sentEngagements, notifyAll, grandTotalPending } = this.props.engagementsReducer;
        const { userType } = this.props.itemsReducer;

        return (
            <div>
            {
                pendingEngagements.length > 0 ?
                <div className="engagements">
                    <h4 className="pad-top">Pending Engagements: </h4>
                    {pendingEngagements.map(pendingEngagement =>
                        <EngagementRow key={pendingEngagement.id} engagement={pendingEngagement} />
                    )}
                    <div className="row engagement-total">
                        <div className="col-sm-5 col-sm-offset-7">
                            <div className="row">
                                <label className="col-sm-4 control-label">
                                    Estimated Grand Total: <br /><span className="txt-small">x {pendingEngagements.length} Engagement(s)</span>
                                </label>
                                <div className="col-sm-8 txt-large pad-top-sm">${this.convertToCurrency(grandTotalPending)}</div>
                            </div>
                        </div>
                    </div>

                    {(sentEngagements.length === 0 && userType !== 'view-only') &&
                        <div className="row">
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
                    }

                    {userType !== 'view-only' &&
                        <div className="row">
                            <div className="col-xs-12 align-right db-form-submit">
                                <Button classNames="submit btn" title="Send Engagements"
                                        onClick={this.handleSendEngagements}
                                />
                            </div>
                        </div>
                    }
                </div> : null
            }
            </div>
        );
    }
}

PendingEngagements.propTypes = {
    engagementsReducer: PropTypes.object.isRequired,
    itemsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { engagementsReducer, itemsReducer } = state;
    return { engagementsReducer, itemsReducer };
}

export default connect(mapStateToProps)(PendingEngagements);

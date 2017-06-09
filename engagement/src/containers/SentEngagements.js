import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SentEngagementRow from './SentEngagementRow';
import ConfirmModal from './ConfirmModal';
import { hideModal } from '../actions/modalActions';
import { activateCancelEngagement, cancelEngagement } from '../actions/engagementsActions';


class SentEngagements extends Component {
    constructor(props) {
        super(props);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.handleCancelEngagement = this.handleCancelEngagement.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    convertToCurrency(value) {
        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    hideModal() {
        this.props.dispatch(activateCancelEngagement({}));
        return this.props.dispatch(hideModal());
    }

    handleCancelEngagement() {
        const engagement = this.props.engagementsReducer.activateCancelEngagement,
            requestedItemId = engagement.requestedItem.id,
            matchedItemId = engagement.matchedItem.id,
            engagementId = engagement.id;

        this.props.dispatch(hideModal());
        return this.props.dispatch(cancelEngagement(requestedItemId, matchedItemId, engagementId));
    }

    render() {
        const { sentEngagements, grandTotal, cancelledTotal, rejectedTotal } = this.props.engagementsReducer;

        return (
            <div>
            {
                sentEngagements.length > 0 ?
                <div className="engagements">
                    <h4 className="pad-top">Sent Engagements: </h4>
                    {sentEngagements.map(pendingEngagement =>
                        <SentEngagementRow key={pendingEngagement.id} engagement={pendingEngagement} />
                    )}
                    <div className="row engagement-total">
                        <div className="col-sm-5 col-sm-offset-7">
                            <div className="row">
                                <label className="col-sm-4 control-label">
                                    Estimated Grand Total: <br /><span className="txt-small">x {sentEngagements.length} Engagement(s)</span>
                                </label>
                                <div className="col-sm-8 txt-large pad-top-sm">${this.convertToCurrency(grandTotal)}</div>
                            </div>

                            {+cancelledTotal > 0 &&
                                <div className="row">
                                    <label className="col-sm-4 control-label">Cancelled Total: </label>
                                    <div className="col-sm-8">
                                        ${this.convertToCurrency(cancelledTotal)}
                                    </div>
                                </div>
                            }

                            {+rejectedTotal > 0 &&
                                <div className="row">
                                    <label className="col-sm-4 control-label">Declined Total: </label>
                                    <div className="col-sm-8">
                                        ${this.convertToCurrency(rejectedTotal)}
                                    </div>
                                </div>
                            }

                            {(+cancelledTotal > 0 || +rejectedTotal > 0) &&
                                <div className="row">
                                    <label className="col-sm-4 control-label">Remaining Total: </label>
                                    <div className="col-sm-8 txt-large pad-top-sm">
                                        ${this.convertToCurrency(grandTotal - cancelledTotal - rejectedTotal)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <ConfirmModal
                        title="Cancel Engagement"
                        message="Cancelling this engagement will notify the supplier not to supply these services. This action cannot be undone. Are you sure you want to continue?"
                        onConfirm={this.handleCancelEngagement}
                        onCancel={this.hideModal}>
                    </ConfirmModal>
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

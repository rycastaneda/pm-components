import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import IconButton from '../components/IconButton';
import { toggleEngagementText, activateCancelEngagement } from '../actions/engagementsActions';
import { showModal } from '../actions/modalActions';
import {
    KEY_SENT,
    KEY_CANCELLED,
    KEY_REJECTED
} from '../constants/EngagementTypes';


class SentEngagementRow extends Component {

    constructor(props) {
        super(props);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.engagementTotal = this.engagementTotal.bind(this);
        this.toggleTextVisibility = this.toggleTextVisibility.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    toggleTextVisibility() {
        const engagementId = this.props.engagement.id;

        return this.props.dispatch(toggleEngagementText(engagementId));
    }

    convertToCurrency(value) {
        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    engagementTotal(engagement) {
        const qty = engagement.matchedItem.attributes.quantity;
        let total = 0;

        engagement.engagementDetails.forEach(
            engagementDetail => total += (engagementDetail.attributes.rate_value * engagementDetail.attributes.unit * qty)
        );

        return this.convertToCurrency(total);
    }

    showModal() {
        this.props.dispatch(activateCancelEngagement(this.props.engagement));
        return this.props.dispatch(showModal());
    }

    render() {
        const { engagement, serviceTitle } = this.props;

        return (
            <div className="row engagement-row">
                <div className="col-xs-12 engagement-header">
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="row">
                                <label className="col-sm-4 control-label">Engagement: </label>
                                <div className="col-sm-8">#{engagement.id}</div>
                            </div>
                            <div className="row">
                                <label className="col-sm-4 control-label">Requested Category: </label>
                                <div className="col-sm-8">{`${engagement.can_actiontegory.attributes.title} ${serviceTitle && ' - ' + serviceTitle || ''}`}</div>
                            </div>
                        </div>
                        <div className="col-sm-5 text-right text-left-xs">
                            {engagement.attributes.status === KEY_CANCELLED && <span className="bs-label bs-label-danger">Cancelled</span>}
                            {engagement.attributes.status === KEY_REJECTED && <span className="bs-label bs-label-danger">Declined</span>}
                            {engagement.attributes.can_action && engagement.attributes.status === KEY_SENT &&
                                <IconButton
                                    title="Cancel"
                                    classNames="db-function"
                                    onClick={this.showModal}
                                    iconClass="fa fa-ban"
                                    iconPlacement="left"
                                /> }
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 engagement-detail">
                    <div className="row">
                        <div className="col-sm-7 separator-vertical mar-top-10 mar-btm-10">
                            <div className="row">
                                <label className="col-sm-4 control-label">Supplier: </label>
                                <div className="col-sm-8">{engagement.supplier.attributes.title}</div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4 control-label">Service Name: </label>
                                <div className="col-sm-8">{engagement.matchedItem.attributes.title}</div>
                            </div>
                            <br />

                            {engagement.attributes.po_number && <div className="row">
                                <label className="col-sm-4 control-label">Work Order: </label>
                                <div className="col-sm-8 force-wrap">{engagement.attributes.po_number}</div>
                            </div>}

                            {engagement.attributes.pre_start_date && <div className="row">
                                <label className="col-sm-4 control-label">Planned Start Date: </label>
                                <div className="col-sm-8">{moment(engagement.attributes.pre_start_date).format('DD-MM-YYYY')}</div>
                            </div>}

                            <div className="row">
                                <label className="col-sm-4 control-label">Created by: </label>
                                <div className="col-sm-8">{engagement.createdBy}</div>
                            </div>

                            {engagement.attributes.engagement_text &&
                                <IconButton
                                    title={`${engagement.attributes.showEngagementText ? 'Hide' : 'Show'} Engagement Instructions`}
                                    classNames="db-function mar-top-sm"
                                    onClick={this.toggleTextVisibility}
                                    iconClass={`fa fa-caret-${engagement.attributes.showEngagementText ? 'up' : 'down'}`}
                                    iconPlacement="right"
                                />
                            }
                            {engagement.attributes.showEngagementText && <div className="pad-all-xs">{engagement.attributes.engagement_text}</div>}
                        </div>
                        <div className="col-sm-5 mar-top-10 mar-btm-10">
                            <div className="txt-small">Pricing Estimate:</div>
                            {engagement.engagementDetails.map(pricing =>
                                <div className="row" key={pricing.id}>
                                    <label className="col-sm-4 control-label">{pricing.pricingOption.attributes.title} Rate: </label>
                                    <div className="col-sm-8">
                                        ${this.convertToCurrency(pricing.attributes.rate_value)} x {pricing.attributes.unit} {pricing.pricingOption.attributes.unit_of_measure}{pricing.attributes.unit > 1 ? 's': ''}
                                    </div>
                                </div>
                            )}
                            <br />

                            <div className="row">
                                <label className="col-sm-4 control-label">Estimated Total: </label>
                                <div className={`col-sm-8 txt-large pad-top-sm ${(engagement.attributes.status === KEY_CANCELLED || engagement.attributes.status === KEY_REJECTED) && 'strikethrough'}`}>
                                    ${this.engagementTotal(engagement)}
                                </div>
                            </div>
                            <div className="row pad-top-sm"><span className="col-xs-12 txt-small">*All quantities are estimates.  &nbsp;All prices are ex GST</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SentEngagementRow.propTypes = {
    dispatch: PropTypes.func.isRequired,
    engagement: PropTypes.object.isRequired,
    serviceTitle: PropTypes.string
};

export default connect()(SentEngagementRow);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { deleteEngagement } from '../actions/engagementsActions';
import { loadItemDetails } from '../actions/itemDetailsActions';
import moment from 'moment';

class EngagementRow extends Component {

    constructor(props) {
        super(props);
        this.handleEditEngagement = this.handleEditEngagement.bind(this);
        this.handleDeleteEngagement = this.handleDeleteEngagement.bind(this);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.engagementTotal = this.engagementTotal.bind(this);
    }

    handleEditEngagement() {
        const engagement = this.props.engagement,
            matchedItemId = engagement.matchedItem.id,
            requestedItemId = engagement.requestedItem.id;

        return this.props.dispatch(loadItemDetails(matchedItemId, requestedItemId, engagement));
    }

    handleDeleteEngagement() {
        const engagement = this.props.engagement,
            requestedItemId = engagement.requestedItem.id,
            matchedItemId = engagement.matchedItem.id,
            engagementId = engagement.id;

        return this.props.dispatch(deleteEngagement(requestedItemId, matchedItemId, engagementId));
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

    render() {
        const { engagement } = this.props;

        return (
            <div className="row engagement-row">
                <div className="col-md-7 separator-vertical">
                    Engagement:<strong> #{engagement.id}</strong> <br />
                    <strong>{engagement.supplier.attributes.title}</strong> <br />
                    {engagement.matchedItem.attributes.title}<br /><br />
                    Pricing:
                    {engagement.engagementDetails.map(pricing =>
                        <div key={pricing.id}> ${this.convertToCurrency(pricing.attributes.rate_value)} ({pricing.pricingOption.attributes.title} Rate)
                         x {pricing.attributes.unit} Estimated Unit(s)</div>
                    )}
                    Quantity: {engagement.matchedItem.attributes.quantity}
                    <br /><br />
                    {engagement.attributes.po_number ?
                        <span>Work Order: {engagement.attributes.po_number}<br /></span> : null
                    }
                    {engagement.attributes.pre_start_date ?
                        <span>Planned Start Date: {moment(engagement.attributes.pre_start_date).format('DD-MM-YYYY')}<br /></span> : null
                    }
                    {engagement.attributes.engagement_text ?
                        <span>Engagement Instructions: {engagement.attributes.engagement_text}<br /></span> : null
                    }
                    Created by: {engagement.createdBy}
                </div>
                <div className="col-md-3 text-center">
                    <div className="txt-small">Amount Awarded Total (ex GST)</div>
                    <div className="txt-large pad-top-sm">
                        ${this.engagementTotal(engagement)}
                    </div>
                </div>
                <div className="col-md-2 text-right">
                    <IconButton
                        title="Edit"
                        classNames="db-function"
                        onClick={this.handleEditEngagement}
                        iconClass="fa fa-edit"
                    />
                    <br />
                    <IconButton
                        title="Delete"
                        classNames="db-function mar-top-sm"
                        onClick={this.handleDeleteEngagement}
                        iconClass="fa fa-trash"
                    />
                </div>
            </div>
        );
    }
}

EngagementRow.propTypes = {
    dispatch: PropTypes.func.isRequired,
    engagement: PropTypes.object.isRequired
};

export default connect()(EngagementRow);

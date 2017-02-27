import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class SentEngagementRow extends Component {

    constructor(props) {
        super(props);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.engagementTotal = this.engagementTotal.bind(this);
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
                <div className="col-md-9 separator-vertical">
                    Engagement:<strong> #{engagement.id}</strong> <br />
                    <strong>{engagement.supplier.attributes.title}</strong> <br />
                    {engagement.matchedItem.attributes.title}<br /><br />
                    Pricing:
                    {engagement.engagementDetails.map(pricing =>
                        <span key={pricing.id}> ${this.convertToCurrency(pricing.attributes.rate_value)} ({pricing.pricingOption.attributes.title} Rate)
                         x {pricing.attributes.unit} Estimated Unit(s)</span>
                    )}
                    <br />
                    Quantity: {engagement.matchedItem.attributes.quantity}
                    <br /><br />
                    {engagement.attributes.po_number ?
                        <span>Purchase Order: {engagement.attributes.po_number}<br /></span> : null
                    }
                    {engagement.attributes.pre_start_date ?
                        <span>Purchase Order: {moment(engagement.attributes.pre_start_date).format('DD-MM-YYYY')}<br /></span> : null
                    }
                    Created by: {engagement.createdBy}
                </div>
                <div className="col-md-3 text-center">
                    <div className="txt-small">Amount Awarded Total (ex GST)</div>
                    <div className="txt-large pad-top-sm">
                        ${this.engagementTotal(engagement)}
                    </div>
                </div>
            </div>
        );
    }
}

SentEngagementRow.propTypes = {
    dispatch: PropTypes.func.isRequired,
    engagement: PropTypes.object.isRequired
};

export default connect()(SentEngagementRow);

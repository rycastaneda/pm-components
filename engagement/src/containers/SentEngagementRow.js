import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import IconButton from '../components/IconButton';
import { toggleEngagementText, activateCancelEngagement } from '../actions/engagementsActions';
import { showModal } from '../actions/modalActions';

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
        const { engagement } = this.props;

        return (
            <div className="row engagement-row">
                <div className="col-md-7 separator-vertical">
                    Engagement:<strong> #{engagement.id}</strong> <br />
                    Requested Category:<strong> {engagement.category.attributes.title}</strong> <br /><br />
                    Supplier: <strong>{engagement.supplier.attributes.title}</strong> <br />
                    Service Name: <strong>{engagement.matchedItem.attributes.title}</strong><br /><br />
                    Pricing:
                    {engagement.engagementDetails.map(pricing =>
                        <div key={pricing.id}> ${this.convertToCurrency(pricing.attributes.rate_value)} ({pricing.pricingOption.attributes.title} Rate)
                         x {pricing.attributes.unit} Estimated Unit(s)</div>
                    )}
                    <br />
                    {engagement.attributes.po_number ?
                        <span>Work Order: {engagement.attributes.po_number}<br /></span> : null
                    }
                    {engagement.attributes.pre_start_date ?
                        <span>Planned Start Date: {moment(engagement.attributes.pre_start_date).format('DD-MM-YYYY')}<br /></span> : null
                    }
                    <div>Created by: {engagement.createdBy}</div>
                    {engagement.attributes.engagement_text ?
                        <IconButton
                            title={`${engagement.attributes.showEngagementText ? 'Hide' : 'See'} Engagement Instructions`}
                            classNames="db-function mar-top-sm"
                            onClick={this.toggleTextVisibility}
                            iconClass={`fa fa-${engagement.attributes.showEngagementText ? 'minus' : 'plus'} Engagement Instructions`}
                        /> : null
                    }
                    {engagement.attributes.showEngagementText ? <div>{engagement.attributes.engagement_text}</div> : null}
                </div>
                <div className="col-md-3 text-center">
                    <div className="txt-small">Estimated Total (ex GST)</div>
                    <div className="txt-large pad-top-sm">
                        ${this.engagementTotal(engagement)}
                    </div>
                </div>
                <div className="col-md-2 text-right">
                    {engagement.attributes.status === 2 && <span className="bs-label bs-label-danger">Cancelled</span>}
                    {engagement.attributes.can_cancel && engagement.attributes.status === 5 ?
                    <IconButton
                        title="Cancel"
                        classNames="db-function"
                        onClick={this.showModal}
                        iconClass="fa fa-ban"
                    /> : null }
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

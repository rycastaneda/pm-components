import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { toggleEngagementText, deleteEngagement } from '../actions/engagementsActions';
import { loadItemDetails } from '../actions/itemDetailsActions';
import moment from 'moment';

class EngagementRow extends Component {

    constructor(props) {
        super(props);
        this.handleEditEngagement = this.handleEditEngagement.bind(this);
        this.handleDeleteEngagement = this.handleDeleteEngagement.bind(this);
        this.convertToCurrency = this.convertToCurrency.bind(this);
        this.engagementTotal = this.engagementTotal.bind(this);
        this.toggleTextVisibility = this.toggleTextVisibility.bind(this);
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

    render() {
        const { engagement } = this.props;

        return (
            <div className="row engagement-row">
                <div className="col-xs-12 engagement-header">
                    <div className="row">
                        <div className="col-sm-6">
                            <span className="txt-small">Engagement:</span><strong> #{engagement.id}</strong> <br />
                            <span className="txt-small">Requested Category:</span><strong> {engagement.category.attributes.title}</strong>
                        </div>
                        <div className="col-sm-6 text-right">
                            <IconButton
                                title="Edit"
                                classNames="db-function"
                                onClick={this.handleEditEngagement}
                                iconClass="fa fa-edit"
                                iconPlacement="left"
                            />
                            <IconButton
                                title="Delete"
                                classNames="db-function mar-l-sm"
                                onClick={this.handleDeleteEngagement}
                                iconClass="fa fa-trash"
                                iconPlacement="left"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 engagement-detail">
                    <div className="row">
                        <div className="col-sm-7 separator-vertical mar-top-10 mar-btm-10">
                            <span className="txt-small">Supplier:</span><strong> {engagement.supplier.attributes.title}</strong><br />
                            <span className="txt-small">Service Name:</span><strong> {engagement.matchedItem.attributes.title}</strong><br /><br />
                            {engagement.attributes.po_number ?
                                <span><span className="txt-small">Work Order:</span> {engagement.attributes.po_number}<br /></span> : null
                            }
                            {engagement.attributes.pre_start_date ?
                                <span><span className="txt-small">Planned Start Date:</span> {moment(engagement.attributes.pre_start_date).format('DD-MM-YYYY')}<br /></span> : null
                            }
                            <div><span className="txt-small">Created by:</span> {engagement.createdBy}</div>
                            {engagement.attributes.engagement_text ?
                                <IconButton
                                    title={`${engagement.attributes.showEngagementText ? 'Hide' : 'Show'} Engagement Instructions`}
                                    classNames="db-function mar-top-sm"
                                    onClick={this.toggleTextVisibility}
                                    iconClass={`fa fa-caret-${engagement.attributes.showEngagementText ? 'up' : 'down'}`}
                                    iconPlacement="right"
                                /> : null
                            }
                            {engagement.attributes.showEngagementText ? <div className="pad-all-xs">{engagement.attributes.engagement_text}</div> : null}
                        </div>
                        <div className="col-sm-5 mar-top-10 mar-btm-10">
                            <div className="txt-small">Pricing:</div>
                            {engagement.engagementDetails.map(pricing =>
                                <div key={pricing.id}> ${this.convertToCurrency(pricing.attributes.rate_value)} ({pricing.pricingOption.attributes.title} Rate)
                                 x {pricing.attributes.unit} Estimated {pricing.pricingOption.attributes.unit_of_measure}{pricing.attributes.unit > 1 ? 's': ''}</div>
                            )}
                            <br />

                            <div className="txt-small">Estimated Total (ex GST)</div>
                            <div className="txt-large pad-top-sm">
                                ${this.engagementTotal(engagement)}
                            </div>
                        </div>
                    </div>
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

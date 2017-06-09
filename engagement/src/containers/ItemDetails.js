import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Datetime  from 'react-datetime';
import moment from 'moment';
import Button from '../components/Button';
import { handlePOChange, handleEngagementUpdate, handePlanDateChange, handleEngagementTextChange, createEngagement, createEngagementPanel, resetItemDetails } from '../actions/itemDetailsActions';
import PricingOptionRow from './PricingOptionRow';

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.handlePOChange = this.handlePOChange.bind(this);
        this.handlePOUpdate = this.handlePOUpdate.bind(this);
        this.handePlanDateChange = this.handePlanDateChange.bind(this);
        this.handePlanDateUpdate = this.handePlanDateUpdate.bind(this);
        this.handleEngagementTextChange = this.handleEngagementTextChange.bind(this);
        this.handleEngagementTextUpdate = this.handleEngagementTextUpdate.bind(this);
        this.canCreateEngagement = this.canCreateEngagement.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveSendPanel = this.handleSaveSendPanel.bind(this);
        this.resetItemDetails = this.resetItemDetails.bind(this);
    }

    handlePOChange(event) {
        return this.props.dispatch(handlePOChange(event.target.value));
    }

    handlePOUpdate() {
        if (this.props.itemDetailsReducer.currentEngagement.id && this.props.itemDetailsReducer.currentEngagement.attributes.oldPOVal) {
            return this.props.dispatch(handleEngagementUpdate());
        }
    }

    handePlanDateChange(date) {
        if (!moment(date).isValid()) {
            return;
        }
        this.props.dispatch(handePlanDateChange(date));
    }

    handePlanDateUpdate() {
        if (this.props.itemDetailsReducer.currentEngagement.id && this.props.itemDetailsReducer.currentEngagement.attributes.oldPODate) {
            this.props.dispatch(handleEngagementUpdate());
        }
    }

    handleEngagementTextChange(event) {
        return this.props.dispatch(handleEngagementTextChange(event.target.value));
    }

    handleEngagementTextUpdate() {
        if (this.props.itemDetailsReducer.currentEngagement.id && this.props.itemDetailsReducer.currentEngagement.attributes.oldEngagementText) {
            return this.props.dispatch(handleEngagementUpdate());
        }
    }

    canCreateEngagement(pricingOptions) {
        let pricing = pricingOptions.filter(pricingOption => (pricingOption.attributes.value !== null && pricingOption.attributes.value !== 0));
        return pricing.length ? false: true;
    }

    resetItemDetails() {
        return this.props.dispatch(resetItemDetails());
    }

    handleSave() {
        return this.props.dispatch(createEngagement());
    }

    handleSaveSendPanel() {
        return this.props.dispatch(createEngagementPanel());
    }

    render() {
        const { currentEngagement, pricingOptions } = this.props.itemDetailsReducer;
        const { itemsReducer } = this.props;
        const purchaseOrder = (Object.keys(currentEngagement).length !== 0 && currentEngagement.attributes['purchase-order'] !== null)  ? currentEngagement.attributes['purchase-order'] : '';
        const engagementText = (Object.keys(currentEngagement).length !== 0 && currentEngagement.attributes['engagement_text'] !== null)  ? currentEngagement.attributes['engagement_text'] : '';
        const defaultDate = (Object.keys(currentEngagement).length !== 0 && currentEngagement.attributes['plan-start-date'] !== null) ? moment(currentEngagement.attributes['plan-start-date']) : null;
        const editMode = currentEngagement.id !== null;
        const engagementTitle = (Object.keys(currentEngagement).length !== 0) ? currentEngagement.attributes['title'] : null;
        const enableCreate = this.canCreateEngagement(pricingOptions);

        let inputPropsDate = {
            placeholder : 'Click to select planned start date',
            disabled: enableCreate
        };

        return (
            <div>
            {
                pricingOptions.length ?
                <div className="item-details row">
                    <h4 className="pad-top col-xs-12">
                        { editMode ? 'Edit Pending Engagement ' : 'Create New Engagement ' }
                        <br className="visible-xs" />
                        <span className="txt-small"> (
                            { engagementTitle && `${engagementTitle}` }
                            { !engagementTitle && currentEngagement.relationships && `${currentEngagement.relationships.supplier.attributes.title} - ${currentEngagement.relationships.matchedItemTitle}`}
                            )
                        </span>
                    </h4>
                    <div className="col-sm-6">
                        <table className="table table-striped db-table">
                            <thead>
                                <tr>
                                    <th>Rates</th>
                                    <th>Quote</th>
                                    <th>Estimate</th>
                                    <th>Units</th>
                                </tr>
                            </thead>
                            <tbody>
                            {enableCreate ?
                                <tr>
                                    <td colSpan="3">{itemsReducer.spot === 'browse' ? 'This supplier does not have standard rates' : 'This supplier has not responded the Request for Quotation'}</td>
                                </tr>
                                : pricingOptions.map(pricingOption => <PricingOptionRow key={pricingOption.id} pricingOption={pricingOption} spot={itemsReducer.spot} editMode={editMode}  />)
                            }
                            </tbody>
                        </table>
                    </div>

                        <div className="col-sm-6">
                            <div className="db-form-section form-horizontal">
                                <h6 className="db-form-title">Engagement Details</h6>
                                <div className="form-group">
                                    <label className="col-md-4 control-label">Work Order<span className="required">*</span></label>
                                    <div className="col-md-8">
                                        <input className="form-control"
                                            type="text"
                                            placeholder="Enter Work Order number"
                                            value={purchaseOrder}
                                            onChange={this.handlePOChange}
                                            onBlur={this.handlePOUpdate}
                                            disabled={enableCreate}
                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label">Planned Start Date<span className="required">*</span></label>
                                    <div className="col-md-8">
                                        <Datetime className="po-date"
                                            timeFormat={false}
                                            closeOnSelect={true}
                                            inputProps={inputPropsDate}
                                            dateFormat="DD-MM-YYYY"
                                            value={defaultDate}
                                            onChange={this.handePlanDateChange}
                                            onBlur={this.handePlanDateUpdate}
                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label">Engagement Instructions</label>
                                    <div className="col-md-8">
                                        <textarea className="form-control"
                                            rows="4"
                                            cols="50"
                                            maxLength="500"
                                            placeholder="Enter Engagement Instructions"
                                            value={engagementText}
                                            onChange={this.handleEngagementTextChange}
                                            onBlur={this.handleEngagementTextUpdate}
                                            disabled={enableCreate}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {
                        itemsReducer.spot === 'browse' ?
                            <div className="col-xs-12 align-right">
                                <Button title="Create & Send Engagement"
                                        onClick={this.handleSaveSendPanel}
                                        classNames="submit btn"
                                        disabled={enableCreate}
                                />
                            </div>
                            :
                            <div className="col-xs-12 align-right">
                            { editMode ?
                                <Button title="Done Editing"
                                        onClick={this.resetItemDetails}
                                        classNames="submit btn"
                                />
                                :
                                <Button title="Create Engagement"
                                        onClick={this.handleSave}
                                        classNames="submit btn"
                                        disabled={enableCreate}
                                />
                            }
                            </div>
                    }
                </div> : null
                }
            </div>
        );
    }
}

ItemDetails.propTypes = {
    itemsReducer: PropTypes.object.isRequired,
    itemDetailsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { itemsReducer, itemDetailsReducer } = state;
    return { itemsReducer, itemDetailsReducer };
}

export default connect(mapStateToProps)(ItemDetails);

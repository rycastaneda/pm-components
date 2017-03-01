import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Datetime  from 'react-datetime';
import moment from 'moment';
import Button from '../components/Button';
import { handlePOChange, handleEngagementUpdate, handePlanDateChange, createEngagement, createEngagementPanel, resetItemDetails } from '../actions/itemDetailsActions';
import PricingOptionRow from './PricingOptionRow';

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.handlePOChange = this.handlePOChange.bind(this);
        this.handlePOUpdate = this.handlePOUpdate.bind(this);
        this.handePlanDateChange = this.handePlanDateChange.bind(this);
        this.handePlanDateUpdate = this.handePlanDateUpdate.bind(this);
        this.canCreateEngagement = this.canCreateEngagement.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveSendPanel = this.handleSaveSendPanel.bind(this);
        this.resetItemDetails = this.resetItemDetails.bind(this);
    }

    handlePOChange(event) {
        return this.props.dispatch(handlePOChange(event.target.value));
    }

    handlePOUpdate(event) {
        if (this.props.itemDetailsReducer.currentEngagement.id && this.props.itemDetailsReducer.currentEngagement.attributes.oldPOVal) {
            return this.props.dispatch(handleEngagementUpdate(event.target.value));
        }
    }

    handePlanDateChange(date) {
        if (!moment(date).isValid()) {
            return;
        }
        this.props.dispatch(handePlanDateChange(date));
    }

    handePlanDateUpdate(date) {
        if (this.props.itemDetailsReducer.currentEngagement.id && this.props.itemDetailsReducer.currentEngagement.attributes.oldPODate) {
            this.props.dispatch(handleEngagementUpdate(date));
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
                <div className="item-details">
                    <h4 className="pad-top">{ editMode ? 'Edit Pending Engagement' : 'Create New Engagement' }</h4>
                    { engagementTitle ? <h6>{engagementTitle}</h6> : null }
                    { !engagementTitle && currentEngagement.relationships ? <h6>{currentEngagement.relationships.supplier.attributes.title} - {currentEngagement.relationships.matchedItemTitle}</h6> : null }
                    <table className="table table-striped db-table">
                        <thead>
                            <tr>
                                <th>Rates</th>
                                <th>Quote</th>
                                <th>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pricingOptions.map(pricingOption =>
                            <PricingOptionRow key={pricingOption.id} pricingOption={pricingOption} />
                        )}
                        </tbody>
                    </table>
                    {
                        <div>
                            <div className="row mar-top">
                                <label className="col-md-3 control-label">Work Order *: </label>
                                <div className="col-md-9">
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
                            <div className="row mar-top">
                                <label className="col-md-3 control-label">Planned Start Date *: </label>
                                <div className="col-md-9">
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
                        </div>
                    }
                    {
                        itemsReducer.spot === 'browse' ?
                            <div className="row">
                                <div className="col-xs-12 align-right db-form-submit">
                                    <Button title="Create & Send Engagement"
                                            onClick={this.handleSaveSendPanel}
                                            classNames="submit btn"
                                            disabled={enableCreate}
                                    />
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col-xs-12 align-right db-form-submit">
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

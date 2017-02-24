import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Datetime  from 'react-datetime';
import moment from 'moment';
import Button from '../components/Button';
import { handlePOChange, handleEngagementUpdate, handePlanDateChange, createEngagement } from '../actions/itemDetailsActions';
import PricingOptionRow from './PricingOptionRow';

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.handlePOChange = this.handlePOChange.bind(this);
        this.handlePOUpdate = this.handlePOUpdate.bind(this);
        this.handePlanDateChange = this.handePlanDateChange.bind(this);
        this.canCreateEngagement = this.canCreateEngagement.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
            alert('invalid');
            return;
        }

        if (this.props.itemDetailsReducer.currentEngagement.id) {
            this.props.dispatch(handePlanDateChange(date));
            this.props.dispatch(handleEngagementUpdate(date));
        } else {
            return this.props.dispatch(handePlanDateChange(date));
        }
    }

    canCreateEngagement(pricingOptions) {
        let pricing = pricingOptions.filter(pricingOption => pricingOption.attributes.value !== null);
        return pricing.length ? false : true;
    }

    handleSave() {
        return this.props.dispatch(createEngagement());
    }

    render() {
        const { currentEngagement, pricingOptions } = this.props.itemDetailsReducer;
        const purchaseOrder = (Object.keys(currentEngagement).length !== 0 && currentEngagement.attributes['purchase-order'] !== null)  ? currentEngagement.attributes['purchase-order'] : '';
        const defaultDate = (Object.keys(currentEngagement).length !== 0 && currentEngagement.attributes['plan-start-date'] !== null) ? moment(currentEngagement.attributes['plan-start-date']) : null;
        const editMode = currentEngagement.id !== null;
        const engagementTitle = (Object.keys(currentEngagement).length !== 0) ? currentEngagement.attributes['title'] : null;
        const canCreateEngagement = this.canCreateEngagement(pricingOptions);

        let inputPropsDate = {
            placeholder : 'Click to select planned start date'
        };

        return (
            <div>
            {
                pricingOptions.length ?
                <div className="item-details">
                    <h4 className="pad-top">{ editMode ? 'Edit Pending Engagement' : 'Create New Engagement' }</h4>
                    { engagementTitle ? <h6>{engagementTitle}</h6> : <h6>{currentEngagement.relationships.supplier.attributes.title} - {currentEngagement.relationships.matchedItemTitle}</h6> }
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
                        canCreateEngagement ? null :
                        <div>
                            <div className="row mar-top">
                                <label className="col-md-3 control-label">Work Order *: </label>
                                <div className="col-md-9">
                                    <input className="form-control"
                                           type="text"
                                           placeholder="Enter Work Order number"
                                           value={purchaseOrder}
                                           onChange={this.handlePOChange}
                                           onBlur={this.handlePOUpdate} />
                                </div>
                            </div>
                            <div className="row mar-top">
                                <label className="col-md-3 control-label">Planned Start Date: </label>
                                <div className="col-md-9">
                                    <Datetime className="po-date"
                                              timeFormat={false}
                                              closeOnSelect={true}
                                              inputProps={inputPropsDate}
                                              dateFormat="DD-MM-YYYY"
                                              value={defaultDate}
                                              onChange={this.handePlanDateChange} />
                                </div>
                            </div>
                        </div>
                    }
                    {
                        editMode || canCreateEngagement ? null :
                        <div className="row">
                            <div className="col-xs-12 align-right db-form-submit">
                                <Button title="Create Engagement"
                                        onClick={this.handleSave}
                                        classNames="submit btn"
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

ItemDetails.propTypes = {
    itemDetailsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { itemDetailsReducer } = state;
    return { itemDetailsReducer };
}

export default connect(mapStateToProps)(ItemDetails);

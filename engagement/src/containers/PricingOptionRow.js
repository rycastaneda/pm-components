import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    handleTextChange,
    handlePricingOptionSelection,
    handleEngagementDetailUpdate,
    handleEngagementDetailCreate
} from '../actions/itemDetailsActions';

class PricingOptionRow extends Component {

    constructor(props) {
        super(props);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handlePricingOptionChange = this.handlePricingOptionChange.bind(this);
        this.handleEngagementDetailUpdate = this.handleEngagementDetailUpdate.bind(this);
    }

    handleUnitChange(event) {
        const pricingOption = this.props.pricingOption;
        this.props.dispatch(handlePricingOptionSelection(pricingOption, event.target.value ? true : false));

        return this.props.dispatch(handleTextChange(pricingOption, event.target.value));
    }

    handlePricingOptionChange(event) {
        const pricingOption = this.props.pricingOption;

        return this.props.dispatch(handlePricingOptionSelection(pricingOption, event.target.checked));
    }

    handleEngagementDetailUpdate(event) {
        const pricingOption = this.props.pricingOption;
        if (pricingOption.relationships) {
            return this.props.dispatch(handleEngagementDetailUpdate(pricingOption, event.target.value));
        } else {
            return this.props.dispatch(handleEngagementDetailCreate(pricingOption, event.target.value));
        }
    }

    render() {
        const { pricingOption, editMode } = this.props;
        const defaultValue = pricingOption.attributes.unit || '';

        return (
            pricingOption.attributes.value !== null && pricingOption.attributes.value !== 0 ?
            <tr>
                <td className="checkbox col-rates" data-heading="Rates">
                    <label htmlFor={`pricingOption__${pricingOption.id}`}>
                    {
                        <input name={`pricingOption-checkbox__${pricingOption.id}`}
                            id={`pricingOption__${pricingOption.id}`}
                            type="checkbox"
                            disabled="true"
                            checked={pricingOption.attributes.selected}
                            onChange={this.handlePricingOptionChange}
                        />
                    }
                    {pricingOption.attributes.title}
                    </label>
                </td>
                <td data-heading="Quote">
                    {`$${pricingOption.attributes.value}`}
                </td>
                <td data-heading="Estimate">
                    {
                        <input type="number"
                            className="form-control"
                            value={defaultValue}
                            onChange={this.handleUnitChange}
                            onBlur={editMode ? this.handleEngagementDetailUpdate : null}
                        />
                    }
                </td>
                <td data-heading="Unit">
                    {`${pricingOption.attributes.unit_of_measure}s`}
                </td>
            </tr> : null
        );
    }
}

PricingOptionRow.propTypes = {
    dispatch: PropTypes.func.isRequired,
    pricingOption: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired
};

export default connect()(PricingOptionRow);  // adds dispatch prop

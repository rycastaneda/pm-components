import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    handleTextChange,
    handlePricingOptionSelection,
    handleEngagementDetailUpdate
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

        return this.props.dispatch(handleTextChange(pricingOption, event.target.value));
    }

    handlePricingOptionChange(event) {
        const pricingOption = this.props.pricingOption;

        return this.props.dispatch(handlePricingOptionSelection(pricingOption, event.target.checked));
    }

    handleEngagementDetailUpdate(event) {
        const pricingOption = this.props.pricingOption;

        return this.props.dispatch(handleEngagementDetailUpdate(pricingOption, event.target.value));
    }

    render() {
        const { pricingOption } = this.props;
        const defaultValue = pricingOption.attributes.unit || '';

        return (
            <tr>
                <td className="checkbox" data-heading="Rates">
                    <label htmlFor={`pricingOption__${pricingOption.id}`}>
                    {
                        (pricingOption.attributes.value !== null && pricingOption.attributes.value !== 0)
                            ? <input name={`pricingOption-checkbox__${pricingOption.id}`}
                                    id={`pricingOption__${pricingOption.id}`}
                                    type="checkbox"
                                    checked={pricingOption.attributes.selected}
                                    onChange={this.handlePricingOptionChange}
                                /> : null
                    }
                    {pricingOption.attributes.title}
                    </label>
                </td>
                <td data-heading="Quote">
                    {
                        (pricingOption.attributes.value !== null) ? `$${pricingOption.attributes.value}` : null
                    }
                </td>
                <td data-heading="Unit">
                    {
                        (pricingOption.attributes.value !== null && pricingOption.attributes.value !== 0)
                            ? <input type="number"
                                    className="form-control"
                                    value={defaultValue}
                                    onChange={this.handleUnitChange}
                                    onBlur={pricingOption.relationships ? this.handleEngagementDetailUpdate : null}
                            /> : null
                    }
                </td>
            </tr>
        );
    }
}

PricingOptionRow.propTypes = {
    dispatch: PropTypes.func.isRequired,
    pricingOption: PropTypes.object.isRequired
};

export default connect()(PricingOptionRow);  // adds dispatch prop

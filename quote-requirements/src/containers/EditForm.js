import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateText, updateMandatorySelection, saveItem } from '../actions/quoteRequirements';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        const item = this.props.item;
        const type = event.target.type;

        if (event.target.type === 'textarea') {
            return this.props.dispatch(updateText(item, event.target.value));
        } else if (type === 'checkbox') {
            return this.props.dispatch(updateMandatorySelection(item, event.target.checked));
        }

    }

    handleSave() {
        this.props.dispatch(saveItem(this.props.item));
    }

    render() {
        const { item } = this.props;
        const defaultText = item.attributes.text || '';

        return (
            <div>
               <textarea name="description"
                         defaultValue={defaultText}
                         onChange={this.handleChange}
               />
                <div>
                    <input name=""
                           id="mandatory"
                           type="checkbox"
                           checked={item.attributes.isMandatory}
                           onChange={this.handleChange}
                    />
                    <label htmlFor="mandatory">Mandatory for supplier</label>
                </div>
                <div>
                    <input name=""
                           id="always-show"
                           type="checkbox"
                           onChange={this.handleChange}
                    />
                    <label htmlFor="always-show">Always display?</label>
                    <select value="A">
                        <option value="A">for all excavators</option>
                        <option value="B">for 4-10 Tonne Excavators</option>
                    </select>
                </div>
                <button type="submit" onClick={this.handleSave}>{ item.id ? 'Save' : 'Add' }</button>
            </div>
        );
    }
}

EditForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quoteRequirements: PropTypes.object.isRequired,
    item: PropTypes.object
};

function mapStateToProps(state) {
    const { quoteRequirements } = state;

    return {
        quoteRequirements
    };
}

export default connect(mapStateToProps)(EditForm);  // adds dispatch prop
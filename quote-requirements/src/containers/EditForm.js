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
            <div className="edit-form">
                <div className="col-md-8">
                    <textarea name="description"
                              className="form-control edit-form__textarea"
                              defaultValue={defaultText}
                              onChange={this.handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <button className="edit-form__button btn"
                            type="submit"
                            onClick={this.handleSave}>
                        { item.id ? 'Save' : 'Add' }
                    </button>
                    <div className="checkbox">
                        <label htmlFor="always-show">
                            <input name="always-show-checkbox"
                                   id="always-show"
                                   type="checkbox"
                                   onChange={this.handleChange}
                            />
                            Always display?
                        </label>
                    </div>
                    <select value="A"
                            className="form-control edit-form__category-select edit-form__category-select--inactive">
                        <option value="A">for all excavators</option>
                        <option value="B">for 4-10 Tonne Excavators</option>
                    </select>
                </div>
                <div className="col-md-12 checkbox">
                    <label htmlFor="mandatory">
                        <input name=""
                               id="mandatory"
                               type="checkbox"
                               checked={item.attributes.isMandatory}
                               onChange={this.handleChange}
                        />
                        Mandatory for supplier
                    </label>
                </div>
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
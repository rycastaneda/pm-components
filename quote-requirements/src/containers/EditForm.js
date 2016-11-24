import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { handleTextChange, handleMandatorySelection, updateItem, createItem, handleCategoryInclusionChange } from '../actions/quoteRequirements';
import InclusionSelection from '../components/InclusionSelection';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMandatoryChange = this.handleMandatoryChange.bind(this);
        this.handleCategoryInclusionChange = this.handleCategoryInclusionChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleCategoryInclusionChange(event) {
        const item = this.props.item;
        const value = event.target.value;

        const include = value !== 'none';
        const category_id = include && value !== 'all' ? parseInt(value, 10) : null;

        return this.props.dispatch(handleCategoryInclusionChange(item, include, category_id));
    }

    handleDescriptionChange(event) {
        const item = this.props.item;

        return this.props.dispatch(handleTextChange(item, event.target.value));
    }

    handleMandatoryChange(event) {
        const item = this.props.item;

        return this.props.dispatch(handleMandatorySelection(item, event.target.checked));
    }

    handleSave(event) {
        event.preventDefault();
        if (this.props.item.id) this.props.dispatch(updateItem(this.props.item));
        else this.props.dispatch(createItem(this.props.item));
    }

    render() {
        const { item } = this.props;
        const defaultText = item.attributes.text || '';
        const categorySelectorComponent = window.PlantminerComponents ? window.PlantminerComponents.categorySelector : {};
        const options = categorySelectorComponent ? categorySelectorComponent.dropDowns : [];

        return (
            <div className="quote-inclusions__form edit-form">
                <div className="col-md-8">
                    <textarea name="description"
                              className="form-control edit-form__textarea"
                              defaultValue={defaultText}
                              onChange={this.handleDescriptionChange}
                    />
                </div>
                <div className="col-md-4">
                    <div className="edit-form__category-select-label">
                        Apply to
                    </div>
                    <InclusionSelection options={options}
                                        handleChange={this.handleCategoryInclusionChange}
                                        include={item.attributes.include}
                                        category_id={item.attributes.category_id} />

                    <button className="edit-form__button btn"
                            type="submit"
                            onClick={this.handleSave}>
                        { item.id ? 'Save' : 'Add' }
                    </button>

                </div>
                <div className="col-md-12 checkbox">
                    <label htmlFor={`mandatory__${item.id}`}>
                        <input name={`mandatory-checkbox__${item.id}`}
                               id={`mandatory__${item.id}`}
                               type="checkbox"
                               checked={item.attributes.mandatory}
                               onChange={this.handleMandatoryChange}
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
    item: PropTypes.object
};

export default connect()(EditForm);  // adds dispatch prop
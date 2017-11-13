import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    handleTextChange,
    handleMandatorySelection,
    handleCategoryInclusionChange,
    updateItem,
    createItem
} from '../actions/quoteRequirements';
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
        const quoteId = document.getElementById('quote_id').value;
        const item = this.props.item;
        const value = event.target.value;

        const include = value === 'all';
        const quote_request_id = value === 'onlyQR' ? parseInt(quoteId, 10) : null;

        let category_id = parseInt(value, 10);
        category_id = isNaN(category_id) ? null : category_id;

        return this.props.dispatch(handleCategoryInclusionChange(item, include, category_id, quote_request_id));
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
        // Below is implemented to interact with 'category-selector' component and obtain selected information
        const categorySelectorComponent = window.PlantminerComponents ? window.PlantminerComponents.categorySelector : {};
        const options = categorySelectorComponent ? categorySelectorComponent.dropDowns : [];

        return (
            <div className="quote-inclusions__form edit-form">
                <div className="col-md-8">
                    <textarea name="description"
                              placeholder="Add New Quote requirement"
                              className="form-control edit-form__textarea"
                              defaultValue={defaultText}
                              onChange={this.handleDescriptionChange}
                    />
                    <div className="checkbox edit-form__checkbox">
                        <label htmlFor={`mandatory__${item.id}`}>
                            <input name={`mandatory-checkbox__${item.id}`}
                                   id={`mandatory__${item.id}`}
                                   type="checkbox"
                                   checked={item.attributes.mandatory}
                                   onChange={this.handleMandatoryChange}
                            />
                            Non-negotiable
                        </label>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="edit-form__category-select-label">
                        Apply to
                    </div>

                    <InclusionSelection options={options}
                                        handleChange={this.handleCategoryInclusionChange}
                                        include={item.attributes.include}
                                        category_id={`${item.attributes.category_id}`}
                                        quote_request_id={`${item.attributes.quote_request_id}`}/>

                    <button className="edit-form__button btn"
                            disabled={ !item.attributes.text || item.attributes.text.trim() === '' || item.isSaving }
                            type="submit"
                            onClick={this.handleSave}>
                            {item.isSaving ? <i className="fa fa-spinner fa-spin mar-r-sm"></i> : null}
                        { item.id ? 'Save' : 'Add' }
                    </button>

                </div>

            </div>
        );
    }
}

EditForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

export default connect()(EditForm);

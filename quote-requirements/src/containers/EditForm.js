import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { handleTextChange, handleMandatorySelection, updateItem, createItem, handleInclusionsSelection, handleCategoryInclusionChange } from '../actions/quoteRequirements';
import InclusionSelection from '../components/InclusionSelection';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMandatoryChange = this.handleMandatoryChange.bind(this);
        this.handleInclusionChange = this.handleInclusionChange.bind(this);
        this.handleCategoryInclusionChange = this.handleCategoryInclusionChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleInclusionChange(event) {
        const item = this.props.item;

        return this.props.dispatch(handleInclusionsSelection(item, event.target.checked));
    }

    handleCategoryInclusionChange(event) {
        const item = this.props.item;

        return this.props.dispatch(handleCategoryInclusionChange(item, parseInt(event.target.value, 10)));
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
                    <div className="edit-form__checkbox-container">
                        <label className="edit-form__checkbox-label"
                               htmlFor={`include__${item.id}`}>
                            <input name={`include-checkbox__${item.id}`}
                                   className="edit-form__checkbox-input"
                                   id={`include__${item.id}`}
                                   type="checkbox"
                                   checked={item.attributes.include}
                                   onChange={this.handleInclusionChange}
                            />
                            Always display?
                        </label>
                    </div>
                    <InclusionSelection handleChange={this.handleCategoryInclusionChange}
                                        isDisabled={!item.attributes.include}
                                        selected={item.attributes.category_id} />

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
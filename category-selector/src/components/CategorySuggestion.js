import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { selectCategory } from '../actions/categories';
import { fetchSuggestions, updateInput, resetSuggestions } from '../actions/suggestions';

class CategorySuggestion extends Component {

    constructor(props) {
        super(props);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSuggestionsFetchRequested(index) {
        return ({ value }) => {
            this.props.dispatch(fetchSuggestions(value, index));
        };
    }

    onSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    onSuggestionSelected(index) {
        return (event, { suggestion }) => {
            this.props.dispatch(selectCategory(suggestion, index));
        };
    }

    // Indicates what should input value be when suggestion is clicked
    getSuggestionValue(suggestion) {
        return suggestion.attributes.title;
    }

    // Template for suggestions list
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.attributes.title}</span>
        );
    }

    // Always render suggestion when inout is focused
    shouldRenderSuggestions() {
        return true;
    }

    onChange(index) {
        return (event, { newValue }) => {
            this.props.dispatch(updateInput(newValue, index));
        };
    }

    render() {
        const { categorySelector, currentIndex } = this.props;

        const DEFAULT_INPUT_PROPS = {
            placeholder: 'Select or type the category',
            className: 'form-control'
        };

        const inputProps = index => Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: `categories-input-${index}`,
            value: categorySelector.dropDowns[index].input || '',
            onChange: this.onChange(index)
        });

        return (
            <div className="col-xs-12 mar-btm">
                <Autosuggest
                    id="categories-0"
                    suggestions={categorySelector.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested(currentIndex)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected(currentIndex)}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps(currentIndex)}
                />
            </div>
        );
    }
}

CategorySuggestion.propTypes = {
    categorySelector: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    fetchedCategoryTypes: PropTypes.object.isRequired,
    currentIndex: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    const { fetchedCategoryTypes, categorySelector } = state;

    return { fetchedCategoryTypes, categorySelector };
}

export default connect(mapStateToProps)(CategorySuggestion);
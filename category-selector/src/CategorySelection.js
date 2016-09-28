import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { selectCategoryFilter, fetchCategoriesIfNeeded, selectCategory } from '../actions/categories';
import { fetchSuggestions, updateInput, resetSuggestions } from '../actions/suggestions';
import CategoryTypeList from './CategoryTypeList';
import { CATEGORY_TYPES } from '../constants/CategoryTypes';

class CategorySelection extends Component {

    constructor(props) {
        super(props);
        // We need to do it because ES6 class properties do not automatically bind to the React class instance
        this.handleCategoryFilterClick = this.handleCategoryFilterClick.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleCategoryFilterClick(categoryFilter) {
        this.props.dispatch(selectCategoryFilter(categoryFilter.attributes.title));
        return this.props.dispatch(fetchCategoriesIfNeeded(categoryFilter));
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
        const { isFetching, suggestions,  inputs, fetchedCategoriesByFilter } = this.props;

        const TITLE = 'What service do you need? *';

        const DEFAULT_INPUT_PROPS = {
            placeholder: 'Select or type the category'
        };

        const inputProps = index => Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: `categories-input-${index}`,
            value: inputs[index] || '',
            onChange: this.onChange(index)
        });

        return (
            <div
                className="db-form-section">
                <h6
                    className="db-form-title">
                    {TITLE}
                </h6>

                <CategoryTypeList
                    types={CATEGORY_TYPES}
                    onTypeClick={this.handleCategoryFilterClick}
                />

                <Autosuggest
                    id="categories-0"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested(0)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected(0)}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps(0)}
                />

                <Autosuggest
                    id="categories-1"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested(1)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected(1)}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps(1)}
                />
            </div>
        );
    }
}


CategorySelection.propTypes = {
    selectedCategoryType: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    inputs: PropTypes.array
};

function mapStateToProps(state) {
    const {
        selectedCategoryType,
        fetchedCategoriesByFilter,
        suggestions,
        inputs
    } = state;

    const { isFetching } = fetchedCategoriesByFilter[selectedCategoryType] || { isFetching: true };

    return {
        selectedCategoryType,
        fetchedCategoriesByFilter,
        isFetching,
        suggestions,
        inputs
    };
}

export default connect(mapStateToProps)(CategorySelection);
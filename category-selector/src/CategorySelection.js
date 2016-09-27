import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { selectCategoryType, fetchPostsIfNeeded } from '../actions/categories';
import { fetchRequestedSuggestions, requestSuggestions, requestSuggestionsIfNeeded, resetSuggestions, selectCategory } from '../actions/suggestions';
import CategoryTypeList from './CategoryTypeList';
import { CATEGORY_TYPES } from '../constants/CategoryTypes';

class CategorySelection extends Component {

    constructor(props) {
        super(props);
        // We need to do it because ES6 class properties do not automatically bind to the React class instance
        this.handleCategoryTypeClick = this.handleCategoryTypeClick.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedCategoryType } = this.props;
        dispatch(fetchPostsIfNeeded(selectedCategoryType));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCategoryType !== this.props.selectedCategoryType) {
            const { dispatch, selectedCategoryType } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedCategoryType));
        }
    }

    handleCategoryTypeClick(nextCategoryType) {
        this.props.dispatch(selectCategoryType(nextCategoryType));
    }

    onSuggestionsFetchRequested(index) {
        return ({ value }) => {
            this.props.dispatch(fetchRequestedSuggestions(value, index));
        }
    }

    onSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    onSuggestionSelected(index) {
        return (event, { suggestion }) => {
            this.props.dispatch(selectCategory(suggestion, index));
        }
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
            console.log(event);
            this.props.dispatch(requestSuggestionsIfNeeded(newValue, index));
        };
    }

    onFocus(event) {
        // this.props.dispatch(focusCategoryInput(event.target.id));

        console.log(event.target.id);
        console.log('focused');

        console.log('props');
        console.log(this.props);
    }

    render() {
        const { selectedCategoryType, categories, isFetching, lastUpdated, suggestions, selectedCategories, inputs } = this.props;

        const TITLE = 'What service do you need? *';

        const DEFAULT_INPUT_PROPS = {
            onFocus: this.onFocus,
            placeholder: 'Select or type the category'
        };

        const inputProps = index => Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: 'categories-input-1',
            value: inputs[index],
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
                    onTypeClick={this.handleCategoryTypeClick}
                />

                {selectedCategories.map((category, index) => (
                    <Autosuggest
                        id="categories-{index}"
                        suggestions={suggestions[index]}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested(index)}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested(index)}
                        onSuggestionSelected={this.onSuggestionSelected(index)}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        shouldRenderSuggestions={this.shouldRenderSuggestions}
                        inputProps={inputProps(index)}
                    />
                ))}

            </div>
        );
    }
}


CategorySelection.propTypes = {
    selectedCategoryType: PropTypes.number,
    categories: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    inputs: PropTypes.array,
    selectedCategories: PropTypes.array
};

function mapStateToProps(state) {
    const {
        selectedCategoryType,
        categoriesByCategoryType,
        selectedCategories,
        suggestions,
        inputs } = state;

    const {
        isFetching,
        items: categories
    } = categoriesByCategoryType[selectedCategoryType] || {
        isFetching: true,
        items: []
    };

    return {
        selectedCategoryType,
        categories,
        isFetching,
        suggestions,
        selectedCategories,
        inputs
    };
}

export default connect(mapStateToProps)(CategorySelection);
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
        this.onSuggestions1FetchRequested = this.onSuggestions1FetchRequested.bind(this);
        this.onSuggestions2FetchRequested = this.onSuggestions2FetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestion1Selected = this.onSuggestion1Selected.bind(this);
        this.onSuggestion2Selected = this.onSuggestion2Selected.bind(this);
        this.onSuggestion3Selected = this.onSuggestion3Selected.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
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

    onSuggestions1FetchRequested({ value }) {
        const defaultList = this.props.categories;
        this.props.dispatch(fetchRequestedSuggestions(defaultList, value, 1));
    }

    onSuggestions2FetchRequested({ value }) {
        const list = this.props.selectedCategories[1].related;
        this.props.dispatch(fetchRequestedSuggestions(list, value, 2));
    }

    onSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    onSuggestion1Selected(event, { suggestion }) {
        this.props.dispatch(selectCategory(suggestion));
    }

    onSuggestion2Selected(event, { suggestion }) {
        this.props.dispatch(selectCategory(suggestion, 2));
    }

    onSuggestion3Selected(event, { suggestion }) {
        this.props.dispatch(selectCategory(suggestion, 3));
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

    onChange(event, { newValue }) {
        console.log(event);
       this.props.dispatch(requestSuggestionsIfNeeded(newValue, 1));
    }

    onChange2(event, { newValue }) {
        console.log(event);
        this.props.dispatch(requestSuggestionsIfNeeded(newValue, 2));
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

        const inputProps = Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: 'categories-input-1',
            value: inputs[1],
            onChange: this.onChange
        });


        const inputProps2 = Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: 'categories-input-2',
            value: inputs[2],
            onChange: this.onChange2
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

                <Autosuggest
                    id="categories-1"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestions1FetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestion1Selected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps}
                />

                <Autosuggest
                    id="categories-2"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestions2FetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestion2Selected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps2}
                />

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
    inputs: PropTypes.object,
    selectedCategories: PropTypes.object
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
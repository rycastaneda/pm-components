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
        const { suggestions,  inputs } = this.props;

        const DEFAULT_INPUT_PROPS = {
            placeholder: 'Select or type the category',
            className: 'form-control'
        };

        const inputProps = index => Object.assign({}, DEFAULT_INPUT_PROPS, {
            id: `categories-input-${index}`,
            value: inputs[index] || '',
            onChange: this.onChange(index)
        });

        return (
            <div className="col-xs-12 mar-btm">

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
            </div>
        );
    }
}


CategorySuggestion.propTypes = {
    selectedCategoryFilter: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    inputs: PropTypes.array,
    fetchedCategoriesByFilter: PropTypes.object
};

function mapStateToProps(state) {
    const {
        selectedCategoryFilter,
        fetchedCategoriesByFilter,
        suggestions,
        inputs
    } = state;

    return {
        selectedCategoryFilter,
        fetchedCategoriesByFilter,
        suggestions,
        inputs
    };
}

export default connect(mapStateToProps)(CategorySuggestion);
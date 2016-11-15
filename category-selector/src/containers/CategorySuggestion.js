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

    /**
     *
     * @param {number} index
     * @returns {function({value: {string}})}
     */
    onSuggestionsFetchRequested(index) {
        return ({ value }) => {
            this.props.dispatch(fetchSuggestions(value, index));
        };
    }

    onSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    /**
     *
     * @param {number} index
     * @returns {function(*, {suggestion: {Object}})}
     */
    onSuggestionSelected(index) {
        return (event, { suggestion }) => {
            this.props.dispatch(selectCategory(suggestion, index));
        };
    }

    /**
     *
     * @description
     * Indicates what should input value be when suggestion is clicked
     *
     * @param {Object} suggestion
     * @returns {string}
     */
    getSuggestionValue(suggestion) {
        return suggestion.attributes.title;
    }

    /**
     * @description
     * Template for suggestions list
     *
     * @param {object} suggestion
     * @returns {XML}
     */
    renderSuggestion(suggestion) {
        return (
            <div>
                <i className="fa fa-wrench"/>
                <span>{suggestion.attributes.title}</span>
            </div>
        );
    }

    /**
     *
     * @returns {boolean}
     */
    shouldRenderSuggestions() {
        // Always render suggestion when input is focused
        return true;
    }

    /**
     *
     * @param {number} index
     * @returns {function(*, {newValue: {string}})}
     */
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
            <div className="col-xs-12 mar-btm category-suggestion">
                { currentIndex > 0 ? <i className="category-suggestion__icon fa fa-arrow-right"></i> : '' }
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
    currentIndex: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    const { categorySelector } = state;

    return { categorySelector };
}

export default connect(mapStateToProps)(CategorySuggestion);
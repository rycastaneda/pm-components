import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchSuggestions, resetSuggestions, updateSuggestion } from '../actions/itemsActions';
import { loadItemDetails } from '../actions/itemDetailsActions';

class ItemSuggestion extends Component {
    constructor(props) {
        super(props);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSectionSuggestions = this.getSectionSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSuggestionsFetchRequested() {
        return ({ value }) => {
            this.props.dispatch(fetchSuggestions(value));
        };
    }

    onSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    onSuggestionSelected() {
        return (event, { suggestion }) => {
            const requestedItemId = suggestion.relationships.requestedItem.data.id;
            this.props.dispatch(loadItemDetails(suggestion.id, requestedItemId));
        };
    }

    getSectionSuggestions(section) {
        return section.matchedItems;
    }

    getSuggestionValue(suggestion) {
        return `${suggestion.supplier.attributes.title} - ${suggestion.attributes.title}`;
    }

    renderSectionTitle(section) {
        return (<strong> {
                section.requestedItem
            } </strong>
        );
    }

    renderSuggestion(suggestion) {
        return (<span> {
                `${suggestion.supplier.attributes.title} - ${suggestion.attributes.title}`
            } </span>
        );
    }

    shouldRenderSuggestions() {
        return true;
    }

    onChange() {
        return (event, { newValue }) => {
            this.props.dispatch(updateSuggestion(newValue));
        };
    }

    render() {
        const { itemsReducer } = this.props;

        const DEFAULT_INPUT_PROPS = {
            placeholder: 'Select service to create a new engagement ....',
            className: 'form-control'
        };

        const inputProps = Object.assign({}, DEFAULT_INPUT_PROPS, {
            value: itemsReducer.value || '',
            onChange: this.onChange()
        });

        const isFetching = itemsReducer.isFetching;
        const isApiError = itemsReducer.isApiError;

        return (
          <div className="autoSuggest">
            {!isFetching && !isApiError ?
                <Autosuggest
                  multiSection = {true}
                  focusInputOnSuggestionClick = {false}
                  suggestions = {itemsReducer.suggestions}
                  onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested()}
                  onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
                  onSuggestionSelected={this.onSuggestionSelected(itemsReducer.items.data)}
                  getSuggestionValue = {this.getSuggestionValue}
                  renderSuggestion = {this.renderSuggestion}
                  renderSectionTitle = {this.renderSectionTitle}
                  getSectionSuggestions = {this.getSectionSuggestions}
                  shouldRenderSuggestions = {this.shouldRenderSuggestions}
                  inputProps = {inputProps}
                  /> : ''
            }
          </div>
        );
    }
}

ItemSuggestion.propTypes = {
    itemsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { itemsReducer } = state;
    return { itemsReducer };
}

export default connect(mapStateToProps)(ItemSuggestion);

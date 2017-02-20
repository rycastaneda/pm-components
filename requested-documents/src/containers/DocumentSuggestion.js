import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

import { fetchSuggestions, resetSuggestions, updateInput, suggestionSelected, checkSelection } from '../actions/documentSuggestions';

class DocumentSuggestions extends Component {

    constructor(props) {
        super(props);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
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
            this.props.dispatch(suggestionSelected(suggestion));
        };
    }

    getSuggestionValue(suggestion) {
        return suggestion.attributes.title;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                <i className="fa fa-file-o"/>
                <span>{suggestion.attributes.title}</span>
            </div>
        );
    }

    shouldRenderSuggestions() {
        // Always render suggestion when input is focused
        return true;
    }

    onChange() {
        return (event, { newValue }) => {
            this.props.dispatch(updateInput(newValue));
        };
    }

    onBlur() {
        return (event, { focusedSuggestion }) => {
            this.props.dispatch(checkSelection(focusedSuggestion));
        };
    }

    render() {
        const { documentSuggestions } = this.props;

        const inputProps = {
            id: `suggestion-1`,
            className:'form-control',
            value: documentSuggestions.input || '',
            onChange: this.onChange(),
            onBlur: this.onBlur()
        };

        return (
            <div className="document-suggestions">
                <Autosuggest
                    id="document-suggestion"
                    suggestions={documentSuggestions.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested()}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected()}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    focusFirstSuggestion={true}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

DocumentSuggestions.propTypes = {
    documentSuggestions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { documentSuggestions } = state;

    return { documentSuggestions };
}

export default connect(mapStateToProps)(DocumentSuggestions);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getDocuments, updateQuoteId, updateCheckbox, addNewDocument } from '../actions/requestedDocuments';
import Document from '../components/Document';
import DocumentSuggestion from '../containers/DocumentSuggestion';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const quoteId = document.getElementById('quote_id').value;

        this.props.dispatch(updateQuoteId(quoteId));
        this.props.dispatch(getDocuments());
    }

    handleCheckboxChange(event, document) {
        return this.props.dispatch(updateCheckbox(event.target.checked, document));
    }

    handleClick(event) {
        event.preventDefault();
        return this.props.dispatch(addNewDocument());
    }

    render() {
        const { requestedDocuments, documentSuggestions } = this.props;

        return (
            <div className="requested-documents col-xs-12">
                { requestedDocuments.docs.map(document =>
                    <Document key={parseInt(document.id)}
                              id={parseInt(document.id)}
                              title={document.attributes.title}
                              checked={document.attributes.checked}
                              updating={document.attributes.updating}
                              handleChange={event => this.handleCheckboxChange(event, document)
                              }/>
                )}
                <div className="row pad-top-sm">
                    <div className="col-md-4">
                        <DocumentSuggestion />
                    </div>
                    <div className="col-md-4">
                        <button className="btn"
                                type="submit"
                                disabled={ !documentSuggestions.input }
                                onClick={this.handleClick}>+ Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requestedDocuments: PropTypes.object,
    documentSuggestions: PropTypes.object
};

function mapStateToProps(state) {
    const { requestedDocuments, documentSuggestions } = state;

    return {
        requestedDocuments,
        documentSuggestions
    };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop

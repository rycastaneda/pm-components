import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getDocuments, updateCheckbox, addNewDocument } from '../actions/requestedDocuments';
import Document from '../components/Document';
import DocumentSuggestion from '../containers/DocumentSuggestion';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        return this.props.dispatch(getDocuments());
    }

    handleCheckboxChange(event, document) {
        return this.props.dispatch(updateCheckbox(event.target.checked, document));
    }

    handleClick() {
        return this.props.dispatch(addNewDocument());
    }

    render() {
        const { requestedDocuments } = this.props;

        return (
            <div className="requested-documents">
                { requestedDocuments.docs.map(document =>
                    <Document key={document.id}
                              id={document.id}
                              title={document.attributes.title}
                              checked={document.attributes.checked}
                              handleChange={event => this.handleCheckboxChange(event, document)}/>
                )}
                <DocumentSuggestion />
                <button className="btn"
                        onClick={this.handleClick}>+ Add</button>
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requestedDocuments: PropTypes.object
};

function mapStateToProps(state) {
    const { requestedDocuments } = state;

    return {
        requestedDocuments
    };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop
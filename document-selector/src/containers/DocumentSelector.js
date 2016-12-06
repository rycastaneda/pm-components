import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocuments, selectAllDocuments } from '../actions/documents';
import { fetchItems, selectItem } from '../actions/documents';
import Button from '../components/Button';

class DocumentSelector extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.props.dispatch(fetchDocuments());
        this.props.dispatch(fetchItems());
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleSelectAllDocuments = this.handleSelectAllDocuments.bind(this);
    }

    handleSelectItem(document, item) {
        return this.props.dispatch(selectItem(document, item));
    }

    handleSelectAllDocuments() {
        return this.props.dispatch(selectAllDocuments());
    }

    render() {
        return (
            <div>
                <button>Copy From</button>
                
            </div>
        );
    }
}

DocumentSelector.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(DocumentSelector);  // adds dispatch prop
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocuments, toggleDocument, toggleGroup } from '../actions/documents';
import { toggleItem } from '../actions/requested-item';
import Grid from '../components/Grid';
import DocumentGroupSelector from '../components/DocumentGroupSelector';

class DocumentSelector extends Component {
    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleToggleDocument = this.handleToggleDocument.bind(this);
        this.handleToggleGroup = this.handleToggleGroup.bind(this);
        this.handleToggleItem = this.handleToggleItem.bind(this);
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.field = document.querySelector('[data-field]').getAttribute('data-field');
        this.props.dispatch(fetchDocuments(this.quote_id, document.querySelector('[data-all-items]')));
    }

    handleToggleDocument(document) {
        return this.props.dispatch(toggleDocument(document));
    }

    handleToggleGroup(group, checked) {
        return this.props.dispatch(toggleGroup(group, checked));
    }

    handleToggleItem(document, item, checked) {
        return this.props.dispatch(toggleItem(document, item, checked));
    }

    render() {
        return (
            <div>
                <button>Copy From</button>
                {document.querySelector('[data-all-items]') ? 
                <div>
                    <input 
                        type="hidden" 
                        name={this.field} 
                        value={this.props.addedDocuments.join(',')}/>
                    <DocumentGroupSelector 
                        groups={this.props.groups} 
                        items={this.props.requestedItems}
                        toggleGroup={this.handleToggleGroup}
                        toggleDocument={this.handleToggleDocument}>
                    </DocumentGroupSelector>
                </div>
                : <Grid 
                    groups={this.props.groups} 
                    items={this.props.requestedItems}
                    toggleItem={this.handleToggleItem}/>
                }
            </div>
        );
    }
}

DocumentSelector.propTypes = {
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.array,
    addedDocuments: PropTypes.array,
    requestedItems: PropTypes.object
};

function mapStateToProps(state) {
    const { groups, requestedItems, documents, ui  } = state;
    let addedDocuments = [];
    if (!groups.allIds.length) { // return defaults on empty load
        return { groups: [], addedDocuments, requestedItems, ui };
    }
    // Get groups with documents 
    const normalized = groups.allIds.map((groupId) => { 
        let group = groups.byId[groupId]; 

        group.documents = documents.allIds.map((documentId) => { // fetch groups with documents
            if (documents.byId[documentId].groups === groupId) {
                let items = documents.byId[documentId].requesteditems.map((item) => {
                    return requestedItems.byId[item];
                });
                
                documents.byId[documentId].items = items;

                if (items.length) { // store those with added items on addedDocuments field
                    addedDocuments = addedDocuments.concat(documentId);
                }

                return documents.byId[documentId];
            }
        }).filter(doc => doc); // clean up undefined documents

        return group;
    });

    return { groups: normalized, addedDocuments, requestedItems, ui };
}

export default connect(mapStateToProps)(DocumentSelector);  // adds dispatch prop
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocuments, toggleDocument, toggleGroup } from '../actions/documents';
import {
    toggleItem,
    selectItem
} from '../actions/requested-item';
import Grid from '../components/Grid';
import DocumentGroupSelector from '../components/DocumentGroupSelector';
import CopyFrom from '../components/CopyFrom';

class DocumentSelector extends Component {
    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleToggleDocument = this.handleToggleDocument.bind(this);
        this.handleToggleGroup = this.handleToggleGroup.bind(this);
        this.handleToggleItem = this.handleToggleItem.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.requested_item_id = document.querySelector('[data-requested-item-id]') ?
                +document.querySelector('[data-requested-item-id]').getAttribute('data-requested-item-id') : false;
        this.field = document.querySelector('[data-field]').getAttribute('data-field');
        this.props.dispatch(fetchDocuments(
            this.quote_id,
            this.requested_item_id,
            document.querySelector('[data-all-items]')
        ));
    }

    handleToggleDocument(document) {
        return this.props.dispatch(toggleDocument(document));
    }

    handleToggleGroup(group, checked) {
        return this.props.dispatch(toggleGroup(group, checked));
    }

    handleToggleItem(document, item, checked, fromGrid) {
        return this.props.dispatch(toggleItem(document, item, checked, fromGrid));
    }

    handleSelectItem(item) {
        return this.props.dispatch(selectItem(item));
    }

    render() {
        const copyFrom = this.props.requestedItems.allIds.length ? (
            <div>
                <div className="col-xs-4 mar-btm-sm mar-top-sm">
                    <label className="mar-top-sm">Copy From Item</label>
                </div>
                <div className="col-xs-8 mar-btm-sm">
                    <CopyFrom items={this.props.requestedItems}
                        active={this.props.ui.selectedItem}
                        selectItem={this.handleSelectItem}/>
                </div>
            </div>
        ) : null;

        const showCopyFrom = !!this.props.groups.length && !!this.props.requestedItems.allIds.filter((id) => {
            return this.props.requestedItems.byId[id].service.toLowerCase() === 'hire';
        }).length;

        return (
            document.querySelector('[data-all-items]') ?
            <div className="db-form-section">
                <h6 className="db-form-title">Documents</h6>
                <input
                    type="hidden"
                    name={this.field}
                    value={this.props.addedDocuments.join(',')}/>
                {showCopyFrom ? copyFrom :null}

                <DocumentGroupSelector
                    quote_id={this.quote_id}
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
        );
    }
}

DocumentSelector.propTypes = {
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.array,
    addedDocuments: PropTypes.array,
    ui: PropTypes.object,
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

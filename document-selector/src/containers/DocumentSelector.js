import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocuments, toggleDocument, toggleGroup } from '../actions/documents';
import {
    toggleItem,
    openItemModal,
    closeItemModal,
    copyItem,
    selectItem
} from '../actions/requested-item';
import Grid from '../components/Grid';
import DocumentGroupSelector from '../components/DocumentGroupSelector';
import CopyFromModal from '../components/CopyFromModal';

class DocumentSelector extends Component {
    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleToggleDocument = this.handleToggleDocument.bind(this);
        this.handleToggleGroup = this.handleToggleGroup.bind(this);
        this.handleToggleItem = this.handleToggleItem.bind(this);
        this.handleOpenItemModal = this.handleOpenItemModal.bind(this);
        this.handleCloseItemModal = this.handleCloseItemModal.bind(this);
        this.handleCopyItem = this.handleCopyItem.bind(this);
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

    handleToggleItem(document, item, checked) {
        return this.props.dispatch(toggleItem(document, item, checked));
    }

    handleOpenItemModal() {
        return this.props.dispatch(openItemModal());
    }

    handleCloseItemModal() {
        return this.props.dispatch(closeItemModal());
    }

    handleCopyItem(item) {
        if (item) {
            this.handleCloseItemModal();
            return this.props.dispatch(copyItem(item));
        }
    }

    handleSelectItem(item) {
        return this.props.dispatch(selectItem(item));
    }

    render() {
        const copyModal = (
            <div className="pull-right">
                <button className="db-function copy-from" onClick={(e) => {
                    e.preventDefault();
                    this.handleOpenItemModal();
                }}>Copy From</button>
                <CopyFromModal
                    items={this.props.requestedItems}
                    isOpen={this.props.ui.isOpen}
                    active={this.props.ui.selectedItem}
                    closeModal={this.handleCloseItemModal}
                    copyItem={this.handleCopyItem}
                    selectItem={this.handleSelectItem}
                    >
                </CopyFromModal>
            </div>
        );
        const documentsButton=(
                <div className="pull-right">
                <a className="db-function copy-from" href={ api.configureHostname()+'/searcher/quotes/add_quote_machine/'+this.quote_id}>Return to step 2 to add documents</a>

            </div>
            );

        return (
            <div className="db-form-section">
                <div>
                    <h6 className="db-form-title">
                        <span className="pull-left">Documents</span>

                        <div className="clearfix"></div>
                    </h6>
                </div>
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
                    {this.props.requestedItems.length? copyModal :null}
                    {!this.props.requestedItems.length? documentsButton :null}
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

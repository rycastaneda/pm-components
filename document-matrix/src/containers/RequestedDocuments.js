import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchRequirements,
    downloadDocument,
    downloadDocumentGroup,
    downloadDocumentGroups,
    downloadRequestedItemDocuments
} from '../actions/requested-documents';
import Group from '../components/Group';
import Loader from '../components/Loader';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleDownloadDocument = this.handleDownloadDocument.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDownloadDocumentGroups = this.handleDownloadDocumentGroups.bind(this);
        this.handleDownloadRequestedItemDocuments = this.handleDownloadRequestedItemDocuments.bind(this);
        this.quote_id = document.querySelector('[data-component="document-matrix"]').getAttribute('data-quote-id');
        this.userType = document.querySelector('[data-component="document-matrix"]').getAttribute('data-user-type');
        this.props.dispatch(fetchRequirements(this.quote_id, this.userType));
    }

    componentDidUpdate() {
        if (Plantminer.initRevisions) {
            Plantminer.initRevisions();
        }
    }

    handleDownloadDocument(documentId) {
        return this.props.dispatch(downloadDocument(documentId));
    }

    handleDownloadDocumentGroup(groupId) {
        return this.props.dispatch(downloadDocumentGroup(groupId));
    }

    handleDownloadDocumentGroups(groupId) {
        return this.props.dispatch(downloadDocumentGroups(groupId));
    }

    handleDownloadRequestedItemDocuments(requestedItemId) {
        return this.props.dispatch(downloadRequestedItemDocuments(requestedItemId));
    }

    noDocuments() {
        return (
            <div>
                <table className="table db-table document-table filelist">
                    <thead>
                        <tr className="document-table__header">
                            <th>Documents</th>
                            <th className="text-center">Added</th>
                            <th className="text-center">Revisions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3" className="text-center">
                                <i className="fa fa-warning"></i>&nbsp;There are no documents to be displayed.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const {
            items,
            groups,
            ui
        } = this.props;

        let content = items.length && groups.length ?
            <div>
                <h3>
                    Documents
                    <button className="mar-l-sm db-function mar-btm-sm" onClick={() => this.handleDownloadDocumentGroups()}>
                        <i className="fa fa-download"></i>
                        &nbsp;Download All
                    </button>
                </h3>
                <div className="scroll-auto">
                    <table className={`table document-table db-table db-table-sort db-table-sort-nojs ${items.length > 3 ? 'db-angle-table' : ''}`}>
                        <thead>
                            <tr>
                                <th className="pad-left-sm wid-50">Document</th>
                                <th className="text-center">Added</th>
                                <th className="text-center">Revisions</th>
                                {items.map((item, key) => <th key={key}>
                                    <div>
                                        <span>
                                            &nbsp;{item.service_title && item.title + ' - ' + item.service_title || item.title}
                                        </span>
                                    </div>
                                </th>)}
                            </tr>
                        </thead>
                        {groups.filter(group => group.documents.length).map(group =>
                            <Group key={group.id}
                                group={group}
                                items={items}
                                handleDownloadRequestedItemDocuments={this.handleDownloadRequestedItemDocuments}
                                handleDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                                handleDownloadDocument={this.handleDownloadDocument} />
                        )}
                        <tbody>
                            <tr>
                                <td colSpan="3" data-heading="Action" className="bordered document-group">Download By Service</td>

                                {items.map((item) => {
                                    return (
                                        <td key={item.id} className="document-group text-center bordered">
                                            { item.documentIds.length ?
                                                <a onClick={() => this.handleDownloadRequestedItemDocuments(item.id)}>
                                                    <i className="fa fa-download icon-link"></i>
                                                </a>
                                            : null }
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        : this.noDocuments();

        return (
            <div className="group-panel">
                {ui.error === 'REQUEST_FAILED' ?
                    <div className="bs-callout bs-callout-danger">
                        Something went wrong. Please try again later.
                    </div>
                : null }
                {ui.loading && !ui.error ?
                    <Loader></Loader>
                : null}
                {content}
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array,
    groups: PropTypes.array,
    ui: PropTypes.object
};


function mapStateToProps(state) {
    const {
        requirements,
        documents: rawDocuments,
        groups: rawGroups,
        ui
    } = state;

    let groups = [];
    let items = [];
    let rawItems = [];

    if (!requirements && !requirements.allIds.length) {
        return {
            items,
            groups,
            ui
        };
    }

    requirements.allIds.map((requirementId) => {
        let item = requirements.byId[requirementId];

        if (item.showItem && item.documentIds.length) {
            items.push(item);
        }

        rawItems.push(item);
    });

    groups = rawGroups.allIds.map((groupId) => {
        let group = rawGroups.byId[groupId];
        group.documents = group.documentIds.filter((docId) => {
            let document = rawDocuments.byId[docId];
            // check if some of document's items are to be displayed else hide the document
            let showDocument = document.included.length && document.included.some((itemId) => {
                let includedItem = rawItems.filter((item) => {
                    return item.id === itemId;
                }).pop();
                return includedItem && includedItem.showItem;
            });
            return document.included.length && showDocument;
        }).map((documentId) => {
            let document = rawDocuments.byId[documentId];
            document.revisions = document.revisionIds.map(revisionId => rawDocuments.byId[revisionId]);
            return document;
        });
        return group;
    });

    return {
        items,
        groups,
        ui
    };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop

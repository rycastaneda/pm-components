import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchRequirements,
    toggleRevisions,
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
        this.handleToggleRevisions = this.handleToggleRevisions.bind(this);
        this.handleDownloadDocument = this.handleDownloadDocument.bind(this);
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDownloadDocumentGroups = this.handleDownloadDocumentGroups.bind(this);
        this.handleDownloadRequestedItemDocuments = this.handleDownloadRequestedItemDocuments.bind(this);
        this.quote_id = document.querySelector('[data-component="document-matrix"]').getAttribute('data-quote-id');
        this.userType = document.querySelector('[data-component="document-matrix"]').getAttribute('data-user-type');
        this.props.dispatch(fetchRequirements(this.quote_id, this.userType));
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

    handleToggleRevisions(documentId) {
        return this.props.dispatch(toggleRevisions(documentId));
    }

    render() {
        const {
            items,
            groups,
            ui
        } = this.props;

        let content;

        if (ui.loading && !ui.error) {
            content = <Loader block={true}></Loader>;
        } else {
            content = items.length ?
                <div>
                    <button className="db-function pull-right mar-btm-sm" onClick={() => this.handleDownloadDocumentGroups()}>
                        <i className="fa fa-download"></i>
                        &nbsp;Download All
                    </button>

                    <table className="group-table filelist">
                        <tbody>
                            <tr className="group-table__header">
                                <td className="group-table__header-item"></td>
                                {items.map(item => <td className="group-table__header-item" key={item.id}>
                                    <a className="filelist__file" onClick={() => this.handleDownloadRequestedItemDocuments(item.id)}>
                                        <i className="fa fa-download"></i>
                                    </a>
                                    &nbsp;{item.title}
                                </td>)}
                            </tr>
                        </tbody>
                        {groups.map(group =>
                            <Group key={group.id}
                                group={group}
                                items={items}
                                handleToggleRevisions={this.handleToggleRevisions}
                                handleDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                                handleDownloadDocument={this.handleDownloadDocument} />
                        )}
                    </table>
                </div>
            : null;
        }

        return (
            <div className="group-panel">
                {ui.error === 'REQUEST_FAILED' ?
                    <div className="alert alert-danger">
                        <strong>Something went wrong. Please try again later.</strong>
                    </div>
                : null }
                {ui.loading && !ui.error
                    ? <Loader block={true}></Loader>
                    : content
                }
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

    if (!requirements && !requirements.allIds.length) {
        return {
            items,
            groups,
            ui
        };
    }

    requirements.allIds.map((requirementId) => {
        if (requirements.byId[requirementId].documentIds.length) {
            items.push(requirements.byId[requirementId]);
        }
    });

    groups = rawGroups.allIds.map((groupId) => {
        let group = rawGroups.byId[groupId];
        group.documents = group.documentIds.filter((doc) => {
            return rawDocuments.byId[doc].included.length;
        }).map((documentId) => {
            let doc = rawDocuments.byId[documentId];
            doc.revisions = doc.revisionIds.map(revisionId => rawDocuments.byId[revisionId]);
            return doc;
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

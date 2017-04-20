import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchDocuments,
    downloadDocumentGroup,
    downloadDocumentGroups
} from '../actions/groups';
import Group from './Group';
import Loader from '../components/Loader';
import GroupLists from '../components/GroupLists';
import AddGroupForm from './AddGroupForm';
import cloneDeep from 'lodash';

class DocumentGroup extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.handleDownloadDocumentGroup = this.handleDownloadDocumentGroup.bind(this);
        this.handleDownloadDocumentGroups = this.handleDownloadDocumentGroups.bind(this);
        this.options = [];
        this.addGroupInput = null;
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.readOnly = !!+document.querySelector('[data-quote-id]').getAttribute('data-read-only');
        this.props.dispatch(fetchDocuments(this.quote_id));
    }

    handleDownloadDocumentGroup(groupId) {
        return this.props.dispatch(downloadDocumentGroup(groupId));
    }

    handleDownloadDocumentGroups() {
        return this.props.dispatch(downloadDocumentGroups());
    }

    render() {
        let error, lists = [];

        const {
            documentGroups,
            documents,
            ui
        } = this.props;

        // filter groups with default as options
        this.options = documentGroups.reduce((options, group) => {
            if (!group.default) {
                options.push(group.title);
            }
            return options;
        }, []);

        const visibleDocumentGroups = documentGroups.reduce((groupElements, group) => {
            if (group.showGroup) {
                if (group.documents.length) { // save lists with documents for read only
                    lists.push(group);
                }
                groupElements.push(
                    <Group group={group}
                        key={group.id}
                        onFileRemove={this.handleRemoveFile}
                        onFileUpload={this.handleFileUpload}
                        onDownloadFile={this.handleDownloadFile}
                        toggleRenaming={this.handleTogglingRename}
                        onDownloadDocumentGroup={this.handleDownloadDocumentGroup}
                        catchFiles={this.handleCatchFiles}/>
                );
            }

            return groupElements;
        }, []);


        // for read only
        const list = (
            <GroupLists groups={lists}
                downloadDocumentGroup={this.handleDownloadDocumentGroup}/>
        );

        if (ui.error) {
            error = (
                <div className="bs-callout bs-callout-danger">{ui.error}</div>
            );
        }

        const disclaimer =  (
            <div className="db-form-section group-panel" key={this.quote_id}>
                <div className="panel-body">
                    <p>
                        Upload all of the relevant documents you have for this RFQ.  Arrange them using the groups provided, or create your own.  You will specify which service(s) each document will apply to in the next step.
                    </p>
                    <p className="mar-top-sm">
                        No documents to upload? You can&nbsp;
                        <a href={`/searcher/quotes/add_quote_machine/${this.quote_id}`}>
                            skip this step
                        </a> right now
                    </p>
                </div>
            </div>
        );

        return (
            <div className="group-panel">
                <div className="row container text-right">
                    {documents.length ?
                        <button className="db-function" onClick={() => {
                            this.handleDownloadDocumentGroups();
                        }}>
                            <i className={`fa ${documentGroups.downloading ? 'fa-spin fa-spinner' : 'fa-download'}`}></i>
                            &nbsp; Download All
                        </button>
                        : null}
                    <hr/>
                </div>
                {this.readOnly ? list : [disclaimer, visibleDocumentGroups]}
                {error}
                {documentGroups.loading ? <Loader block={true}/> : ''}
                <AddGroupForm readOnly={this.readOnly} />
            </div>
        );
    }
}

DocumentGroup.propTypes = {
    dispatch: PropTypes.func.isRequired,
    documentGroups: PropTypes.array,
    documents: PropTypes.array,
    ui: PropTypes.object
};

function mapStateToProps(state) {
    const {
        documentGroups: rawGroups,
        documents: rawDocuments,
        ui
        // documentsToBeAdded: rawDocumentsToBeAdded
    } = state;

    const documentGroups = cloneDeep(rawGroups).value().allIds.map((documentGroupId) => {
        let documentGroup = rawGroups.byId[documentGroupId];
        documentGroup.documents = documentGroup.documentIds.map((documentId) => {
            return rawDocuments.byId[documentId];
        });

        return documentGroup;
    });

    return { documentGroups, documents: rawDocuments.allIds, ui };
}

export default connect(mapStateToProps)(DocumentGroup);  // adds dispatch prop

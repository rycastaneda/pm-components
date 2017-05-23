import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchRevisions,
    downloadRevision,
    downloadRevisions
} from '../actions/revisions';
import Revision from '../components/Revision';
import Loader from '../components/Loader';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleDownloadRevision = this.handleDownloadRevision.bind(this);
        this.handleDownloadRevisions = this.handleDownloadRevisions.bind(this);
        let selector = document.querySelector('[data-component="document-revision"]');
        this.quoteId = selector.getAttribute('data-quote-id');
        this.userType = selector.getAttribute('data-user-type');
        this.documentId = selector.getAttribute('data-document-id');
        this.props.dispatch(fetchRevisions(this.quoteId, this.documentId, this.userType));
    }

    handleDownloadRevision(documentId) {
        return this.props.dispatch(downloadRevision(documentId));
    }

    handleDownloadRevisions(documentId) {
        return this.props.dispatch(downloadRevisions(documentId));
    }

    render() {
        const {
            revisions,
            ui
        } = this.props;

        let content;

        if (ui.loading && !ui.error) {
            content = <Loader block={true}></Loader>;
        } else {
            content = revisions.length ?
                <div>
                    <table className="table db-table mar-top-sm">
                        <thead>
                            <tr>
                                <th className="text-center">Revision</th>
                                <th>Document Status</th>
                                <th className="text-center">Added</th>
                                <th>File name</th>
                                <th className="text-center">
                                    <a onClick={() => this.handleDownloadRevisions(ui.documentId)}>
                                        <i className="fa fa-download icon-link"></i>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {revisions.map(revision =>
                                <Revision key={revision.id}
                                    revision={revision}
                                    handleDownloadRevision={this.handleDownloadRevision}/>
                            )}
                        </tbody>
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
                {content}
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    revisions: PropTypes.array,
    ui: PropTypes.object
};


function mapStateToProps(state) {
    const {
        revisions: rawRevisions,
        ui
    } = state;

    let revisions = [];

    if (!rawRevisions.allIds.length) {
        return {
            revisions,
            ui
        };
    }

    revisions = rawRevisions.allIds.map((requirementId) => {
        return rawRevisions.byId[requirementId];
    });

    return {
        revisions,
        ui
    };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchRequirements,
    catchDocuments,
    removeDocument
} from '../actions/requested-documents';
import Requirements from '../components/Requirements';
import Loader from '../components/Loader';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleCatchDocs = this.handleCatchDocs.bind(this);
        this.handleRemoveDocument = this.handleRemoveDocument.bind(this);
        this.quote_id = document.querySelector('[data-component="supplier-requested-documents"]').getAttribute('data-quote-id');
        this.matched_id = document.querySelector('[data-component="supplier-requested-documents"]').getAttribute('data-matched-item');
        this.reqId = document.querySelector('[data-component="supplier-requested-documents"]').getAttribute('data-rqid');
        this.props.dispatch(fetchRequirements(this.quote_id, this.matched_id, this.reqId));
    }

    handleCatchDocs(requirement_id, files) {
        files = files.map((file, index) => {
            file.id = +new Date() + index; // create unique ID after dropping the documents
            return file;
        });

        this.props.dispatch(catchDocuments(this.quote_id, this.matched_id, requirement_id, files));
    }

    handleRemoveDocument(requirement_id, file_id) {
        this.props.dispatch(removeDocument(this.quote_id, this.matched_id, requirement_id, file_id));
    }

    render() {
        const {
            requirements,
            ui,
            summary
        } = this.props;

        let content;

        if (ui.loading && !ui.error) {
            content = <Loader block={true}></Loader>;
        } else {
            content = <div>
                <label htmlFor="">Requested Documents</label>
                <div className="text-info">
                    The customer has requested that your provide the following documents as part of your quote
                </div>
                <hr className="mar-btm-sm mar-top-sm"/>
                <Requirements
                    requirements={requirements}
                    onRemoveDocument={this.handleRemoveDocument}
                    onDropDocuments={this.handleCatchDocs}>
                </Requirements>
            </div>;
        }

        return (
            <div className="group-panel supplier-requested-documents">
                <input type="hidden" name="requestedDocuments" value={JSON.stringify(summary)}/>
                {ui.error === 'FETCH_FAILED' ?
                    <div className="alert alert-danger">
                        <strong>Something went wrong. Please try again later.</strong>
                    </div>
                : ui.loading && !ui.error
                    ? <Loader block={true}></Loader>
                    : content
                }
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requirements: PropTypes.array,
    ui: PropTypes.object,
    summary: PropTypes.object
};


function mapStateToProps(state) {
    const {
        requirementsDocuments,
        documentsToBeAdded,
        ui
    } = state;
    const summary = {};

    if (!requirementsDocuments.allIds.length) {
        return {
            requirements: [],
            ui,
            summary
        };
    }

    let requirements = requirementsDocuments.allIds.map((requirementId) => {
        let req = requirementsDocuments.byId[requirementId];
        req.id = requirementId;
        summary[requirementId] = [];

        req.documents = req.docsToAdd.concat(req.documentIds).map((id) => {
            summary[requirementId].push(documentsToBeAdded.byId[id].upload_id);
            return documentsToBeAdded.byId[id];
        });

        return req;
    }).reverse(); // make the additional documents section appear last

    return { requirements, ui, summary };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop

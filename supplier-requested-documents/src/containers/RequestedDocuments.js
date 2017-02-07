import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchRequirements,
    catchDocuments,
    removeDocument
} from '../actions/requested-documents';
import AdditionalDocuments from '../components/AdditionalDocuments';
import Requirements from '../components/Requirements';
import Loader from '../components/Loader';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleCatchDocs = this.handleCatchDocs.bind(this);
        this.handleRemoveDocument = this.handleRemoveDocument.bind(this);
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.matched_id = document.querySelector('[data-matched-item]').getAttribute('data-matched-item');
        this.props.dispatch(fetchRequirements(this.quote_id, this.matched_id));
    }

    handleCatchDocs(requirement_id, files) {
        files = files.map((file, index) => {
            file.id = +new Date() + index;
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
            additionalDocuments
        } = this.props;

        let content;

        if (ui.loading && !ui.error) {
            content = <Loader></Loader>;
        } else {
            content = <div>
                <Requirements 
                    requirements={requirements} 
                    onRemoveDocument={this.handleRemoveDocument} 
                    onDropDocuments={this.handleCatchDocs}>
                </Requirements>
            </div>;
        }

        return (
            <div className="group-panel">
                {ui.error === 'FETCH_FAILED' ? 
                    <div className="alert alert-danger">
                        <strong>Something went wrong. Please try again later.</strong>
                    </div>
                : ui.loading && !ui.error
                    ? <Loader></Loader>
                    : content
                } 
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requirements: PropTypes.array,
    additionalDocuments: PropTypes.array,
    ui: PropTypes.object
};


function mapStateToProps(state) {
    const {
        requirementsDocuments,
        documentsToBeAdded,
        ui
    } = state;

    if (!requirementsDocuments.allIds.length) {
        return {
            requirements: [],
            additionalDocuments: [],
            ui
        };
    }


    const additional = requirementsDocuments.byId['additional'];
    const additionalDocIds = additional.docsToAdd.concat(additional.documentIds);

    const additionalDocuments = additionalDocIds.map((id) => {
        return documentsToBeAdded.byId[id];
    });

    let requirements = requirementsDocuments.allIds.map((id) => {
        let req = requirementsDocuments.byId[id];
        req.id = id;
        req.documents = req.docsToAdd.concat(req.documentIds).map((id) => {
            return documentsToBeAdded.byId[id];
        });

        return req;
    }).reverse();

    return { requirements, ui, additionalDocuments };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop
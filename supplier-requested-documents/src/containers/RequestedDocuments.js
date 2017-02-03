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
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.matched_id = document.querySelector('[data-matched-item]').getAttribute('data-matched-item');
        this.props.dispatch(fetchRequirements(this.quote_id, this.matched_id));
    }

    handleCatchDocs(requirement_id, files) {
        files = files.map((file, index) => {
            file.id = +new Date() + index;
            file.filename = file.name;
            return file;
        });

        this.props.dispatch(catchDocuments(this.quote_id, this.matched_item, requirement_id, files));
    }

    handleRemoveDocument(requirement_id, file_id) {
        this.props.dispatch(removeDocument(requirement_id, file_id));
    }

    render() {
        const {
            requirements,
            ui
        } = this.props;

        return (
            <div className="group-panel">
                {ui.loading
                ? <Loader></Loader>
                : <Requirements 
                    requirements={requirements} 
                    onRemoveDocument={this.handleRemoveDocument} 
                    onDropDocuments={this.handleCatchDocs}>
                  </Requirements>
                }
            </div>
        );
    }
}

RequestedDocuments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requirements: PropTypes.array,
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
            ui
        };
    }

    let requirements = requirementsDocuments.allIds.map((id) => {
        let req = requirementsDocuments.byId[id];
        req.id = id;
        req.documents = req.docsToAdd.concat(req.documentIds).map((id) => {
            return documentsToBeAdded.byId[id];
        });

        return req;
    });

    return { requirements, ui };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop
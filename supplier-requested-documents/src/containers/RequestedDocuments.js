import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchRequirements,
    catchFiles,
    removeFile
} from '../actions/requested-documents';
import Requirements from '../components/Requirements';
import Loader from '../components/Loader';

class RequestedDocuments extends Component {

    constructor(props) {
        super(props);
        this.handleCatchFiles = this.handleCatchFiles.bind(this);
        this.handleFileRemove = this.handleFileRemove.bind(this);
        this.quote_id = document.querySelector('[data-quote-id]').getAttribute('data-quote-id');
        this.matched_id = document.querySelector('[data-matched-item]').getAttribute('data-matched-item');
        this.props.dispatch(fetchRequirements(this.quote_id, this.matched_id));
    }

    handleCatchFiles(requirement_id, files) {
        this.props.dispatch(catchFiles(this.quote_id, this.matched_item, requirement_id, files));
    }

    handleFileRemove(requirement_id, file_id) {
        this.props.dispatch(removeFile(requirement_id, file_id));
    }

    render() {
        const {
            requirements,
            ui
        } = this.props;

        return (
            <div className="group-panel">
                <h3>Supplier Requirements</h3>
                {ui.loading
                ? <Loader></Loader>
                : <Requirements 
                    requirements={requirements} 
                    onFileRemove={this.handleFileRemove} 
                    onDropFiles={this.handleCatchFiles}>
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
        req.documents = req.documentIds.map((id) => {
            return documentsToBeAdded.byId[id];
        });

        return req;
    });

    return { requirements, ui };
}

export default connect(mapStateToProps)(RequestedDocuments);  // adds dispatch prop
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import ItemSuggestion from './ItemSuggestion';
import ItemDetails from './ItemDetails';
import PendingEngagements from './PendingEngagements';
import SentEngagements from './SentEngagements';

import { updateQuoteId, updateRequestedItemId, updateMatchedItemId, updatePanelId, updateItemId, updateRegionId, loadItems } from '../actions/itemsActions';
import { loadEngagements } from '../actions/engagementsActions';
import { loadItemDetails, loadItemDetailsPanel } from '../actions/itemDetailsActions';

class Engagement extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const quoteId = document.getElementById('quote_id') ? document.getElementById('quote_id').value : null;
        const rqId = document.getElementById('rq_id') ? document.getElementById('rq_id').value : null;
        const riqiId = document.getElementById('riqi_id') ? document.getElementById('riqi_id').value : null;
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;
        const panelId = document.getElementById('panel_id') ? document.getElementById('panel_id').value : null;
        const regionId = document.getElementById('region_id') ? document.getElementById('region_id').value : null;

        if (panelId && itemId) {
            this.props.dispatch(updatePanelId(panelId));
            this.props.dispatch(updateRegionId(regionId));
            this.props.dispatch(updateItemId(itemId));
            this.props.dispatch(loadItemDetailsPanel(panelId, itemId, regionId));
        } else {
            this.props.dispatch(updateQuoteId(quoteId));
            this.props.dispatch(updateRequestedItemId(rqId));
            this.props.dispatch(updateMatchedItemId(riqiId));
            this.props.dispatch(loadEngagements(quoteId));

            if (rqId && riqiId) {
                this.props.dispatch(loadItemDetails(riqiId, rqId));
            } else {
                this.props.dispatch(loadItems(quoteId));
            }
        }
    }


    render() {
        const { ui, itemsReducer } = this.props;

        return (
            <div className="engagement-wrapper">
                { ui.loadingCounter ? <Loader /> : null }
                { ui.info ? <div className="bs-callout bs-callout-info">{ ui.infoText }</div> : null }
                { ui.success ? <div className="bs-callout bs-callout-success">{ ui.successText }</div> : null }
                { ui.error ? <div className="bs-callout bs-callout-danger">{ ui.errorText }</div> : null }
                
                {
                    (itemsReducer.spot === 'qr-details') ? <ItemSuggestion /> : null
                }
                <ItemDetails />
                {
                    (itemsReducer.spot !== 'browse') ? <PendingEngagements /> : null
                }
                {
                    (itemsReducer.spot !== 'browse') ? <SentEngagements /> : null
                }
            </div>
        );
    }
}

Engagement.propTypes = {
    ui: PropTypes.object.isRequired,
    itemsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { ui, itemsReducer } = state;
    return { ui, itemsReducer };
}

export default connect(mapStateToProps)(Engagement);

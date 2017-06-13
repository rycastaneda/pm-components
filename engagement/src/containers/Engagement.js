/* global $ */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import ItemSuggestion from './ItemSuggestion';
import ItemDetails from './ItemDetails';
import PendingEngagements from './PendingEngagements';
import SentEngagements from './SentEngagements';

import { updateQuoteId, updateRequestedItemId, updateMatchedItemId, updatePanelId, updateItemId, updateRegionId, updateEngagemetLimit, loadItems } from '../actions/itemsActions';
import { loadEngagements } from '../actions/engagementsActions';
import { loadItemDetails, loadItemDetailsPanel } from '../actions/itemDetailsActions';

class Engagement extends Component {

    constructor(props) {
        super(props);
        this.navigateToEngagement = this.navigateToEngagement.bind(this);
    }

    componentWillMount() {
        const quoteId = document.getElementById('quote_id') ? document.getElementById('quote_id').value : null;
        const rqId = document.getElementById('rq_id') ? document.getElementById('rq_id').value : null;
        const riqiId = document.getElementById('riqi_id') ? document.getElementById('riqi_id').value : null;
        const itemId = document.getElementById('item_id') ? document.getElementById('item_id').value : null;
        const panelId = document.getElementById('panel_id') ? document.getElementById('panel_id').value : null;
        const regionId = document.getElementById('region_id') ? document.getElementById('region_id').value : null;
        const engagemetLimit = document.getElementById('engagement_limit') ? document.getElementById('engagement_limit').value : null;

        if (this.props.itemsReducer.spot === 'browse') {
            this.props.dispatch(updatePanelId(panelId));
            this.props.dispatch(updateRegionId(regionId));
            this.props.dispatch(updateEngagemetLimit(+engagemetLimit));
            this.props.dispatch(updateItemId(itemId));
            this.props.dispatch(loadItemDetailsPanel(panelId, itemId, regionId));
        } else {
            this.props.dispatch(updateQuoteId(quoteId));
            this.props.dispatch(updateRequestedItemId(rqId));
            this.props.dispatch(updateMatchedItemId(riqiId));

            if (this.props.itemsReducer.spot === 'supplier-item') {
                this.props.dispatch(loadItemDetails(riqiId, rqId));
            } else {
                this.props.dispatch(loadEngagements(quoteId));

                const engagementsUpdatedField = document.getElementById('engagements_updated');
                engagementsUpdatedField.addEventListener('change', (event) => {
                    if (event.target.value !== '0') {
                        this.props.dispatch(loadEngagements(quoteId));
                    }
                });
                this.props.dispatch(loadItems(quoteId));
            }
        }
    }

    navigateToEngagement() {
        const navToEngagement = document.getElementById('navigate_engagement');
        navToEngagement.value = 1;

        $('button.close').trigger('click');
    }


    render() {
        const { ui, itemsReducer } = this.props;

        return (
            <div className="engagement-wrapper">
                { ui.loadingCounter ? <Loader /> : null }
                { ui.info ? <div className="bs-callout bs-callout-info">{ ui.infoText }</div> : null }
                { ui.successQuoteModal ? <div className="bs-callout bs-callout-success">{ ui.successMessage }<br/>When you are ready, you can view and send all your pending <a id="navToEngagement" onClick={this.navigateToEngagement}>engagements here</a>.</div> : null }
                { ui.success ? <div className="bs-callout bs-callout-success">{ ui.successMessage }</div> : null }
                { ui.error ? <div className="bs-callout bs-callout-danger">{ ui.errorMessage }</div> : null }

                {
                    (itemsReducer.spot === 'qr-details') ? <ItemSuggestion /> : null
                }
                <ItemDetails />
                {
                    (itemsReducer.spot === 'qr-details') ? <PendingEngagements /> : null
                }
                {
                    (itemsReducer.spot === 'qr-details') ? <SentEngagements /> : null
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

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ItemSuggestion from './ItemSuggestion';
import ItemDetails from './ItemDetails';
import PendingEngagements from './PendingEngagements';
import SentEngagements from './SentEngagements';

import { updateQuoteId, updateRequestedItemId, updateMatchedItemId, loadItems } from '../actions/itemsActions';
import { loadEngagements } from '../actions/engagementsActions';
import { loadItemDetails } from '../actions/itemDetailsActions';

class Engagement extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const quoteId = document.getElementById('quote_id').value;
        const rqId = document.getElementById('rq_id').value;
        const riqiId = document.getElementById('riqi_id').value;

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


    render() {
        const { itemsReducer } = this.props;

        return (
            <div className="engagement">
                {
                    (itemsReducer.spot !== 'supplier-item') ? <ItemSuggestion /> : null
                }
                <ItemDetails />
                <PendingEngagements />
                <SentEngagements />
            </div>
        );
    }
}

Engagement.propTypes = {
    itemsReducer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { itemsReducer } = state;
    return { itemsReducer };
}

export default connect(mapStateToProps)(Engagement);

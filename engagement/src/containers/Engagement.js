import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ItemSuggestion from './ItemSuggestion';
import ItemDetails from './ItemDetails';
import PendingEngagements from './PendingEngagements';
import SentEngagements from './SentEngagements';

import { updateQuoteId, loadItems } from '../actions/itemsActions';
import { loadEngagements } from '../actions/engagementsActions';

class Engagement extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const quoteId = document.getElementById('quote_id').value;

        this.props.dispatch(updateQuoteId(quoteId));
        this.props.dispatch(loadItems(quoteId));
        this.props.dispatch(loadEngagements(quoteId));
    }


    render() {
        return (
            <div className="engagement">
                <ItemSuggestion />
                <ItemDetails />
                <PendingEngagements />
                <SentEngagements />
            </div>
        );
    }
}

Engagement.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Engagement);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DisplayForm from '../containers/DisplayForm';
import {
    updateQuoteId,
    updateRequestItemId,
    updateRequestByToItemId,
    updateQuoteItemId,
    getItems
} from '../actions/supplierQuoteRequirements';

class SupplierQuoteRequirements extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
        self.props.dispatch(updateQuoteId(document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-quote-id')));
        self.props.dispatch(updateRequestItemId(document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-rqid')));
        self.props.dispatch(updateRequestByToItemId(document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-qrbtid')));

        self.props.dispatch(updateQuoteItemId(document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-riqi-id')));
        self.props.dispatch(getItems());
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div className="supplier-quote-requirements__form col-xs-12">
                { quoteRequirements.items.length
                    ?   <div>
                            <label>Quote Requirements</label>
                            { quoteRequirements.items.map(item =>
                                <DisplayForm key={item.id}
                                             item={item}/>
                            )}
                        </div>
                    : null
                }
            </div>
        );
    }
}

SupplierQuoteRequirements.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quoteRequirements: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { quoteRequirements } = state;

    return {
        quoteRequirements
    };
}

export default connect(mapStateToProps)(SupplierQuoteRequirements);  // adds dispatch prop

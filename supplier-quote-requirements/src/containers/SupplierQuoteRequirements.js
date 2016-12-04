import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DisplayForm from '../containers/DisplayForm';
import { getItems } from '../actions/SupplierQuoteRequirements';

class SupplierQuoteRequirements extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;

        document.getElementById('selected-item-row-id').addEventListener('input', function(event) {
            self.props.dispatch(getItems(event.target.value));
        });
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div className="supplier-quote-requirements__form">
                {quoteRequirements.items.map(item =>
                    <DisplayForm key={item.id}
                                 item={item}/>
                )}
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
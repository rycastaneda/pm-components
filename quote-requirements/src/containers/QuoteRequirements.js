import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EditForm from '../containers/EditForm';
import Viewer from '../containers/ViewForm';
import { getItems, updateQuoteId, updateDropdownOptions } from '../actions/quoteRequirements';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Get quote id and selected category id values stored in hidden inputs inside php page
        // If the user load this page second time to 'edit'
        const quoteId = document.getElementById('quote_id').value;
        const categoryIdField = document.getElementById('qr_category_id');
        const itemIdField = document.getElementById('item_id');
        const categorySelectedField = document.getElementById('category_selected');
        const categoryId = categoryIdField.value;

        if (categorySelectedField) {
            this.props.dispatch(updateDropdownOptions(categorySelectedField));
        }

        this.props.dispatch(updateQuoteId(quoteId));

        if (categoryId) {
            this.props.dispatch(getItems(itemIdField.value, quoteId, `${categoryId}`));
        }
        // Add event listener to trigger api call by passing selected category id
        // If the user load the page for the first time
        categoryIdField.addEventListener('change', (event) => {
            const itemId = document.getElementById('item_id').value;

            if (event.target.value !== '0') {
                this.props.dispatch(getItems(itemId, quoteId, `${event.target.value}`, true));
            }
        });
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div className="quote-inclusions">
                {quoteRequirements.items && quoteRequirements.items.map(item =>
                    item.isEditing
                        ? <EditForm key={item.id}
                                    item={item}/>
                        : <Viewer key={item.id}
                                  item={item}/>
                )}
            </div>
        );
    }
}

QuoteRequirements.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quoteRequirements: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { quoteRequirements } = state;

    return {
        quoteRequirements
    };
}

export default connect(mapStateToProps)(QuoteRequirements);

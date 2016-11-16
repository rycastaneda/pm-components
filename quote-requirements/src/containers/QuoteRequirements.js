import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EditForm from '../containers/EditForm';
import Viewer from '../components/ViewForm';
import { setItemAsEditing, deleteItem, getItems } from '../actions/quoteRequirements';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getItems());
    }

    handleUpdate(item) {
        return this.props.dispatch(setItemAsEditing(item));
    }

    handleDelete(event, item) {
        event.preventDefault();

        return this.props.dispatch(deleteItem(item));
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div className="quote-inclusions">
                {quoteRequirements.items.map(item =>
                    item.isEditing ?
                        <EditForm key={item.id}
                                  item={item}/> :
                        <Viewer key={item.id}
                                text={item.attributes.text}
                                isMandatory={item.attributes.mandatory}
                                handleUpdate={() => this.handleUpdate(item)}
                                handleDelete={event => this.handleDelete(event, item)}/>
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

export default connect(mapStateToProps)(QuoteRequirements);  // adds dispatch prop
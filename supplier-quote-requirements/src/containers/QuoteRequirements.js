import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ViewerForm from '../components/ViewForm';
import { setItemAsEditing, getItems } from '../actions/quoteRequirements';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getItems());
    }

    handleSelection(item) {
        return this.props.dispatch(setItemAsEditing(item));
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div className="supplier-quote-inclusions">
                {quoteRequirements.items.map(item =>
                    <ViewerForm key={item.id}
                            text={item.attributes.text}
                            isMandatory={item.attributes.mandatory}
                            handleSelection={() => this.handleSelection(item)}/>
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
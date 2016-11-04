import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EditForm from '../containers/EditForm';
import Viewer from '../components/Viewer';
import { setAsEditing, deleteRequirement, getRequirements } from '../actions/quoteRequirements';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getRequirements());
    }

    handleUpdate(item) {
        return this.props.dispatch(setAsEditing(item));
    }

    handleDelete(item) {
        return this.props.dispatch(deleteRequirement(item));
    }

    render() {
        const { quoteRequirements } = this.props;
        return (
            <div>
                {quoteRequirements.items.map(item =>
                    item.isEditing ?
                        <EditForm key={item.id}
                                  item={item}/> :
                        <Viewer key={item.id}
                                text={item.attributes.text}
                                isMandatory={item.attributes.isMandatory}
                                handleUpdate={() => this.handleUpdate(item)}
                                handleDelete={() => this.handleDelete(item)}/>
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
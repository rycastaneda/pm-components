import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import RequirementsList from '../components/RequirementsList';
import { setAsEditing, deleteRequirement } from '../actions/quoteRequirements';

class QuoteRequirements extends Component {

    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onUpdate(id) {
        return this.props.dispatch(setAsEditing(id));
    }

    onDelete(id) {
        return this.props.dispatch(deleteRequirement(id));
    }

    onSave(item) {
        return this.props.dispatch(setAsEditing(item));
    }

    render() {
        const { quoteRequirements } = this.props;
        return (

            <div>
                <RequirementsList list={quoteRequirements.items}
                                  onDelete={this.onDelete}
                                  onSave={this.onSave}
                                  onUpdate={this.onUpdate}/>
            </div>
        );
    }
}

QuoteRequirements.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quoteRequirements: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { quoteRequirements  } = state;

    return {
        quoteRequirements
    };
}

export default connect(mapStateToProps)(QuoteRequirements);  // adds dispatch prop
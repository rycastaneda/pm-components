import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    updateSelection,
    toggleCommentsDisplay
} from '../actions/supplierQuoteRequirements';
import Responses from '../components/Responses';
import CommentsForm from '../components/CommentsForm';

class DisplayForm extends Component {

    constructor(props) {
        super(props);
        this.updateSelection = this.updateSelection.bind(this);
        this.toggleCommentsFieldDisplay = this.toggleCommentsFieldDisplay.bind(this);
        this.requirement = props.requirement;
    }

    updateSelection(response, comment) {
        if (!response) {
            response = this.requirement.response ? this.requirement.response.response : '';
        } // set previous response

        if (!comment) {
            comment = this.requirement.response ? this.requirement.response.comment : '';
        } // set previous comment

        return this.props.dispatch(updateSelection(
            this.requirement.response ? this.requirement.response.id : '', 
            this.requirement.id, 
            response,
            comment
        ));
    }

    toggleCommentsFieldDisplay() {
        return this.props.dispatch(toggleCommentsDisplay(this.props.requirement));
    }

    render() {
        const { requirement } = this.props;
        return (
            <div className="display-form">
                <div className="col-xs-9 display-form__left-block">

                    <div className="display-form__description">
                        {requirement.text}
                    </div>
                    {
                        requirement.displayComments
                        ? <CommentsForm 
                                updateSelection={this.updateSelection}
                                comment={requirement.response ? requirement.response.comment : ''} />
                        : null
                    }
                </div>
                <div className="col-xs-3 display-form__right-block">
                    <div className="btn-group btn-group-justified display-form__buttons-container">
                        <Responses 
                            updateSelection={this.updateSelection} 
                            response={requirement.response ? requirement.response.response : ''}>
                        </Responses>
                    </div>

                    {requirement.response &&
                        <div>
                            <a className="display-form__link"
                                onClick={this.toggleCommentsFieldDisplay}>{requirement.response.comment ? `View Comments` : `+ Add comments`}
                            </a>
                        </div>
                    }
                </div>

            </div>
        );
    }
}

DisplayForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requirement: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DisplayForm);
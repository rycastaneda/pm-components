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

        if (comment === null);
        else if (!comment) {
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
        if (!this.props.readOnly) {
            return this.props.dispatch(toggleCommentsDisplay(this.props.requirement));
        }
    }

    render() {
        const { requirement, readOnly } = this.props;
        return (
            <div className={`display-form ${requirement.response && requirement.response.response ? 'responded' : 'not-responded'}`}>
                <div className="col-xs-9 col-sm-8 display-form__left-block">

                    <div className={`display-form__description ${requirement.mandatory ? 'mandatory' : ''}`}>
                        {requirement.text}
                    </div>
                    <CommentsForm showForm={requirement.displayCommentsForm}
                        readOnly={readOnly}
                        updateSelection={this.updateSelection}
                        toggleCommentsFieldDisplay={this.toggleCommentsFieldDisplay}
                        comment={requirement.response ? requirement.response.comment : ''}
                    />

                </div>
                <div className="col-xs-3 col-sm-4 display-form__right-block">
                    <div className="display-form__buttons-container">
                        <Responses
                            updateSelection={this.updateSelection}
                            mandatory={requirement.mandatory}
                            readOnly={readOnly}
                            response={requirement.response ? requirement.response.response : ''}>
                        </Responses>
                        {requirement.mandatory && <div className="text-info">
                            * Non-negotiable
                        </div>}
                    </div>

                    {(requirement.response && !requirement.response.comment && !readOnly) &&
                        <div>
                            <a className="display-form__link"
                                onClick={this.toggleCommentsFieldDisplay}>Add comments
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
    requirement: PropTypes.object.isRequired,
    readOnly: PropTypes.bool
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DisplayForm);

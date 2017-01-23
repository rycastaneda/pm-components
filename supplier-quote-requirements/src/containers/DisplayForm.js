import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    handleCommentsUpdate,
    handleButtonSelection,
    toggleCommentsDisplay,
    saveComments
} from '../actions/supplierQuoteRequirements';
import Button from '../components/Button';
import CommentsForm from '../components/CommentsForm';

class DisplayForm extends Component {

    constructor(props) {
        super(props);
        this.handleButtonSelection = this.handleButtonSelection.bind(this);
        this.handleCommentsSave = this.handleCommentsSave.bind(this);
        this.handleCommentsUpdate = this.handleCommentsUpdate.bind(this);
        this.toggleCommentsFieldDisplay = this.toggleCommentsFieldDisplay.bind(this);
    }

    handleButtonSelection(button) {
        return this.props.dispatch(handleButtonSelection(this.props.item, button));
    }

    handleCommentsSave() {
        return this.props.dispatch(saveComments(this.props.item));
    }

    handleCommentsUpdate(event) {
        return this.props.dispatch(handleCommentsUpdate(this.props.item, event.target.value));
    }

    toggleCommentsFieldDisplay() {
        return this.props.dispatch(toggleCommentsDisplay(this.props.item));
    }


    render() {
        const { item } = this.props;
        const supplierResponse = item.supplierResponse.attributes;

        return (
            <div className="display-form">
                <div className="col-xs-9 display-form__left-block">

                    <div className="display-form__description">
                        {item.attributes.text}
                    </div>

                    {
                        item.displayCommentsField
                        ? <CommentsForm handleCommentsSave={this.handleCommentsSave}
                                        handleCommentsUpdate={this.handleCommentsUpdate}
                                        commentsText={supplierResponse ? supplierResponse.comment : ''} />
                        : null
                    }

                </div>
                <div className="col-xs-3 display-form__right-block">
                    <div className="btn-group btn-group-justified display-form__buttons-container">
                        { item.buttons.map(button =>
                            <Button key={button.id}
                                    isSelected={supplierResponse ? supplierResponse.response === button.value : false}
                                    handleSelection={() => this.handleButtonSelection(button)}
                                    label={button.value}/>)
                        }
                    </div>
                    <div><a className="display-form__link"
                            onClick={this.toggleCommentsFieldDisplay}>+ Add comments</a></div>
                </div>

            </div>
        );
    }
}

DisplayForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

export default connect()(DisplayForm);
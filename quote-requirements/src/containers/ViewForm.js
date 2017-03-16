import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { setItemAsEditing, deleteItem, toggleViewFullText } from '../actions/quoteRequirements';

class ViewForm extends Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleViewFullText = this.toggleViewFullText.bind(this);
    }

    handleUpdate() {
        return this.props.dispatch(setItemAsEditing(this.props.item));
    }

    handleDelete() {
        return this.props.dispatch(deleteItem(this.props.item));
    }

    toggleViewFullText() {
        return this.props.dispatch(toggleViewFullText(this.props.item));
    }

    render() {
        const { item } = this.props;
        const text = item.attributes.text;

        return (
            <div className={`quote-inclusions__form view-form ${item.attributes.include ? 'view-form--favourite' : ''}`}>
                <div className="view-form__description">
                    <div className="view-form__text">
                        { item.viewFullText
                            ? text
                            : text.length > 200 ? `${text.substring(0, 199)}...` : text
                        }
                    </div>
                    { text.length > 200
                        ? <a className="view-form__read-more"
                             onClick={this.toggleViewFullText}>{ item.viewFullText ? 'Read less' : 'Read more' }</a>
                        : null
                    }
                    { item.attributes.mandatory
                        ? (<div className="form__text view-form__text--mandatory">Non negotiable</div>)
                        : null
                    }
                </div>

                <div className="view-form__buttons-container">
                    <div className="view-form__button view-form__button--update">
                        <i className="view-form__icon fa fa-pencil-square-o"
                           onClick={this.handleUpdate}/>
                    </div>
                    <div className="view-form__button view-form__button--delete">
                        <i className="view-form__icon fa fa-trash-o"
                           onClick={this.handleDelete}/>
                    </div>
                </div>
            </div>
        );
    }
}

ViewForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

export default connect()(ViewForm);  // adds dispatch prop

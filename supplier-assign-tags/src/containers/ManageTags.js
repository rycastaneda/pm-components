import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import { Popover,
    OverlayTrigger }
    from 'react-bootstrap';
import { selectItemInDropDown,
    initialise,
    saveTagComment
     }
    from '../actions/manageTagsActions';

class ManageTags extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.renderValue = this.renderValue.bind(this);
        this.state={ focusedTagComment:'', focusedTag:null, selectedTags:this.props.selectedTags };
    }

    componentDidMount() {
        const selector = this.refs.root.parentNode;
        const supplier_id = selector.getAttribute('data-supplier-id');
        let isReadOnly = selector.getAttribute('data-readonly');
        isReadOnly = Boolean(isReadOnly)&&(isReadOnly.toLowerCase()!=='false');
        this.props.dispatch(initialise(supplier_id, isReadOnly));
    }
    componentWillReceiveProps(props) {
        this.state={ focusedTagComment:'', focusedTag:null, selectedTags:props.selectedTags };
    }
    handleSelectChange(value) {
        this.props.dispatch(selectItemInDropDown(value));
    }

    handleSaveComment() {
        this.props.dispatch(saveTagComment(this.state.focusedTag.id, this.state.focusedTagComment));
    }

    onItemClick(option, event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({ focusedTag:option, focusedTagComment:option.comment });
    }

    popoverHoverFocus(option) {
        if (option.hasSavedComment) {
            return <Popover id="popover-trigger-hover-focus"
                title="Comment">{option.comment}
            </Popover>;
        } else {
            return <Popover id="popover-trigger-hover-focus"
                >{"Click to add a comment"}
            </Popover>;
        }

    }

    renderValue(option) {
        const color = { color: option.color };
        let styleClass ='content';
        styleClass += option.isFocused?' selected':'';
        styleClass += option.active?'':' inactive';
        return <div className={styleClass}
                onMouseDown={this.onItemClick.bind(this, option)} key={option.id}>
                    <OverlayTrigger trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={this.popoverHoverFocus(option)}>
                        <span>
                            <span className={`tag-icon fa ${option.iconClass}`} style={color}></span>
                            <span>{option.label}</span>
                            {option.hasSavedComment?
                                <i className="fa fa-commenting-o comment-btn"  aria-hidden="true"></i>
                                :null
                            }
                        </span>
                    </OverlayTrigger>
                </div>;
    }

    render() {
        const { availableTags,
                selectedTags,
                isBusy,
                errorMessage,
                isReadOnly }  = this.props;
        if (isReadOnly) {
            return (
                 <div className="manage-tags" ref="root">
                    <ul className="supplier-tag-listing">
                    {
                        selectedTags.map((option) => {
                            const color = { color: option.color };
                            return <li key={option.id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <span className={`tag-icon fa-2x fa ${option.iconClass}`} style={color}></span>
                                    </div>
                                    <div className="col-md-10">
                                        <h5>{option.label}</h5>
                                        {option.hasSavedComment?<span>{option.comment}</span>:null}
                                    </div>
                                </div>

                            </li>;
                        })
                    }
                    </ul>
                 </div>
            );
        } else {
            return (
                 <div className="manage-tags" ref="root">
                    <Select  name="form-field-name"
                        multi value={selectedTags}
                        options={availableTags}
                        isLoading={isBusy}
                        valueRenderer={this.renderValue}
                        backspaceToRemoveMessage={''}
                        onChange={this.handleSelectChange} />
                    {(this.state.focusedTag===null) ?
                        null:
                     <div className="row">
                         <div  key={this.state.focusedTag.id}  className="mar-top col-xs-12">
                            { this.state.focusedTag.hasSavedComment?
                                <label>
                                    {`Edit comment on  ${this.state.focusedTag.label}`}
                                </label>
                                :
                                <label>
                                    {`Add comment to ${this.state.focusedTag.label}`}
                                </label>
                            }

                            <input type="text"
                                className="fullwidth form-control"
                                placeholder="Enter your comment"
                                defaultValue={this.state.focusedTagComment}
                                onChange={event => this.setState({ focusedTagComment:event.target.value }) }
                            / >
                        </div>
                        <div className="mar-top  col-xs-12">
                            <button className="btn pull-right"
                                onClick={this.handleSaveComment}>
                                {` ${this.state.focusedTag.hasSavedComment?'Update':'Add'} Comment`}
                            </button>
                        </div>
                    </div>}
                    {errorMessage?<div className="col-xs-12">
                        <div className="bs-callout bs-callout-danger">{errorMessage}</div>
                    </div>:null}
                </div>
            );
        }

    }

}
ManageTags.propTypes = {
    availableTags:PropTypes.array.isRequired,
    selectedTags:PropTypes.array.isRequired,
    isBusy:PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    errorMessage:PropTypes.string,
    dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    const { availableTags, selectedTags, isBusy, errorMessage, isReadOnly } = state.manageTags;
    return { availableTags, selectedTags, isBusy, errorMessage, isReadOnly };
}
export default connect(mapStateToProps)(ManageTags);

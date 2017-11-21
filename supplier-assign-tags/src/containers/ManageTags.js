import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import { Popover,
    OverlayTrigger }
    from 'react-bootstrap';
import { selectItemInDropDown,
    fetchTags,
    saveTagComment
     }
    from '../actions/manageTagsActions';

class ManageTags extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.state={ focusedTagComment:'', focusedTag:null, selectedTags:this.props.selectedTags };
    }

    componentDidMount() {
        let selector = document.querySelector('[data-component="supplier-manage-tags"]');
        this.props.dispatch(fetchTags(selector.getAttribute('data-supplier-id')));
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
        return <div className={option.isFocused?'content selected':'content'}
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
        const { availableTags, selectedTags, isBusy, errorMessage }  = this.props;

        return (
             <div className="manage-tags">
                <Select  name="form-field-name"
                    multi value={selectedTags}
                    options={availableTags}
                    isLoading={isBusy}
                    valueRenderer={this.renderValue.bind(this)}
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
ManageTags.propTypes = {
    availableTags:PropTypes.array.isRequired,
    selectedTags:PropTypes.array.isRequired,
    isBusy:PropTypes.bool.isRequired,
    errorMessage:PropTypes.string,
    dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    const { availableTags, selectedTags, isBusy, errorMessage } = state.manageTags;
    return { availableTags, selectedTags, isBusy, errorMessage };
}
export default connect(mapStateToProps)(ManageTags);

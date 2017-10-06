import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import { selectItemInDropDown, fetchTags, saveTags, focusTag, updateFocusedTagComment } from '../actions/manageTagsActions';
class ManageTags extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectClose = this.handleSelectClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCommentChange =  this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        let selector = document.querySelector('[data-component="supplier-manage-tags"]');
        this.props.dispatch(fetchTags(selector.getAttribute('data-supplier-id')));
    }

    handleSelectChange(value) {
        this.props.dispatch(selectItemInDropDown(value));
    }

    handleCommentChange(value) {
        this.props.dispatch(updateFocusedTagComment(value));
    }

    handleSave() {
        this.props.dispatch(saveTags(this.props.selectedTags));
    }

    handleSelectClose() {
        // this.props.dispatch(saveTags(this.props.selectedTags));
    }
    onItemClick(option, event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.dispatch(focusTag(option));
    }

    renderValue(option) {
        const color = { color: option.color };
        return <div className={option.isFocused?'content selected':'content'} onMouseDown={this.onItemClick.bind(this, option)} key={option.id}><span className={`tag-icon fa ${option.iconClass}`} style={color}></span><span>{option.label}</span>{option.comment.length!==0?<a className="btn-link comment-btn"><i className="fa fa-commenting" aria-hidden="true"></i></a>:null}</div>;
    }
    render() {

        const { availableTags, selectedTags, isBusy, errorMessage }  = this.props;
        let focusedTag =null;
        for (let i in selectedTags) {
            if (selectedTags[i].isFocused) {
                focusedTag=selectedTags[i];
            }
        }
        return (
             <div className="manage-tags">
                <Select className="col-xs-12" name="form-field-name" multi value={selectedTags} options={availableTags} isLoading={isBusy} valueRenderer={this.renderValue.bind(this)} backspaceToRemoveMessage={''}
                onChange={this.handleSelectChange} onClose={this.handleSelectClose} />
                {(focusedTag===null) ?
                     null:
                 <div className="col-xs-12"><div  key={focusedTag.id}  className="mar-top">
                    <h4><i style={ { 'color':focusedTag.color } } className={`tag-icon fa ${focusedTag.iconClass}`}></i>{focusedTag.label}</h4>
                    <input type="text" className="fullwidth form-control" placeholder="Enter your comment" value={focusedTag.comment} onChange={event => this.handleCommentChange(event.target.value) }/ >
                </div>
                <div className="mar-top  pull-right">
                    <button className="btn" onClick={this.handleSave} >Save</button>
                </div>
                </div>}
                {errorMessage?<div className="bs-callout bs-callout-danger">{errorMessage}</div>:null}
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

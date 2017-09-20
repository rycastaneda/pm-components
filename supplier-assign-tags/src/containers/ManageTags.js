import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import { selectItemInDropDown, fetchTags, saveTags } from '../actions/manageTagsActions';
class ManageTags extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectClose = this.handleSelectClose.bind(this);
    }

    componentDidMount() {
        let selector = document.querySelector('[data-component="supplier-manage-tags"]');
        this.props.dispatch(fetchTags(selector.getAttribute('data-supplier-id')));
    }

    handleSelectChange(value) {
        this.props.dispatch(selectItemInDropDown(value));
    }

    handleSelectClose() {
        this.props.dispatch(saveTags(this.props.selectedTags));
    }

    renderValue(option) {
        const color = { color: option.color };
        return <span><span className={`tag-icon fa ${option.iconClass}`} style={color}></span><span>{option.label}</span></span>;
    }
    render() {
        const { availableTags, selectedTags, isBusy, errorMessage }  = this.props;
        return (
             <div className="manage-tags">
                <Select name="form-field-name" multi value={selectedTags} options={availableTags} isLoading={isBusy} valueRenderer={this.renderValue}
                onChange={this.handleSelectChange} onClose={this.handleSelectClose} />
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

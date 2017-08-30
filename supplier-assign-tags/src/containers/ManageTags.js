import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  Select  from 'react-select';
import { selectItemInDropDown, fetchTags, saveTags } from '../actions/manageTags';
class ManageTags extends Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }
    getOptions(value) {
        this.props.dispatch(fetchTags(value));
    }
    handleSelectChange(value) {
        this.props.dispatch(selectItemInDropDown(value));
    }
    handleMenuClose(selectedTags) {
        window.console.log(selectedTags);
        this.props.dispatch(saveTags(selectedTags));
    }
    renderValue(option) {
        return <span><span className={`tag-icon fa ${option.iconClass}`}></span><span>{option.label}</span></span>;
    }
    render() {
        const { availableTags, selectedTags }  = this.props;
        return (
             <div>
                <label>Manage Tags</label>
                <Select name="form-field-name" multi value={selectedTags} options={availableTags} valueRenderer={this.renderValue}
                onChange={this.handleSelectChange} onClose={this.handleMenuClose(selectedTags)} />
            </div>
        );
    }

}
ManageTags.propTypes = {
    availableTags:PropTypes.array.isRequired,
    selectedTags:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    const { availableTags, selectedTags } = state.manageTags;
    return { availableTags, selectedTags };
}
export default connect(mapStateToProps)(ManageTags);

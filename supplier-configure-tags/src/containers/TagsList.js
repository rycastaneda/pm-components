import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import { fetchAllTags, startTagEdit, cancelTagEdit, addTag, saveTag, setIsActiveForTag, setIconForTag, setColorForTag, setTitleForTag, setDescriptionForTag } from '../actions/configureTagsActions';
/**
 * @description: Manages supplier Tags as a table
 */
class TagsList extends Component {
    constructor(props) {
        super(props);
        this.populateTagsRow = this.populateTagsRow.bind(this);
        this.onTagTitleChange = this.onTagTitleChange.bind(this);
        this.onTagDescriptionChange = this.onTagDescriptionChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchAllTags());
    }
    render() {
        const { errorMessage, availableTags } = this.props;
        return (
            <div className="tag-list">
                <button className="btn btn-sm pull-right mar-btm-md" onClick = { () => this.props.dispatch(addTag()) }><i className="fa fa-plus"></i>Add</button>
                <div className="clear">{errorMessage?<div className="bs-callout bs-callout-danger">{errorMessage}</div>:null}</div>
                <table  className="table db-table">
                     <thead>
                            <tr className="row" >
                                  <th className="col-sm-1">Active</th>
                                  <th className="col-sm-4">Icon</th>
                                  <th className="col-sm-3">Title</th>
                                  <th className="col-sm-4"></th>
                            </tr>
                        </thead>
                    <tbody>{availableTags.map(this.populateTagsRow, this)}</tbody></table>
            </div>);
    }

    onTagTitleChange(id, value) {
        this.props.dispatch(setTitleForTag(id, value));
    }

    onTagDescriptionChange(id, value) {
        this.props.dispatch(setDescriptionForTag(id, value));
    }

    renderActiveStatusCell(item) {
        return item.isActive?<i className="fa fa-check text-success"></i>:<i className="fa fa-ban text-danger"></i>;
    }

    renderIconCell(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                <div className="item"><IconPicker  icon={item.iconClass} onChange={icon => this.props.dispatch(setIconForTag(item.id, icon))}/></div>
                    <div className="item item-colorpicker"><ColorPicker color={item.color} onChange={color => this.props.dispatch(setColorForTag(item.id, color))}/></div>
            </div>;
        } else {
            return  <i className={`tag-icon fa ${item.iconClass}`} style={ { color :item.color } } ></i>;
        }
    }
    renderButtonCell(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                <button className="btn btn-sm item btn-success"  onClick={() => this.props.dispatch(saveTag(item))}><i className="fa fa-save"></i>Save</button>
                <button className="btn btn-sm item btn-danger"  onClick={() => this.props.dispatch(cancelTagEdit(item.id))}><i className="fa fa-times"></i>Cancel</button>
            </div>;
        } else {
            return <div className="horizontal-block">
                <button className="btn btn-sm item" onClick={() => this.props.dispatch(startTagEdit(item.id))}><i className="fa fa-edit"></i>Edit</button>
                {item.isActive?<button className="btn btn-sm item" onClick={() => this.props.dispatch(setIsActiveForTag(item, false))}><i className="fa fa-ban"></i>Deactivate</button>:<button className="btn btn-sm item" onClick={() => this.props.dispatch(setIsActiveForTag(item, true))}><i className="fa fa-undo"></i>Reactivate</button>}
            </div>;
        }
    }
    renderTitleCell(item) {
        if (item.isEdited) {
            return <input value={item.title} onChange={event => this.onTagTitleChange(item.id, event.target.value) }/>;
        } else {
            return <span>{item.title}</span>;
        }
    }
    renderDescriptionCell(item) {
        if (item.isEdited) {
            return <input value={item.description} onChange={event => this.onTagDescriptionChange(item.id, event.target.value) }/>;
        } else {
            return <span>{item.description}</span>;
        }
    }
    populateTagsRow(item, index) {
        return (
                 <tr className="row" key={index}>
                     <td className="col-sm-1">
                        {this.renderActiveStatusCell(item)}
                     </td>
                    <td className="col-sm-4">
                            {this.renderIconCell(item)}
                    </td>
                    <td className="col-sm-3">
                            {this.renderTitleCell(item)}
                    </td>
                    <td className="col-sm-4">
                        {this.renderButtonCell(item)}
                    </td>
                </tr>);

    }
}

TagsList.propTypes = {
    availableTags : PropTypes.array.isRequired,
    dispatch : PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { errorMessage, availableTags } = state.configureTags;
    return { errorMessage, availableTags };
}
export default connect(mapStateToProps)(TagsList);

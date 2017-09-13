'use strict';
import React, { PropTypes,  Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import { startTagEdit, cancelTagEdit, saveTag, setIsActiveForTag, setIconForTag, setColorForTag, setTitleForTag, setDescriptionForTag } from '../actions/configureTagsActions';
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

    render() {
        const { availableTags } = this.props;
        return (<div className="tag-list"><table  className="table table-striped col-xs-12"><tbody>{availableTags.map(this.populateTagsRow, this)}</tbody></table></div>);
    }

    onTagTitleChange(id, value) {
        this.props.dispatch(setTitleForTag(id, value));
    }

    onTagDescriptionChange(id, value) {
        this.props.dispatch(setDescriptionForTag(id, value));
    }

    renderActive(item) {
        return item.isActive?<i className="fa fa-check text-success"></i>:<i className="fa fa-ban text-danger"></i>;
    }

    renderIcon(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                    <div className="item"><IconPicker  icon={item.iconClass} onChange={icon => this.props.dispatch(setIconForTag(item.id, icon))}/></div>
                    <div className="item"><ColorPicker color={item.color} onChange={color => this.props.dispatch(setColorForTag(item.id, color))}/></div>
            </div>;
        } else {
            return  <i className={`tag-icon fa ${item.iconClass}`} style={ { color :item.color } } ></i>;
        }
    }
    renderButtonCell(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                <button className="btn btn-sm item btn-success"  onClick={() => this.props.dispatch(saveTag(item.id))}><i className="fa fa-save"></i>Save</button>
                <button className="btn btn-sm item btn-danger"  onClick={() => this.props.dispatch(cancelTagEdit(item.id))}><i className="fa fa-times"></i>Cancel</button>
            </div>;
        } else {
            return <div className="horizontal-block">
                <button className="btn btn-sm item" onClick={() => this.props.dispatch(startTagEdit(item.id))}><i className="fa fa-edit"></i>Edit</button>
                {item.isActive?<button className="btn btn-sm item" onClick={() => this.props.dispatch(setIsActiveForTag(item.id, false))}><i className="fa fa-ban"></i>Deactivate</button>:<button className="btn btn-sm item" onClick={() => this.props.dispatch(setIsActiveForTag(item.id, true))}><i className="fa fa-undo"></i>Reactivate</button>}
            </div>;
        }
    }
    renderTitleCell(item) {
        if (item.isEdited) {
            return <input value={item.title} onChange={event => this.onTagTitleChange(item.id, event.target.value) }/>;
        } else {
            <span>{item.title}</span>;
        }
    }
    renderDescriptionCell(item) {
        if (item.isEdited) {
            return <input value={item.description} onChange={event => this.onTagDescriptionChange(item.id, event.target.value) }/>;
        } else {
            <span>{item.description}</span>;
        }
    }
    populateTagsRow(item, index) {
        return (
                 <tr key={index} className="row">
                     <td className="col-xs-1">
                        {this.renderActive(item)}
                     </td>
                    <td className="col-xs-2">
                            {this.renderIcon(item)}
                    </td>
                    <td  className="col-xs-3">
                            {this.renderTitleCell(item)}
                    </td>
                    <td className="col-xs-3">
                        {this.renderDescriptionCell(item)}
                    </td>
                    <td className="col-xs-3">
                        {this.renderButtonCell(item)}
                    </td>
                </tr>);

    }
}

TagsList.propTypes = {
    availableTags : PropTypes.array.isRequired,
    dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { availableTags } = state.configureTags;
    return { availableTags };
}
export default connect(mapStateToProps)(TagsList);

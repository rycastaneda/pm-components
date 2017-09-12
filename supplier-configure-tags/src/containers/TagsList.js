'use strict';
import React, { PropTypes,  Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import { startTagEdit } from '../actions/configureTagsActions';
/**
 * @description: Manages supplier Tags as a table
 */
class TagsList extends Component {
    constructor(props) {
        super(props);
        this.populateTagsRow = this.populateTagsRow.bind(this);
        this.onIconChange = this.onIconChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    render() {
        const { availableTags } = this.props;
        return (<div className="tag-list"><table  className="table table-striped col-xs-12"><tbody>{availableTags.map(this.populateTagsRow, this)}</tbody></table></div>);
    }
    onRowEditStart(item) {
        this.props.dispatch(startTagEdit(item));
    }
    onColorChange(value) {
        window.console.log(value);
    }

    onIconChange(value)  {
        window.console.log(value);
    }

    populateTagsRow(item, index) {
        window.console.log(item);
        if (item.isEdited) {
            return (
                     <tr key={index} className="row">
                        <td className="horizontal-block col-xs-2">
                                <div className="item"><IconPicker  icon={item.iconClass} onChange={this.onIconChange}/></div>
                                <div className="item"><ColorPicker color={item.color} onChange={this.onColorChange}/></div>
                        </td>
                        <td  className="col-xs-3">
                            <input value={item.title}/>
                        </td>
                        <td className="col-xs-3">
                            <input value={item.description}/>
                        </td>
                        <td className="col-xs-4">
                            <button className="btn btn-sm"><i className="fa fa-save"></i>Save</button>
                        </td>
                    </tr>);
        }

        return (
                <tr key={index} className="row">
                    <td className="col-xs-2">
                        <i className={`tag-icon fa ${item.iconClass}`} style={ { color :item.color } } ></i>
                    </td>
                    <td className="col-xs-3">
                        {item.title}
                    </td>
                    <td className="col-xs-3">
                        {item.description}
                    </td>
                    <td className="col-xs-4">
                        <div className="horizontal-block">
                            <button className="btn btn-sm item" onClick={() => this.onRowEditStart(item)}><i className="fa fa-edit"></i>Edit</button>
                            <button className="btn btn-sm item"><i className="fa fa-delete"></i>Delete</button>
                        </div>
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
    window.console.log(availableTags);
    return { availableTags };
}
export default connect(mapStateToProps)(TagsList);

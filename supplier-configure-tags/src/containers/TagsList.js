import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import { fetchAllTags,
                startTagEdit,
                 cancelTagEdit,
                 addTag,
                 saveTag,
                 setIsActiveForTag,
                 setIconForTag,
                 setColorForTag,
                 setTitleForTag,
                 setDescriptionForTag
             } from '../actions/configureTagsActions';
/**
 * @description: Manages supplier Tags as a table
 */
class TagsList extends Component {
    constructor(props) {
        super(props);
        this.populateTagsRow = this.populateTagsRow.bind(this);
        this.onTagTitleChange = this.onTagTitleChange.bind(this);
        this.onTagDescriptionChange = this.onTagDescriptionChange.bind(this);
        this.onTagActiveChange = this.onTagActiveChange.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(fetchAllTags());
    }
    render() {
        const { errorMessage, availableTags } = this.props;
        return (
            <div className="tag-list">
                <button className="btn btn-sm pull-right mar-btm-md"
                    onClick = { () => this.props.dispatch(addTag()) }>
                    <i className="fa fa-plus"></i>Add
                </button>
                <div className="clear">{errorMessage?<div className="bs-callout bs-callout-danger">{errorMessage}</div>:null}</div>
                <table  className="table db-table">
                     <thead>
                            <tr className="row" >
                                  <th className="col-sm-2 td-center">Icon</th>
                                  <th className="col-sm-2  td-center">Title</th>
                                  <th className="col-sm-4  td-center">Description</th>
                                  <th className="col-sm-1  td-center">Active</th>
                                  <th className="col-sm-3  td-center"></th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            availableTags.map(this.populateTagsRow, this)
                        }
                    </tbody>
                </table>
                {availableTags.length?null:<div className="col-sm-12 text-center">{'Click \'Add\' to create supplier tags'}</div>}
            </div>);
    }
    getSavableStatus(item) {
        window.console.log(item);
        let { title } = item;
        return !(title.length);

    }
    onTagTitleChange(id, value) {
        this.props.dispatch(setTitleForTag(id, value));
    }

    onTagDescriptionChange(id, value) {
        this.props.dispatch(setDescriptionForTag(id, value));
    }
    onTagActiveChange(id, value) {
        this.props.dispatch(setIsActiveForTag(id, Number(value)));
    }

    renderActiveStatusCell(item) {

        if (item.isEdited) {
            return (<select value={item.isActive}
                    onChange={event => this.onTagActiveChange(item.id, event.target.value)}>
                    <option value={1}>
                        Active
                    </option>
                    <option value={0}>
                    Inactive
                    </option>
            </select>);
        } else {
            return <span>{(item.isActive===1)?'Active':'Inactive'}</span>;
        }

    }
    getIsColorChangable(className) {
        return !(className.includes('fa-'));
    }
    renderIconCell(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                <div className="item"><IconPicker  icon={item.iconClass}
                    onChange={icon => this.props.dispatch(setIconForTag(item.id, icon))}/>
                </div>
                <div className="item item-colorpicker">
                    <ColorPicker color={item.color} disabled={this.getIsColorChangable(item.iconClass)}
                        onChange={color => this.props.dispatch(setColorForTag(item.id, color))}>
                    </ColorPicker>
                </div>
            </div>;
        } else {
            return  <i className={`tag-icon fa ${item.iconClass}`}
                            style={ { color :item.color } } ></i>;
        }
    }
    renderButtonCell(item) {
        if (item.isEdited) {
            return <div className="horizontal-block">
                <button className="btn btn-sm item btn-success" disabled= {this.getSavableStatus(item)}
                    onClick={() => this.props.dispatch(saveTag(item))}><i className="fa fa-save"></i>Save</button>
                <button className="btn btn-sm item btn-danger"
                    onClick={() => this.props.dispatch(cancelTagEdit(item.id))}>
                    <i className="fa fa-times"></i>Cancel
                </button>
            </div>;
        } else {
            return <button className="btn btn-sm item"
                onClick={() => this.props.dispatch(startTagEdit(item.id))}>
                <i className="fa fa-edit"></i>Edit
            </button>;
        }
    }
    renderTitleCell(item) {
        if (item.isEdited) {
            return <input value={item.title}
                className="col-xs-12"
                onChange={event => this.onTagTitleChange(item.id, event.target.value) }/>;
        } else {
            return <span>{item.title}</span>;
        }
    }
    renderDescriptionCell(item) {
        if (item.isEdited) {
            return <input value={item.description}
                className="col-xs-12"
                onChange={event => this.onTagDescriptionChange(item.id, event.target.value) }/>;
        } else {
            return <span>{item.description}</span>;
        }
    }
    populateTagsRow(item, index) {
        return (
                 <tr className="row" key={index}>
                    <td className="col-sm-2 td-center">
                        {this.renderIconCell(item)}
                    </td>
                    <td className="col-sm-2">
                        {this.renderTitleCell(item)}
                    </td>
                    <td className="col-sm-4">
                        {this.renderDescriptionCell(item)}
                    </td>
                     <td className="col-sm-1 td-center">
                        {this.renderActiveStatusCell(item)}
                     </td>
                    <td className="col-sm-3 td-center">
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

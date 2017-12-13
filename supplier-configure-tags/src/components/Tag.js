import React, { PropTypes, Component } from 'react';

import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';

class Tag extends Component {
    constructor(props) {
        super(props);
        let { isEdited, isActive, title, description, iconClass, color } = this.props.item;
        this.state = {
            isEdited,
            isActive,
            title,
            description,
            iconClass,
            color
        };
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentWillReceiveProps(props) {
        let { isActive, title, description, iconClass, color } = props.item;
        this.state = {
            isActive,
            title,
            description,
            iconClass,
            color
        };
    }
    onCancel() {
        let { isActive, title, description, iconClass, color } = this.props.item;
        this.setState({
            isEdited: false,
            isActive,
            title,
            description,
            iconClass,
            color
        });
        if (this.props.onCancel) {

            this.props.onCancel(this.props.item.id);
        }
    }
    getSavableStatus() {
        return !(this.state.title.length);
    }
    getIsColorChangable(className) {
        return !(className.includes('fa-'));
    }
    onSave() {
        let { isActive, title, description, iconClass, color } = this.state;
        let { id } = this.props.item;
        this.setState({ isEdited:false });
        this.props.onSave({ id, isActive, title, description, iconClass, color });
    }
    renderActiveStatusCell() {

        if (this.state.isEdited) {
            return (<select value={this.state.isActive}
                    onChange={event => this.setState({ isActive: event.target.value })}>
                    <option value={1}>
                        Active
                    </option>
                    <option value={0}>
                    Inactive
                    </option>
            </select>);
        } else {
            return <span>{(this.state.isActive===1)?'Active':'Inactive'}</span>;
        }

    }

    renderIconCell() {
        if (this.state.isEdited) {
            return <div className="horizontal-block">
                <div className="item">
                    <IconPicker
                    icon={this.state.iconClass}
                    onChange={icon => this.setState({ iconClass:icon })}/>
                </div>
                <div className="item item-colorpicker">
                    <ColorPicker color={this.state.color}
                        disabled={this.getIsColorChangable(this.state.iconClass)}
                        onChange={color => this.setState({ color })}>
                    </ColorPicker>
                    </div>
            </div>;
        } else {
            return  <i className={`tag-icon fa ${this.state.iconClass}`}
                        style={ { color :this.state.color } } >
                    </i>;
        }
    }
    renderButtonCell() {
        if (this.state.isEdited) {
            return <div className="horizontal-block">
                <button className="btn btn-sm item btn-success"
                    disabled= {this.getSavableStatus()}
                    onClick={this.onSave}><i className="fa fa-save"></i>Save</button>
                <button className="btn btn-sm item btn-danger"
                    onClick={this.onCancel}>
                    <i className="fa fa-times"></i>Cancel
                </button>
            </div>;
        } else {
            return <button className="btn btn-sm item"
                onClick={() => this.setState({ isEdited:true })}>
                <i className="fa fa-edit"></i>Edit
            </button>;
        }
    }
    renderTitleCell() {
        if (this.state.isEdited) {
            return <input defaultValue={this.state.title}
                className="col-xs-12"
                onChange={event => this.setState({ title:event.target.value }) }/>;
        } else {
            return <span>{this.state.title}</span>;
        }
    }
    renderDescriptionCell() {
        if (this.state.isEdited) {
            return <input defaultValue={this.state.description}
                className="col-xs-12"
                onChange={event => this.setState({ description:event.target.value })}/>;
        } else {
            return <span>{this.state.description}</span>;
        }
    }

    render() {
    
        return (
        <tr className="row">
           <td className="col-sm-2 td-center">
               {this.renderIconCell()}
           </td>
           <td className="col-sm-2">
               {this.renderTitleCell()}
           </td>
           <td className="col-sm-4">
               {this.renderDescriptionCell()}
           </td>
            <td className="col-sm-1 td-center">
               {this.renderActiveStatusCell()}
            </td>
           <td className="col-sm-3 td-center">
               {this.renderButtonCell()}
           </td>
       </tr>);
    }
}
Tag.propTypes = {
    item:PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};
export default Tag;

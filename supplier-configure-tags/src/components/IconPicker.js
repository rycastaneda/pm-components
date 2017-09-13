'uses strict';

import React, { PropTypes, Component } from 'react';
import { ICONS } from '../constants/Icons';
class IconPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIconClass:props.icon,
            displayIconPicker:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        this.setState({ displayIconPicker: !this.state.displayIconPicker });
    }

    handleClose() {
        this.setState({ displayIconPicker: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedIconClass);
        }
    }

    handleChange(className) {
        this.setState({ selectedIconClass: className });
    }

    render() {

        return (
                <div className="icon-picker">
                    <button type="button" className="btn btn-xs" onClick={ this.handleClick }><i className={`fa ${this.state.selectedIconClass}`}></i><span className="caret"></span></button>
                    { this.state.displayIconPicker ? <div className="popover show mar-top-lg" >
                        <div className="cover"  onClick={ this.handleClose }/>
                        <div className="icon-group">{ICONS.map(function(item) {
                            return <a  className={`icon-item${this.state.selectedIconClass===item?' selected': ''}`} key={item} value={item} onClick={() => this.handleChange(item)} href="javascript:void(0);"><span className={`fa ${item}`}></span></a>;
                        }, this)}</div>
                    </div> : null }
                </div>
          );
    }
}

IconPicker.propTypes = {
    icon : PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default IconPicker;

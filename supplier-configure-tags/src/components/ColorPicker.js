'use strict';

import React, { PropTypes, Component } from 'react';
import { ChromePicker  } from 'react-color';

class ColorPicker extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            displayColorPicker: false,
            color: props.color
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    handleClose() {
        this.setState({ displayColorPicker: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.color);
        }
    }

    handleChange(color) {
        this.setState({ color: color.hex });
    }

    render() {
        const color = { backgroundColor: this.state.color };

        return (
              <div className="color-picker">
                <button className="btn btn-md" style={color} onClick={ this.handleClick }><i></i></button>
                { this.state.displayColorPicker ? <div className="popover show mar-top-lg">
                  <div className={'cover' } onClick={ this.handleClose }/>
                  <ChromePicker  disableAlpha={true} color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }
              </div>
          );
    }
}
ColorPicker.propTypes = {
    color : PropTypes.string.isRequired,
    onChange: PropTypes.func
};
export default ColorPicker;

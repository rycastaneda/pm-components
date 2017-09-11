'use strict';

import React from 'react';
import { ChromePicker  } from 'react-color';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1'
            }
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
    }

    handleChange(color) {
        this.setState({ color: color.rgb });
    }

    render() {
        const color ={
            background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
        };

        return (
              <div className="color-picker">
                <div className={'swatch'} onClick={ this.handleClick }>
                  <div className={'color' } style={color}/>
                </div>
                { this.state.displayColorPicker ? <div className={'popover' }>
                  <div className={'cover' } onClick={ this.handleClose }/>
                  <ChromePicker  disableAlpha={true} color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

              </div>
          );
    }
}

export default ColorPicker;

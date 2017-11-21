'use strict';

import React, { PropTypes, Component } from 'react';
import { ChromePicker  } from 'react-color';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        let disabled =false;
        if (props.disabled!==undefined) {
            disabled = props.disabled;
        }
        let displayColorPicker = false;
        let { color } =props;
        this.state = {
            displayColorPicker,
            color,
            disabled
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let disabled =false;
        if (nextProps.disabled!==undefined) {
            disabled = nextProps.disabled;
        }
        let { color } = nextProps;
        this.setState({
            color,
            disabled
        });
    }
    handleClick() {
        let displayColorPicker = !this.state.displayColorPicker;
        this.setState({ displayColorPicker });
    }

    handleClose() {
        let displayColorPicker = false;
        this.setState({ displayColorPicker });
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
                <button className="btn btn-md"
                    disabled={this.state.disabled}
                    style={color}
                    onClick={ this.handleClick }>
                    <i></i>
                </button>
                { this.state.displayColorPicker ? <div className="popover show mar-top-lg">
                  <div className={'cover' } onClick={ this.handleClose }/>
                  <ChromePicker  disableAlpha={true} color={ this.state.color }
                    onChange={ this.handleChange } />
                </div>
                : null }
              </div>
          );
    }
}
ColorPicker.propTypes = {
    color : PropTypes.string.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};
export default ColorPicker;

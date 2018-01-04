import React, { PropTypes, Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

class PlantMinerDatetime extends Component {
    constructor(props) {
        super(props);
        if (this.props.selectedDate === null) {
            this.state = { selectedDate: '' };
        } else {
            this.state = { selectedDate: this.props.selectedDate };
        }
    }
    onSelectedDateChange(date) {
        if (!moment(date).isValid()) {
            return false;
        }
        this.setState({ selectedDate: date });
        this.props.onSelectedDateChange(date);
    }
    render() {
        return (
            <Datetime
                className="po-date"
                timeFormat={false}
                closeOnSelect={true}
                onChange={this.props.onSelectedDateChange}
                value={this.state.selectedDate}
                dateFormat={this.props.dateFormat}
                inputProps={{ placeholder: this.props.placeholder }}
            />
        );
    }
}

PlantMinerDatetime.propTypes = {
    onSelectedDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.object,
    dateFormat:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired
};

export default PlantMinerDatetime;

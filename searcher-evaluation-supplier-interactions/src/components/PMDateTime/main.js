import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

class PMDateTime extends Component {
    render() {
        const { dateTime, onDateChange } = this.props;
        const dateFormatted = moment(dateTime).format('MM/DD/YYYY');
        return (
            <div>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-calendar" />
                    </span>
                    <Datetime
                        className="po-date  "
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={onDateChange}
                        value={dateFormatted}
                    />
                </div>
            </div>
        );
    }
}

PMDateTime.propTypes = {
    onDateChange: PropTypes.func,
    dateTime: PropTypes.string.isRequired,
};

export default PMDateTime;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Datetime from 'react-datetime';

class PMDateRange extends Component {
    render() {
        const {
            startDate,
            endDate,
            actions,
        } = this.props;
        return (
            <div>
                <div className="form-group">
                    <label>Start Date</label>
                    <Datetime
                        className="po-date"
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={actions.updateFilterStartDateChange}
                        value={startDate}
                        inputProps={{ placeholder: 'DD-MM-YYYY' }}
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <Datetime
                        className="po-date"
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={actions.updateFilterEndDateChange}
                        value={endDate}
                        inputProps={{
                            placeholder: 'DD-MM-YYYY',
                        }}
                    />
                </div>
            </div>
        );
    }
}

PMDateRange.propTypes = {
    startDate: PropTypes.oneOfType([
        momentPropTypes.momentObj,
        PropTypes.string,
    ]),
    endDate: PropTypes.oneOfType([
        momentPropTypes.momentObj,
        PropTypes.string,
    ]),
    actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { dateTimeStart, dateTimeEnd } = state.pmDateTime;
    const startDate =  dateTimeStart === null ? null : moment(dateTimeStart).format('DD-MM-YYYY');
    const endDate =  dateTimeEnd === null ? null : moment(dateTimeEnd).format('DD-MM-YYYY');

    return {
        ...ownProps,
        startDate,
        endDate,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PMDateRange);

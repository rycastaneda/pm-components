import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Datetime from 'react-datetime';

class PMDateRange extends Component {
    render() {
        const {
            dateTimeStart,
            dateTimeEnd,
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
                        value={dateTimeStart}
                        inputProps={{ placeholder: 'YYYY-MM-DD' }}
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <Datetime
                        className="po-date"
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={actions.updateFilterEndDateChange}
                        value={dateTimeEnd}
                        inputProps={{
                            placeholder: 'YYYY-MM-DD',
                        }}
                    />
                </div>
            </div>
        );
    }
}

PMDateRange.propTypes = {
    dateTimeStart: PropTypes.oneOfType([
        momentPropTypes.momentObj,
        PropTypes.string,
    ]),
    dateTimeEnd: PropTypes.oneOfType([
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
    return {
        ...ownProps,
        dateTimeStart,
        dateTimeEnd,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PMDateRange);

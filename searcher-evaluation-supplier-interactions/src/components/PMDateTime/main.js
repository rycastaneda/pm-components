import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import Datetime from 'react-datetime';
import moment from 'moment';

class PMDateTime extends Component {

    render() {
        const {dateTime, actions} = this.props;
        const dateFormatted = moment(dateTime).format("MM/DD/YYYY");
        return (
            <div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                  <Datetime className="po-date  "
                      timeFormat={false}
                      closeOnSelect={true}
                      onChange={actions.updateFilterDateChange}
                      value={dateFormatted}/>
                  </div>
            </div>
        );
    }
}

PMDateTime.propTypes = {
    actions: PropTypes.object,
    dateTime: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {

    const {dateTime} = state.pmDateTime;

    return {
        ...ownProps,
        dateTime,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PMDateTime);

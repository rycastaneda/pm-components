import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../../../actions/apiActions';

const Criteria = ({ criteria }) => (
    <li className="list-group-item">
        {criteria.title}
        <span className="label label-primary pull-right">{criteria.type}</span>
    </li>
);

Criteria.propTypes = {
    criteria: PropTypes.object.isRequired,
    apiActions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';

const ViewInteractionButton = ({ type, id }) => (
    <div>
        <button
            type="button"
            onClick={() => {
                actions.onClickViewInteraction(type, id);
            }}
            className="btn"
        >
            View
        </button>
    </div>
);

ViewInteractionButton.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(ViewInteractionButton);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

const FilterToggleButton = ({ toggleFilterShow, actions }) => (
    <div>
        <button className="btn pmfilters-toggle" onClick={actions.toggleFilter}>
            <i className="fa fa-sort-amount-desc" />
            <span>{toggleFilterShow ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
    </div>
);

FilterToggleButton.propTypes = {
    toggleFilterShow: PropTypes.bool.isRequired,
    actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const { toggleFilterShow } = state.interactionsFilter;
    return {
        ...ownProps,
        toggleFilterShow,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterToggleButton);

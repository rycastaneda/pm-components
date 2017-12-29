import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore, getLoadingForEndpoint } from '../../utils/reduxApiUtils';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import PmButton from '../../common/components/PmButton/main';
import BouncyBox from './HintBox';

class PmBoilerplateComponent extends Component {
    render() {
        const { actions, toggleHintBox } = this.props;
        return (
            <div>
                <BouncyBox showDogeBox={toggleHintBox} />
                <PmButton toggle={toggleHintBox} onclick={actions.boilerplateClickAction}><span>Such Click!</span></PmButton>
            </div>
        );
    }
}

PmBoilerplateComponent.propTypes = {
    apiActions: PropTypes.object,
    actions: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    toggleHintBox: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    /**
     * For Demo Purposes - The way how to retrieve data from Store;
    **/
    const listOfType = selectFromStore(state.pmBoilerplate, '/endpoint', 'type');
    const loading = getLoadingForEndpoint(state.pmBoilerplate, '/endpoint');

    const { toggleHintBox } = state.pmBoilerplate;

    return {
        ...ownProps,
        listOfType,
        loading,
        toggleHintBox,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    PmBoilerplateComponent
);

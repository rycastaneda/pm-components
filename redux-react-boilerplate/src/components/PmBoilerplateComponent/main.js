import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore, getLoadingForEndpoint } from '../../utils/reduxApiUtils';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import PmButton from '../../common/components/PmButton/main';
import BouncyBox from './components/BouncyBox';
import Authors from './components/Authors';

class PmBoilerplateComponent extends Component {
    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.fetchDataFromEndpointAuthors();
    }

    render() {
        const { actions, toggleHintBox, listOfType } = this.props;
        return (
            <div>
                <Authors authors={listOfType} />
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
    listOfType: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        actions: bindActionCreators(actions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    /**
     * For Demo Purposes - The way how to retrieve data from the Store like no worries;
    **/
    const listOfType = selectFromStore(state.pmBoilerplate, 'http://localhost:8080/v1/authors', 'authors');
    const loading = getLoadingForEndpoint(state.pmBoilerplate, 'http://localhost:8080/v1/authors');
    const { toggleHintBox } = state.pmBoilerplate;
    console.log('from store with love', listOfType);

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

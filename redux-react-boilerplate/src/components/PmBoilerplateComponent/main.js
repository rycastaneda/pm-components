import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    selectFromStore,
    getLoadingForEndpoint,
} from '../../utils/reduxApiUtils';
import * as apiActions from '../../actions/apiActions';
import * as actions from './actions';
import PmButton from '../../common/components/PmButton/main';
import BouncyBox from '../../common/components/BouncyBox/BouncyBox';
import Templates from './components/Templates';
import { MainWrapper, DogeButtonContainer } from './styling/styledComponents';

class PmBoilerplateComponent extends Component {
    componentDidMount() {
        const { apiActions } = this.props;
        apiActions.fetchDataFromPitEndpointTemplates();
    }

    render() {
        const { actions, toggleHintBox, listOfType } = this.props;
        return (
            <MainWrapper>
                <DogeButtonContainer>
                    <PmButton toggle={toggleHintBox} onclick={actions.boilerplateClickAction}>
                        <span>Such Click!</span>
                    </PmButton>
                </DogeButtonContainer>
                <Templates templates={listOfType} />
                <BouncyBox showDogeBox={toggleHintBox} />
            </MainWrapper>
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
     * For Demo Purposes - The way how to retrieve data from the Store
     * using redux-object more info:  https://github.com/yury-dymov/redux-object;
     **/
    const listOfType = selectFromStore(
        state.pmBoilerplate,
        '/evaluation-templates',
        'evaluationTemplates'
    );
    const loading = getLoadingForEndpoint(
        state.pmBoilerplate,
        '/evaluation-templates'
    );
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

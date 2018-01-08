import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../../../actions/apiActions';

const Author = ({ authorItem, apiActions }) => (
    <div className="well well-lg list-group-item">
        { authorItem.name }
        <span role="button" onClick={apiActions.fetchDataFromEndpointBooks} className="badge">Show Books</span>
    </div>
);

Author.propTypes = {
    authorItem: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(
    Author
);


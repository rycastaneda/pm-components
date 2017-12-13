import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const EngagementsDropdown = ({ evaluationEngagements, isLoading, actions }) => (
    <div>
        <select name="evaluationLink"
                className="form-control"
                onChange={
                    event => actions.updateChangeEngagements(event.target.value)
                }>
            <option key="-" value={null}>{!isLoading ? 'Select Engagement' : 'Loading...'}</option>
            { evaluationEngagements.map(
                (item, index) =>
                    <option key={index} value={item.id}>{item.engagementText}</option>
            )}
        </select>
    </div>
);

EngagementsDropdown.propTypes = {
    actions: PropTypes.object,
    isLoading: PropTypes.bool,
    evaluationEngagements: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(EngagementsDropdown);

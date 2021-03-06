import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore } from '../../utils/selectFromStore';
import * as actions from '../../actions/evaluationAssignmentsAction';

const EngagementsDropdown = ({ evaluationEngagements, isLoading, actions }) => (
    <div>
        { !isLoading ?
            <div>
                <select name="evaluationLink"
                        className="form-control"
                        onChange={
                            event => actions.updateChangeEngagements(event.target.value)
                        }>
                    <option key="-" value={null}>Select Engagement</option>
                    { evaluationEngagements.map(
                        (item, index) =>
                            <option key={index} value={item.id}>#{item.id} &ndash; {item.supplier.title}</option>
                    )}
                </select>
            </div>
            :
            <div className="input-group">
                <select className="form-control" disabled><option>Loading Engagements ...</option></select>
                <span className="spinner-animation form-control-feedback"></span>
            </div>
        }
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

const mapStateToProps = (state, ownProps) => {
    const isLoading = state.evaluationAssignment.meta['/engagements'].loading;
    const evaluationEngagements = selectFromStore(state.evaluationAssignment, '/engagements', 'engagements');

    return {
        ...ownProps,
        isLoading,
        evaluationEngagements,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EngagementsDropdown);

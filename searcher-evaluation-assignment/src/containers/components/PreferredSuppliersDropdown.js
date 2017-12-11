import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/evaluationAssignmentsAction';

const PreferredSuppliersDropdown = ({ evaluationSuppliers, isLoading, actions }) => (
    <div>
        <select name="evaluationLink"
                className="form-control"
                onChange={
                    event => actions.updateChangeSuppliers(event.target.value)
                }>
            <option key="-" value={null}>{!isLoading ? 'Select..' : 'Loading...'}</option>
            { evaluationSuppliers.map(
                (item, index) =>
                    <option key={index} value={item.id}>{item.supplier.title}</option>
            )}
        </select>
    </div>
);

PreferredSuppliersDropdown.propTypes = {
    actions: PropTypes.object,
    isLoading: PropTypes.bool,
    evaluationSuppliers: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(PreferredSuppliersDropdown);

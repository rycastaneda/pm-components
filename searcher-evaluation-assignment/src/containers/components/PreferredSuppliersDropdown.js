import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFromStore } from '../../utils/selectFromStore';
import * as actions from '../../actions/evaluationAssignmentsAction';

const PreferredSuppliersDropdown = ({ evaluationSuppliers, isLoading, actions }) => (
    <div>

        { !isLoading ?
            <div>
                <select name="evaluationLink"
                        className="form-control"
                        onChange={
                            event => actions.updateChangeSuppliers(event.target.value)
                        }>
                    <option key="-" value={null}>Select Supplier</option>
                    { evaluationSuppliers.map(
                        (item, index) =>
                            <option key={index} value={item.id}>{item.supplier.title}</option>
                    )}
                </select>
            </div>
            :
            <div className="input-group">
                <select className="form-control" disabled><option>Loading Suppliers ...</option></select>
                <span className="spinner-animation form-control-feedback"></span>
            </div>
        }
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

const mapStateToProps = (state, ownProps) => {
    const  isLoading = state.evaluationAssignment.meta['/preferred-suppliers'].loading;
    const evaluationSuppliers = selectFromStore(state.evaluationAssignment, '/preferred-suppliers', 'preferredSuppliers');

    return {
        ...ownProps,
        isLoading,
        evaluationSuppliers,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferredSuppliersDropdown);

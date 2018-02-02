import React, { PropTypes } from 'react';

const SupplierRow = ({
    id,
    supplier,
    count,
    panel,
    dateApplied,
    status,
    isOpen,
    toggleSupplierRow,
    goToSupplierDetails
}) => (
    <tr>
        <td
            className="td-center pointer toggler"
            onClick={() => toggleSupplierRow(id)}>
            {isOpen ? (
                <i className="fa fa-chevron-up" />
            ) : (
                <i className="fa fa-chevron-down" />
            )}
        </td>
        <td onClick={goToSupplierDetails} className="pointer">
            <div>
                <p className="pull-left supplier-title">{supplier}</p>
                <div className="pull-right">
                    <span className="badge mar-r-sm">{count}</span>
                </div>
            </div>
        </td>
        <td>{panel}</td>
        <td>{dateApplied}</td>
        <td>{status}</td>
    </tr>
);

SupplierRow.propTypes = {
    id: PropTypes.number,
    supplier: PropTypes.string,
    count: PropTypes.number,
    panel: PropTypes.string,
    dateApplied: PropTypes.string,
    status: PropTypes.string,
    isOpen: PropTypes.bool,
    toggleSupplierRow: PropTypes.func,
    goToSupplierDetails: PropTypes.func
};

export default SupplierRow;

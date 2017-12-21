import React, { PropTypes } from 'react';

const Row = ({ id, supplier, count, isOpen, toggleSupplierRow }) => (
    <tr onClick={() => toggleSupplierRow(id)}>
        <td colSpan="7">
            <div>
                <p className="pull-left supplier-title">{supplier}</p>
                <div className="pull-right">
                    <span className="badge mar-r-sm">{count}</span>
                    {isOpen ? (
                        <i className="fa fa-chevron-up" />
                    ) : (
                        <i className="fa fa-chevron-down" />
                    )}
                </div>
            </div>
        </td>
    </tr>
);

Row.propTypes = {
    id: PropTypes.number,
    supplier: PropTypes.string,
    count: PropTypes.number,
    isOpen: PropTypes.bool,
    toggleSupplierRow: PropTypes.func
};

export default Row;

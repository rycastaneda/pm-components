import React, { PropTypes } from 'react';
const SupplierRow = ({
    id,
    supplier,
    count,
    panels,
    dateApplied,
    status,
    statusClass,
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
        <td width="30%">
            {panels.map((panel, idx) => (
                <span
                    key={idx}
                    data-content={panel.title}
                    className={`label label-lg label-plantminer bs-tooltip ${panels.length >
                    3
                        ? 'mar-top-sm mar-l-sm'
                        : 'mar-l-sm'}`}>
                    {panel.short_name}
                </span>
            ))}
        </td>
        <td className="td-center">{dateApplied}</td>
        <td className="td-center">
            <span className={`bs-label bs-label-${statusClass}`}>{status}</span>
        </td>
    </tr>
);

SupplierRow.propTypes = {
    id: PropTypes.number,
    supplier: PropTypes.string,
    count: PropTypes.number,
    panels: PropTypes.array,
    dateApplied: PropTypes.string,
    status: PropTypes.string,
    statusClass: PropTypes.string,
    isOpen: PropTypes.bool,
    toggleSupplierRow: PropTypes.func,
    goToSupplierDetails: PropTypes.func
};

export default SupplierRow;

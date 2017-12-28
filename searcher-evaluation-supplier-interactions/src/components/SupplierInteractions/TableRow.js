import React from 'react';
import PropTypes from 'prop-types';
import StatusLabel from '../StatusLabel';
import moment from 'moment';
const TableRow = ({ rowItem }) => (
    <tr>
        <td className="td-center nowrap">{moment(rowItem.date.date).format('DD/MM/YYYY')}</td>
        <td className="td-center nowrap">
            <span data-tooltip="RFQ title/evaluation name">
                {rowItem.title ? rowItem.title : 'n/a'}
            </span>
        </td>
        <td className="td-center nowrap">{`${rowItem.staffFirstName} ${rowItem.staffLastName}`}</td>
        <td className="td-center nowrap">{rowItem.linkedToLabel}</td>
        <td className="td-center nowrap">{rowItem.type}</td>
        <td className="td-center nowrap">
            <StatusLabel status={`${rowItem.status}`} />
        </td>
        <td data-heading="More" className="td-center last">
            <button type="button" className="btn">
                View
            </button>
        </td>
    </tr>
);

TableRow.propTypes = {
    rowItem: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default TableRow;

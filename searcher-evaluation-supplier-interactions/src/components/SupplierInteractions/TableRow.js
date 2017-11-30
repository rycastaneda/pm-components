import React from 'react';
import PropTypes from 'prop-types';
import StatusLabel from '../StatusLabel';

const TableRow = ({rowItem}) => (
    <tr>
        <td className="td-center nowrap">{rowItem.date}</td>
        <td className="td-center nowrap">{rowItem.interaction}</td>
        <td className="td-center nowrap">{rowItem.initiatedBy}</td>
        <td className="td-center nowrap">{rowItem.relatedTo}</td>
        <td className="td-center nowrap">
            <StatusLabel status="active"/>
        </td>
        <td data-heading="More" className="td-center last">
            <button type="button" className="btn">View</button>
        </td>
    </tr>
);

TableRow.propTypes = {
    rowItem: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default TableRow;

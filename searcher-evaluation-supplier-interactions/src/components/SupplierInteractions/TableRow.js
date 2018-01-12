import React from 'react';
import PropTypes from 'prop-types';
import StatusLabel from '../StatusLabel';
import moment from 'moment';
import ViewInteractionButton from './ViewInteractionButton';

const TableRow = ({ rowItem }) => (
    <tr>
        <td className="td-center nowrap">{moment(rowItem.date.date).format('DD/MM/YYYY')}</td>
        <td className="td-center nowrap">
            <span data-tooltip="RFQ title/evaluation name">
                {rowItem.title ? rowItem.title : 'n/a'}
            </span>
        </td>
        <td className="td-center nowrap">{`${rowItem.staffFirstName} ${rowItem.staffLastName}`}</td>
        <td className="td-center nowrap">{rowItem.linkedToLabel ? rowItem.linkedToLabel : 'No relation'}</td>
        <td className="td-center nowrap">{rowItem.type}</td>
        <td className="td-center nowrap">
            <StatusLabel status={`${rowItem.status}`} />
        </td>
        <td data-heading="More" className="td-center last">
            <ViewInteractionButton type={rowItem.type} id={rowItem.id} />
        </td>
    </tr>
);

TableRow.propTypes = {
    rowItem: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default TableRow;

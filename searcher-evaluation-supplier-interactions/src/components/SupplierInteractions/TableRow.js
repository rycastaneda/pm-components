import React from 'react';
import PropTypes from 'prop-types';
import StatusLabel from '../StatusLabel';
import moment from 'moment';
import InteractionIdLink from './InteractionIdLink';

const renderRelatedTo = (rowItem) => {
    if (rowItem.type !== 'Evaluation' && rowItem.type !== 'Engagement') {
        return null;
    }
    return (
        <span className="td-center nowrap">
            {rowItem.linkedToLabel}
        </span>
    );
};

const TableRow = ({ rowItem }) => (
    <tr>
        <td className="td-center nowrap">{moment(rowItem.date.date).format('DD/MM/YYYY')}</td>
        <td className="td-center nowrap">{rowItem.type}</td>
        <td className="td-center nowrap">
            <InteractionIdLink rowItem={rowItem} />
        </td>
        <td className="td-center nowrap">{`${rowItem.staffFirstName} ${rowItem.staffLastName}`}</td>
        <td className="td-center nowrap">
            { renderRelatedTo(rowItem) }
        </td>
        <td className="td-center nowrap">
            <StatusLabel type={rowItem.type} status={rowItem.status} />
        </td>
    </tr>
);


TableRow.propTypes = {
    rowItem: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default TableRow;

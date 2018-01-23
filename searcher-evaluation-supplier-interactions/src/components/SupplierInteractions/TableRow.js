import React from 'react';
import PropTypes from 'prop-types';
import StatusLabel from '../StatusLabel';
import moment from 'moment';
import * as actions from './actions';
import { InteractionItemRow } from './styling/styledComponents';

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
    <InteractionItemRow onClick={() => {actions.onClickViewInteraction(rowItem);}}>
        <td className="td-center nowrap">{moment(rowItem.date.date).format('DD/MM/YYYY')}</td>
        <td className="td-center nowrap">{rowItem.type}</td>
        <td className="td-center nowrap">{rowItem.id}</td>
        <td className="td-center nowrap">{`${rowItem.staffFirstName} ${rowItem.staffLastName}`}</td>
        <td className="td-center nowrap">
            { renderRelatedTo(rowItem) }
        </td>
        <td className="td-center nowrap">
            <StatusLabel type={rowItem.type} status={rowItem.status} />
        </td>
    </InteractionItemRow>
);


TableRow.propTypes = {
    rowItem: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default TableRow;


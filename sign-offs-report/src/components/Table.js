import React, { PropTypes } from 'react';
import Header from './Header';
import Row from './Row';
import Loader from './Loader';

const Table = ({
    data,
    orderByField,
    orderByDirection,
    changeOrderBy,
    toggleCommentsModal,
    isLoading
}) => {
    const direction = field => {
        return field === orderByField ? orderByDirection : null;
    };

    const headers = [
        {
            text: 'Supplier',
            field: 'supplier'
        },
        {
            text: 'Panel',
            field: 'panel'
        },
        {
            text: 'Section',
            field: 'section'
        },
        {
            text: 'Assigned To',
            field: 'assignee'
        },
        {
            text: 'Status',
            field: 'status'
        },
        {
            text: 'Last Updated',
            field: 'lastUpdated'
        },
        {
            text: 'Comments',
            field: 'comments'
        }
    ];

    return (
        <table className="table db-table db-table-sort db-table-link db-table-sort-nojs">
            <thead>
                <tr>
                    {headers.map(header => (
                        <Header
                            key={header.field}
                            onClick={changeOrderBy}
                            direction={direction(header.field)}
                            {...header}
                        />
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.length ? (
                    data.map(row => (
                        <Row
                            key={row.id}
                            {...row}
                            toggleCommentsModal={toggleCommentsModal}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="td-center">
                            {isLoading ? (
                                <Loader icon=" fa-2x" />
                            ) : (
                                'No data available'
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    orderByField: PropTypes.string.isRequired,
    orderByDirection: PropTypes.string.isRequired,
    changeOrderBy: PropTypes.func.isRequired,
    toggleCommentsModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Table;

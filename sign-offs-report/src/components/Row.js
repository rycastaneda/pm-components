import React, { PropTypes } from 'react';
import format from 'date-fns/format';

const Row = ({
    id,
    panels,
    section,
    assignee,
    status,
    lastUpdated,
    comments,
    preferredSupplierId,
    toggleCommentsModal
}) => {
    const goToSupplierDetails = () => {
        return (window.location.href =
            '/searcher/preferred_suppliers/details/' + preferredSupplierId);
    };

    return (
        <tr>
            <td onClick={goToSupplierDetails} />
            <td onClick={goToSupplierDetails}>{panels}</td>
            <td onClick={goToSupplierDetails}>{section}</td>
            <td onClick={goToSupplierDetails}>{assignee}</td>
            <td onClick={goToSupplierDetails} className="td-center">
                {status}
            </td>
            <td onClick={goToSupplierDetails} className="td-center">
                {lastUpdated
                    ? format(lastUpdated, 'MMMM D, YYYY HH:mm a')
                    : 'N/A'}
            </td>
            <td className="td-center comments">
                {comments ? (
                    <i
                        className="fa fa-comments col-brand pointer"
                        id={id}
                        onClick={toggleCommentsModal}
                    />
                ) : (
                    'No Comments'
                )}
            </td>
        </tr>
    );
};

Row.propTypes = {
    id: PropTypes.string,
    panels: PropTypes.string,
    section: PropTypes.string,
    assignee: PropTypes.string,
    status: PropTypes.string,
    lastUpdated: PropTypes.string,
    comments: PropTypes.number,
    preferredSupplierId: PropTypes.number,
    toggleCommentsModal: PropTypes.func.isRequired
};

export default Row;

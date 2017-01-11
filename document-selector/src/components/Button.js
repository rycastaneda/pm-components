import React, { PropTypes } from 'react';

const DocumentGroups = ({ documents, onClick }) => (
    <table>
        <tbody>
        <tr>
            <td></td>
        </tr>
        </tbody>
    </table>
);

DocumentGroups.propTypes = {
    documents: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default DocumentGroups;
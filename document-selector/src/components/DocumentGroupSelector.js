import React, { PropTypes } from 'react';
import Groups from '../components/Groups';

const DocumentGroupSelector = ({ groups, items, toggleGroup, toggleDocument }) => {
    return (
        <table className="table">
            { groups.length ? 
                <Groups groups={groups} items={items} toggleGroup={toggleGroup} toggleDocument={toggleDocument}/> 
            :<tbody>
                <tr>
                    <td>No items found</td>
                </tr>
            </tbody>}
        </table>
    );
};

DocumentGroupSelector.propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    toggleGroup: PropTypes.func.isRequired,
    toggleDocument: PropTypes.func.isRequired
};

export default DocumentGroupSelector;
import React, { PropTypes } from 'react';
import Groups from './Groups';

const Grid = ({ groups, items, toggleItem }) => {
    return (
        <table className="table">
            { groups.length ? 
                <Groups groups={groups} items={items} toggleItem={toggleItem}/> 
            :<tbody>
                <tr>
                    <td>No items found</td>
                </tr>
            </tbody>}
        </table>
    );
};

Grid.propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    toggleItem: PropTypes.func.isRequired
};

export default Grid;
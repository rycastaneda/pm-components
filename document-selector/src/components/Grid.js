import React, { PropTypes } from 'react';
import Groups from './Groups';

const Grid = ({ groups, items, toggleItem }) => {
    return (
        <div className="grid">
            <table className="table">
                { groups.length ? 
                    <Groups groups={groups} items={items} toggleItem={toggleItem}/> 
                :<tbody>
                    <tr>
                        <td>No items found</td>
                    </tr>
                </tbody>}
            </table>
        </div>
    );
};

Grid.propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    toggleItem: PropTypes.func.isRequired
};

export default Grid;
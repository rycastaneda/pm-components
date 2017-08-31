import React, { PropTypes } from 'react';
import Group from '../components/Group';

const Groups = ({ groups, items, toggleItem, toggleGroup, toggleDocument }) => {

    const docGroups = groups.map((group, key) => {

        return <Group 
            key={key}
            index={key}
            items={items} 
            group={group} 
            documents={group.documents} 
            toggleItem={toggleItem}
            toggleGroup={toggleGroup} 
            toggleDocument={toggleDocument}/>;
    });

    return (
        <tbody>{docGroups}</tbody>
    );
};

Groups.propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.object,
    toggleItem: PropTypes.func,
    toggleGroup: PropTypes.func,
    toggleDocument: PropTypes.func
};

export default Groups;

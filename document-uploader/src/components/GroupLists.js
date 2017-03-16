import React, { PropTypes } from 'react';
import GroupList from './GroupList';

const GroupLists = ({ groups, downloadDocumentGroup }) => {
    const lists = groups.map((group, key) => {
        return (
            <GroupList 
                key={key}
                group={group}
                downloadDocumentGroup={downloadDocumentGroup}/>
        );
    });

    return (
        <ul className="list-group">
            {lists}
        </ul>
    );
};

GroupLists.propTypes = {
    groups: PropTypes.array,
    downloadDocumentGroup: PropTypes.func
};

export default GroupLists;
import React, { PropTypes } from 'react';

const Header = ({ text, field, direction, onClick, sortable }) => {
    let directionClass = '';

    if (sortable) {
        directionClass = `th-sort-${direction}`;
    }

    return (
        <th
            className={`td-center ${sortable
                ? 'pointer'
                : ''} ${directionClass}`}
            onClick={sortable ? onClick : () => {}}
            id={field}>
            {text}
        </th>
    );
};

Header.propTypes = {
    text: PropTypes.string,
    field: PropTypes.string,
    direction: PropTypes.string,
    sortable: PropTypes.bool,
    onClick: PropTypes.func
};

export default Header;

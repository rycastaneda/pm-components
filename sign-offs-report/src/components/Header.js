import React, { PropTypes } from 'react';

const Header = ({ text, field, direction, onClick }) => {
    let directionClass = '';
    if (direction && field !== 'comments') {
        directionClass = `th-sort-${direction}`;
    }

    return (
        <th
            className={`td-center ${directionClass}`}
            onClick={onClick}
            id={field}>
            {text}
        </th>
    );
};

Header.propTypes = {
    text: PropTypes.string,
    field: PropTypes.string,
    direction: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default Header;

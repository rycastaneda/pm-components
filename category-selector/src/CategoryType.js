import React, { PropTypes } from 'react';

const CategoryType = ({ id, title, selected, onClick }) => (
    <li id={id}
        onClick={onClick}
        selected={selected}
    >
        {title}
    </li>
);

CategoryType.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CategoryType;
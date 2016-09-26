import React, { PropTypes } from 'react';

const CategoryType = ({ id, title, selected = false, onClick }) => (
    <li
        className={`input-group-addon category-types__item ${selected ? 'category-types__item--selected' : ''}`}
        id={id}
        onClick={onClick}
    >
        {title}
    </li>
);

CategoryType.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default CategoryType;
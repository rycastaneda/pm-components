import React, { PropTypes } from 'react';

const CategoryType = ({ id, attributes, onClick, selected = false }) => (
    <li
        className={`input-group-addon category-types__item ${selected ? 'category-types__item--selected' : ''}`}
        id={id}
        onClick={onClick}
    >
        {attributes.title}
    </li>
);


CategoryType.propTypes = {
    id: PropTypes.number.isRequired,
    attributes: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CategoryType;
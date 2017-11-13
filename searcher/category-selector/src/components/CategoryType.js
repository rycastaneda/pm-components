import React, { PropTypes } from 'react';

const CategoryType = ({ id, attributes, onClick, selected = false, isFetching = false }) => (
    <li
        className={`category-types__item ${selected ? 'category-types__item--selected' : ''}`}
        id={id}
        onClick={onClick}
    >
        {attributes.title}
        {selected && isFetching ? <i className="category-types__spinner fa fa-spinner fa-spin"></i> : ''}
    </li>
);

CategoryType.propTypes = {
    id: PropTypes.number.isRequired,
    attributes: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
};

export default CategoryType;
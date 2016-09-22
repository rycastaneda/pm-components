import React, { PropTypes } from 'react';

const Category = ({ id, title, selected, onClick }) => (
    <option
        onClick={onClick}
        selected={selected}
        value={id}
    >
        {title}
    </option>
);

Category.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Category;
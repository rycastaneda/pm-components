import React, { PropTypes } from 'react';

const Category = ({ id, title, onClick }) => (
    <option
        onClick={onClick}
        value={id}
    >
        {title}
    </option>
);

Category.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Category;
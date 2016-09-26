import React, { PropTypes } from 'react';


const Category = ({ id, attributes, onClick }) => (
    <option
        onClick={onClick}
        value={id}
    >
        {attributes.title}
    </option>
);

Category.propTypes = {
    id: PropTypes.number.isRequired,
    attributes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Category;
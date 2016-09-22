import React, { PropTypes } from 'react';
import Category from './Category';

const CategoryList = ({ categories, onCategoryClick }) => (
    <select>
        {categories.map(category =>
            <Category
                key={category.id}
                {...category}
                onClick={() => onCategoryClick(category.id)}
            />
        )}
    </select>
);

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onCategoryClick: PropTypes.func.isRequired
};

export default CategoryList;
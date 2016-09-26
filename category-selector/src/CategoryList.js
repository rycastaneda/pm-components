import React, { PropTypes } from 'react';
import Category from './Category';

const CategoryList = ({ categories, onCategoryClick }) => (
    <div className="col-xs-12 mar-btm">
        <select className="form-control">
            {categories.map(category =>
                <Category
                    key={category.id}
                    {...category}
                    onClick={() => onCategoryClick(category.id)}
                />
            )}
        </select>
    </div>
);

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.object.isRequired
    }).isRequired).isRequired,
    onCategoryClick: PropTypes.func.isRequired
};

export default CategoryList;
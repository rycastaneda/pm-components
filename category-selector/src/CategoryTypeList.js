import React, { PropTypes } from 'react';
import CategoryType from './CategoryType';

const CategoryTypeList = ({ types, onTypeClick }) => (
    <div
        className="col-xs-12 mar-btm">
        <ul
            className="category-types btn-group btn-group-justified">
        {types.map(type =>
            <CategoryType
                key={type.id}
                {...type}
                onClick={() => onTypeClick(type.id)}
            />
        )}
        </ul>
    </div>
);

CategoryTypeList.propTypes = {
    types: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTypeClick: PropTypes.func.isRequired
};


export default CategoryTypeList;
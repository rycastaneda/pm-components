import React, { PropTypes } from 'react';
import CategoryType from './CategoryType';

const CategoryTypeList = ({ types, onTypeClick }) => (
    <div className="something">
        <ul>
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
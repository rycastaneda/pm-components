import React, { PropTypes } from 'react';
import CategoryType from './CategoryType';

const CategoryTypeList = ({ types, onTypeClick, selected, isFetching }) => (
    <div
        className="col-xs-12 mar-btm">
        <ul
            className="category-types btn-group btn-group-justified">
        {types.map(type =>
            <CategoryType
                key={type.id}
                {...type}
                onClick={() => onTypeClick(type)}
                selected={selected === type.attributes.title}
                isFetching={isFetching}
            />
        )}
        </ul>
    </div>
);

CategoryTypeList.propTypes = {
    types: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.object
    }).isRequired).isRequired,
    onTypeClick: PropTypes.func.isRequired,
    selected: PropTypes.string,
    isFetching: PropTypes.bool.isRequired
};

export default CategoryTypeList;
import React, { PropTypes } from 'react';

const InclusionSelection = ({ handleChange, category_id = null, include = false, options = [] }) => {
    const defaultValue = include ? 'all' : 'none';
    return (
        <select defaultValue={category_id || defaultValue}
                className={'form-control edit-form__category-select'}
                onChange={handleChange}>
            <option value="none">only this quote request</option>
            <option value="all">any quote requests</option>
            {
                options.length ?
                options.map((option) => {
                    return (
                        <option key={option.id}
                                value={option.selectedCategory.id}>{`any ${option.input}`}</option>
                    );
                }) : null
            }
        </select>
    );
};

InclusionSelection.propTypes = {
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    category_id: PropTypes.string,
    include: PropTypes.bool
};

export default InclusionSelection;

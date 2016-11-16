import React, { PropTypes } from 'react';

const InclusionSelection = ({ handleChange, options = [], isDisabled = false, selected }) => (
    <select defaultValue={selected || 'all'}
            disabled={ isDisabled }
            className={'form-control edit-form__category-select ' +
                `${isDisabled ? 'edit-form__category-select--inactive' : ''}` }
            onChange={handleChange}>
        <option value="all">for any quote request</option>
        {
            options.map((option) => {
                return (
                    <option key={option.id}
                            value={option.selectedCategory.id}>{`for any ${option.input}`}</option>
                );
            })
        }
    </select>
);

InclusionSelection.propTypes = {
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    isDisabled: PropTypes.bool,
    selected: PropTypes.string
};

export default InclusionSelection;
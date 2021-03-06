import React, { PropTypes } from 'react';

const InclusionSelection = ({ handleChange, quote_request_id = null, category_id = null, include = false, options = [] }) => {
    const defaultValue = (quote_request_id !== 'null') ? 'onlyQR' : include ? 'all' : 'onlyService';
    category_id = category_id !== 'null' ? category_id : null;

    return (
        <select defaultValue={category_id || defaultValue}
                className={'form-control edit-form__category-select'}
                onChange={handleChange}>
            <option value="all">any RFQ</option>
            <option value="onlyQR">only this RFQ</option>
            <option value="onlyService">only this service</option>
            {
                options.length ?
                options
                .filter(option => option.input)
                .map((option) => {
                    return (
                        <option key={option.selectedCategory.id}
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
    quote_request_id: PropTypes.string,
    category_id: PropTypes.string,
    include: PropTypes.bool
};

export default InclusionSelection;

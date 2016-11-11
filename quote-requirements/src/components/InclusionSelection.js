import React, { PropTypes } from 'react';

const InclusionSelection = ({ handleChange, isReadOnly = false, selected }) => (
    <select defaultValue={selected || 'all'}
            readOnly={ isReadOnly }
            className={'form-control edit-form__category-select' +
                `${isReadOnly ? 'edit-form__category-select--inactive' : ''}` }
            onChange={handleChange}>
        <option value="all">for all excavators</option>
        <option value="33">for 4-10 Tonne Excavators</option>
        <option value="6">for 6-30 Tonne Excavators</option>
    </select>
);

InclusionSelection.propTypes = {
    handleChange: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool,
    selected: PropTypes.string
};

export default InclusionSelection;
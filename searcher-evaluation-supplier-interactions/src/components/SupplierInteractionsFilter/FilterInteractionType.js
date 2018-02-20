import React from 'react';
import PropTypes from 'prop-types';

const FilterInteractionType = ({
    interactionTypes,
    interactionTypeSelected,
    interactionTypeOnChange,
}) => (
    <div className="form-group">
        <label>Interaction Type</label>
        <select
            className="form-control form-control-sm text-capitalize"
            onChange={event =>
                interactionTypeOnChange(
                    event.target.value
                )
            }
            value={interactionTypeSelected}
        >
            {interactionTypes.map(item => (
                <option id={item} key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
);

FilterInteractionType.propTypes = {
    interactionTypes: PropTypes.array,
    interactionTypeSelected: PropTypes.string,
    interactionTypeOnChange: PropTypes.func,
};

export default FilterInteractionType;

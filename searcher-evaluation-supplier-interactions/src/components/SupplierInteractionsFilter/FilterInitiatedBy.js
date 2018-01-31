import React from 'react';
import PropTypes from 'prop-types';

const FilterInitiatedBy = ({
    staffInitiators,
    initiatedBySelected,
    initiatedByOnChange,
}) => (
    <div className="form-group">
        <label>Initiated By</label>
        <select
            className="form-control form-control-sm text-capitalize"
            onChange={event => initiatedByOnChange(event.target.value)}
            value={initiatedBySelected}
        >
            {staffInitiators.map(item => (
                <option id={item} key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
);

FilterInitiatedBy.propTypes = {
    staffInitiators: PropTypes.array,
    initiatedBySelected: PropTypes.string,
    initiatedByOnChange: PropTypes.func,
};

export default FilterInitiatedBy;

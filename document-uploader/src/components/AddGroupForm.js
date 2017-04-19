import React, { PropTypes } from 'react';
import Select from 'react-select';

const AddGroupForm = ({
    addGroupInput,
    options,
    onAddGroup
}) => {
    return (
        <div>
            <Select.Creatable
                ref={(ref) => {
                    addGroupInput = ref;
                    addGroupInput && addGroupInput.select.focus();
                }}
                onBlurResetsInput={false}
                promptTextCreator={label => `Create group ${label}` }
                arrowRenderer={() => <span>+</span>}
                placeholder="Add new group"
                options={options.map((option) => {
                    return {
                        label: option,
                        value: option
                    };
                })}
                onChange={onAddGroup}
            />
        </div>
    );
};

AddGroupForm.propTypes = {
    onAddGroup: PropTypes.func.isRequired,
    options: PropTypes.array,
    addGroupInput: PropTypes.any
};

export default AddGroupForm;

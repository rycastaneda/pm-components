import React, { PropTypes } from 'react';
import Select from 'react-select';

const AddGroupForm = ({ onAddGroup, documentGroups }) => {
    const titles = [];

    let options = documentGroups.defaults.map((group) => {
        titles.push(group.attributes.title);
        return {
            value: group.id,
            isDefault: 1,
            label: group.attributes.title
        };
    });

    const handleSubmit = (group) => {
        if (!group.value.length) {
            return;
        }

        onAddGroup(group.label, !!group.isDefault);
    };

    return (
        <div>
            <Select.Creatable
                arrowRenderer={() => <span>+</span>}
                placeholder="Add new group"
                options={options}
                onChange={handleSubmit}
            />
        </div>
    );
};

AddGroupForm.propTypes = {
    onAddGroup: PropTypes.func.isRequired,
    documentGroups: PropTypes.object
};

export default AddGroupForm;
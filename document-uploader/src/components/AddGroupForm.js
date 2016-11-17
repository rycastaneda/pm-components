import React, { PropTypes } from 'react';
import Select from 'react-select';

const AddGroupForm = ({ onAddGroup, documentGroups }) => {
    const titles = [];
    const formatOptions = (group) => {
        titles.push(group.attributes.title);
        return {
            value: group.id,
            label: group.attributes.title
        };
    };
    let options = documentGroups.defaults.map(formatOptions);
    // options = options.concat(documentGroups.data.map(formatOptions));

    const handleSubmit = (group) => {

        if (!group.value.length) {
            return;
        }

        onAddGroup(group.label);
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
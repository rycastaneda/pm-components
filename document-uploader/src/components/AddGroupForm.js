import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { uniqBy } from 'lodash';

class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // Set default value to input
        this.defValue = {
            value: '', 
            default: 0, 
            label: ''
        };
    }

    handleSubmit(group) {
        const { onAddGroup, documentGroups } = this.props;

        if (!group.value.length) {
            return;
        }

        /* Check if selected document group is in defaults 
            and has null user_id
         */
        const inDefaults = documentGroups.defaults.filter((defaultGroup) => {
            return defaultGroup.attributes.user_id && defaultGroup.attributes.title === group.label;
        }).length;

        /* if group is from defaults,
            if input group has same value from the defaults 
            don't add the group right away as the input name should be unique  */
        if (inDefaults) {
            /* On adding a group, automatically set it as one of defaults */
            group.default = 1;
           
            if (this.defValue.label !== group.label) { 
                this.setState({
                    defValue: group
                });
            }
            return group;
        }

        onAddGroup(group.label, !!group.default);
    }

    render()  {
        /* Populate select input by filtering defaults with unique titles 
           as default can have same titles but with null user_ids
        */
        let options = uniqBy(this.props.documentGroups.defaults, group => group.attributes.title).map((group) => {
            return {
                value: group.id,
                default: 0,
                label: group.attributes.title
            };
        });

        return (
            <div>
                <Select.Creatable
                    ref={(ref) => {
                        this.input = ref;
                    }}
                    value={this.state && this.state.defValue}
                    onBlurResetsInput={false}
                    arrowRenderer={() => <span>+</span>}
                    placeholder="Add new group"
                    options={options}
                    onChange={this.handleSubmit}
                />
            </div>
        );
    }
}

AddGroupForm.propTypes = {
    onAddGroup: PropTypes.func.isRequired,
    documentGroups: PropTypes.object
};

export default AddGroupForm;

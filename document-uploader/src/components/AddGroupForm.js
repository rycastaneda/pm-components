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

        /* Check if selected document group is in defaults if it has been added 
            then change the selectbox input
        */
        let added = documentGroups.defaults.some((defaultGroup) => {
            return defaultGroup.attributes.title === group.label && defaultGroup.attributes.user_id;
        });

        if (added) {
            this.setState({
                defValue: group
            });
            return group;
        }

        let fromDefaults = documentGroups.defaults.find((defaultGroup) => {
            return defaultGroup.attributes.title === group.label;
        });

        /* On adding a group, automatically set it as one of defaults if it is from defaults meaning user_id is null*/
        group.default = fromDefaults;

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

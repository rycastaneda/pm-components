import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { uniqBy } from 'lodash';

class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const inDefaults = documentGroups.defaults.filter((defaultGroup) => {
            return defaultGroup.attributes.user_id && defaultGroup.attributes.title === group.label;
        }).length;

        if (inDefaults) {
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
        let  options = uniqBy(this.props.documentGroups.defaults, group => group.attributes.title).map((group) => {
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

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { addGroup, enableGroup } from '../actions/groups';

class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        // Set default value to input
        this.state = {
            value: '',
            label: ''
        };
    }

    handleAddGroup(newGroup) {
        if (this.props.values.includes(newGroup.label)) {
            this.setState({
                label: newGroup.label,
                value: newGroup.value
            });
            return this.props.dispatch(enableGroup(newGroup.value));
        }

        return this.props.dispatch(addGroup(newGroup.label));
    }

    render()  {
        const {
            readOnly,
            options
        } = this.props;

        return readOnly ? null : (
            <div className="row">
                <div className="col-md-4 col-xs-4 pull-right">
                    <Select.Creatable
                        value={this.state.value}
                        onBlurResetsInput={false}
                        promptTextCreator={label => `Create group ${label}` }
                        arrowRenderer={() => <span>+</span>}
                        placeholder={`Add new group`}
                        options={options}
                        onChange={this.handleAddGroup}
                        clearable={false}
                    />
                </div>
            </div>
        );
    }
}

AddGroupForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    readOnly: PropTypes.bool
};

function mapStateToProps(state) {
    const {
        documentGroups
    } = state;

    // get groups that are not default and are not enabled for uploading in a plain single value array
    const values = [];
    const options = documentGroups.allIds.reduce((newGroup, groupId) => {
        let group = documentGroups.byId[groupId];

        if (!group.default && !group.showGroup) {
            newGroup.push({
                label: group.title,
                value: group.id
            });
            values.push(group.title);
        }

        return newGroup;
    }, []);

    return { options, values };
}

export default connect(mapStateToProps)(AddGroupForm);  // adds dispatch prop

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { difference } from 'lodash';
import Select from 'react-select';
import UserList from '../components/UserList';
import { fetchStaff } from '../actions/staff';
import { assignStaff, removeStaff } from '../actions/staff';

class UserSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAssigning: false,
            assignedUsers: this.props.assignedUsers
        };

        this.onChange = this.onChange.bind(this);
        this.isAssigning = this.isAssigning.bind(this);
        this.valueRender = this.valueRender.bind(this);
    }

    isAssigning(isAssigning) {
        this.setState({
            isAssigning: isAssigning
        });
    }

    optionRender(option) {
        return (
            <span className="mar-l-sm">
                {`${option.name} - ${option.total_incomplete_signoff} `}
                <i className="fa fa-gears" />
            </span>
        );
    }

    onChange(options) {
        const { dispatch, assignedUsers, sectionId } = this.props;
        let changedStaff;

        // options got more than before: we assign them else remove
        if (assignedUsers.length > options.length) {
            changedStaff = difference(assignedUsers, options).pop();
            dispatch(
                removeStaff(sectionId, changedStaff.id, () =>
                    this.isAssigning(false)
                )
            );
        } else {
            changedStaff = difference(options, assignedUsers).pop();
            dispatch(
                assignStaff(sectionId, changedStaff.id, () =>
                    this.isAssigning(false)
                )
            );
        }
    }

    valueRender(option) {
        return <span className="mar-l-sm">{option.name}</span>;
    }

    render() {
        const {
            sectionId,
            assignedUsers,
            unassignedUsers,
            isLoading,
            dispatch
        } = this.props;
        return (
            <div>
                {!assignedUsers.length || this.state.isAssigning ? (
                    <div className="staff-selector">
                        <Select
                            backspaceToRemoveMessage=""
                            placeholder="Please select staff"
                            multi={true}
                            optionRenderer={this.optionRender}
                            valueRenderer={this.valueRender}
                            options={unassignedUsers}
                            value={assignedUsers}
                            labelKey={'name'}
                            valueKey={'id'}
                            onChange={this.onChange}
                            isLoading={isLoading}
                            onFocus={() => dispatch(fetchStaff(sectionId))}
                        />
                    </div>
                ) : (
                    <div>
                        <UserList
                            users={assignedUsers}
                            removeUser={staffId => {
                                dispatch(
                                    removeStaff(sectionId, staffId, () =>
                                        this.isAssigning(false)
                                    )
                                );
                            }}
                        />
                        {isLoading ? (
                            <i className="fa fa-spin fa-spinner" />
                        ) : (
                            <button
                                className="db-function"
                                onClick={() => this.isAssigning(true)}>
                                Add
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

UserSelector.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sectionId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    assignedUsers: PropTypes.array.isRequired,
    unassignedUsers: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    const { staff: rawStaffs } = state;
    let unassignedUsers = difference(
        rawStaffs.allIds,
        ownProps.assignedUsers.map(user => user.id)
    )
        .map(staffId => rawStaffs.byId[staffId])
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    return {
        unassignedUsers
    };
}

export default connect(mapStateToProps)(UserSelector); // adds dispatch prop

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { difference } from 'lodash';
import Select from 'react-select';
import UserList from '../components/UserList';

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
    ).map(staffId => rawStaffs.byId[staffId]);

    return {
        unassignedUsers
    };
}

export default connect(mapStateToProps)(UserSelector); // adds dispatch prop

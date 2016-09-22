import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readEndpoint } from 'redux-json-api';

const mapStateToProps = ({ api: { tasks = { data: [] } } }) => ({ tasks });
class getCategories extends Component {
    componentWillMount() {
        this.props.dispatch(readEndpoint('tasks?include=assignee'));
    }

    render() {
        return (
            <ul>
                {this.props.tasks.data.map(task => (
                    <li>{task.title}</li>
                ))}
            </ul>
        );
    }

}

export default connect(mapStateToProps)(getCategories);
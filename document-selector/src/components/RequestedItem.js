import React, { Component, PropTypes } from 'react';

export default class RequestedItem extends Component {
    render() {
        const {
            document,
            item,
            checked,
            toggleItem
        } = this.props;

        return (
            <td>
                <input type="checkbox" checked={checked} onChange={() => toggleItem(document, item, checked)}/>
            </td>
        );
    }
}

RequestedItem.propTypes = {
    document: PropTypes.object,
    checked: PropTypes.bool,
    item: PropTypes.object,
    toggleItem: PropTypes.func
};


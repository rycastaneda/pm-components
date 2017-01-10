import React, { Component, PropTypes } from 'react';

export default class RequestedItem extends Component {
    render() {
        const {
            document,
            item,
            toggleItem
        } = this.props;
        return (
            <td>
                <input type="checkbox" checked={item.checked} onChange={() => toggleItem(document, item)}/>
            </td>
        );
    }
}

RequestedItem.propTypes = {
    document: PropTypes.object,
    item: PropTypes.object,
    toggleItem: PropTypes.func
};


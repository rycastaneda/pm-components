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
            <td className="group-table__document-checkbox">
                <input type="checkbox" checked={checked} onChange={() => toggleItem(document, item, checked, true)}/>
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

import React, { Component, PropTypes } from 'react';
import RequestedItem from '../components/RequestedItem';
export default class RequestedItems extends Component {
    render() {
        const {
            document,
            items,
            toggleItem
        } = this.props;

        console.log("requested", document.requesteditems);
        const requestedItems = items.allIds.map((itemId, key) => {
            let item = items.byId[itemId];
            if (document.requesteditems.includes(itemId)) {
                item.checked = true;
            }

            return <RequestedItem document={document} item={item} key={key} toggleItem={toggleItem}/>;
        });

        return (
            <tr>
                <td>{document.name}</td>
                {requestedItems}
            </tr>
        );
    }
}

RequestedItems.propTypes = {
    document: PropTypes.object,
    items: PropTypes.object,
    toggleItem: PropTypes.func
};


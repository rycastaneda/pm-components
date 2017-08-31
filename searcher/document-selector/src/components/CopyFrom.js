import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

export default class CopyFromModal extends Component {
    render() {
        const {
            items,
            active,
            selectItem,
            requestedItem
        } = this.props;

        // filter items except this item
        const options = items.allIds.filter(itemId => +itemId !== requestedItem).map((id) => {
            return {
                label: 'Copy from ' + items.byId[id].title,
                value: id
            };
        });

        options.push({
            label: 'Select All',
            value: 'all'
        }, {
            label: 'Select None',
            value: 'none'
        });

        return (
            <div>
                <Select
                    value={active}
                    placeholder={`Select...`}
                    clearable={false}
                    options={options}
                    onChange={selectItem}
                />
            </div>
        );
    }
}

CopyFromModal.propTypes = {
    requestedItem: PropTypes.number,
    items: PropTypes.object,
    active: PropTypes.any,
    selectItem: PropTypes.func
};

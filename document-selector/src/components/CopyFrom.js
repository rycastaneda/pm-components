import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

export default class CopyFromModal extends Component {
    render() {
        const {
            items,
            active,
            selectItem
        } = this.props;

        const options = items.allIds.map((id) => {
            return {
                label: items.byId[id].title,
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
                    placeholder={`Copy From`}
                    options={options}
                    onChange={selectItem}
                />
            </div>
        );
    }
}

CopyFromModal.propTypes = {
    items: PropTypes.object,
    active: PropTypes.any,
    selectItem: PropTypes.func
};

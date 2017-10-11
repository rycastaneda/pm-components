import React, { Component, PropTypes } from 'react';
import Documents from './Documents';

export default class Group extends Component {
    render() {
        const {
            index,
            group,
            documents,
            items,
            toggleGroup,
            toggleDocument,
            toggleItem
        } = this.props;

        const qs = document.querySelector('[data-all-items]');
        let groupChecked = documents.every((document) => {
            return document.requesteditems && document.requesteditems.length;
        });

        const requestedItems = items.allIds.map((id, key) => {
            return <td className={index === 0 ? 'group-table__item' : 'group-table__item-invisible' } key={key}>
                {(items.byId[id].service_title) && items.byId[id].title + ' - ' + items.byId[id].service_title || items.byId[id].title}
            </td>;
        });

        return (
            <tr>
                <td colSpan="2">
                    <table className="group-table">
                        <tbody>
                            <tr className="group-table__header">
                                <td className="group-table__title">{group.title}</td>
                                {qs ? 
                                <td className="group-table__checkbox">
                                    <input 
                                    type="checkbox" 
                                    checked={groupChecked}
                                    onChange={() => toggleGroup(group, groupChecked)}/>
                                </td> : requestedItems }
                            </tr>
                        </tbody>
                        <Documents items={items} documents={documents} toggleItem={toggleItem} toggleDocument={toggleDocument}/>
                    </table>
                </td>
            </tr>
        );
    }
}

Group.propTypes = {
    index: PropTypes.number,
    group: PropTypes.object,
    documents: PropTypes.array,
    items: PropTypes.object,
    toggleGroup: PropTypes.func,
    toggleDocument: PropTypes.func,
    toggleItem: PropTypes.func
};


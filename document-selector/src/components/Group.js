import React, { Component, PropTypes } from 'react';
import Documents from './Documents';

export default class Group extends Component {
    render() {
        const {
            group,
            documents,
            items,
            toggleGroup,
            toggleDocument,
            toggleItem
        } = this.props;

        const qs = document.querySelector('[data-all-items]');
        console.log("documents", documents);
        let groupChecked = documents.every((document) => {
            return document.requesteditems && document.requesteditems.length;
        });

        const requestedItems = items.allIds.map((id, key) => {
            return <td key={key}>{items.byId[id].title}</td>;
        });

        console.log("qs", qs);
        console.log("group", group);
        return (
            <tr>
                <td colSpan="2">
                    <table className="group-table">
                        <tbody>
                            <tr className="group-table__header">
                                <td>{group.title}</td>
                                {qs ? 
                                <td>
                                    <input 
                                    type="checkbox" 
                                    checked={groupChecked}
                                    onChange={() => toggleGroup(group, groupChecked)}/>
                                </td> : requestedItems}
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
    group: PropTypes.object,
    documents: PropTypes.array,
    items: PropTypes.object,
    toggleGroup: PropTypes.func,
    toggleDocument: PropTypes.func,
    toggleItem: PropTypes.func
};


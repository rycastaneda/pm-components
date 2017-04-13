import React, { Component, PropTypes } from 'react';

export class GroupList extends Component {
    render() {
        const { group, downloadDocumentGroup } = this.props;
        return (
            <li className="list-group-item">
                <a className="pull-right download-icon"
                    onClick={() => {
                        downloadDocumentGroup(group.id);
                    }}>
                    <span className="badge"><i className="fa fa-download"></i></span>
                </a>
                {group.title}
            </li>
        );
    }
}


GroupList.propTypes = {
    group: PropTypes.object,
    downloadDocumentGroup: PropTypes.func
};

export default GroupList;

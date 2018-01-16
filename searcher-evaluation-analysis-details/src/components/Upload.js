import React, { Component, PropTypes } from 'react';

export class Upload extends Component {
    render() {
        const { title, url } = this.props;
        return (
            <li className="list-group-item">
                <a className="pull-right download-icon" href={url}>
                    <span className="badge">
                        <i className="fa fa-download" />
                    </span>
                </a>
                {title}
                <div className="clearfix" />
            </li>
        );
    }
}

Upload.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string
};

export default Upload;

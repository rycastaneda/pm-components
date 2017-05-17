import React, { PropTypes } from 'react';
import moment from 'moment';

const Revision = ({ document, handleDownloadDocument }) => {
    function dateToolTip() {
        return (
            <span className="bs-tooltip" data-content={moment(document.created_on.date).format('MMMM Do YYYY, h:mm:ss a')}>
                {document.name} - {moment(document.created_on.date).fromNow()}
            </span>
        );
    }

    return (
        <li className="filelist__item">
            <a onClick={() => handleDownloadDocument(document.id)} className="filelist__file">
                <i className="fa fa-download"></i>
            </a>
            {dateToolTip()}
        </li>
    );
};

Revision.propTypes = {
    document: PropTypes.object.isRequired,
    handleDownloadDocument: PropTypes.func
};

export default Revision;

import React, { PropTypes } from 'react';
import Upload from './Upload';

const Uploads = ({ uploads }) => {
    const lists = uploads.map(upload => {
        return (
            <Upload
                key={upload.id}
                title={upload.title}
                url={upload.download_url}
            />
        );
    });

    return (
        <ul className="list-group">
            {uploads.length ? lists : <li>No documents yet</li>}
        </ul>
    );
};

Uploads.propTypes = {
    uploads: PropTypes.array
};

export default Uploads;

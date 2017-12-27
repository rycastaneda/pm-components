import React from 'react';
import Dropzone from 'react-dropzone';

const dropzone =() => (
<Dropzone className="dropzone">
    <p className="text-center dropzone__placeholder"><i className="fa fa-cloud-upload"></i> Drop files here or click to select files.</p>
</Dropzone>
);
export default dropzone;

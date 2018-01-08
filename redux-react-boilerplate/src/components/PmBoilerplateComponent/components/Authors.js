import React from 'react';
import PropTypes from 'prop-types';
import Author from './Author';

const Authors = ({ authors }) => (
    <div>
        { authors.map((author) => {
            return (
                <Author key={author.id} authorItem={author} />
            );
        })}
    </div>
);

Authors.propTypes = {
    authors: PropTypes.array.isRequired,
};

export default Authors;


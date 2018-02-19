import React, { PropTypes } from 'react';
import { format } from 'date-fns';
const Comment = ({ text, staff, created_at }) => (
    <div className="pad-btm font-rg">
        <div className="row">
            <div className={`col-lg-12 col-sm-12`}>
                <p className="pad-btm-sm">{text}</p>
                <strong className="staff">{`— ${staff} ${format(
                    created_at,
                    'MMMM D, YYYY HH:mm a'
                )}`}</strong>
            </div>
        </div>
    </div>
);

Comment.propTypes = {
    staff: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
};

export default Comment;

import React, { PropTypes } from 'react';

const ViewSelector = ({ view, changeView }) => {
    const setActive = (view, currentView) =>
        view === currentView ? 'btn-default' : 'btn-reverse';

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button
                id="single"
                type="button"
                className={`btn ${setActive('single', view)}`}
                onClick={changeView}>
                Single
            </button>
            <button
                id="all"
                type="button"
                className={`btn ${setActive('all', view)}`}
                onClick={changeView}>
                All
            </button>
            <button
                id="compare"
                type="button"
                className={`btn ${setActive('compare', view)}`}
                onClick={changeView}>
                Compare
            </button>
        </div>
    );
};

ViewSelector.propTypes = {
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired
};

export default ViewSelector;

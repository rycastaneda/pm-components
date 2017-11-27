import React, { PropTypes } from 'react';

const ViewSelector = ({ view, changeView }) => {
    const setActive = (view, currentView) =>
        view === currentView ? 'btn' : 'db-function';

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button
                id="single"
                type="button"
                className={`${setActive('single', view)}`}
                onClick={changeView}>
                Single
            </button>
            <button
                id="all"
                type="button"
                className={`${setActive('all', view)}`}
                onClick={changeView}>
                All
            </button>
            <button
                id="compare"
                type="button"
                className={`${setActive('compare', view)}`}
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

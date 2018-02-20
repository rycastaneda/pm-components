import React, { PropTypes } from 'react';

const ViewSelector = ({ view, changeView, canViewAll }) => {
    const setActive = (view, currentView) =>
        view === currentView ? 'btn-default' : 'btn-reverse';

    return (
        <div className="btn-group" role="group" aria-label="Reports Selector">
            <button
                id="single"
                type="button"
                className={`btn ${setActive('single', view)}`}
                onClick={changeView}>
                Single
            </button>
            {canViewAll ? (
                <button
                    id="all"
                    type="button"
                    className={`btn ${setActive('all', view)}`}
                    onClick={changeView}>
                    All
                </button>
            ) : null}
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
    changeView: PropTypes.func.isRequired,
    canViewAll: PropTypes.bool.isRequired
};

export default ViewSelector;

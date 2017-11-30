import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import FilterToggleButton from './FilterToggleButton';

const FilterHead = ({actions}) => (
    <div className="panel panel-default pad-all">
        <div className="row">
            <div className="col-xs-6 col-md-4">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-search" />
                    </span>
                    <input type="text" name="search" className="form-control" placeholder="Quick search"
                           onChange={event => actions.updateChangeSearchKey(event.target.value)}/>
                </div>
            </div>
            <div className="col-xs-2 col-md-2">
                <button className="btn" onClick={actions.submitFilterNormal}>Search</button>
            </div>
            <div className="col-xs-4 col-md-6 align-right">
                <FilterToggleButton />
            </div>
        </div>
    </div>
);

FilterHead.propTypes = {
    actions: PropTypes.object,
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(FilterHead);


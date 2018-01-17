import React from 'react';
import FilterToggleButton from './FilterToggleButton';

const FilterHead = () => (
    <div className="panel panel-default pad-all">
        <div className="row">
            <div className="col-xs-12 align-right">
                <FilterToggleButton />
            </div>
        </div>
    </div>
);

export default FilterHead;

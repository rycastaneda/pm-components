import React, { Component } from 'react';
import CategoryList from './CategoryList';
import CategoryTypeList from './CategoryTypeList';
import { TYPES } from '../constants/CategoryTypes';

class CategorySelection extends Component {

    render() {
        const test = [{
            id: 5,
            title: 'Test'
        }, {
            id: 6,
            title: 'Test2'
        }, {
            id: 7,
            title: 'Test2'
        }];

        const testF = () => alert('rrr');

        return (
            <div>
                <CategoryTypeList types={TYPES} onTypeClick={testF} />
                <CategoryList categories={test} onCategoryClick={testF} />
            </div>
        );
    }
}

export default CategorySelection;
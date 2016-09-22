import React, { Component } from 'react';
import CategoryList from './CategoryList';
import CategoryTypeList from './CategoryTypeList';

class CategorySelection extends Component {

    render() {
        const test = [{
            id: 5,
            title: 'Test',
            selected: false,
            onClick: () => alert('fff')
        }, {
            id: 6,
            title: 'Test2',
            selected: false,
            onClick: () => alert('fff')
        }, {
            id: 7,
            title: 'Test2',
            selected: false,
            onClick: () => alert('fff')
        }];

        const testF = () => alert('rrr');

        const types = [{
            id: 1,
            title: 'Equipment',
            selected: false,
            onClick: () => alert('fff')
        }, {
            id: 2,
                title: 'Trades',
                selected: false,
                onClick: () => alert('fff')
        }, {
            id: 3,
                title: 'Products',
                selected: false,
                onClick: () => alert('fff')
        }];

        return (
            <div>
                <CategoryTypeList types={types} onTypeClick={testF}/>
                <CategoryList categories={test} onCategoryClick={testF}/>
            </div>
        );
    }
}

export default CategorySelection;
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import EvaluationAssignment from './EvaluationAssignment';

describe('Boilerplate component: ', () => {
    it('should render boilerplate text', () => {
        const store = {
            getState: function() {},
            subscribe: function() {},
            dispatch: sinon.spy()
        };
        const component = shallow(<EvaluationAssignment store={store} />);

        expect(component.html()).contains('Here it comes...');
    });
});

import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from '../src/CategorySelection';

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(shallow(<App />).contains(<div className="test"/>)).to.equal(true);
    });
});
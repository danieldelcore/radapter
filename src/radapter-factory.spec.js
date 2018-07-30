import React from 'react';
import PropTypes from 'prop-types';

const MyButton = ({ type, handleClick = () => { }, children }) => (
    <button type={type} onClick={handleClick()}>
        {children}
    </button>
);

MyButton.propTypes = {
    type: PropTypes.string,
    handleClick: PropTypes.func,
    children: PropTypes.element,
};

describe('radapterFactory', () => {
    let radapter;

    beforeEach(() => {
        angular.mock.module('radapter-factory');

        inject(($injector) => {
            radapter = $injector.get('radapter');
        });
    });

    it('Generates bindings from propTypes', () => {
        const component = radapter(MyButton);
        const bindings = Object.keys(component.bindings);
        const propNames = Object.keys(MyButton.propTypes);

        expect(bindings).toEqual(propNames);
    });
});

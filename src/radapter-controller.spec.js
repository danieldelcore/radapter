/* eslint-disable import/first */

import React from 'react';
import PropTypes from 'prop-types';

import RadapterController from './radapter-controller';

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

describe('RadapterController', () => {
    let controller;
    let element;
    let bindings;
    let renderer;

    beforeEach(() => {
        renderer = {
            render: jest.fn(),
            unmountComponentAtNode: jest.fn(),
        };

        bindings = [
            'type',
            'onClick',
        ];

        element = angular.element('<div></div>');
        controller = new RadapterController(element, renderer, bindings, MyButton);
    });

    it('detects changes and triggers a rerender', () => {
        controller.$onChanges();

        expect(renderer.render).toHaveBeenCalledWith(expect.any(Object), element[0]);
    });

    it('unmounts the component on destroy', () => {
        controller.$onDestroy();

        expect(renderer.unmountComponentAtNode).toHaveBeenCalledWith(element[0]);
    });
});

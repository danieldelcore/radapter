import React from 'react';

describe('RadapterService', () => {
    let radapterRegistry;
    let components;

    beforeEach(() => {
        angular.mock.module('radapter');

        inject(($injector) => {
            radapterRegistry = $injector.get('radapterRegistry');
        });

        components = {
            TextBox: () => <p>Text</p>,
            Button: () => <button>Text</button>,
        };
    });

    it('registers the supplied React component', () => {
        radapterRegistry.register('Test', components.TextBox);
        const component = radapterRegistry.get('Test');

        expect(component).toEqual(components.TextBox);
    });

    it('registers the supplied object of React components', () => {
        const registeree = {
            Text: components.TextBox,
            Button: components.Button,
        };

        radapterRegistry.registerAll(registeree);

        const componentText = radapterRegistry.get('Text');
        const componentButton = radapterRegistry.get('Button');

        expect(componentText).toEqual(components.TextBox);
        expect(componentButton).toEqual(components.Button);
    });

    it('throws when unknown component is requested', () => {
        expect(() => {
            radapterRegistry.get('unknown');
        }).toThrow('Component named \'unknown\' was not found in registry');
    });

    it('returns true when a component is registered', () => {
        radapterRegistry.register('Test', components.TextBox);
        const result = radapterRegistry.isRegistered('Test');

        expect(result).toEqual(true);
    });

    it('returns false when a component is not registered', () => {
        const result = radapterRegistry.isRegistered('unknown');

        expect(result).toEqual(false);
    });
});

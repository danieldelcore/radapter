import React from 'react';
import PropTypes from 'prop-types';
import radapter from './radapter-factory';

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

function compileTemplate($compile, $scope, tpl) {
    const defaultTemplate = `
        <my-button
            type="type"
            handle-click="handleClick"
            children="children">
        </my-button>
    `;

    const compiledElement = $compile(tpl || defaultTemplate)($scope);

    $scope.$digest();

    return compiledElement;
}

describe('radapterFactory', () => {
    let $compile;
    let $scope;
    let compileProvider;
    let element;
    let handleClick;

    beforeEach(() => {
        angular.mock.module(($compileProvider) => {
            compileProvider = $compileProvider;
        });

        inject(($injector) => {
            $compile = $injector.get('$compile');
            $scope = $injector.get('$rootScope').$new();
        });

        handleClick = jest.fn();

        $scope.type = 'button';
        $scope.handleClick = handleClick;
        $scope.children = '<p>Hello Button</p>';
    });

    it('renders the component in React', () => {
        compileProvider.component('myButton', radapter(MyButton));
        element = compileTemplate($compile, $scope);

        const button = element.find('button');

        button[0].click();

        expect(handleClick).toHaveBeenCalled();
        expect(button.attr('type')).toEqual('button');
    });

    it('handles prop changes', () => {
        compileProvider.component('myButton', radapter(MyButton));
        element = compileTemplate($compile, $scope);

        const button = element.find('button');

        button[0].click();

        expect(handleClick).toHaveBeenCalled();
        expect(button.attr('type')).toEqual('button');

        $scope.type = 'submit';

        $scope.$digest();

        expect(button.attr('type')).toEqual('submit');
    });

    it('renders component with children', () => {
        compileProvider.component('myButton', radapter(MyButton));
        element = compileTemplate($compile, $scope);

        const button = element.find('button');

        expect(element[0].children.length).toEqual(1);
        expect(button.find('p').text()).toEqual('Hello Button');
    });

    it('handles updates to children', () => {
        compileProvider.component('myButton', radapter(MyButton));
        element = compileTemplate($compile, $scope);

        let button = element.find('button');

        expect(element[0].children.length).toEqual(1);
        expect(button.find('p').text()).toEqual('Hello Button');

        button = element.find('button');

        $scope.children = '<p>NEW Button</p>';
        $scope.$digest();

        expect(element[0].children.length).toEqual(1);
        expect(button.find('p').text()).toEqual('NEW Button');
    });
});

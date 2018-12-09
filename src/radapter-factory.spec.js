import React from 'react';
import PropTypes from 'prop-types';

import radapter from './radapter-factory';

const MyButton = ({ type, handleClick = () => { } }) => (
    <button type={type} onClick={handleClick()}>
        Submit
    </button>
);

MyButton.propTypes = {
    type: PropTypes.string,
    handleClick: PropTypes.func,
};

function compileTemplate($compile, $scope, tpl) {
    const defaultTemplate = `
        <my-button
            type="type"
            handle-click="handleClick">
        </my-button>
    `;

    const compiledElement = $compile(tpl || defaultTemplate)($scope);

    $scope.$digest();

    return compiledElement;
}

describe('radapter', () => {
    let $compile;
    let $scope;
    let compileProvider;
    let element;
    let handleClick;

    beforeEach(() => {
        angular.mock.module(($provide, $compileProvider) => {
            compileProvider = $compileProvider;

            $provide.constant('MY_CONSTANTS', {
                assetPath: 'www.google.com',
            });
        });

        inject(($injector) => {
            $compile = $injector.get('$compile');
            $scope = $injector.get('$rootScope').$new();
        });

        handleClick = jest.fn();

        $scope.type = 'button';
        $scope.handleClick = handleClick;
    });

    describe('components work when registered as Angularjs components', () => {
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
    });

    describe('components work when registered as Angularjs directives', () => {
        it('renders the component in React', () => {
            compileProvider.directive('myButton', () => radapter(MyButton));
            element = compileTemplate($compile, $scope);

            const button = element.find('button');

            button[0].click();

            expect(handleClick).toHaveBeenCalled();
            expect(button.attr('type')).toEqual('button');
        });

        it('handles prop changes', () => {
            compileProvider.directive('myButton', () => radapter(MyButton));
            element = compileTemplate($compile, $scope);

            const button = element.find('button');

            button[0].click();

            expect(handleClick).toHaveBeenCalled();
            expect(button.attr('type')).toEqual('button');

            $scope.type = 'submit';

            $scope.$digest();

            expect(button.attr('type')).toEqual('submit');
        });

        it('is able to render injected prop values', () => {
            const Image = ({ assetPath, type }) => (
                <img src={`${assetPath}/logo.jpg`} alt={type} />
            );

            Image.propTypes = {
                assetPath: PropTypes.string,
                type: PropTypes.string,
            };

            compileProvider.directive('myImage', MY_CONSTANTS =>
                radapter(Image, {
                    defaultProps: {
                        assetPath: MY_CONSTANTS.assetPath,
                    },
                })
            );

            $scope.type = 'image';

            element = compileTemplate($compile, $scope, `
                <my-image type="type">
                </my-image>
            `);

            const image = element.find('img');

            expect(image.attr('alt')).toEqual('image');
            expect(image.attr('src')).toEqual('www.google.com/logo.jpg');
        });

        it('merges default props and manual props to esure they are avaible as bindings', () => {
            const Image = ({ assetPath, type }) => ( // eslint-disable-line react/prop-types
                <img src={`${assetPath}/logo.jpg`} alt={type} />
            );

            compileProvider.directive('myImage', MY_CONSTANTS =>
                radapter(Image, {
                    defaultProps: {
                        assetPath: MY_CONSTANTS.assetPath,
                    },
                    manualProps: ['type'],
                })
            );

            $scope.type = 'image';

            element = compileTemplate($compile, $scope, `
                <my-image type="type">
                </my-image>
            `);

            const image = element.find('img');

            expect(image.attr('alt')).toEqual('image');
            expect(image.attr('src')).toEqual('www.google.com/logo.jpg');
        });

        it('is able to override injected prop values', () => {
            const Image = ({ assetPath }) => (
                <img src={`${assetPath}/logo.jpg`} alt="Logo" />
            );

            Image.propTypes = {
                assetPath: PropTypes.string,
            };

            compileProvider.directive('myImage', MY_CONSTANTS =>
                radapter(Image, {
                    defaultProps: {
                        assetPath: MY_CONSTANTS.assetPath,
                    },
                })
            );

            element = compileTemplate($compile, $scope, `
                <my-image asset-path="assetPath">
                </my-image>
            `);

            const image = element.find('img');

            expect(image.attr('src')).toEqual('www.google.com/logo.jpg');

            $scope.assetPath = 'www.bing.com';
            $scope.$digest();

            expect(image.attr('src')).toEqual('www.bing.com/logo.jpg');
        });
    });
});

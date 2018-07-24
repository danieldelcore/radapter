import React from 'react';
import PropTypes from 'prop-types';

function compileDirective($compile, scope, tpl) {
    const template = tpl || '<radapter component="component" props="props"></radapter>';
    const compiledElement = $compile(template)(scope);

    scope.$digest();

    return compiledElement;
}

const MyButton = ({
    type,
    handleClick = () => {},
    children,
}) => (
    <button type={type} onClick={handleClick()}>
        {children}
    </button>
);

MyButton.propTypes = {
    type: PropTypes.string,
    handleClick: PropTypes.func,
    children: PropTypes.element,
};

describe('radapterDirective', () => {
    let $compile;
    let element;
    let $scope;
    let handleClick;
    let radapterRegistry;

    beforeEach(() => {
        angular.mock.module('radapter');

        inject(($injector) => {
            $compile = $injector.get('$compile');
            radapterRegistry = $injector.get('radapterRegistry');
            $scope = $injector.get('$rootScope').$new();
        });

        jest.spyOn(radapterRegistry, 'get').mockReturnValue(MyButton);

        handleClick = jest.fn();

        $scope.component = MyButton;
        $scope.props = {
            type: 'button',
            handleClick,
        };
    });

    it('renders the component in React', () => {
        element = compileDirective($compile, $scope);

        const button = element.find('button');

        button[0].click();

        expect(handleClick).toHaveBeenCalled();
        expect(button.attr('type')).toEqual('button');
    });

    it('handles prop changes', () => {
        element = compileDirective($compile, $scope);

        const button = element.find('button');

        button[0].click();

        expect(handleClick).toHaveBeenCalled();
        expect(button.attr('type')).toEqual('button');

        $scope.props = {
            type: 'submit',
        };

        $scope.$digest();

        expect(button.attr('type')).toEqual('submit');
    });

    it('renders component with children', () => {
        const template = `
            <radapter
                component="component"
                props="props">
                <p>Hello Button</p>
            </radapter>
        `;

        element = compileDirective($compile, $scope, template);

        const button = element.find('button');

        expect(element[0].children.length).toEqual(1);
        expect(button.find('p').text()).toEqual('Hello Button');
    });

    it('handles updates to children', () => {
        // TODO: ...
    });

    it('doesnt render any elements if the component is not found', () => {
        radapterRegistry.get.mockImplementation(() => {
            throw new Error();
        });

        const template = `
            <radapter component="component">
                <p>Hello Button</p>
            </radapter>
        `;

        element = compileDirective($compile, $scope, template);

        expect(element[0].children.length).toEqual(0);
    });
});

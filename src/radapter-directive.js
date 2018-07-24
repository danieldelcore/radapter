/* eslint-disable react/no-danger */

import React from 'react';
import ReactDom from 'react-dom';

function renderChildren(scope, transclude) {
    let html;

    transclude(scope, (clone) => {
        const element = angular.element('<span></span>').append(clone);
        html = element[0].innerHTML;
    });

    return html
        ? <span dangerouslySetInnerHTML={{ __html: html }} />
        : null;
}

function renderComponent(Component, container, props = {}, children) {
    ReactDom.render(
        <Component {...props}>
            {children}
        </Component>,
        container
    );
}

function radapterDirective(radapterRegistry) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            component: '<',
            props: '<',
        },
        link: (scope, element, attrs, ctrl, transclude) => {
            scope.$watch('props', (newValue) => {
                if (!newValue) {
                    return;
                }

                try {
                    const Component = radapterRegistry.get(scope.component);
                    const children = renderChildren(scope, transclude);

                    renderComponent(Component, element[0], scope.props, children);
                } catch (err) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(err); // eslint-disable-line no-console
                    }
                }
            });
        },
    };
}

export default radapterDirective;

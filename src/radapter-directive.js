import React from 'react';
import ReactDom from 'react-dom';

const ChildrenWrapper = ({ html }) =>
    <span dangerouslySetInnerHTML={{ __html: html }} />;

function radapterDirective(radapterRegistry) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            component: '<',
            props: '<',
        },
        link: function (scope, element, attrs, ctrl, transclude) {
            let children;

            transclude(scope, clone => (
                children = clone[0].outerHTML
            ));

            const Component = radapterRegistry.get(scope.component);

            if (!Component) {
                console.warn('Component not found');

                return;
            }

            ReactDom.render(
                <Component {...scope.props}>
                    <ChildrenWrapper html={children} />
                </Component>,
                element[0]
            );
        }
    };
}

export default radapterDirective;

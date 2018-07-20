import React from 'react';
import ReactDom from 'react-dom';

function radapterDirective(radapterRegistry) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            component: '<',
            props: '<',
        },
        link: function (scope, element, attrs, ctrl, transclude) {
            try {
                const Component = radapterRegistry.get(scope.component);

                ReactDom.render(
                    <Component {...scope.props}>
                        {renderChildren(scope, transclude)}
                    </Component>,
                    element[0]
                );
            } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(err);
                }
            }
        }
    };

    function renderChildren(scope, transclude) {
        let html;

        transclude(scope, clone => (html = clone[0].outerHTML));

        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    }
}

export default radapterDirective;

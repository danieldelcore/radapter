/* eslint-disable react/no-danger */

import React from 'react';
import ReactDom from 'react-dom';

function radapterDirective(radapterRegistry) {
    function renderChildren(scope, transclude) {
        let html;

        transclude(scope, (clone) => {
            html = clone[0].outerHTML;
        });

        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            component: '<',
            props: '<',
        },
        link: (scope, element, attrs, ctrl, transclude) => {
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
                    console.warn(err); // eslint-disable-line no-console
                }
            }
        },
    };
}

export default radapterDirective;

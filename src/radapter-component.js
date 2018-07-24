/* eslint-disable react/no-danger */

import angular from 'angular';
import React from 'react';
import ReactDom from 'react-dom';

class RadapterController {
    constructor($element, radapterRegistry) {
        this._$element = $element;
        this._radapterRegistry = radapterRegistry;
    }

    $onChanges({ component, props, children }) {
        this.children = children && children.currentValue;
        this.component = component && component.currentValue;
        this.props = props && props.currentValue;

        this._handleChange();
    }

    $onDestroy() {
        ReactDom.unmountComponentAtNode(this._$element[0]);
    }

    _handleChange() {
        try {
            const component = this._radapterRegistry.get(this.component);
            const children = this._renderChildren(this.children);

            const Component = this._renderComponent(component, this.props, children);

            ReactDom.render(Component, this._$element[0]);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(err); // eslint-disable-line no-console
            }
        }
    }

    _renderComponent(Component, props = {}, children) {
        return (
            <Component {...props}>
                {children}
            </Component>
        );
    }

    _renderChildren(content) {
        return content
            ? <span dangerouslySetInnerHTML={{ __html: content }} />
            : null;
    }
}

export default angular
    .module('radapter-component', [
        'radapter-service',
    ])
    .component('radapter', {
        bindings: {
            children: '<',
            component: '<',
            props: '<',
        },
        controller: RadapterController,
    });

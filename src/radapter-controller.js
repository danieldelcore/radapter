/* eslint-disable react/no-danger */

import React from 'react';

export default class RadapterController {
    constructor($element, renderer, bindings, Component) {
        'ngInject';

        this._$element = $element;
        this._bindings = bindings;
        this._renderer = renderer;
        this._Component = Component;
    }

    $onChanges() {
        const props = this._getProps(this._bindings);
        const children = this._renderChildren(this.children);
        const Component = this._renderComponent(this._Component, props, children);

        this._renderer.render(Component, this._$element[0]);
    }

    $onDestroy() {
        this._renderer.unmountComponentAtNode(this._$element[0]);
    }

    _getProps(bindings = []) {
        return bindings
            .reduce((accum, key) => {
                const props = { ...accum };

                props[key] = this[key];

                return props;
            }, {});
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

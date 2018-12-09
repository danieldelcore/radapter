import React from 'react';

export default class RadapterController {
    constructor(
        $element,
        renderer,
        bindings = [],
        defaultProps = {},
        Component
    ) {
        'ngInject';

        this._$element = $element;
        this._bindings = bindings;
        this._renderer = renderer;
        this._defaultProps = defaultProps;
        this._Component = Component;
    }

    $onChanges() {
        const props = this._getProps(this._bindings, this._defaultProps);

        this._renderer.render(
            <this._Component {...props} />,
            this._$element[0]
        );
    }

    $onDestroy() {
        this._renderer.unmountComponentAtNode(this._$element[0]);
    }

    _getProps(bindings, defaultProps) {
        return bindings
            .reduce((accum, key) => {
                const props = { ...accum };

                if (this[key] === undefined && defaultProps[key]) {
                    props[key] = defaultProps[key];
                } else {
                    props[key] = this[key];
                }

                return props;
            }, {});
    }
}

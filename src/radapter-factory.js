import ReactDom from 'react-dom';

import RadapterController from './radapter-controller';

function applyOneWayBinding(props) {
    return props.reduce((accum, prop) => {
        const bindings = { ...accum };

        bindings[prop] = '<';

        return bindings;
    }, {});
}

function getBindings(Component, manualProps, defaultProps) {
    if (Component.propTypes) {
        return Object.keys(Component.propTypes);
    }

    return [
        ...manualProps,
        ...Object.keys(defaultProps),
    ];
}

export default function radapter(Component, { manualProps = [], defaultProps = {} } = {}) {
    const bindings = getBindings(Component, manualProps, defaultProps);
    const bindingTypes = applyOneWayBinding(bindings);

    return {
        bindings: bindingTypes,
        scope: bindingTypes,
        restrict: 'E',
        bindToController: true,
        controllerAs: '$ctrl',
        controller: [
            '$element',
            $element => new RadapterController(
                $element,
                ReactDom,
                bindings,
                defaultProps,
                Component
            ),
        ],
    };
}

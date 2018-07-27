import ReactDom from 'react-dom';

import RadapterController from './radapter-controller';

function generateBindings(propTypes = {}) {
    return Object
        .keys(propTypes)
        .reduce((accum, key) => {
            const props = { ...accum };

            props[key] = '<';

            return props;
        }, {});
}

function radapterFactory() {
    return (Component) => {
        const bindings = {
            ...generateBindings(Component.propTypes),
            children: '<',
        };

        const bindingKeys = Object.keys(bindings);

        return {
            bindings,
            controller: [
                '$element',
                $element => new RadapterController(
                    $element,
                    ReactDom,
                    bindingKeys,
                    Component
                ),
            ],
        };
    };
}

export default angular
    .module('radapter-factory', [])
    .factory('radapter', radapterFactory);

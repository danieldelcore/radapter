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

export default function radapterFactory(Component) {
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
}

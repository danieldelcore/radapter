class RadapterService {
    constructor() {
        this._components = {};
    }

    register(name, component) {
        if (!name) {
            throw new Error('No name provided');
        }

        if (this.isRegistered(name)) {
            throw new Error(`A component named '${name}' has already been registered`);
        }

        this._components[name] = component;
    }

    registerAll(components = []) {
        components.forEach(({ name, component }) =>
            this.register(name, component)
        );
    }

    get(name) {
        const component = this._components[name];

        if (!component) {
            throw new Error(`Component named '${name}' was not found in registry`);
        }

        return component;
    }

    isRegistered(name) {
        return !!this._components[name];
    }
}

export default RadapterService;

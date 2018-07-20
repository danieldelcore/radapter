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
        return this._components[name];
    }

    isRegistered(name) {
        return !!this.get(name);
    }
}

export default RadapterService;

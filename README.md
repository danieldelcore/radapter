# rAdapter

rAdapter is a React component adapter for Angularjs applications. Aimed at providing a way to avoid rewriting legacy Angularjs applications upfront, and instead allows iterative replacement of Angular directives and components with React components.

![rAdapter being imported into my app](/hero.png "rAdapter being imported into my app")

## Usage

**Installation:**

`npm install radapter`

**Example:**

```jsx
    import radapter from 'radapter';
    import { MyTextBox, MyButton } from './my-react-components';

    // your application
    angular
        .module('my-cool-app', [])
        .constant('MY_CONSTANTS', { assetPath: 'www.google.com' })
        .component('myTextBox', radapter(MyTextBox)) // Registered as component
        .directive('myButton', () => radapter(MyButton)); // Registered as directive
        .directive('myImage', (MY_CONSTANTS) => radapter(MyImage, {
            defaultProps: { assetPath: MY_CONSTANTS.assetPath } // Injecting dependencies from Angular
        }));

    // In your templates
    <my-text-box
        class-name="textbox"
        type="text">
    </my-text-box>

    <my-button
        type="button"
        onClick="$ctrl.handleClick">
    </my-button>
```

## API

### `radapter(Component, options)`

A factory function that accepts a React component, infers bindings from propTypes (or manualProps) and returns an Angularjs directive. The directive returned is also interoperable with Angular components.

**Component**

type: React component

React component to be wrapped

**options.manualProps**

type: `string[]`

If the `manualProps` array is supplied to the factory, it will bypass inference of bindings via `Component.propTypes` in favour of the supplied manual props. This is useful if your component is written in TypeScript or does not rely on PropTypes.

**options.defaultProps**

type: `object`

`defaultProps` allow you to pass predefined variables into your component. This is a good place to pass in Angular dependencies.

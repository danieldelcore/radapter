# 🦖 rAdapter

rAdapter is a React component adapter for Angularjs applications. It was created to provide a way to avoid having to do an upfront rewrite of your legacy Angularjs applications, and provides a mechanism for you to iteratively replace Angular directives/components with React components.

![rAdapter being imported into my app](/hero.png "rAdapter being imported into my app")


## Usage

**Installation:**

`npm install radapter`

**Importing:**

```jsx
    import radapter from 'radapter';
    import { MyCoolTextBox, MyCoolButton } from './my-react-components';

    // your application
    angular.module('my-cool-app', [
        radapter
    ])
    .controller('MyCoolController', function($scope, radapterRegistry) {
        radapterRegistry.register('TextBox', MyCoolTextBox);
        radapterRegistry.register('Button', MyCoolButton);

        $scope.handleButtonClick = function() {
            console.log('wow my react button was pressed');
        }
    });

    // In your templates
    <div ng-controller="MyCoolController">
        Hello, World! Checkout my React component!
        <radapter
            component="'Button'"
            props="{
                handleClick: "handleButtonClick"
            }"
        >
            Press Me!
        </radapter>
    </div>
```

## Component Registry

**Methods:**

- `radapter.register(name: String, component: ReactComponent)`: Pushes the supplied component into the registry. Will throw if a component of the same name has already been registered.

- `radapter.registerAll([{ name: String, component: ReactComponent }])`: Convenance method for registering many components

- `radapter.get(name)`: Fetches a component from the registry

- `radapter.isRegistered(name):` Checks if the supplied component has been registered

## `<radapter> `

The directive which pulls the requested component from the registry and renders it to the page.

**Props:**

- `component` (String):  Name of the component you wish to render

```jsx
 <radapter component="'Button'" />
```
- `props` (Object):  Object containing the props to be passed into the component

```jsx
<radapter
    component="'Button'"
    props="{
        subject: "'I ❤️ React'"
        handleClick: "handleButtonClick",
    }"
/>
```

## Caveats
rAdapter is limited in it's ability to handle children elements. Currently it only supports plain HTML elements, which are injected into the component via [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml). Please read and understand the implication of `dangerouslySetInnerHTML` before using this component.

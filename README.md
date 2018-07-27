# 🦖 rAdapter

rAdapter is a React component adapter for Angularjs applications. Aimed at providing a way to avoid rewriting legacy Angularjs applications upfront, and instead allows iterative replacement of Angular directives and components with React components behind the scenes, until the time is right to remove Angularjs completely.

![rAdapter being imported into my app](/hero.png "rAdapter being imported into my app")

## Usage

**Installation:**

`npm install radapter`

**Importing:**

```jsx
    import radapter from 'radapter';
    import { MyTextBox, MyButton } from './my-react-components';

    // your application
    angular
        .module('my-cool-app', [radapter])
        .component('myTextBox', radapter(MyTextBox))
        .component('myButton', radapter(MyButton));

    // In your templates
    <my-text-box
        class-name="textbox"
        children="'<p>Hello, World! Checkout my React component!</p>'">
    </my-text-box>

    <my-button
        type="button"
        onClick="$ctrl.handleClick"
        children="'Press me!'">
    </my-button>
```

## Caveats
rAdapter is limited in it's ability to handle children elements. Currently it only supports plain HTML elements, which are injected into the component via [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml). Please read and understand the implications of `dangerouslySetInnerHTML` before using this component.

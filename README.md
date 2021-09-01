# Redux

## Redux lifecycle

[redux lifecycle](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

## Redux in plain JS

```js
const { createStore, combineReducers, applyMiddleware } = require('redux');

//                API
//                 ||
// Actions --> Middleware --> Dispatcher --> Store --> View --> Actions

// The whole state of the application is stored into one JavaScript-object in the store.

// The state of the store is changed with actions. Actions are objects, which have at least a field determining the type of
// the action. If there is data involved with the action, other fields can be declared as needed.

// The impact of the action to the state of the application is defined using a reducer. A reducer is a pure function which is
// given the current state and an action as parameters. It returns a new state based on the actions type.

const initialCounterState = {
  counter: 0,
};

const initialResultState = {
  result: 0,
};

// Reducer - pure function define which action will do what & return new state based on action
const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const resultReducer = (state = initialResultState, action = {}) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        result: state.result + action.value,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counterReducer,
  resultReducer,
});

// Middleware
//  Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the 
// reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

// A Redux middleware is a function returning a function, which takes next as a parameter. Then the inner function returns
// another function which takes action as a parameter and finally returns next(action)
const customMiddleware = (store) => (next) => (action) => {
  console.log('customMiddleware Triggered: ', action);

  next(action);
};

const incrementMiddleware = (store) => (next) => (action) => {
  console.log('store', store);
  
  if (action.type === 'INCREMENT') {
    console.log('incrementMiddleware Triggered: Increment button is clicked');
  }

  next(action);
};

// Store - variable or object keep the states
const store = createStore(
  rootReducer,
  applyMiddleware(customMiddleware, incrementMiddleware),
);

// Subscription - executed when state updated
store.subscribe(() => {
  // The state of the store can be found out using the method getState.
  console.log('[Subscription]', store.getState());
});

// The store uses the reducer to handle actions, which are dispatched or 'sent' to the store with its dispatch-method.
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'ADD', value: 10 });
```

## Redux with React

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'ADD':
      return state + action.value;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => (
  <div>
    <div>{store.getState()}</div>
    <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>plus</button>
    <button onClick={(e) => store.dispatch({ type: 'ADD', value: 10 })}>
      add 10
    </button>
    <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
  </div>
);

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
```

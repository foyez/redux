# Redux

## Redux lifecycle

[redux lifecycle](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

## Redux in plain JS

<details>
<summary>View contents</summary>

[You can find all the code for this section here](https://github.com/foyez/redux/tree/main/src/redux.js)

```js
const {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  bindActionCreators,
} = require('redux')

//                API
//                 ||
// Actions --> Middleware --> Dispatcher --> Store --> View --> Actions

// The whole state of the application is stored into one
// JavaScript-object in the store.

// The state of the store is changed with actions.
// Actions are objects, which have at least a field determining
// the type of the action. If there is data involved with
// the action, other fields can be declared as needed.

// The impact of the action to the state of the application
// is defined using a reducer. A reducer is a pure function
// which is given the current state and an action as parameters.
// It returns a new state based on the actions type.

const initialState = {
  counter: {
    name: 'counter state',
    value: 0,
  },
  result: {
    name: 'result state',
    value: 0,
  },
}

// Reducer - pure function define which action will do
// what & return new state based on action
const counterReducer = (counter = initialState.counter, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...counter, value: counter.value + 1 }
    default:
      return counter
  }
}

const resultReducer = (result = initialState.result, action = {}) => {
  switch (action.type) {
    case 'ADD':
      return { ...result, value: result.value + action.payload }
    case 'SUBTRACTION':
      return { ...result, value: result.value - action.payload }
    default:
      return result
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  result: resultReducer,
})

// Middleware
//  Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches
// the reducer. People use Redux middleware for logging,
// crash reporting, talking to an asynchronous API, routing, and more.

// A Redux middleware is a function returning a function,
// which takes next as a parameter. Then the inner function
// returns another function which takes action as a parameter
// and finally returns next(action)
const customMiddleware = (store) => (next) => (action) => {
  console.log('customMiddleware Triggered: ', action)

  next(action)
}

const incrementMiddleware = (store) => (next) => (action) => {
  console.log('store', store)

  if (action.type === 'INCREMENT') {
    console.log('incrementMiddleware Triggered: Increment button is clicked')
  }

  next(action)
}

// Enhancer
// A store enhancer is a higher-order function that composes
// a store creator to return a new enhanced store creator.
// This is similar to middleware in that it allows you
// to alter the store interface in a composable way.

// Store enhancers are much the same concept as higher-order
// components in React,  which are also occasionally called “component enhancers”.
// Example: Redux devtools
// Most likely you'll never write a store enhancer
const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    console.log('old state: ', state, action)
    const newState = reducer(state, action)
    console.log('new state: ', newState, action)

    return newState
  }

  return createStore(logReducer, initialState, enhancer)
}

// Store - variable or object keep the states
// createStore(reducer, initialState, enhancer)
const store = createStore(
  rootReducer,
  compose(applyMiddleware(customMiddleware, incrementMiddleware), logEnhancer),
)

// Subscription - executed when state is updated
const subscriber = () => {
  // The state of the store can be found out using the method getState.
  console.log('[Subscription]', store.getState())
}
store.subscribe(subscriber)

// Action creators
// a function that returns an action object.
// Redux includes a utility function called bindActionCreators
// for binding one or more action creators to the store's dispatch() function
const add = (amount) => ({ type: 'ADD', payload: amount })
const subtraction = (amount) => ({ type: 'SUBTRACTION', payload: amount })
const actions = bindActionCreators({ add, subtraction }, store.dispatch)

// The store uses the reducer to handle actions, which
// are dispatched or 'sent' to the store with its dispatch-method.
store.dispatch({ type: 'INCREMENT' }) // counter: 1
store.dispatch(add(10)) // result: 10
actions.add(4) // result: 14
actions.subtraction(2) // result: 12
```

</details>

## Redux with React

<details>
<summary>View contents</summary>

#### Using Redux hooks

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const INCREMENT = 'INCREMENT'

const increment = () => ({
  type: INCREMENT,
})

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'ADD':
      return state + action.value
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => (
  <div>
    <div>{store.getState()}</div>
    <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>plus</button>
    <button onClick={(e) => store.dispatch({ type: 'ADD', value: 10 })}>add 10</button>
    <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

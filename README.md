# Redux

## The 3 Principles of redux

1. Single source of truth
2. State is read only
3. Changes using pure functions

#### Redux Pattern

```
Action --> Reducer --> Store --> Make Changes
```

#### Flux Pattern

```
Action --> Dispatcher --> Store --> View
```

#### MVC Pattern

```
Action --> Controller --> Model --> View
```

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

### Using Redux Hooks

<details>
<summary>View contents</summary>

#### Connecting Redux with React

<details>
<summary>View contents</summary>

- create a react app and install `redux` & `react-redux` packages

```bash
> npx create-react-app redux-app
> cd redux-app
> yarn add redux react-redux
```

- create `store` directory and add these files

```bash
> mkdir store
> cd store
> touch index.js
> mkdir count
> cd count
> touch reducer.js
```

```js
// src/store/reducer.js

import { nanoId } from '../../utils'

// initialState
const initialItems = [{ id: nanoId(), name: 'Fish', price: 400, quantity: 2 }]

export const itemsReducer = (state = initialItems, action) => {
  return state
}
```

```js
// src/store/index.js

import { combineReducers, createStore } from 'redux'
import { itemsReducer } from './items/reducer'

const reducer = combineReducers({
  items: itemsReducer,
})

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, enhancer)
```

```jsx
// src/Cart.jsx

import React from 'react'

export const Cart = () => {
  return <div>Cart</div>
}
```

```jsx
// src/index.jsx

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Cart } from './components/Cart.jsx'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Cart />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root)
)
```

**In Redux DevTools**

![redux-state](./assets/img/redux-1.png)

</details>

#### Adding Selector and getting data

<details>
<summary>View contents</summary>

```js
// src/store/items/selectors.js

export const selectItems = (state) => state.items
```

```jsx
// src/components/Cart.jsx

import React from 'react'
import { useSelector } from 'react-redux'

import { selectItems } from '../store/items/selectors'

export const Cart = () => {
  const items = useSelector(selectItems)

  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid black' }}>
            <h3>{item.name}</h3>
            <p>Price: {item.price} Taka</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

</details>

#### Adding Actions & Reducers

<details>
<summary>View contents</summary>

```jsx
// src/store/items/actions.js

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const Actions = {
  ITEM_ADDED: 'ITEM_ADDED',
}

const addNewItem = (name, price) => ({
  type: Actions.ITEM_ADDED,
  payload: { name, price },
})

export const useItemActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ addNewItem }, dispatch)
}
```

```jsx
// src/store/items/reducer.js

import { nanoId } from '../../utils'
import { Actions } from './actions'

// initialState
const initialItems = [{ id: nanoId(), name: 'Fish', price: 400, quantity: 2 }]

export const itemsReducer = (state = initialItems, action) => {
  if (action.type === Actions.ITEM_ADDED) {
    const item = { id: nanoId(), quantity: 1, ...action.payload }
    return [...state, item]
  }

  return state
}
```

**In Redux DevTools**

![redux-state](./assets/img/redux-2.png)

</details>

</details>

### Thunk Middleware

```js
const middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    const fn = action
    return fn(store.dispatch)
  }

  return next(action)
}
```

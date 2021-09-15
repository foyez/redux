import { combineReducers, createStore } from 'redux'
import { itemsReducer } from './items/reducer'

const reducer = combineReducers({
  items: itemsReducer,
})

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, enhancer)

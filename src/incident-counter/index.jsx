import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'
import { Counter } from './Counter'
import './index.scss'

// Redux Provider hooks redux with react context api
// so react application can access it from anywhere

export const IncidentCounter = () => {
  return (
    <Provider store={store}>
      <div className="Application">
        <Counter />
      </div>
    </Provider>
  )
}

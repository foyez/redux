import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'
import { Cart } from './components/Cart'

export const BasicRedux = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  )
}

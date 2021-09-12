import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'
import { Application } from './components/Application'

import './styles.scss'

export const StarWars = () => (
  <Provider store={store}>
    <Application />
  </Provider>
)

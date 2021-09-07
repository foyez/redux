import React from 'react'
import { Theme } from '@twilio-paste/core/theme'
import { Provider } from 'react-redux'

import Application from './components/Application'
import { store } from './store'
import './index.css'

export const TipCalculator = () => (
  <Provider store={store}>
    <Theme.Provider theme="default">
      <React.StrictMode>
        <Application />
      </React.StrictMode>
    </Theme.Provider>
  </Provider>
)

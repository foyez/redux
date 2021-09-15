import React from 'react'

import { NewItemFormContainer } from '../containers/NewItemFormContainer'
import { CartItemsContainer } from '../containers/CartItemsContainer'

export const Cart = () => (
  <div>
    <NewItemFormContainer />
    <CartItemsContainer />
  </div>
)

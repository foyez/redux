import React from 'react'

import { CartItems } from './CartItems'
import { NewItemForm } from './NewItemForm'

export const Cart = () => (
  <div>
    <NewItemForm />
    <CartItems />
  </div>
)

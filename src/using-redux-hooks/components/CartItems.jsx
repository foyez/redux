import React from 'react'
import { useSelector } from 'react-redux'
import { selectItems } from '../store/items/selectors'

export const CartItems = () => {
  const items = useSelector(selectItems)

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={{ border: '1px solid black' }}>
          <h3>{item.name}</h3>
          <p>Price: {item.price} Taka</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

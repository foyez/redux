import React from 'react'

export const CartItems = ({ items }) => {
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

import React, { useState } from 'react'

export const NewItemForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const handleChangeName = (e) => setName(e.target.value)
  const handleChangePrice = (e) => setPrice(e.target.value)
  const handleSubmitItem = (e) => {
    e.preventDefault()
    onSubmit(name, price)
    setName('')
    setPrice(0)
  }

  return (
    <form onSubmit={handleSubmitItem}>
      <input onChange={handleChangeName} type="text" value={name} />
      <input onChange={handleChangePrice} type="number" value={price} />
      <button>Add Item</button>
    </form>
  )
}

import React, { useState } from 'react'

import { useItemActions } from '../store/items/actions'

export const NewItemForm = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const { addNewItem } = useItemActions()

  const handleChangeName = (e) => setName(e.target.value)
  const handleChangePrice = (e) => setPrice(e.target.value)
  const handleSubmitItem = (e) => {
    e.preventDefault()
    addNewItem(name, price)
  }

  return (
    <form onSubmit={handleSubmitItem}>
      <input onChange={handleChangeName} type="text" value={name} />
      <input onChange={handleChangePrice} type="number" value={price} />
      <button>Add Item</button>
    </form>
  )
}

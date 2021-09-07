import produce from 'immer'
import { ITEM_ADDED, ITEM_REMOVED, ITEM_PRICE_UPDATED, ITEM_QUANTITY_UPDATED } from './actions'

let id = 1

export const initialItems = [
  { uuid: id++, name: 'Awesome Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham Sandwich', price: 12, quantity: 1 },
]

export const reducer = (state = initialItems, action) => {
  // if (action.type === ITEM_ADDED) {
  //   const item = { uuid: id++, quantity: 1, ...action.payload }
  //   return [...state, item]
  // }

  if (action.type === ITEM_ADDED) {
    produce(state, (draftState) => {
      const item = { uuid: id++, quantity: 1, ...action.payload }
      draftState.push(item)
    })
  }

  if (action.type === ITEM_REMOVED) {
    return state.filter((item) => item.uuid !== action.payload.uuid)
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    const { uuid, price } = action.payload
    const updatePrice = (item) => (item.uuid === uuid ? { ...item, price } : item)
    return state.map(updatePrice)
  }

  if (action.type === ITEM_QUANTITY_UPDATED) {
    const { uuid, quantity } = action.payload
    // const updateQuantity = (item) => (item.uuid === uuid ? { ...item, quantity } : item)
    // return state.map(updateQuantity)
    return produce(state, (draftState) => {
      const item = draftState.find((item) => item.uuid === uuid)
      item.quantity = parseInt(quantity, 10)
    })
  }

  return state
}

export default reducer
